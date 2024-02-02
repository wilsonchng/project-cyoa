import { createContext, useReducer } from "react";
import "./root.css";

import {
    AppState,
    ChapterID,
    Health,
    PageNumber,
    ScreenID,
    Store,
} from "./utils/types";
import storeReducer from "./utils/reducer";
import MainMenu from "./components/MainMenu";
import Achievements from "./components/Achievements";
import CharacterCreation from "./components/character/CharacterCreation";
import GameScreen from "./components/GameScreen";
import Credits from "./components/Credits";
import DeathScreen from "./components/Death";

export const StoreContext = createContext({} as Store);

const App = () => {
    const [state, dispatch] = useReducer(storeReducer, INITIAL_STATE);

    const renderScreen = () => {
        switch (state.screen) {
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
    screen: ScreenID.MainMenu,
    chapter: ChapterID.DayOne,
    page: PageNumber.Start,
    character: null,
    status: {
        health: Health.Unharmed,
        inventory: [],
    },
};

export default App;
