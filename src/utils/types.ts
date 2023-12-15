import { Dispatch } from "react";

export interface Store {
    state: AppState;
    dispatch: Dispatch<Update>;
}

export interface AppState {
    activeScreen: ScreenID;
    currentPage: PageNumber;
}

export interface Update {
    type: "screen" | "page";
    payload: ScreenID | PageNumber;
}

export enum ScreenID {
    MainMenu = 1,
    Achievements,
    Credits,
    Game,
    CharacterCreation,
    CharacterStats,
    Death,
}

export enum PageNumber {
    Start = 1,
}
