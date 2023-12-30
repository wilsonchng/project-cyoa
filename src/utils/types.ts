import { Dispatch } from "react";

export interface Store {
    state: AppState;
    dispatch: Dispatch<Update>;
}

export interface AppState {
    screen: ScreenID;
    page: PageNumber;
    character: Character | null;
    status: Status;
}

export interface Character {
    name: string;
    backstory: Backstory;
    hobby: Hobby;
}

export interface Status {
    health: Health;
    inventory: Item[];
}

export interface Update {
    type: UpdateType;
    payload: ScreenID | PageNumber | Character | Health | Item;
}

export enum UpdateType {
    Screen,
    Page,
    Character,
    Health,
    AddItem,
    RemoveItem,
}

export enum Health {
    Unharmed = "Unharmed",
    Minor = "Minor damage",
    Moderate = "Moderate damage",
    Severe = "Severe damage",
    Dead = "Deceased",
}

export enum Item {
    FishingRod = "Fishing Rod",
    BaseballBat = "Baseball Bat",
    KitchenKnife = "Kitchen Knife",
    HuntingKnife = "Hunting Knife",
    Tent = "Tent Kit",
    Campfire = "Campfire Kit",
    FirstAid = "First Aid Kit",
}

export enum Backstory {
    Firefighter = "Firefighter",
    PoliceOfficer = "Police Officer",
    Doctor = "Doctor",
    Burglar = "Burglar",
    Veteran = "Veteran",
    Unemployed = "Unemployed",
}

export enum Hobby {
    Runner = "Runner",
    Gymnast = "Gymnast",
    Baseball = "Baseball",
    Cooking = "Cooking",
    Fishing = "Fishing",
    Hiking = "Hiking",
}

export enum ScreenID {
    MainMenu,
    Achievements,
    Credits,
    Game,
    CharacterCreation,
    CharacterStats,
    Death,
}

export enum PageNumber {
    Start,
    FirstZombie,
}
