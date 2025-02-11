import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AuthContext } from '../contexts/auth-context';

export default function SignNameDialog() {
  const { isAuthorized, handleSignName } = React.useContext(AuthContext);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nickname = Object.fromEntries(formData)?.nickname;
    await handleSignName(nickname.toString());
  }

  return (
    <React.Fragment>
      <Dialog
        open={isAuthorized !== null && isAuthorized === false}
      >
        <form onSubmit={handleSubmit}>
            <DialogTitle>Enter Nickname</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please enter your nickname
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="nickname"
                name="nickname"
                label="nickname"
                type="text"
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button type="submit">Confirm</Button>
            </DialogActions>
        </form>  
      </Dialog>
    </React.Fragment>
  );
}
