export function SignInButton({
    handleSocketSignIn
}: {
    handleSocketSignIn: () => void;
}) {

    return <button onClick={() => handleSocketSignIn()}>
            Sign In
        </button>
}