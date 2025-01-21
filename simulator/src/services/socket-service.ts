import { io, ManagerOptions, Socket, SocketOptions } from "../lib/socket.io-client";

export type EventSubscription<T> = {
    event: string;
    eventHandler: (data: T) => void;
}

export class SocketClientWrapper {
    private _uri: string;
    private _options: SocketOptions & ManagerOptions;
    private _socket: Socket | null;
    private _idStore: number;
    private _eventMap: Map<number, EventSubscription<any>> = new Map();

    constructor(uri: string, socketOptions: SocketOptions & ManagerOptions) {
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

    async connect(options?: SocketOptions & ManagerOptions) {
        if (this._socket?.connected) {
            this._socket?.disconnect();
            this._socket = null;
        }

        return new Promise<void>((resolve, reject) => {
            try {

                this._socket = io(
                    this._uri,
                    {
                        ...this._options,
                        autoConnect: false,
                        ...options
                    });
                

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
        })
    }

    private getNewId() {
        const id = this._idStore;
        this._idStore += 1;
        return id;
    }
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


    return {
        forceNew: true
    }
}