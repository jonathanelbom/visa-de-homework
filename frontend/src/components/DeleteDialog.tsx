import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grow } from "@mui/material"
import { Book } from "./Book"
import { ActionType, useAppDispatch, useAppState } from "../AppProvider";
import axios from "axios";

export const DeleteDialog = () => {
    const {deleteModalOpen, bookToDelete} = useAppState();
    const dispatch = useAppDispatch();

    const handleDelete =  async () => {
        if (!bookToDelete) return;
        try {
            const response = await axios.delete(`/api/books/${bookToDelete.id}`, {});
            if (response.status === 204) {
                dispatch({
                    type: ActionType.DELETE_BOOK,
                    value: bookToDelete,
                });
            }            
        } catch(error) {
            console.error(`There was an error deleting book [id:${bookToDelete.id}]!`, error);
        }
    } 

    const handleClose = () => dispatch({
        type: ActionType.SET_MODEL_OPEN,
        value: false,
    });
    
    return (
        <Dialog onClose={handleClose} open={deleteModalOpen} TransitionComponent={Grow}>
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{marginBlockEnd: 2}}>
                    Are you sure you want to delete this book?
                </DialogContentText>
                {bookToDelete && <Book book={bookToDelete} />}
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}