import ContainerLib from "./lib/container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContainerProvider } from "./contexts/container-context";
import { IndexPage } from "./pages";
import { GameCommunicationService } from "./services/game-communication-service";
import { SocketClientWrapper } from "./services/socket-service";
import { createErrorMessageEventSubject } from "./subjects/error";
import { createGameEventSubject } from "./subjects/event";
import { SessionProvider } from "./contexts/session-context";
import { EventContextProvider } from "./contexts/event-context";
import gc from "@sg/game-client-base";
import { CustomUrlContextProvider } from "./contexts/custom-url-context";

const container = new ContainerLib.Container();

// const gcContainer = gc.getContainer();
// const ConnectionHandle = gcContainer.resolve(gc.Connection.ConnectionHandlers.ConnectHandler);
// console.log(ConnectionHandle);  

const gameEventSubject = createGameEventSubject();
const errorMessageSubject = createErrorMessageEventSubject();
const socketClientWrapper = new SocketClientWrapper();

const gameService = new GameCommunicationService(
  socketClientWrapper,gameEventSubject,errorMessageSubject
)

container.bind(GameCommunicationService)
  .toConstantValue(gameService);

function App() {

  return <ContainerProvider container={container}>
    
      <BrowserRouter>
        <Routes>  
          <Route element={
            <SessionProvider>
                <CustomUrlContextProvider>
                  <EventContextProvider>
                    <IndexPage/>
                  </EventContextProvider>
                </CustomUrlContextProvider>
            </SessionProvider>} index/>
        </Routes>
      </BrowserRouter>
  </ContainerProvider>

}

export default App
