import { FormControlLabel, Input, Stack, Checkbox } from "@mui/material";
import { useContext } from "react";
import { CustomUrlContext } from "../contexts/custom-url-context";

export function CustomUrlEditor() {
    const {
        setUseCustomUrl,
        useCustomUrl,
        customUrl,
        setCustomUrl
    } = useContext(CustomUrlContext);


    function handleUseCustomUrlCheckboxChange () {
        if (setUseCustomUrl) setUseCustomUrl((cur) => !cur);
    }

    function handleUseCustomUrlChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (setCustomUrl) setCustomUrl(e.target.value);
    }

    return <Stack style={
        {
            padding: "0.5rem"
        }
    }>
        <Input 
            value={customUrl}
            onChange={handleUseCustomUrlChange}
            placeholder="Enter your localhost url"
            style={{
                marginBottom: "0.5rem" 
            }}/>
        <FormControlLabel value={useCustomUrl} onChange={handleUseCustomUrlCheckboxChange} sx={{gap: "0.5rem", margin: 0}} control={<Checkbox 
        />} label="Use Custom Url"/>
    </Stack>
}
