export function EventNameInput({ value, onChange }: { value: string, onChange: (value: string) => void }) {
    return (
        <input 
            type="text" 
            placeholder="Socket Event Name" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                height: '40px',
                width: 'calc(100% - 10px)',
                marginTop: '1rem',
                marginBottom: '1rem',
                padding: '0 0 0 10px'
            }}
        />
    )
}