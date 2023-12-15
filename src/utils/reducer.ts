import { AppState, ScreenID, Update } from "./types";

function storeReducer(state: AppState, update: Update): AppState {
    switch (update.type) {
        case "screen":
            return { ...state, activeScreen: update.payload as ScreenID };
        default:
            return state;
    }
}

export default storeReducer;
