import { useState } from "react";

export function useInlineCustomUrlConfig() {

    const [customUrl, setCustomUrl] = useState<string>("localhost:5000");
    const [useCustomUrl, setUseCustomUrl ] = useState<boolean>(false);

    return  {
        useCustomUrl,
        customUrl,
        setCustomUrl,
        setUseCustomUrl
    }
}