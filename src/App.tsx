import { createContext, useReducer } from "react";
import {
    Achievements,
    CharacterCreation,
    Credits,
    GameScreen,
    DeathScreen,
    MainMenu,
    ChapterSummary,
    CharacterSummary,
} from "./components";
import { ScreenID } from "./utils/constants";
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
            case ScreenID.Achievements:
                return <Achievements />;
            case ScreenID.CharacterCreation:
                return <CharacterCreation />;
            case ScreenID.CharacterSummary:
                return <CharacterSummary />;
            case ScreenID.Summary:
                return <ChapterSummary />;
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
            <div className="root">
                <Header />
                <div className="app">{renderScreen()}</div>
            </div>
        </StoreContext.Provider>
    );
};

export default App;
