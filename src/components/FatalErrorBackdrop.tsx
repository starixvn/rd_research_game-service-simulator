import { Alert, AlertTitle, Backdrop } from "@mui/material";
import { useContext } from "react";
import { FatalErrorContext } from "../contexts/fatal-error-context";

export function FatalErrorBackdrop() {

    const { error } = useContext(FatalErrorContext);

    return <Backdrop open={error !== null}>
        <Alert severity="error">
            <AlertTitle>
                {error?.title}
            </AlertTitle>
            {error?.detail}
        </Alert>
    </Backdrop>
}