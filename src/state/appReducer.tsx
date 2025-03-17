type AppState = {
    isSearchActive: boolean;
    searchQuery: string;
};

type Action =
    | { type: "SET_SEARCH_QUERY"; payload: string }
    | { type: "RESET_SEARCH" };

export const initialState: AppState = {
    isSearchActive: false,
    searchQuery: "",
};

export const appReducer = (state: AppState = initialState, action: Action): AppState => {
    switch (action.type) {
        case "SET_SEARCH_QUERY":
            return {
                ...state,
                isSearchActive: true,
                searchQuery: action.payload,
            };
        case "RESET_SEARCH":
            return initialState;
        default:
            return state;
    }
};