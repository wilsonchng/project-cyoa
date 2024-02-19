import { AppState, Update, Character } from "./types";
import { UpdateType, Health, Hunger, Item } from "./constants";

export function storeReducer(state: AppState, update: Update): AppState {
    switch (update.type) {
        case UpdateType.Screen:
            return { ...state, currentScreen: update.payload as number };
        case UpdateType.Page:
            return { ...state, currentPage: update.payload as number };
        case UpdateType.Chapter:
            return { ...state, currentChapter: update.payload as string };
        case UpdateType.Character:
            return {
                ...state,
                character: update.payload as Character,
            };
        case UpdateType.Health:
            return {
                ...state,
                health: update.payload as Health,
            };
        case UpdateType.Hunger:
            return {
                ...state,
                hunger: update.payload as Hunger,
            };
        case UpdateType.AddItem:
            return {
                ...state,
                inventory: state.inventory.concat(update.payload as Item),
            };
        case UpdateType.RemoveItem:
            return {
                ...state,
                ...state,
                inventory: state.inventory.filter(
                    (item) => item !== (update.payload as Item)
                ),
            };
        default:
            return state;
    }
}
export { UpdateType };
