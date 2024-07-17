    import {
    createBrowserRouter,
    RouterProvider,
    } from "react-router-dom";
    import { Home } from "./routes/Home";
    import { useEffect } from "react";
    import axios from "axios";
    import { ActionType, useAppDispatch } from "./AppProvider";
import { Add } from "./routes/Add";
import { Edit } from "./routes/Edit";
import { DeleteDialog } from "./components/DeleteDialog";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "*",
        element: <Home/>,
    },
    {
        path: "/books/add",
        element: <Add/>,
    },
    {
        path: "/books/:bookId",
        element: <Edit />,
    },
]);

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await axios.get('/api/books');
                 dispatch({
                    type: ActionType.INIT_BOOKS,
                    value: response.data
                })
            } catch (error) {
                console.error('There was an error adding the book!', error);
            }
        }
        getBooks();
    }, []);

    return (
        <>
            <RouterProvider router={router} />
            <DeleteDialog />
        </>
    );
}
