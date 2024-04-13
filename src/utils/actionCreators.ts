import { GameMode, Screen } from "./constants";
import { UpdateType } from "./store";
import { Playthrough, Store } from "./types";

export const changeScreen = (store: Store, screen: Screen) =>
  store.dispatch({ type: UpdateType.Screen, payload: screen });

export const newGame = (store: Store, playthrough: Playthrough) =>
  store.dispatch({ type: UpdateType.NewPlaythrough, payload: playthrough });

export const resetState = (store: Store) =>
  store.dispatch({ type: UpdateType.ResetState });

export const setGameMode = (store: Store, gameMode: GameMode) => {
  store.dispatch({ type: UpdateType.GameMode, payload: gameMode });
};
