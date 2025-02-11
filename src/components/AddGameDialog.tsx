import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Game } from "../hooks/useGameName";

export type AddGameDialogProps = {
    open: boolean,
    handleAddGame: (game: Game) => Promise<void>;
    handleCloseDialog: () => void;
}

export type AddGameFormData = {
  name?: string;
  path?: string;
  namespace?: string;
}

export default function AddGameDialog({open, handleAddGame, handleCloseDialog}: AddGameDialogProps) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const game = Object.fromEntries(formData) as AddGameFormData;
    const name = game.name ?? "undefined";
    const path = game.path ?? game.namespace ?? game.name?.toString().toLowerCase() ?? "undefined";
    const namespace = game.namespace ?? game.path ?? game.name?.toString().toLowerCase() ?? "undefined";
    await handleAddGame({
      name,
      namespace,
      path
    });
    handleCloseDialog();
  }
  

  return (
    <React.Fragment>
      <Dialog
        open={open}
      >
        <form onSubmit={handleSubmit}>
            <DialogTitle>Add New Game</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Game name"
                type="text"
                fullWidth
                variant="outlined"
            />
            <TextField
                autoFocus
                margin="dense"
                id="path"
                name="path"
                label="Socket path"
                type="text"
                fullWidth
                variant="outlined"
            />
            <TextField
                autoFocus
                margin="dense"
                id="namespace"
                name="namespace"
                label="Socket Namespace"
                type="text"
                fullWidth
                variant="outlined"
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit">Confirm</Button>
            </DialogActions>
        </form>  
      </Dialog>
    </React.Fragment>
  );
}
