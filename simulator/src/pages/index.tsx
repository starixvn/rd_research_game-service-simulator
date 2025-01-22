import { MessageDisplay } from "../components/MessageDisplay";
import { SignInButton } from "../components/SignInButton";
import { GameCommunicationService } from "../services/game-communication-service";
import { useInlineSso } from "../hooks/useSSO";
import { useInjection } from "../hooks/useInjection";
import { Grid2 as Grid } from "@mui/material";

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

    return (
            <Grid container spacing={2} columns={16} columnSpacing={2} boxSizing={"border-box"}>
                <Grid size={8} sx={{border: "1px solid grey"}} maxHeight="100vh">
                    <SignInButton handleSocketSignIn={handleSocketSignIn} />
                </Grid>
                <Grid size={8} sx={{border: "1px solid grey", overflow: "scroll"}} maxHeight="100vh">
                    <MessageDisplay/>
                </Grid>
            </Grid>)
  
}