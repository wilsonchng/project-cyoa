import { AppState, Playthrough, Update } from "./types";
import { Screen } from "./constants";

export enum UpdateType {
  Screen,
  ResetState,
  NewPlaythrough,
}

export const INITIAL_STATE = {
  currentScreen: Screen.MainMenu,
  lastScreen: Screen.MainMenu,
  playthrough: null,
};

export function storeReducer(state: AppState, update: Update): AppState {
  switch (update.type) {
    case UpdateType.Screen:
      return {
        ...state,
        currentScreen: update.payload as Screen,
        lastScreen: state.currentScreen,
      };
    case UpdateType.ResetState:
      return INITIAL_STATE;
    case UpdateType.NewPlaythrough:
      return {
        ...state,
        playthrough: update.payload as Playthrough,
      };
    default:
      return state;
  }
}
