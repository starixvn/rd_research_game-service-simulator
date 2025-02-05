import { IUserServiceClient } from "sc-user-service-client";
import { getAppConfig } from "../configs";
import { buildUrlWithPath } from "../helpers/url-helper";

let UserServiceClient: UserServiceConstructor;

if (typeof window !== "undefined") {
    const { default: UserServiceClientModule } = require("sc-user-service-client");
    UserServiceClient = UserServiceClientModule;
}

export class UserServiceClientSingleton {
    private static instance: IUserServiceClient | null = null;

    public static getUserClientInstance(): IUserServiceClient | null {
        if (!this.instance) {
            this.instance = typeof window !== "undefined"
                ? new UserServiceClient(getUserServiceUrl())
                : null;
        }
        return this.instance;
    }
}

function getUserServiceUrl(): string {
    const { proxy } = getAppConfig();
    const basePath = proxy.path || "";
    const path = `${basePath}/user`;
    return buildUrlWithPath(path);
}

interface UserServiceConstructor {
    new(url: string): IUserServiceClient
}