import { AppState, Update } from "./types";
import { Screen } from "./constants";

export enum UpdateType {
  Screen,
  ResetState,
  NewPlaythrough,
  GameMode,
}

export const INITIAL_STATE = {
  currentScreen: Screen.MainMenu,
  lastScreen: Screen.MainMenu,
  playthrough: null,
};

export const storeReducer = (state: AppState, update: Update): AppState => {
  const newState = getNewState(state, update);
  console.log(JSON.stringify(newState)); // todo: improve logging
  return newState;
};

const getNewState = (state: AppState, update: Update): AppState => {
  switch (update.type) {
    case UpdateType.Screen:
      return {
        ...state,
        currentScreen: update.payload,
        lastScreen: state.currentScreen,
      };
    case UpdateType.GameMode:
      return {
        ...state,
        playthrough: {
          ...state.playthrough!,
          gameMode: update.payload,
        },
      };
    case UpdateType.NewPlaythrough:
      return {
        ...state,
        playthrough: update.payload,
      };
    case UpdateType.ResetState:
      return INITIAL_STATE;
    default:
      return state;
  }
};
