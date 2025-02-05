import { useEffect, useState } from "react";
import { Game } from "./useGameName";
import { getGames } from "../services/game-name-service";

export function useGames() {
    const [gameList, setGames] = useState<Game[]>([]);

    useEffect( () => {
        async function fetchGames() {
            const rawGames = await getGames();
            const newGameList = rawGames?.map((game) => {
                return {
                    name: game.name
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