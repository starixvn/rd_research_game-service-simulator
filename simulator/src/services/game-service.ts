import { getAppConfig } from "../configs";
import { buildUrlWithPath } from "../helpers/url-helper";
import axios, { AxiosInstance } from "../lib/axios";

export type GameConfig = {
    id: string;
    name: string;
    key: string;
}

export class GameServiceClient {
    private _axios: AxiosInstance;

    constructor (gameServiceUrl: string) {
        this._axios = axios.create({
            baseURL: gameServiceUrl
        });
    }

    async getGameConfiguration() {
        const response = await this._axios.get<GameConfig[]>(`/configuration`);
        return response.data;
    }
}

export class GameServiceClientSingleton {
    private static instance: GameServiceClient | null = null;

    public static getGameClientInstance(): GameServiceClient | null {
        if (!this.instance) {
            this.instance = new GameServiceClient(getGameServiceUrl());
        }
        return this.instance;
    }
}   

function getGameServiceUrl(): string {
    const { proxy } = getAppConfig();
    const basePath = proxy.path || "";
    const path = `${basePath}/game`;
    return buildUrlWithPath(path);
}
