import ContainerLib from "../lib/container";
import "reflect-metadata";
import { Subject } from "rxjs";
import { ErrorMessage } from "../subjects/error";
import { GameEvent } from "../subjects/event";
import { GetSocketConnectionOption as getSocketConnectionOption, SocketClientWrapper } from "./socket-service";


@ContainerLib.injectable()
export class GameCommunicationService {
    private _socket: SocketClientWrapper;
    private _gameEventSubject: Subject<GameEvent>;

    private _errorMessageSubject: Subject<ErrorMessage>;

    constructor(
        socket: SocketClientWrapper,
        gameEventSubject: Subject<GameEvent>,
        errorMessageSubject: Subject<ErrorMessage>) {
            this._socket = socket;
            this._gameEventSubject = gameEventSubject;
            this._errorMessageSubject = errorMessageSubject;
    }

    get gameEventSubject() {
        return this._gameEventSubject;
    }
    
    get errorEventSubject() {
        return this._errorMessageSubject;
    }

    async initialize(socketInfo: SocketInfo) {
        this._socket.dispose();
        const option = getSocketConnectionOption(socketInfo);
        try {
            this._socket.subscribeAny((event, payload) => {
                this._gameEventSubject.next({
                    name: event,
                    payload: payload
                });
            });
            this._socket.subscribe({
                event: "disconnect",
                eventHandler: () => {
                    this._gameEventSubject.next({
                        name: "disconnect",
                        payload: null
                    });
                },
            })

        
            const uri = option.socketUri;

            await this._socket.connect(
                option.socketOption, 
                uri);
           
            
        } catch (err) {
            const error = err as Error;
            this._errorMessageSubject.next({
                error: error.message,
                payload: error
            })
            console.log(err);
        }
    }

    emit(event: string, payload: any) {
        this._socket.emit({
            name: event,
            payload: payload
        })
    }

    destroy() {
        this._gameEventSubject.next({
            name: "disconnect",
            payload: null
        });
        this._socket.dispose();
        this._socket.clearEventMap();
    }
}

