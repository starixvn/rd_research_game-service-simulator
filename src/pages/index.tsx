import { MessageDisplay } from "../components/event-display/MessageDisplay";
import { GameCommunicationService } from "../services/game-communication-service";
import { useInjection } from "../hooks/useInjection";
import { Button, Grid2 as Grid } from "@mui/material";
import { usePayloadSubmit } from "../hooks/usePayloadSubmit";
import { Editor } from "../components/Editor";
import { EventNameInput } from "../components/EventNameInput";
import { SendSocketEventButton } from "../components/SendSocketEventButton";
import { useGameName } from "../hooks/useGameName";
import { GameNameSelect } from "../components/GameNameSelect";
import { useGameEvent } from "../hooks/useGameEvent";
import { AuthContext } from "../contexts/auth-context";
import { useContext, useState } from "react";
import { TemplateDisplay } from "../components/TemplateDisplay";
import { CustomUrlEditor } from "../components/CustomUrlEditor";
import { SnackbarProvider } from "notistack";
import { useErrorEvent } from "../hooks/useErrorEvent";
import SignNameDialog from "../components/SignNameDialog";
import { useInlineCustomUrlConfig } from "../hooks/useCustomUrl";
import { ConnectionButtons } from "../components/ConnectionButtons";
import AddGameDialog from "../components/AddGameDialog";

export function IndexPage() {
    const { session } = useContext(AuthContext);
    const { gameList, currentGame, currentGameIndex, setCurrentGameIndex, handleAddGame } = useGameName();
    const gameService = useInjection<GameCommunicationService>(GameCommunicationService);
    const { payload, handlePayloadChange, eventName, setEventName, handleSubmit, isValidPayload } = usePayloadSubmit();
    const { gameEvents, flushGameEvents } = useGameEvent();
    const { useCustomUrl, customUrl, setCustomUrl, setUseCustomUrl } = useInlineCustomUrlConfig();
    const [ addGameDialogOpen, setAddGameDialogOpen] = useState<boolean>(false);

    function openAddGameDialog() {
        setAddGameDialogOpen(true);
    }

    function closeAddGameDialog() {
        setAddGameDialogOpen(false);
    }
    
    useErrorEvent();

    function handleSocketSignIn() {
        flushGameEvents();

        gameService?.initialize({
            namespace: currentGame?.namespace ?? "marblefootball",
            path: currentGame?.path ?? "marblefootball",
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
            <AddGameDialog open={addGameDialogOpen} handleAddGame={handleAddGame} handleCloseDialog={closeAddGameDialog}/>
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
                    >   
                        <Button 
                            variant="outlined" 
                            color="success" 
                            sx={{
                                width: "100%",
                                marginBottom: ".75rem"
                            }}
                            onClick={openAddGameDialog}
                            >
                                Start by adding a new game
                        </Button>
                        <GameNameSelect 
                            gameList={gameList}
                            currentGameIndex={currentGameIndex}
                            setCurrentGameIndex={setCurrentGameIndex}
                        />
                        <CustomUrlEditor 
                            customUrl={customUrl}
                            setCustomUrl={setCustomUrl}
                            setUseCustomUrl={setUseCustomUrl}
                            useCustomUrl={useCustomUrl}
                        />
                        <ConnectionButtons 
                            handleSocketDisconnect={handleSocketDisconnect}
                            handleSocketSignIn={handleSocketSignIn}
                        />
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