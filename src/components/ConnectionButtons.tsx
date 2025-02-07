import { Button, Stack } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import CancelIcon from '@mui/icons-material/Cancel';


export type ConnectionButtonProps = {
    handleSocketSignIn: () => void;
    handleSocketDisconnect: () => void;
}

export function ConnectionButtons({ handleSocketSignIn, handleSocketDisconnect }: ConnectionButtonProps) {


    return( 
        <Stack direction="row" spacing={1} sx={{
            justifyContent: "space-between",
            paddingBottom: ".75rem"
        }}>
            <Button variant="contained" sx={{
                width: "100%"
            }}
            endIcon={<LoginIcon/>}
            onClick={handleSocketSignIn}
            color="primary">
                Sign In
            </Button>
            <Button variant="contained" sx={{
                width: "100%"
            }}
            onClick={handleSocketDisconnect}
            endIcon={<CancelIcon/>}
            color="warning">
                Disconnect
            </Button>
        </Stack>)
}