import React, {ReactNode} from "react";
import { AppAction, AppDispatch, AppState, Book } from "./types";

export const ActionType = {
    INIT_BOOKS: 'INIT_BOOKS',
    UPDATE_BOOK: 'UPDATE_BOOK',
    ADD_BOOK: 'ADD_BOOK',
}

const initialState: AppState = {
    initialized: false,
    books: [],
    deleteModalOpen: false,
    bookToDelete: null,
    sortedBy: 'title',
    statusSnackbarShown: false,
    statusMessage: ''
};

const AppStateContext = React.createContext<AppState>({
    ...initialState
});

const AppDispatchContext = React.createContext<AppDispatch>((action):AppAction => { return action});

type ReducerAction = {
    type: string,
    value: any; // eslint-disable-line
}

const appReducer = (state: Record<string, any>, action: ReducerAction) => { // eslint-disable-line
    const { type, value } = action;
    switch (type) {
         case ActionType.INIT_BOOKS:
            return {
                ...state,
                initialized: true,
                books: value,
            }
        case ActionType.UPDATE_BOOK:
            return {
                ...state,
                books: state.books.map((book:Book) => book.id === value.id ? value : book),
                 statusMessage: `Updated ${value.title}`,
                statusSnackbarShown: true,
            }
        case ActionType.ADD_BOOK:
            return {
                ...state,
                books: [value, ...state.books],
                statusMessage: `Added ${value.title}`,
                statusSnackbarShown: true,
            }
        default: {
            return { ...state };
        }
    }
};

const AppProvider = ({ children } : {children: ReactNode}) => {
    const [state, dispatch] = React.useReducer(appReducer, initialState);
    return (
        <AppDispatchContext.Provider value={dispatch}>
            <AppStateContext.Provider value={state as AppState}>{children}</AppStateContext.Provider>
        </AppDispatchContext.Provider>
    );
};

const useAppDispatch = () => {
    const context = React.useContext(AppDispatchContext);
    if (context === undefined) {
        throw new Error('AppDispatchContext must be used within a AppDispatchProvider');
    }
    return context;
};

const useAppState = () => {
    const context = React.useContext(AppStateContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within a AppStateContext');
    }
    return context;
};

export { AppDispatchContext, AppStateContext, AppProvider, useAppDispatch, useAppState };
