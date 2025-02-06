import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthorizeResponse, SSOResponse } from "sc-user-service-client/dist/auth";
import { authorize, signName, sso } from "../services/auth-service";

export function useInlineSso() {
    const [searchParams, setSearchparams ] = useSearchParams();
    const [session, setSession] = useState<SSOResponse | null>(null);
    const [isAuthorized, setAuthorized] = useState<boolean | null>(null);

    const token = searchParams.get("token");
    const appType = searchParams.get("appType");

    async function handleSignName(nickname: string) {
        if (!session) return;
        const authorizeResponse = await signName(session, nickname);
        if (!authorizeResponse || (authorizeResponse as AuthorizeResponse).authorized  === undefined ) return;
        setAuthorized((authorizeResponse as AuthorizeResponse).authorized)
    }

    useEffect(() => {
        async function inlineAuthorization(token: string, appType: string) {
            const userSession = await sso(token, Number(appType));
            if (!userSession) return;
            setSession(userSession); 
            searchParams.delete("token");
            searchParams.delete("appType");
            setSearchparams(searchParams);

            const authorizeResponse = await authorize(userSession);
            if (!authorizeResponse || (authorizeResponse as AuthorizeResponse).authorized  === undefined ) return;
            setAuthorized((authorizeResponse as AuthorizeResponse).authorized)
        }        
        if (token && appType) {
            inlineAuthorization(token, appType);
            }
    },[token, appType])

    useEffect(() => {
    }, [session]);

    return {
        session,
        isAuthorized,
        handleSignName
    }
    
}