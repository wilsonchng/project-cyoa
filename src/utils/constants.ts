export enum UpdateType {
    Screen,
    Page,
    NextChapter,
    Character,
    TakeDamage,
    Hunger,
    AddItem,
    RemoveItem,
    AddKill,
    AddDaysLived,
    ResetState,
}

export enum Screen {
    MainMenu,
    Achievements,
    Credits,
    Game,
    Summary,
    Creation,
    Character,
    Death,
}

export enum Chapter {
    Dawn,
    PrisonBus,
}

export enum Occupation {
    Firefighter = "Firefighter",
    PoliceOfficer = "Police Officer",
    ParkRanger = "Park Ranger",
    Lumberjack = "Lumberjack",
    Doctor = "Doctor",
    Burglar = "Burglar", // to be locked until completion of game
    // future classes: nurse, veteran, unemployed
}

export enum Hobby {
    Runner = "Runner",
    Gymnast = "Gymnast",
    Baseball = "Baseball",
    Scout = "Former Scout",
    Marksman = "Marksman",
    Hiker = "Hiker",
    // future hobby: hunter
}

export enum Ability {
    Strength = "Strength",
    Fitness = "Fitness",
    Firearms = "Firearms",
    Stealth = "Stealth",
    Medicine = "Medicine",
    Survival = "Survival",
}

export enum Conditions {
    Bleeding = "Bleeding",
    Fever = "Fever",
    Fracture = "Fracture",
    Panic = "Panic",
    Drunk = "Drunk",
    Tired = "Tired",
    Exhausted = "Exhausted",
}

export enum Health {
    Unharmed = "Unharmed", // 100
    Slight = "Slight damage", // 80-99
    Minor = "Minor damage", // 60-79
    Moderate = "Moderate damage", // 40-59
    Severe = "Severe damage", // 20-39
    Critical = "Critical damage", // 1-19
    Dead = "Deceased", // 0
}

export enum Hunger {
    Stuffed = "Stuffed",
    Satiated = "Satiated",
    Hungry = "Hungry",
    VeryHungry = "Very Hungry",
    Starving = "Starving",
}

export enum Item {
    KitchenKnife = "Kitchen Knife",
    FryingPan = "Frying Pan",
    Broom = "Broom",
    Flashlight = "Flashlight",
    Wallet = "Wallet",
    Lunchbox = "Lunchbox",
    BaseballBat = "Baseball Bat",
    Lockpick = "Lockpick",
    WalkieTalkie = "Walkie Talkie",
    FirstAidKit = "First Aid Kit",
    HandAxe = "Hand Axe",
    FireAxe = "Fire Axe",
    M36Revolver = "M36 Revolver",
    M9Pistol = "M9 Pistol",
    HikingBag = "Hiking Bag",
}
