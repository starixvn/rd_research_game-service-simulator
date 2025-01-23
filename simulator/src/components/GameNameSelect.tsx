import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Game } from "../hooks/useGameName";

export function GameNameSelect({
    gameList,
    currentGameIndex,
    setCurrentGameIndex
}: {
    gameList: Game[],
    currentGameIndex: number,
    setCurrentGameIndex: (index: number) => void
}) {

    function handleChange(event: SelectChangeEvent<number>) {
        setCurrentGameIndex(event.target.value as number);
    }

    const gameListDisplay = gameList.map((game, index) => {
        return <MenuItem key={index} value={index}>{game.name}</MenuItem>
    })

    return <Select
        value={currentGameIndex}
        onChange={handleChange}
        size="small"
        fullWidth
        sx={{
            marginBottom: "1rem"
        }}
    >
        {gameListDisplay}
    </Select>
}