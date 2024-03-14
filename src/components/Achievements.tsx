import { useContext } from "react";
import { StoreContext } from "../App";
import { Banner, Button } from "./common";
import { Screen, UpdateType } from "../utils/constants";

const Achievements = () => {
  const store = useContext(StoreContext);

  const changeScreen = (screen: Screen) => () =>
    store.dispatch({ type: UpdateType.Screen, payload: screen });

  return (
    <>
      <Banner>ACHIEVEMENTS</Banner>
      {/* Todo: Have tracking of achievements, or past characters */}
      <Button onClick={changeScreen(Screen.MainMenu)}>BACK</Button>
    </>
  );
};

export default Achievements;
