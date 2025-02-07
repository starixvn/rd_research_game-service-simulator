import { Box, Typography, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { Game } from "../hooks/useGameName";
import React from "react";

export type GameNameSelectItemProps = {
    game: Game,
    deleteGame: () => void;
}


export function GameNameSelectItem({ game, deleteGame }: GameNameSelectItemProps) {
    function handleGameDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        deleteGame();
    }

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
            <IconButton onClick={handleGameDelete}>
                <DeleteIcon color="error"/>
            </IconButton>
        </Box>
    </>
}