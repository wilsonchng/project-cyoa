import { Dispatch } from "react";
import { Character } from "./components/character";
import { Damage, Hunger } from "./constants";

export interface Store {
    state: AppState;
    dispatch: Dispatch<Update>;
}

export interface Update {
    type: UpdateType;
    payload: any;
}

export enum UpdateType {
    Screen,
    Page,
    Chapter,
    Character,
    Health,
    AddItem,
    RemoveItem,
}

export interface AppState {
    currentScreen: number;
    currentChapter: string;
    currentPage: number;
    character: Character | null;
    status: {
        health: Damage;
        hunger: Hunger;
    };
    killCount: number;
    daysLived: number;
}

export function storeReducer(state: AppState, update: Update): AppState {
    switch (update.type) {
        case UpdateType.Screen:
            return { ...state, currentScreen: update.payload as number };
        case UpdateType.Page:
            return { ...state, currentPage: update.payload as number };
        case UpdateType.Chapter:
            return { ...state, currentChapter: update.payload as string };
        case UpdateType.Character:
            return {
                ...state,
                character: update.payload as Character,
            };
        case UpdateType.Health:
            return {
                ...state,
                status: {
                    ...state.status,
                    health: update.payload as Damage,
                },
            };
        // case UpdateType.AddItem:
        //     return {
        //         ...state,
        //         status: {
        //             ...state.status,
        //             inventory: state.status.inventory.concat(
        //                 update.payload as Item
        //             ),
        //         },
        //     };
        // case UpdateType.RemoveItem:
        //     return {
        //         ...state,
        //         status: {
        //             ...state.status,
        //             inventory: state.status.inventory.filter(
        //                 (item) => item !== (update.payload as Item)
        //             ),
        //         },
        //     };
        default:
            return state;
    }
}
