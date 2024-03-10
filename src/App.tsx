import { createContext, useReducer } from "react";
import {
    Achievements,
    CharacterCreation,
    Credits,
    GameScreen,
    DeathScreen,
    MainMenu,
    ChapterSummary,
    CharacterScreen,
} from "./components";
import { Screen } from "./utils/constants";
import { INITIAL_STATE, storeReducer } from "./utils/store";
import { Store } from "./utils/types";
import { Header } from "./components/common";

import "./root.css";

export const StoreContext = createContext({} as Store);

export const GAME_NAME = "KNOX OUTBREAK";

const App = () => {
    const [state, dispatch] = useReducer(storeReducer, INITIAL_STATE);

    const renderScreen = () => {
        window.scrollTo(0, 0);
        switch (state.currentScreen) {
            case Screen.Achievements:
                return <Achievements />;
            case Screen.Creation:
                return <CharacterCreation />;
            case Screen.Character:
                return <CharacterScreen />;
            case Screen.Summary:
                return <ChapterSummary />;
            case Screen.Credits:
                return <Credits />;
            case Screen.Game:
                return <GameScreen />;
            case Screen.Death:
                return <DeathScreen />;
            case Screen.MainMenu:
            default:
                return <MainMenu />;
        }
    };

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            <div className="root">
                <Header />
                <div className="app">{renderScreen()}</div>
            </div>
        </StoreContext.Provider>
    );
};

export default App;
