import { Dispatch } from "react";

export interface Store {
    state: AppState;
    dispatch: Dispatch<Update>;
}

export interface AppState {
    screen: ScreenID;
    chapter: ChapterID;
    page: PageNumber;
    character: Character | null;
    status: Status;
}

export interface Character {
    name: string;
    occupation: Occupation | null;
    hobby: Hobby | null;
    ability: AbilityScore;
}

export interface AbilityScore {
    Strength: number;
    Endurance: number;
    Firearms: number;
    Medicine: number;
    Stealth: number;
    Survival: number;
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
    BaseballBat = "Baseball Bat",
    KitchenKnife = "Kitchen Knife",
    HuntingKnife = "Hunting Knife",
    Tent = "Tent Kit",
    Campfire = "Campfire Kit",
    FirstAid = "First Aid Kit",
}

export enum Occupation {
    Firefighter = "Firefighter",
    PoliceOfficer = "Police Officer",
    ParkRanger = "Park Ranger",
    Construction = "Construction Worker",
    Doctor = "Doctor",
    Burglar = "Burglar",
    // Unemployed = "Unemployed" (future hardmode)
}

export enum Hobby {
    Runner = "Runner",
    Gymnast = "Gymnast",
    Baseball = "Baseball",
    Scout = "Former Scout",
    Hunting = "Hunting",
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

export enum ChapterID {
    DayOne = "Day One",
}

export enum PageNumber {
    Start,
    Encounter,
    FirstZombie,
    Bedroom,
    FirstWeapon,
}
