import { Subject } from "rxjs";

export interface ErrorMessage {
    error: string;
    payload: any;
}

export function createErrorMessageEventSubject() {
    return new Subject<ErrorMessage>()
}