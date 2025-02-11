import { useEffect } from "react";
import { ReCheckInResponse, SSOResponse } from "sc-user-service-client/dist/auth";
import { reCheckin } from "../services/auth-service";

export type UseReCheckInProps = {
    session? : SSOResponse | null,
    handle?: (response?: ReCheckInResponse) => void;
}
const TICK_PER_SECOND = 1000;
const SECOND_PER_MINUTE = 60;
const CHECKIN_MINUTES = 1;
export const CHECKIN_INTERVAL = CHECKIN_MINUTES * SECOND_PER_MINUTE * TICK_PER_SECOND;

export function useReCheckIn({
    session,
    handle
}: UseReCheckInProps) {
    
    useEffect(() => {
        const timer = setInterval(async () => {
            if (!session) return;
            if (!handle) return;
            const reCheckinResult = await reCheckin(session);
            handle(reCheckinResult);
        }, CHECKIN_INTERVAL);

        return () => clearInterval(timer);

    },[handle, session]);
}