import { AppState, Update, Character } from "./types";
import {
    UpdateType,
    Health,
    Hunger,
    Item,
    ScreenID,
    ChapterID,
} from "./constants";

export const INITIAL_STATE: AppState = {
    currentScreen: ScreenID.MainMenu,
    currentChapter: ChapterID.Dawn,
    currentPage: 0,
    character: null,
    health: Health.Unharmed,
    hunger: Hunger.Satiated,
    inventory: [],
    daysLived: 0,
    killCount: 0,
};

export function storeReducer(state: AppState, update: Update): AppState {
    switch (update.type) {
        case UpdateType.Screen:
            return { ...state, currentScreen: update.payload as ScreenID };
        case UpdateType.Page:
            return { ...state, currentPage: update.payload as number };
        case UpdateType.Chapter:
            return { ...state, currentChapter: update.payload as ChapterID };
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
                inventory: state.inventory.filter(
                    (item) => item !== (update.payload as Item)
                ),
            };
        case UpdateType.AddKill:
            return {
                ...state,
                killCount: state.killCount + 1,
            };
        case UpdateType.AddDaysLived:
            return {
                ...state,
                daysLived: state.daysLived + 1,
            };
        case UpdateType.ResetState:
            return INITIAL_STATE;
        default:
            return state;
    }
}
