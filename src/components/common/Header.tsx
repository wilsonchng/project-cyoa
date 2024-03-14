import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faUserCircle,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { GAME_NAME, StoreContext } from "../../App";
import { Screen, UpdateType } from "../../utils/constants";

const Header = () => {
  const store = useContext(StoreContext);
  const [showStats, setShowStats] = useState<boolean>(false);

  const mySound = require("../../assets/sounds/page-turn-sound-effect.mp3");
  const audio = new Audio(mySound);

  const openSettings = () => {
    // opens modal containing settings panel
    // settings options: main menu, theme
    store.dispatch({ type: UpdateType.ResetState });
    changeScreen(Screen.MainMenu);
  };

  const switchToStats = () => {
    audio.play();
    setShowStats(true);
    changeScreen(Screen.Character);
  };

  const changeScreen = (screen: Screen) =>
    store.dispatch({ type: UpdateType.Screen, payload: screen });

  const back = () => {
    audio.play();
    setShowStats(false);
    store.dispatch({
      type: UpdateType.Screen,
      payload: store.state.lastScreen,
    });
  };

  // add event listener for "back" pressed on mobile

  if (showStats) {
    return (
      <div className="header">
        <span>Character Stats</span>
        <span style={{ flexGrow: 1 }} />
        <FontAwesomeIcon icon={faArrowRight} onClick={back} />
      </div>
    );
  }

  return (
    <div className="header">
      <span>{GAME_NAME}</span>
      <span style={{ flexGrow: 1 }} />
      {store.state.character && (
        <FontAwesomeIcon icon={faUserCircle} onClick={switchToStats} />
      )}
      <FontAwesomeIcon icon={faGear} onClick={openSettings} />
    </div>
  );
};

export default Header;
