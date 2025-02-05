import '@fontsource/jetbrains-mono';

export function DisconnectButton({
    handleSocketSignIn: handleSocketDisconnect
}: {
    handleSocketSignIn: () => void;
}) {
    return (
        <button 
            onClick={() => handleSocketDisconnect()}
            style={{
                marginTop: '0.5rem',
                backgroundColor: '#ef4444',
                color: 'white',
                width: '100%',
                padding: '0.75rem',
                fontFamily: 'JetBrains Mono',
                fontWeight: 'bold',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer'
            }}
        >
            Disconnect
        </button>
    )
}