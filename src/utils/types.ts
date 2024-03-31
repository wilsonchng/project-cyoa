import { Dispatch } from "react";
import { UpdateType } from "./store";
import { Chapter, Hunger, ItemType, Occupation, Screen } from "./constants";

export interface Store {
  state: AppState;
  dispatch: Dispatch<Update>;
}

export interface Update {
  type: UpdateType;
  payload?: any;
}

export interface Playthrough {
  name: string;
  occupation: Occupation;
  chapter: Chapter;
  health: number;
  hunger: Hunger;
  weapon: Item | null;
  inventory: Item[];
  killCount: number;
  daysLived: number;
}

export interface AppState {
  currentScreen: Screen;
  lastScreen: Screen;
  playthrough: Playthrough | null;
}

export interface Item {
  id: string;
  type: ItemType;
}
