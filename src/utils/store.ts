import { AppState, Update } from "./types";
import { Screen } from "./constants";

export enum UpdateType {
  Screen,
  Page,
  ResetState,
  Player,
  Combat,
  Health,
  Stamina,
  Weapon,
  Metadata,
}

export const INITIAL_STATE = {
  currentScreen: Screen.MainMenu,
  lastScreen: Screen.MainMenu,
  player: null,
};

export const storeReducer = (state: AppState, update: Update): AppState => {
  const newState = getNewState(state, update);
  console.log(newState); // todo: improve logging
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
    case UpdateType.Page:
      return {
        ...state,
        player: {
          ...state.player!,
          page: update.payload,
        },
      };
    case UpdateType.Combat:
      return {
        ...state,
        player: {
          ...state.player!,
          combat: update.payload,
        },
      };
    case UpdateType.Weapon:
      return {
        ...state,
        player: {
          ...state.player!,
          weapon: update.payload,
        },
      };
    case UpdateType.Health:
      return {
        ...state,
        player: {
          ...state.player!,
          health: update.payload,
        },
      };
    case UpdateType.Stamina:
      return {
        ...state,
        player: {
          ...state.player!,
          stamina: update.payload,
        },
      };
    case UpdateType.Player:
      return {
        ...state,
        player: update.payload,
      };
    case UpdateType.Metadata:
      return {
        ...state,
        player: {
          ...state.player!,
          metaData: update.payload,
        },
      };
    case UpdateType.ResetState:
      return INITIAL_STATE;
    default:
      return state;
  }
};
