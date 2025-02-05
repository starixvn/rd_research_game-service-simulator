import { Subject } from "rxjs";

export enum SocketState {
    Connected,
    Disconnected
}

export function createSocketStateSubject() {
    return new Subject<SocketState>();
}
