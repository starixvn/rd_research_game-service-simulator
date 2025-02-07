import { Box, Typography, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { Game } from "../hooks/useGameName";

export type GameNameSelectItemProps = {
    game: Game
}


export function GameNameSelectItem({ game }: GameNameSelectItemProps) {
    return <>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "1.5rem"
        }}>
            <Typography>{game.name}</Typography>
            <IconButton>
                <DeleteIcon/>
            </IconButton>
        </Box>
    </>
}