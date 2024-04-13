import { useContext, useMemo, useState } from "react";
import {
  faHome,
  faUserCircle,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { GAME_NAME, StoreContext } from "../../App";
import { Screen } from "../../utils/constants";
import { useSound } from "../../utils/customHooks";
import { Modal, Button, IconButton } from "./";
import { changeScreen } from "../../utils/actionCreators";

import "./common.css";

const Header = () => {
  const store = useContext(StoreContext);

  const [open, setOpen] = useState<boolean>(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const mySound = useSound("pageTurn.mp3");

  const showStats = useMemo(
    () => store.state.currentScreen === Screen.Character,
    [store.state.currentScreen]
  );

  const switchToCharacter = () => {
    mySound.play();
    changeScreen(store, Screen.Character);
  };

  const returnToMenu = () => {
    changeScreen(store, Screen.MainMenu);
    closeModal();
  };

  const back = () => {
    mySound.play();
    changeScreen(store, store.state.lastScreen);
  };

  // todo: add event listener for "back" pressed on mobile

  const getIcons = () => {
    if (showStats) return <IconButton icon={faArrowRight} onClick={back} />;

    const notOnMenu = store.state.currentScreen !== Screen.MainMenu;

    return (
      <>
        {store.state.playthrough && notOnMenu && (
          <IconButton icon={faUserCircle} onClick={switchToCharacter} />
        )}
        {notOnMenu && <IconButton icon={faHome} onClick={openModal} />}
      </>
    );
  };

  return (
    <div className="header">
      <span className="header-text">
        {showStats ? "Character Stats" : GAME_NAME}
      </span>
      <div className="header-icons">{getIcons()}</div>
      <Modal header="Return to Menu" open={open} onClose={closeModal}>
        <div className="container">
          <p>Do you want to return to the main menu?</p>
          <span style={{ alignSelf: "end", padding: "2px" }}>
            <Button text="Confirm" onClick={returnToMenu} />
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
