import { useState } from "react";

const gameList = [
    {
        name: "Pusoy",
        namespace: "pusoy",
        path: "pusoy"
    },
    {
        name: "MarbleFootball",
        namespace: "marblefootball",
        path: "marblefootball"
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