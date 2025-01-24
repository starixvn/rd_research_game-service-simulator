import { Container } from "inversify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContainerProvider } from "./contexts/container-context";
import { IndexPage } from "./pages";
import { GameCommunicationService } from "./services/game-communication-service";
import { SocketClientWrapper } from "./services/socket-service";
import { createErrorMessageEventSubject } from "./subjects/error";
import { createGameEventSubject } from "./subjects/event";
import { SessionProvider } from "./contexts/session-context";
import { EventContextProvider } from "./contexts/event-context";

const container = new Container();

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
                <EventContextProvider>
                  <IndexPage/>
                </EventContextProvider>
            </SessionProvider>} index/>
        </Routes>
      </BrowserRouter>
  </ContainerProvider>

}

export default App
