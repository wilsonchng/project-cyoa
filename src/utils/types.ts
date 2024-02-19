import { Dispatch } from "react";
import {
    Health,
    Hobby,
    Hunger,
    Item,
    Occupation,
    UpdateType,
} from "./constants";

export interface Store {
    state: AppState;
    dispatch: Dispatch<Update>;
}

export interface Update {
    type: UpdateType;
    payload: number | string | Character | Health | Hunger | Item;
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
    currentScreen: number;
    currentChapter: string;
    currentPage: number;
    character: Character | null;
    health: Health | null;
    hunger: Hunger | null;
    inventory: Item[];
    killCount: number;
    daysLived: number;
}
