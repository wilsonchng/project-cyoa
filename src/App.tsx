import { createContext, useReducer } from "react";
import { Screen } from "./utils/constants";
import { INITIAL_STATE, storeReducer } from "./utils/store";
import { Store } from "./utils/types";
import { Footer, Header } from "./components/common";
import {
  MainMenu,
  Achievements,
  CharacterCreation,
  Credits,
  CharacterSheet,
  Summary,
  Death,
  Game,
} from "./components/screens";
import "./root.css";

export const StoreContext = createContext({} as Store);

export const GAME_NAME = "KNOX OUTBREAK";

const App = () => {
  const [state, dispatch] = useReducer(storeReducer, INITIAL_STATE);

  const renderScreen = () => {
    window.scrollTo(0, 0);
    switch (state.currentScreen) {
      case Screen.MainMenu:
      default:
        return <MainMenu />;
      case Screen.Achievements:
        return <Achievements />;
      case Screen.Creation:
        return <CharacterCreation />;
      case Screen.Character:
        return <CharacterSheet />;
      case Screen.Summary:
        return <Summary />;
      case Screen.Credits:
        return <Credits />;
      case Screen.Game:
        return <Game />;
      case Screen.Death:
        return <Death />;
    }
  };

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <div className="root">
        <Header />
        <div className="app">{renderScreen()}</div>
        <Footer />
      </div>
    </StoreContext.Provider>
  );
};

export default App;
