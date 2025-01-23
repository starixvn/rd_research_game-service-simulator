import { MessageDisplay } from "../components/MessageDisplay";
import { SignInButton } from "../components/SignInButton";
import { GameCommunicationService } from "../services/game-communication-service";
import { useInlineSso } from "../hooks/useSSO";
import { useInjection } from "../hooks/useInjection";
import { Grid2 as Grid } from "@mui/material";
import { usePayloadSubmit } from "../hooks/usePayloadSubmit";
import { Editor } from "../components/Editor";
import { EventNameInput } from "../components/EventNameInput";
import { SendSocketEventButton } from "../components/SendSocketEventButton";
import { useGameName } from "../hooks/useGameName";
import { GameNameSelect } from "../components/GameNameSelect";
import { useGameEvent } from "../hooks/useGameEvent";

export function IndexPage() {
    const { session } = useInlineSso();
    const { gameList, currentGame, currentGameIndex, setCurrentGameIndex } = useGameName();
    const gameService = useInjection<GameCommunicationService>(GameCommunicationService);
    const { payload, handlePayloadChange, eventName, setEventName, handleSubmit, isValidPayload } = usePayloadSubmit();
    const { gameEvents, flushGameEvents } = useGameEvent();
    function handleSocketSignIn() {
        flushGameEvents();
        gameService?.initialize({
            namespace: currentGame.namespace,
            path: currentGame.path
        });
        gameService?.emit("signin", session);
    }



    return (
            <Grid
                container 
                spacing={2} 
                columns={16} 
                columnSpacing={2} 
                boxSizing={"border-box"}
                height="100vh"
                sx={{ margin: 0, padding: "1rem" }}
            >
                <Grid 
                    size={8} 
                    sx={{
                        border: "1px solid grey",
                        height: "100%",
                        boxSizing: "border-box",
                        padding: "1rem",
                    }}
                >   <GameNameSelect 
                        gameList={gameList}
                        currentGameIndex={currentGameIndex}
                        setCurrentGameIndex={setCurrentGameIndex}
                    />
                    <SignInButton handleSocketSignIn={handleSocketSignIn} />
                    <Editor isValidJson={isValidPayload} value={payload} onChange={handlePayloadChange} />
                    <EventNameInput value={eventName} onChange={setEventName} />
                    <SendSocketEventButton onClick={handleSubmit} disabled={!isValidPayload}/>
                </Grid>
                <Grid 
                    size={8} 
                    sx={{
                        border: "1px solid grey",
                        overflow: "scroll",
                        height: "100%",
                        boxSizing: "border-box",
                        padding: "1rem",
                    }}
                >
                    <MessageDisplay gameEvents={gameEvents} />
                </Grid>
            </Grid>)
  
}