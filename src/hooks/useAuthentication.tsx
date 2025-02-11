import { useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthorizeResponse, ReCheckInResponse, Response, SSOResponse } from "sc-user-service-client/dist/auth";
import { authorize, getAvailableSession, reCheckin, signName, signOut, sso } from "../services/auth-service";
import { FatalErrorContext } from "../contexts/fatal-error-context";
import { useReCheckIn } from "./useReCheckin";
import { GameCommunicationService } from "../services/game-communication-service";
import { useInjection } from "./useInjection";

export function useInlineAuthentication() {
    const { pushError } = useContext(FatalErrorContext);
    const [searchParams, setSearchparams ] = useSearchParams();
    const [session, setSession] = useState<SSOResponse | null>(null);
    const [isAuthorized, setAuthorized] = useState<boolean | null>(null);
    const gameService = useInjection<GameCommunicationService>(GameCommunicationService);

    const token = searchParams.get("token");
    const appType = searchParams.get("appType");

    const  handleTokenSsoError = useCallback(() => {
        if (!pushError) return;
        signOut();
        pushError({
            title: "SSO Failed",
            detail: "SSO token is missing, invalid, or expired, please get new token and then try again"
        });
    }, [pushError]);

    const handleSessionReCheckinResult = useCallback((response?: ReCheckInResponse, cachedSession?: SSOResponse) => {
        if (!pushError) return;

        if (!response?.isSuccessful) {
            signOut()
            pushError({
                title: response?.errorCode ?? "Unknown Error",
                detail: response?.message ?? "Unknown Error Message"
            });
            return;
        }
        if (cachedSession) setSession(cachedSession);
        
        pushError(null);
    }, [pushError, setSession])


    useReCheckIn({
        session,
        handle: handleSessionReCheckinResult
    })

    const handleTokenSsoSuccess = useCallback(() => {
        if (!pushError) return;
        pushError(null)
    }, [pushError]);
    
    const  handleSignName = useCallback(async (nickname: string) => {
        if (!session) return handleTokenSsoError();
        const authorizeResponse = await signName(session, nickname);
        if (!authorizeResponse || (authorizeResponse as AuthorizeResponse).authorized  === undefined ) {
            const errCode = (authorizeResponse as Response)?.errorCode ?? "Unknown error";
            const payload = (authorizeResponse as Response)?.message ?? "Unknown error";
            gameService.errorEventSubject.next({
                error: errCode,
                payload
            });
            return;
        };
        setAuthorized((authorizeResponse as AuthorizeResponse).authorized)
        handleTokenSsoSuccess()
    }, [session, setAuthorized, handleTokenSsoSuccess]);

    const removeParams = useCallback(() => {
        searchParams.delete("token");
        searchParams.delete("appType");
        setSearchparams(searchParams);
    }, [])

    const cachedSessionAuthorization = useCallback(async () => {
        const cachedSession = getAvailableSession();
        if (!cachedSession) {
            return handleTokenSsoError();
        }
        const reCheckInResponse = await reCheckin(cachedSession);
        handleSessionReCheckinResult(reCheckInResponse, cachedSession);
        
    }, [handleSessionReCheckinResult])

    const paramTokenAuthorization = useCallback(async (token: string, appType: string) => {
        const userSession = await sso(token, Number(appType));
        if (!userSession) return;
        setSession(userSession); 
        removeParams();

        const authorizeResponse = await authorize(userSession);
        if (!authorizeResponse || (authorizeResponse as AuthorizeResponse).authorized  === undefined ) return handleTokenSsoError();
        setAuthorized((authorizeResponse as AuthorizeResponse).authorized)
        handleTokenSsoSuccess()
    }, [handleTokenSsoError, handleTokenSsoError, setAuthorized])

    useEffect(() => {
        if (token && appType) {
            paramTokenAuthorization(token, appType);
        }
        else {
            cachedSessionAuthorization()
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