import { Subject } from "rxjs";

export interface GameEvent {
    name: string;
    payload: any;
}

export function createGameEventSubject() {
    const subject = new Subject<GameEvent>();
    return subject;
}
