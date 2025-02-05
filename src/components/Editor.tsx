import CodeEditor from "@monaco-editor/react";

export function Editor({ value, onChange, isValidJson }: { isValidJson: boolean, value: string, onChange: (value: string | undefined) => void  }) {
    

    return (
        <div style={{ 
            marginTop: '1rem', 
            border: `1px solid ${isValidJson ? '#ccc' : '#ff0000'}`,
            borderRadius: '4px' 
        }}>
            <CodeEditor
                height={200}
                value={value}
                onChange={onChange}
                language="json"
                options={{ 
                    minimap: {
                        enabled: false
                    },
                    scrollbar: {
                        vertical: 'hidden',
                        verticalScrollbarSize: 0,
                        horizontalScrollbarSize: 0
                    },
                    folding: false,
                    lineNumbersMinChars: 3,
                }}
            />
        </div>
    )
}