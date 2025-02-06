import { MessageDisplay } from "../components/event-display/MessageDisplay";
import { SignInButton } from "../components/SignInButton";
import { GameCommunicationService } from "../services/game-communication-service";
import { useInjection } from "../hooks/useInjection";
import { Grid2 as Grid } from "@mui/material";
import { usePayloadSubmit } from "../hooks/usePayloadSubmit";
import { Editor } from "../components/Editor";
import { EventNameInput } from "../components/EventNameInput";
import { SendSocketEventButton } from "../components/SendSocketEventButton";
import { useGameName } from "../hooks/useGameName";
import { GameNameSelect } from "../components/GameNameSelect";
import { useGameEvent } from "../hooks/useGameEvent";
import { AuthContext } from "../contexts/auth-context";
import { useContext } from "react";
import { TemplateDisplay } from "../components/TemplateDisplay";
import { DisconnectButton } from "../components/DisconnectButton";
import { CustomUrlContext } from "../contexts/custom-url-context";
import { CustomUrlEditor } from "../components/CustomUrlEditor";
import { SnackbarProvider } from "notistack";
import { useErrorEvent } from "../hooks/useErrorEvent";
import SignNameDialog from "../components/SignNameDialog";

export function IndexPage() {
    const { session } = useContext(AuthContext);
    const { useCustomUrl, customUrl } = useContext(CustomUrlContext);
    const { gameList, currentGame, currentGameIndex, setCurrentGameIndex } = useGameName();
    const gameService = useInjection<GameCommunicationService>(GameCommunicationService);
    const { payload, handlePayloadChange, eventName, setEventName, handleSubmit, isValidPayload } = usePayloadSubmit();
    const { gameEvents, flushGameEvents } = useGameEvent();
    
    useErrorEvent();

    function handleSocketSignIn() {
        flushGameEvents();

        gameService?.initialize({
            namespace: currentGame.namespace,
            path: currentGame.path,
            useCustomUrl,
            customUrl
        });
        gameService?.emit("signin", session);
    }



    function handleSocketDisconnect() {
        gameService?.destroy();
    }

    return (
        <>
            <SignNameDialog/>
            <Grid
                    container 
                    spacing={2} 
                    columns={16} 
                    columnSpacing={2} 
                    boxSizing={"border-box"}
                    height="100vh"
                    sx={{ margin: 0, padding: "1rem" }}
                >
                    <SnackbarProvider/>
                    <Grid 
                        size={8} 
                        sx={{
                            border: "1px solid grey",
                            height: "100%",
                            boxSizing: "border-box",
                            padding: "1rem",
                            overflow: "scroll",
                        }}
                    >   <GameNameSelect 
                            gameList={gameList}
                            currentGameIndex={currentGameIndex}
                            setCurrentGameIndex={setCurrentGameIndex}
                        />
                        <CustomUrlEditor/>
                        <SignInButton handleSocketSignIn={handleSocketSignIn} />
                        <DisconnectButton handleSocketSignIn={handleSocketDisconnect} />
                        <Editor isValidJson={isValidPayload} value={payload} onChange={handlePayloadChange} />
                        <EventNameInput value={eventName} onChange={setEventName} />
                        <SendSocketEventButton onClick={handleSubmit} disabled={!isValidPayload}/>
                        <TemplateDisplay/>
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
                </Grid>
            </>)
}