import { useEffect } from "react";
import { GameCommunicationService } from "../services/game-communication-service";
import { useInjection } from "./useInjection";
import { enqueueSnackbar } from "notistack";

export function useErrorEvent() {

    const gameCommunicationService = useInjection<GameCommunicationService>(GameCommunicationService);

    useEffect(() => {
        const subscription = 
            gameCommunicationService
            .errorEventSubject
            .subscribe(value => {
                enqueueSnackbar({
                    message: `${value.error}: ${JSON.stringify(value.payload, null, 2)}`,
                    variant: "error",
                    autoHideDuration: 2000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    }
                })
            });
        return () => {
            subscription.unsubscribe();
        }
    }, [gameCommunicationService]);
}