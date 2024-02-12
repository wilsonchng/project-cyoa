import { createContext, useReducer } from "react";
import {
    Achievements,
    CharacterCreation,
    Credits,
    GameScreen,
    DeathScreen,
    MainMenu,
} from "./components";
import { Store, AppState, storeReducer } from "./store";
import { ChapterID, Damage, Hunger, ScreenID } from "./constants";

import "./root.css";

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
    status: {
        health: Damage.Unharmed,
        hunger: Hunger.Satiated,
    },
    daysLived: 0,
    killCount: 0,
};

export default App;
