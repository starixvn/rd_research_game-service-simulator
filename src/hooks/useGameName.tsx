import { useState } from "react";
import { useGames } from "./useGames";


export type Game = {
    name: string;
    path: string;
    namespace: string;
}

export function useGameName() {

    const [ currentGameIndex, setCurrentGameIndex ] = useState<number>(0);
    const { gameList, handleAddGame, handleDeleteGame } = useGames();
    return {
        gameList,
        currentGame: gameList[currentGameIndex],
        currentGameIndex,
        setCurrentGameIndex,
        handleAddGame,
        handleDeleteGame
    }
}