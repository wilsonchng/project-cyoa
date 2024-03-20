import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserCircle,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { GAME_NAME, StoreContext } from "../../App";
import { Screen, UpdateType } from "../../utils/constants";
import Modal from "./Modal";
import Button from "./Button";

const Header = () => {
  const store = useContext(StoreContext);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const mySound = require("../../assets/sounds/page-turn-sound-effect.mp3");
  const audio = new Audio(mySound);

  const switchToStats = () => {
    audio.play();
    setShowStats(true);
    changeScreen(Screen.Character);
  };

  const returnToMenu = () => {
    setShowSettings(false);
    changeScreen(Screen.MainMenu);
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
  const getContents = () => {
    if (showStats)
      return <FontAwesomeIcon icon={faArrowRight} onClick={back} />;

    const notOnMenu = store.state.currentScreen !== Screen.MainMenu;

    return (
      <>
        {store.state.character && notOnMenu && (
          <FontAwesomeIcon icon={faUserCircle} onClick={switchToStats} />
        )}
        {notOnMenu && (
          <FontAwesomeIcon
            icon={faHome}
            onClick={() => setShowSettings(true)}
          />
        )}
      </>
    );
  };

  return (
    <div className="header">
      <span>{showStats ? "Character Stats" : GAME_NAME}</span>
      <span style={{ flexGrow: 1 }} />
      {getContents()}
      <Modal
        header="Return to Menu"
        open={showSettings}
        onClose={() => setShowSettings(false)}
      >
        <div className="container">
          <p>Do you want to return to the main menu?</p>
          <Button style={{ alignSelf: "flex-end" }} onClick={returnToMenu}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
