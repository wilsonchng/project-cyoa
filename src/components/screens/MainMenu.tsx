import { useContext, useState } from "react";
import { GAME_NAME, StoreContext } from "../../App";
import { Banner, Button, Modal } from "../common";
import { Screen } from "../../utils/constants";
import { UpdateType } from "../../utils/store";

const MainMenu = () => {
  const store = useContext(StoreContext);
  const [open, setOpen] = useState<boolean>(false);
  const hasExistingSave = !!store.state.playthrough;

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
      <Button text="NEW GAME" onClick={newGame} />
      {hasExistingSave && (
        <Button text="CONTINUE" onClick={changeScreen(Screen.Game)} />
      )}
      <Button text="CREDITS" onClick={changeScreen(Screen.Credits)} />
      <Button
        text="ACHIEVEMENTS"
        title="Coming soon!"
        disabled={true}
        onClick={changeScreen(Screen.Achievements)}
      />
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
          <Button text="Confirm" onClick={overrideExisting} />
        </div>
      </Modal>
    </>
  );
};

export default MainMenu;
