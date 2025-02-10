// dangerous error that crash the whole application operation should display a backdrop
import { createContext, PropsWithChildren } from "react";
import { useFatalError } from "../hooks/useFatalError";


export type FatalError = {
    title: string;
    detail: string;
}

type PushFatalErrorFunction = (err: FatalError) => void

type FatalErrorContextProps = {
    pushError: PushFatalErrorFunction | null;
    error: FatalError | null
}

export const FatalErrorContext = createContext<FatalErrorContextProps>({
    error: null,
    pushError: null
})

export const FatalErrorProvider = ({ children }: PropsWithChildren) => {

    const { fatalError, setFatalError } = useFatalError();

    return <FatalErrorContext.Provider value={{
        error: fatalError,
        pushError: setFatalError
    }}>
        {children}
    </FatalErrorContext.Provider>
}