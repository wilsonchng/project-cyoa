import { useContext } from "react";
import { StoreContext } from "../../App";
import { Banner, Button } from "../common";
import { Screen } from "../../utils/constants";
import { UpdateType } from "../../utils/store";

const Achievements = () => {
  const store = useContext(StoreContext);

  const changeScreen = (screen: Screen) => () =>
    store.dispatch({ type: UpdateType.Screen, payload: screen });

  return (
    <>
      <Banner>ACHIEVEMENTS</Banner>
      {/* Todo: Have tracking of achievements, or past characters */}
      <Button text="BACK" onClick={changeScreen(Screen.MainMenu)} />
    </>
  );
};

export default Achievements;
