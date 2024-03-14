import { Dispatch } from "react";
import {
  Chapter,
  Health,
  Hobby,
  Hunger,
  Item,
  Occupation,
  Screen,
  UpdateType,
} from "./constants";

export interface Store {
  state: AppState;
  dispatch: Dispatch<Update>;
}

export interface Update {
  type: UpdateType;
  payload?: number | string | Character | Health | Hunger | Item;
}

export interface Character {
  name: string;
  occupation: Occupation | null;
  hobby: Hobby | null;
  ability: AbilityScore;
}

export interface AbilityScore {
  Strength: number;
  Fitness: number;
  Firearms: number;
  Medicine: number;
  Stealth: number;
  Survival: number;
}

export interface AppState {
  currentScreen: Screen;
  lastScreen: Screen;
  currentChapter: Chapter;
  currentPage: number;
  character: Character | null;
  health: number;
  hunger: Hunger;
  inventory: Item[];
  killCount: number;
  daysLived: number;
}
