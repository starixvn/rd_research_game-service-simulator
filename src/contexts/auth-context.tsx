import React, { PropsWithChildren } from "react";
import { SSOResponse } from "sc-user-service-client/dist/auth";
import { useInlineAuthentication as useSessionAuthentication } from "../hooks/useAuthentication";

export type SessionContextType = {
    session: SSOResponse | null;
    isAuthorized: boolean | null;
    handleSignName: (nickname: string) => Promise<void>
}

const defaultHandleSignName = () => {
    return Promise.reject(new Error("Not implemented"));
}

export const AuthContext = React.createContext<SessionContextType>({session: null, isAuthorized: null, handleSignName: defaultHandleSignName});

type SessionContextProps = PropsWithChildren<{
}>


export const AuthProvider = ({ children }: SessionContextProps) => {

    const { session, isAuthorized, handleSignName } = useSessionAuthentication();

    return <AuthContext.Provider value={{session, isAuthorized, handleSignName }}>
        {children}
    </AuthContext.Provider>
}