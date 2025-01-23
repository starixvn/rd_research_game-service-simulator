import { useState } from "react";

const gameList = [
    {
        name: "Pusoy",
    },
    {
        name: "MarbleFootball",
    }
]

export type Game = typeof gameList[number];

export function useGameName() {

    const [ currentGameIndex, setCurrentGameIndex ] = useState<number>(0);

    return {
        gameList,
        currentGame: gameList[currentGameIndex],
        currentGameIndex,
        setCurrentGameIndex
    }
}