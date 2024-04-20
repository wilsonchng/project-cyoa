import { Page, Screen } from "./constants";
import { UpdateType } from "./store";
import { Combat, Player, Store } from "./types";

export const changeScreen = (store: Store, screen: Screen) =>
  store.dispatch({ type: UpdateType.Screen, payload: screen });

export const newGame = (store: Store, player: Player) =>
  store.dispatch({ type: UpdateType.NewGame, payload: player });

export const resetState = (store: Store) =>
  store.dispatch({ type: UpdateType.ResetState });

export const changePage = (store: Store, page: Page) => {
  store.dispatch({ type: UpdateType.Page, payload: page });
};

export const setCombat = (store: Store, combat: Combat) => {
  store.dispatch({ type: UpdateType.Combat, payload: combat });
};
