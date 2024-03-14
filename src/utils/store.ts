import { AppState, Update, Character } from "./types";
import { UpdateType, Hunger, Item, Screen, Chapter } from "./constants";

export const INITIAL_STATE: AppState = {
  currentScreen: Screen.MainMenu,
  lastScreen: Screen.MainMenu,
  currentChapter: Chapter.FireStation,
  currentPage: 0,
  character: null,
  health: 100,
  hunger: Hunger.Satiated,
  inventory: [],
  daysLived: 0,
  killCount: 0,
};

export function storeReducer(state: AppState, update: Update): AppState {
  switch (update.type) {
    case UpdateType.Screen:
      return {
        ...state,
        currentScreen: update.payload as Screen,
        lastScreen: state.currentScreen,
      };
    case UpdateType.Page:
      return { ...state, currentPage: update.payload as number };
    case UpdateType.NextChapter:
      return { ...state, currentChapter: state.currentChapter++ };
    case UpdateType.Character:
      return {
        ...state,
        character: update.payload as Character,
      };
    case UpdateType.TakeDamage:
      return {
        ...state,
        health: state.health - (update.payload as number),
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
          (item) => item !== (update.payload as Item),
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
