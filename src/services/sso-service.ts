import { UserServiceClientSingleton } from "./user-service";

const authService = 
    UserServiceClientSingleton
    .getUserClientInstance()?.auth;

export async function sso(token: string, appType: number) {
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