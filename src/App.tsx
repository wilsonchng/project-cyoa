import { createContext, useReducer } from "react";
import "./root.css";

import { AppState, PageNumber, ScreenID, Store } from "./utils/types";
import storeReducer from "./utils/reducer";
import MainMenu from "./components/MainMenu";
import Achievements from "./components/Achievements";
import CharacterCreation from "./components/CharacterCreation";
import GameScreen from "./components/GameScreen";
import CharacterStats from "./components/CharacterStats";
import Credits from "./components/Credits";
import DeathScreen from "./components/Death";

export const StoreContext = createContext({} as Store);

const initialState: AppState = {
    activeScreen: ScreenID.MainMenu,
    currentPage: PageNumber.Start,
};

const App = () => {
    const [state, dispatch] = useReducer(storeReducer, initialState);

    const renderScreen = () => {
        switch (state.activeScreen) {
            case ScreenID.Achievements:
                return <Achievements />;
            case ScreenID.CharacterCreation:
                return <CharacterCreation />;
            case ScreenID.CharacterStats:
                return <CharacterStats />;
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

export default App;
