import { useContext } from "react";
import { StoreContext } from "../../App";
import { Page } from "../../utils/constants";
import { Battle, Dawn, Prologue, Tutorial } from "./game/";

const Game = () => {
  const store = useContext(StoreContext);
  const player = store.state.player!;

  const renderGame = () => {
    switch (player.page) {
      case Page.Battle:
        return <Battle />;
      case Page.Tutorial:
        return <Tutorial />;
      case Page.Dawn:
        return <Dawn />;
      case Page.Prologue:
      default:
        return <Prologue />;
    }
  };

  return <>{renderGame()}</>;
};

export default Game;
