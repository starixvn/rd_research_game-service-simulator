import { useState, useMemo } from "react";
import { GameCommunicationService } from "../services/game-communication-service";
import { useInjection } from "./useInjection";

export function usePayloadSubmit() {
    const gameCommunicationService = useInjection<GameCommunicationService>(GameCommunicationService);

    const [payload, setPayload] = useState<string>(`{
  "name": "Sample Event"
}`);
    const [eventName, setEventName] = useState<string>("");

    const isValidPayload = useMemo(() => {
        try {
            JSON.parse(payload);
            return true;
        } catch (e) {
            return false;
        }
    }, [payload]);

    function handlePayloadChange(value: string | undefined) {
        setPayload(value ?? "");
    }

    function handleSubmit() {
        if (!isValidPayload) {
            return;
        }
        gameCommunicationService.emit(eventName, JSON.parse(payload));
    }

    return { payload, handlePayloadChange, handleSubmit, eventName, setEventName, isValidPayload };
}