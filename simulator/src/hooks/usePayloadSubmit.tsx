import { useState } from "react";
import { GameCommunicationService } from "../services/game-communication-service";
import { useInjection } from "./useInjection";

export function usePayloadSubmit() {
    const gameCommunicationService = useInjection<GameCommunicationService>(GameCommunicationService);

    const [payload, setPayload] = useState<string>("");
    const [eventName, setEventName] = useState<string>("");

    function handleSubmit() {
        gameCommunicationService.emit(eventName, payload);
    }

    return { payload, setPayload, handleSubmit, eventName, setEventName };
}