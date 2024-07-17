export type Book = {
    id: string,
    title: string,
    author: string,
    published: string,
    genre: string,
    updated: string
}

export type AppState = {
    initialized: boolean,
    books: Book[],
    deleteModalOpen: boolean,
    bookToDelete: Book | null,
    sortedBy: string,
    statusMessage: string,
    statusSnackbarShown: boolean
}

export type AppAction = {
    type: string,
    value: object | string | number | boolean,
}

export type AppDispatch = React.Dispatch<AppAction>;