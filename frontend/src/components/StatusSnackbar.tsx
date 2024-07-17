import { IconButton, Slide, Snackbar } from "@mui/material";
import { ActionType, useAppDispatch, useAppState } from "../AppProvider";
import { Close } from "@mui/icons-material";

export const StatusSnackbar = () => {
    const {statusMessage, statusSnackbarShown} = useAppState();
    const dispatch = useAppDispatch();

    const handleClose = () =>  dispatch({
        type:ActionType.SET_STATUS_SHOWN,
        value: false
    });

    return (
        <Snackbar
            open={statusSnackbarShown}
            autoHideDuration={6000}
            TransitionComponent={Slide}
            onClose={handleClose}
            message={statusMessage}
            action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <Close fontSize="small" />
                </IconButton>
            }
        />
    )
}