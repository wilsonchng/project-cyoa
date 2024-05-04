import { Dispatch } from "react";
import { UpdateType } from "./store";
import {
  Chapter,
  Page,
  Hobby,
  Hunger,
  Occupation,
  Screen,
  Sex,
  PlayerStatus,
} from "./constants";
import { Enemy } from "./enemy";
import { Skills } from "./skills";
import { Item } from "./items";

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
  health: number;
  maxHealth: number;
  stamina: number;
  maxStamina: number;
  hunger: Hunger;
  status: PlayerStatus[];
  weapon: Item;
  inventory: Item[];
  killCount: number;
  daysLived: number;
  metaData: any;
}

export interface Combat {
  enemy: Enemy;
  playersTurn: boolean;
  combatLog: CombatLog[];
  noFlee?: boolean;
  tutorial?: boolean;
}

export interface CombatLog {
  text: string;
  color: "white" | "yellow" | "lawngreen" | "red";
}

export interface AppState {
  currentScreen: Screen;
  lastScreen: Screen;
  player: Player | null;
}
