import { useContext } from "react";
import { StoreContext } from "../App";
import { Home, PoliceStation } from "./story";
import { Chapter } from "../utils/constants";

const GameScreen = () => {
  const store = useContext(StoreContext);

  const renderPage = () => {
    switch (store.state.currentChapter) {
      case Chapter.Home:
      default:
        return <Home />;
      case Chapter.PoliceStation:
        return <PoliceStation />;
    }
  };

  return <>{renderPage()}</>;
};

export default GameScreen;
