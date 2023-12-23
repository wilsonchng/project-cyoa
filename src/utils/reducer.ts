import {
    AppState,
    Character,
    Health,
    Item,
    PageNumber,
    ScreenID,
    Update,
    UpdateType,
} from "./types";

function storeReducer(state: AppState, update: Update): AppState {
    switch (update.type) {
        case UpdateType.Screen:
            return { ...state, screen: update.payload as ScreenID };
        case UpdateType.Page:
            return { ...state, page: update.payload as PageNumber };
        case UpdateType.Character:
            return {
                ...state,
                character: update.payload as Character,
            };
        case UpdateType.Health:
            return {
                ...state,
                status: {
                    ...state.status,
                    health: update.payload as Health,
                },
            };
        case UpdateType.AddItem:
            return {
                ...state,
                status: {
                    ...state.status,
                    inventory: state.status.inventory.concat(
                        update.payload as Item
                    ),
                },
            };
        case UpdateType.RemoveItem:
            return {
                ...state,
                status: {
                    ...state.status,
                    inventory: state.status.inventory.filter(
                        (item) => item !== (update.payload as Item)
                    ),
                },
            };
        default:
            return state;
    }
}

export default storeReducer;
