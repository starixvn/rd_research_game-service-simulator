import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SSOResponse } from "sc-user-service-client/dist/auth";
import { sso } from "../services/sso-service";

export function useInlineSso() {
    const [searchParams, setSearchparams ] = useSearchParams();
    const [session, setSession] = useState<SSOResponse | null>(null);

    const token = searchParams.get("token");
    const appType = searchParams.get("appType");

    useEffect(() => {
    async function inlineSSO(token: string, appType: string) {
        const userSession = await sso(token, Number(appType));
        if(userSession)  { 
            setSession(userSession); 
            searchParams.delete("token");
            searchParams.delete("appType");
            setSearchparams(searchParams);
        }
    }        
    if (token && appType) {
        inlineSSO(token, appType);
        }
    },[token, appType])

    useEffect(() => {
    }, [session]);

    return {
        session
    }
    
}