import { GameServiceClientSingleton } from "./game-service";

export async function getGames() {
    const gameServiceClient = GameServiceClientSingleton.getGameClientInstance();
    const gameConfiguration = await gameServiceClient?.getGameConfiguration();
    return gameConfiguration;
}