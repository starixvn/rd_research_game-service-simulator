import { AuthLabel } from "../components/Authenticator";
import { SignInButton } from "../components/SignInButton";
import { GameCommunicationService } from "../services/game-communication-service";
import { useInlineSso } from "../hooks/useSSO";
import { useInjection } from "../hooks/useInjection";

export function IndexPage() {
    const { session } = useInlineSso();
    const gameService = useInjection<GameCommunicationService>(GameCommunicationService);
    
    function handleSocketSignIn() {
        gameService?.initialize({
            namespace: "marblefootball",
            path: "marblefootball"
        });

        gameService?.emit("signin", session);
    }

    return <div>
        <SignInButton handleSocketSignIn={handleSocketSignIn}/>    
        <AuthLabel/>
    </div>
}