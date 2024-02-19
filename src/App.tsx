import { createContext, useReducer } from "react";
import {
    Achievements,
    CharacterCreation,
    Credits,
    GameScreen,
    DeathScreen,
    MainMenu,
} from "./components";

import "./root.css";
import { ScreenID, ChapterID, Health, Hunger } from "./utils/constants";
import { storeReducer } from "./utils/store";
import { Store, AppState } from "./utils/types";

export const StoreContext = createContext({} as Store);

const App = () => {
    const [state, dispatch] = useReducer(storeReducer, INITIAL_STATE);

    const renderScreen = () => {
        switch (state.currentScreen) {
            case ScreenID.Achievements:
                return <Achievements />;
            case ScreenID.CharacterCreation:
                return <CharacterCreation />;
            case ScreenID.Credits:
                return <Credits />;
            case ScreenID.Game:
                return <GameScreen />;
            case ScreenID.Death:
                return <DeathScreen />;
            case ScreenID.MainMenu:
            default:
                return <MainMenu />;
        }
    };

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            <div className="root">{renderScreen()}</div>
        </StoreContext.Provider>
    );
};

const INITIAL_STATE: AppState = {
    currentScreen: ScreenID.MainMenu,
    currentChapter: ChapterID.Home,
    currentPage: 0,
    character: null,
    health: Health.Unharmed,
    hunger: Hunger.Satiated,
    inventory: [],
    daysLived: 0,
    killCount: 0,
};

export default App;
