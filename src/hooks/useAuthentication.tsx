import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthorizeResponse, SSOResponse } from "sc-user-service-client/dist/auth";
import { authorize, signName, sso } from "../services/auth-service";
import { FatalErrorContext } from "../contexts/fatal-error-context";

export function useInlineAuthentication() {
    const { pushError } = useContext(FatalErrorContext);
    const [searchParams, setSearchparams ] = useSearchParams();
    const [session, setSession] = useState<SSOResponse | null>(null);
    const [isAuthorized, setAuthorized] = useState<boolean | null>(null);

    const token = searchParams.get("token");
    const appType = searchParams.get("appType");

    function handleTokenSsoError() {
        if (!pushError) return;
        pushError({
            title: "SSO Failed",
            detail: "SSO token is missing, invalid, or expired, please get new token and then try again"
        });
    }

    function handleTokenSsoSuccess() {
        if (!pushError) return;
        pushError(null)
    }
    
    async function handleSignName(nickname: string) {
        if (!session) return handleTokenSsoError();
        const authorizeResponse = await signName(session, nickname);
        if (!authorizeResponse || (authorizeResponse as AuthorizeResponse).authorized  === undefined ) return;
        setAuthorized((authorizeResponse as AuthorizeResponse).authorized)
        handleTokenSsoSuccess()
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
            if (!authorizeResponse || (authorizeResponse as AuthorizeResponse).authorized  === undefined ) return handleTokenSsoError();
            setAuthorized((authorizeResponse as AuthorizeResponse).authorized)
            handleTokenSsoSuccess()
        }
        if (!token) {
            handleTokenSsoError()
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