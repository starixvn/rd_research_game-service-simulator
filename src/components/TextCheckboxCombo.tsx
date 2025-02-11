import { FormControlLabel, Input, Stack, Checkbox } from "@mui/material";

export type TextCheckboxComboProps = { 
    enabled: boolean,
    textValue: string,
    setEnabled: React.Dispatch<React.SetStateAction<boolean>> | null,
    setTextValue: React.Dispatch<React.SetStateAction<string>> | null
}

export function TextCheckboxCombo({
    setTextValue,
    enabled,
    textValue,
    setEnabled } :TextCheckboxComboProps) 
{

    function handleUseCustomUrlCheckboxChange () {
        if (setEnabled) setEnabled((cur) => !cur);
    }

    function handleUseCustomUrlChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (setTextValue) setTextValue(e.target.value);
    }

    return <Stack>    
        <FormControlLabel value={enabled} onChange={handleUseCustomUrlCheckboxChange} control={<Checkbox 
        />} label="Use Custom Url"/>
        {enabled && <Input 
            value={textValue}
            onChange={handleUseCustomUrlChange}
            style={{
                marginBottom: "0.5rem" 
            }}/>}
    </Stack>
}
