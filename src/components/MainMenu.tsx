import { useContext } from "react";
import { GAME_NAME, StoreContext } from "../App";
import { Banner, Button } from "./common";
import { Screen, UpdateType } from "../utils/constants";

const MainMenu = () => {
  const store = useContext(StoreContext);

  const changeScreen = (screen: Screen) => () =>
    store.dispatch({ type: UpdateType.Screen, payload: screen });

  return (
    <>
      <Banner>{GAME_NAME}</Banner>
      <br />
      <Button onClick={changeScreen(Screen.Creation)}>START</Button>
      <Button onClick={changeScreen(Screen.Achievements)}>ACHIEVEMENTS</Button>
      <Button onClick={changeScreen(Screen.Credits)}>CREDITS</Button>
    </>
  );
};

export default MainMenu;
