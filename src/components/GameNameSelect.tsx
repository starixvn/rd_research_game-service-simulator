import { Box, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { Game } from "../hooks/useGameName";
import DeleteIcon from '@mui/icons-material/Delete';
import { GameNameSelectItem } from "./GameNameSelectItem";

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
        return <MenuItem key={index} value={index}>
            <GameNameSelectItem game={game}/>
        </MenuItem>
            

            
        // return <MenuItem key={index} value={index}>
        //     <Box sx={{
        //         display: "flex",
        //         flexDirection: "row",
        //         alignItems: "center",
        //         justifyContent: "space-between",
        //         width: "100%",
        //         height: "1.5rem"
        //     }}>
        //         <Typography>{game.name}</Typography>
        //         <IconButton>
        //             <DeleteIcon/>
        //         </IconButton>
        //     </Box>
        // </MenuItem>
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
    >
        {gameListDisplay}
    </Select> : null;
}