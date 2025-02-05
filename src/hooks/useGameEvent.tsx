import { useEffect, useState } from "react";
import { GameCommunicationService } from "../services/game-communication-service";
import { useInjection } from "./useInjection";
import { GameEvent } from "../subjects/event";
import { Subscription } from "rxjs";

export function useGameEvent() {
    const gameCommunicationService = useInjection<GameCommunicationService>(GameCommunicationService);
    const [ gameEvents, setGameEvents ] = useState<GameEvent[]>([]);
    let subscription: Subscription;

    function flushGameEvents() {
        setGameEvents([]);
        subscription?.unsubscribe();
    }

    useEffect(() => {
        subscription = gameCommunicationService
            .gameEventSubject
            .subscribe((value) => {
                setGameEvents((prev) => [value,...prev]);
            })
        return () => {
            subscription.unsubscribe();
        }
    }, [gameCommunicationService])

    return {
        gameEvents,
        flushGameEvents
    }
}