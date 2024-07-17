    import {
    createBrowserRouter,
    RouterProvider,
    } from "react-router-dom";
    import { Home } from "./routes/Home";
    import { useEffect } from "react";
    import axios, { AxiosResponse } from "axios";
    import { ActionType, useAppDispatch } from "./AppProvider";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "*",
        element: <Home/>,
    },
]);

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response: AxiosResponse = await axios.get('/api/books');
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
        </>
    );
}
