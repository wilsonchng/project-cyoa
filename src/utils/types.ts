import { Dispatch } from "react";
import { UpdateType } from "./store";
import {
  Chapter,
  Hobby,
  Hunger,
  ItemType,
  Occupation,
  Screen,
  Sex,
} from "./constants";

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
  sex: Sex;
  occupation: Occupation;
  hobby: Hobby;
  skills: Skills;
  chapter: Chapter;
  health: number;
  hunger: Hunger;
  inventory: Item[];
  killCount: number;
  daysLived: number;
}

export interface Skills {
  Strength: number;
  Fitness: number;
  Stealth: number;
  Medicine: number;
  Firearms: number;
  Axes: number;
  Blades: number;
  Bludgeon: number;
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
