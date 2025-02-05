import React, { PropsWithChildren } from "react";
import { useInlineCustomUrlConfig } from "../hooks/useCustomUrl";

export const CustomUrlContext = React.createContext<{ 
    useCustomUrl: boolean,
    customUrl: string,
    setCustomUrl: React.Dispatch<React.SetStateAction<string>> | null,
    setUseCustomUrl: React.Dispatch<React.SetStateAction<boolean>> | null
}>({
    useCustomUrl: false,
    customUrl: "",
    setCustomUrl: null,
    setUseCustomUrl: null
});

export const CustomUrlContextProvider = ({ children }: PropsWithChildren) => {
    const {
        useCustomUrl,
        customUrl,
        setCustomUrl,
        setUseCustomUrl,
    } = useInlineCustomUrlConfig();
    

    return <CustomUrlContext.Provider value={{ 
        customUrl,
        setCustomUrl,
        setUseCustomUrl,
        useCustomUrl
     }}>
        {children}
    </CustomUrlContext.Provider>
}