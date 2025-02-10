import { SSOResponse } from "sc-user-service-client/dist/auth";
import { UserServiceClientSingleton } from "./user-service";

const authService = 
    UserServiceClientSingleton
    .getUserClientInstance()?.auth;

export async function sso(token: string, appType: number) {
    console.log("sso")
    const userSession = await authService?.sso(
        token,
        appType
    );

    if (userSession?.isAuthenticated) {
        window.localStorage.setItem(
            "auth-data",
            JSON.stringify(userSession)
        )
    }

    return userSession;
}

export async function authorize(session: SSOResponse) {
    const authorizeResponse = await authService?.authorize(
        session.ss,
        session.username
    );

    return authorizeResponse;
}

export async function signName(session: SSOResponse, nickname: string) {
    const signNameResponse = await authService?.signName(session.ss, session.username, nickname);

    return signNameResponse;
}
