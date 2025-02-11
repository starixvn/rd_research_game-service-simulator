import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Game } from "../hooks/useGameName";
import { GameNameSelectItem } from "./GameNameSelectItem";

export function GameNameSelect({
    gameList,
    currentGameIndex,
    setCurrentGameIndex,
    handleDeleteGameByIndex,
}: {
    gameList: Game[],
    currentGameIndex: number,
    setCurrentGameIndex: (index: number) => void,
    handleDeleteGameByIndex: (index: number) => void
}) {

    function handleChange(event: SelectChangeEvent<number>) {
        setCurrentGameIndex(event.target.value as number);
    }

    const gameListDisplay = gameList.map((game, index) => {
        return <MenuItem key={index} value={index}>
            <GameNameSelectItem game={game} deleteGame={() => handleDeleteGameByIndex(index)}/>
        </MenuItem>
            
    })

    const hasAnyGame = gameList.length > 0;

    return hasAnyGame ? <Select
        value={currentGameIndex}
        onChange={handleChange}
        size="small"
        fullWidth
        sx={{
            marginBottom: "1rem"
        }}
        renderValue={(value) => <MenuItem sx={{
            height: "1.5rem"
        }} key={value} value={value}>{gameList[value].name}</MenuItem>}
    >
        {gameListDisplay}
    </Select> : null;
}