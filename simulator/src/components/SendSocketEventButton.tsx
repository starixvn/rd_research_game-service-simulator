import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import '@fontsource/jetbrains-mono'

export function SendSocketEventButton({ onClick, disabled }: { onClick: () => void, disabled: boolean }) {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: disabled ? '#9CA3AF' : '#3b82f6',
                color: 'white',
                width: '100%',
                padding: '0.75rem',
                fontFamily: 'JetBrains Mono',
                fontWeight: 'bold',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
            }}
            disabled={disabled}
        >
            <span>Send Event</span>
            <PaperAirplaneIcon style={{ width: '20px', height: '20px' }} />
        </button>
    )
}
