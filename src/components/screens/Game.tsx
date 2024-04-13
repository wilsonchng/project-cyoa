import { useContext } from "react";
import { StoreContext } from "../../App";
import { GameMode } from "../../utils/constants";
import { Dawn, Prologue } from "./game/";

const Game = () => {
  const store = useContext(StoreContext);
  const playthrough = store.state.playthrough!;

  const renderGame = () => {
    switch (playthrough.gameMode) {
      case GameMode.Dawn:
        return <Dawn />;
      case GameMode.Prologue:
      default:
        return <Prologue />;
    }
  };

  return <>{renderGame()}</>;
};

export default Game;
