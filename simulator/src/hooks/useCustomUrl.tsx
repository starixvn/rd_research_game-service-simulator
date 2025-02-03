import { useState } from "react";

export function useInlineCustomUrlConfig() {

    const [customUrl, setCustomUrl] = useState<string>("");
    const [useCustomUrl, setUseCustomUrl ] = useState<boolean>(false);

    return  {
        useCustomUrl,
        customUrl,
        setCustomUrl,
        setUseCustomUrl
    }
}