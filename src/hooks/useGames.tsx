import { useEffect, useState } from "react";
import { Game } from "./useGameName";
import { getGames } from "../services/game-name-service";

export function useGames() {
    const [gameList, setGames] = useState<Game[]>([]);

    useEffect( () => {
        async function fetchGames() {
            const rawGames = await getGames();
            if (!rawGames) return;
            const newGameList = rawGames?.map((game) => {
                return {
                    name: game.name ?? "undefined",
                    path: game.path ?? game.namespace ?? game.name?.toLowerCase() ?? "undefined",
                    namespace: game.namespace ?? game.path ?? game.name?.toLowerCase() ?? "undefined"
                }
            }) ?? [];
            setGames(newGameList);
        }
        fetchGames();
    }, []);

    return {
        gameList,
    }
}