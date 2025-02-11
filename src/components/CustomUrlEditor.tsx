import { TextCheckboxCombo } from "./TextCheckboxCombo";

export type CustomUrlEditorProps = { 
    useCustomUrl: boolean,
    customUrl: string,
    setCustomUrl: React.Dispatch<React.SetStateAction<string>> | null,
    setUseCustomUrl: React.Dispatch<React.SetStateAction<boolean>> | null
}

export function CustomUrlEditor({
    setUseCustomUrl,
    useCustomUrl,
    customUrl,
    setCustomUrl } :CustomUrlEditorProps) 
{
    return <TextCheckboxCombo 
        enabled={useCustomUrl}
        setEnabled={setUseCustomUrl}
        setTextValue={setCustomUrl}
        textValue={customUrl}
    />
}
