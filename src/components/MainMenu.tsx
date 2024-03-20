import { useContext, useState } from "react";
import { GAME_NAME, StoreContext } from "../App";
import { Banner, Button, Modal } from "./common";
import { Screen, UpdateType } from "../utils/constants";

const MainMenu = () => {
  const store = useContext(StoreContext);
  const [open, setOpen] = useState<boolean>(false);
  const hasExistingSave = !!store.state.character;

  const changeScreen = (screen: Screen) => () =>
    store.dispatch({ type: UpdateType.Screen, payload: screen });

  const newGame = () => {
    if (hasExistingSave) {
      setOpen(true);
    } else {
      changeScreen(Screen.Creation)();
    }
  };

  const overrideExisting = () => {
    store.dispatch({ type: UpdateType.ResetState });
    changeScreen(Screen.Creation)();
  };

  return (
    <>
      <Banner>{GAME_NAME}</Banner>
      <br />
      <Button onClick={newGame}>NEW GAME</Button>
      {hasExistingSave && (
        <Button onClick={changeScreen(Screen.Game)}>CONTINUE</Button>
      )}
      <Button onClick={changeScreen(Screen.Credits)}>CREDITS</Button>
      <Button
        title="Coming soon!"
        disabled={true}
        onClick={changeScreen(Screen.Achievements)}
      >
        ACHIEVEMENTS
      </Button>
      <Modal
        header="Override Existing Game"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="container">
          <p>
            You have an existing character, if you start a new game it will
            override your current playthrough.
          </p>
          <Button style={{ alignSelf: "flex-end" }} onClick={overrideExisting}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default MainMenu;
