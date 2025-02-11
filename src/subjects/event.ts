import { Subject } from "rxjs";

export enum GameEventType {
    SENT,
    RECEIVE,
    NONE
}

export interface GameEvent {
    name: string;
    payload: any;
    type?: GameEventType;
    timestamp: Date;
}

export function createGameEventSubject() {
    const subject = new Subject<GameEvent>();
    return subject;
}
