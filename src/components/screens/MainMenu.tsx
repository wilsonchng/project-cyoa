import { useContext, useState } from "react";
import { GAME_NAME, StoreContext } from "../../App";
import { Banner, Button, Modal } from "../common";
import { Screen } from "../../utils/constants";
import { changeScreen, resetState } from "../../utils/actionCreators";

const MainMenu = () => {
  const store = useContext(StoreContext);
  const [open, setOpen] = useState<boolean>(false);
  const hasExistingSave = !!store.state.playthrough;

  const newGame = () => {
    if (hasExistingSave) {
      setOpen(true);
    } else {
      changeScreen(store, Screen.Creation);
    }
  };

  const overrideExisting = () => {
    resetState(store);
    changeScreen(store, Screen.Creation);
  };

  return (
    <>
      <Banner>{GAME_NAME}</Banner>
      <br />
      <Button text="NEW GAME" onClick={newGame} />
      {hasExistingSave && (
        <Button
          text="CONTINUE"
          onClick={() => changeScreen(store, Screen.Game)}
        />
      )}
      <Button
        text="CREDITS"
        onClick={() => changeScreen(store, Screen.Credits)}
      />
      <Button
        text="ACHIEVEMENTS"
        title="Coming soon!"
        disabled={true}
        onClick={() => changeScreen(store, Screen.Achievements)}
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
          <span style={{ alignSelf: "end", padding: "2px" }}>
            <Button text="Confirm" onClick={overrideExisting} />
          </span>
        </div>
      </Modal>
    </>
  );
};

export default MainMenu;
