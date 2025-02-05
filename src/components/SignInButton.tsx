import '@fontsource/jetbrains-mono';

export function SignInButton({
    handleSocketSignIn
}: {
    handleSocketSignIn: () => void;
}) {
    return (
        <button 
            onClick={() => handleSocketSignIn()}
            style={{
                backgroundColor: '#22c55e', // green-500
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
            Sign In
        </button>
    )
}