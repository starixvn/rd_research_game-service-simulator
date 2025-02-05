import React, { PropsWithChildren } from "react";
import { SSOResponse } from "sc-user-service-client/dist/auth";
import { useInlineSso } from "../hooks/useSSO";

export const SessionContext = React.createContext<{session: SSOResponse | null}>({session: null});

type SessionContextProps = PropsWithChildren<{
}>


export const SessionProvider = ({ children }: SessionContextProps) => {

    const { session } = useInlineSso();

    return <SessionContext.Provider value={{session }}>
        {children}
    </SessionContext.Provider>
}