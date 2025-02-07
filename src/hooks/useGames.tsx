import { useEffect, useState } from "react";
import { Game } from "./useGameName";
import { addGame, deleteGame, getGames } from "../services/game-name-service";

export function useGames() {
    const [gameList, setGames] = useState<Game[]>([]);

    async function handleAddGame(game: Game) {
        await addGame(game);
        setGames([...gameList, game]);
    }

    async function handleDeleteGame(deleteIndex: number) {
        const newGames = gameList.filter((_, index) => index !== deleteIndex);
        await deleteGame(deleteIndex);
        setGames(newGames);
    }

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
        handleAddGame,
        handleDeleteGame
    }
}