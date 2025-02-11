import { SSOResponse } from "sc-user-service-client/dist/auth";
import { UserServiceClientSingleton } from "./user-service";

const storageService = window.localStorage;

const AUTH_CACHE_KEY = "auth-data"

const authService = 
    UserServiceClientSingleton
    .getUserClientInstance()?.auth;

export async function sso(token: string, appType: number) {
    const userSession = await authService?.sso(
        token,
        appType
    );

    if (userSession?.isAuthenticated) {
        storageService.setItem(
            AUTH_CACHE_KEY,
            JSON.stringify(userSession)
        )
    }

    return userSession;
}

export function getAvailableSession() {
    const cachedUserSessionString = storageService.getItem(AUTH_CACHE_KEY)
    if (!cachedUserSessionString) return null;
    const cachedUserSession = JSON.parse(cachedUserSessionString) as SSOResponse;
    if (!cachedUserSession.ss || !cachedUserSession.username) return null;
    return cachedUserSession;
}

export async function reCheckin(session: SSOResponse) {
    const reCheckinResult = await authService?.reCheckIn(
        session.ss,
        session.username
    );

    return reCheckinResult;
}

export async function authorize(session: SSOResponse) {
    const authorizeResponse = await authService?.authorize(
        session.ss,
        session.username
    );

    return authorizeResponse;
}

export function signOut() {
    storageService.removeItem(AUTH_CACHE_KEY);
}

export async function signName(session: SSOResponse, nickname: string) {
    const signNameResponse = await authService?.signName(session.ss, session.username, nickname);

    return signNameResponse;
}
