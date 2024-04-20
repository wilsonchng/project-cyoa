import { Dispatch } from "react";
import { UpdateType } from "./store";
import {
  Chapter,
  Page as Page,
  Hobby,
  Hunger,
  ItemType,
  Occupation,
  Screen,
  Sex,
} from "./constants";
import { Enemy } from "./enemy";
import { Skills } from "./skills";

export interface Store {
  state: AppState;
  dispatch: Dispatch<Update>;
}

export interface Update {
  type: UpdateType;
  payload?: any;
}

export interface AppState {
  currentScreen: Screen;
  lastScreen: Screen;
  player: Player | null;
}

export interface Player {
  name: string;
  sex: Sex;
  occupation: Occupation;
  hobby: Hobby;
  skills: Skills;
  chapter: Chapter;
  page: Page;
  combat: Combat | null;
  currHealth: number;
  maxHealth: number;
  hunger: Hunger;
  inventory: Item[];
  killCount: number;
  daysLived: number;
}

export interface Combat {
  text: string;
  playersTurn: boolean;
  enemy: Enemy;
  noFlee?: boolean;
}

export interface AppState {
  currentScreen: Screen;
  lastScreen: Screen;
  player: Player | null;
}

export interface Item {
  id: string;
  name: string;
  type: ItemType;
}
