import { Page, Screen } from "./constants";
import { Item } from "./items";
import { UpdateType } from "./store";
import { Combat, Player, Store } from "./types";

export const changeScreen = (store: Store, screen: Screen) =>
  store.dispatch({ type: UpdateType.Screen, payload: screen });

export const setPlayer = (store: Store, player: Player) =>
  store.dispatch({ type: UpdateType.Player, payload: player });

export const resetState = (store: Store) =>
  store.dispatch({ type: UpdateType.ResetState });

export const changePage = (store: Store, page: Page) => {
  store.dispatch({ type: UpdateType.Page, payload: page });
};

export const setCombat = (store: Store, combat: Combat) => {
  store.dispatch({ type: UpdateType.Combat, payload: combat });
};

export const setWeapon = (store: Store, weapon: Item) => {
  store.dispatch({ type: UpdateType.Weapon, payload: weapon });
};

export const setHealth = (store: Store, health: number) => {
  store.dispatch({ type: UpdateType.Health, payload: health });
};

export const setStamina = (store: Store, stamina: number) => {
  store.dispatch({ type: UpdateType.Stamina, payload: stamina });
};

export const setMetaData = (store: Store, metaData: any) => {
  store.dispatch({ type: UpdateType.Metadata, payload: metaData });
};
