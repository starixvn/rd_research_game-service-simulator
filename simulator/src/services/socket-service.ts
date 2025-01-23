import { injectable } from "inversify";
import { getAppConfig } from "../configs";
import { buildServerUrl } from "../helpers/url-helper";
import { io, ManagerOptions, Socket, SocketOptions } from "../lib/socket.io-client";
import * as MsgPackParser from "../lib/socket.io-msgpack-parser";


export type EventSubscription<T> = {
    event: string;
    eventHandler: (data: T) => void;
}

@injectable()
export class SocketClientWrapper {
    private _uri: string;
    private _options: Partial<SocketOptions & ManagerOptions>;
    private _socket: Socket | null;
    private _idStore: number;
    private _eventMap: Map<number, EventSubscription<any>> = new Map();
    private _catchAllEvents: Array<(name: string, ...args: any[]) => void> = [];

    constructor(
        uri: string = DEFAULT_SOCKET_OPTIONS.socketUri, 
        socketOptions: Partial<SocketOptions & ManagerOptions> = DEFAULT_SOCKET_OPTIONS.socketOption) {
        this._idStore = 0;
        this._uri = uri;
        this._options = socketOptions;
        this._socket = io(uri,
            {
            ...socketOptions,
            autoConnect: false
        });
    }
    
    get socket() { return this._socket; } 

    async connect(options?: Partial<SocketOptions & ManagerOptions>, uri?: string) {
        if (this._socket?.connected) {
            this._socket?.disconnect();
            this._socket = null;
        }

        if (uri) this._uri = uri;

        return new Promise<void>((resolve, reject) => {
            try {

                this._socket = io(
                    this._uri,
                    {
                        ...this._options,
                        autoConnect: false,
                        ...options
                    });
                this.establishExistingEvents();

                this._socket?.on("connect", () => {
                    return resolve();
                });

                this._socket?.on("connect_error", (err: Error) => {
                    this.dispose();
                    return reject(err);
                });

                this._socket.connect();

            } catch (err) {
                this.dispose();
                return reject(err as Error);
            }
        });
    }

    dispose() {
        if (this._socket?.connected) this.socket?.disconnect();
        this._socket = null;
    }

    clearEventMap() {
        this._eventMap.clear();
        this._catchAllEvents = [];
    }

    disconnect() {
        this._socket?.disconnect();
        this._socket = null;
    }
    subscribe<TEventArgs>(subscription: EventSubscription<TEventArgs>) {
        const id = this.getNewId();
        this._eventMap.set(id, subscription);
        this._socket?.on(
            subscription.event,
            subscription.eventHandler
        )
        return id;
    }

    subscribeAny(callback: (name: string, ...args: any[]) => void) {
        this._socket?.onAny(callback);
        this._catchAllEvents.push(callback);
    }

    unsubscribe({ id, name, event }: UnsubscribeOptions) {
        if (id) {
            const event = this._eventMap.get(id);
            if (!event)
                return;
            this._socket?.off(event.event, event.eventHandler);
        }

        if (event && name) {
            return this._socket?.off(name, event);
        }

        if (name) {
            return this._socket?.off(name);
        }

    }

    emit<T> ({ name, payload } : EmitOptions<T>) {
        return this._socket?.emit(name, payload);
    }

    establishExistingEvents() {
        this._eventMap.forEach((subscription) => {
            this._socket?.on(
                subscription.event,
                subscription.eventHandler
            )
        });
        this._catchAllEvents.forEach(callback => {
            this._socket?.onAny(callback);
        })
    }

    private getNewId() {
        const id = this._idStore;
        this._idStore += 1;
        return id;
    }
}

export function GetSocketConnectionOption( socketInfo: SocketInfo) {
    const { proxy, enableMsgpackParser } = getAppConfig();
    
    const socketUri = buildServerUrl(socketInfo.namespace);
    const socketOption = {
        forceNew: true,
        transports: ["websocket"],
        path: `${proxy.path}/${socketInfo.path}/socket.io`,
        upgrade: false,
        parser: enableMsgpackParser ? MsgPackParser : undefined,
    };

    return { socketOption, socketUri };
}

type UnsubscribeOptions = {
    id?: number;
    name?: string;
    event?: (data: any) => void
}

type EmitOptions<T> = {
    name: string;
    payload?: T;
}

function getDefaultSocketOptions() {
    return GetSocketConnectionOption({
        namespace: "pusoy",
        path: "pusoy"
    });
}

const DEFAULT_SOCKET_OPTIONS = getDefaultSocketOptions();