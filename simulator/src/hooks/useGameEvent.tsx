import { useEffect, useState } from "react";
import { GameCommunicationService } from "../services/game-communication-service";
import { useInjection } from "./useInjection";
import { GameEvent } from "../subjects/event";

export function useGameEvent() {
    const gameCommunicationService = useInjection<GameCommunicationService>(GameCommunicationService);
    const [ gameEvents, setGameEvents ] = useState<GameEvent[]>([]);

    useEffect(() => {
        gameCommunicationService
            .gameEventSubject
            .subscribe((value) => {
                setGameEvents((prev) => [value,...prev]);
            })
    }, [gameCommunicationService])

    return {
        gameEvents
    }
}