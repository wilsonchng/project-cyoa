import { useContext } from "react";
import { StoreContext } from "../App";
import { Banner, Button } from "./common";
import { Screen, UpdateType } from "../utils/constants";

const Credits = () => {
  const store = useContext(StoreContext);

  const changeScreen = (screen: Screen) => () =>
    store.dispatch({ type: UpdateType.Screen, payload: screen });

  return (
    <>
      <Banner>CREDITS</Banner>
      <Button onClick={changeScreen(Screen.MainMenu)}>BACK</Button>
    </>
  );
};

export default Credits;
