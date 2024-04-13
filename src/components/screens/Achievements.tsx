import { useContext } from "react";
import { StoreContext } from "../../App";
import { Banner, Button } from "../common";
import { Screen } from "../../utils/constants";
import { changeScreen } from "../../utils/actionCreators";

const Achievements = () => {
  const store = useContext(StoreContext);

  return (
    <>
      <Banner>ACHIEVEMENTS</Banner>
      {/* Todo: Have tracking of achievements, or past characters */}
      <Button
        text="BACK"
        onClick={() => changeScreen(store, Screen.MainMenu)}
      />
    </>
  );
};

export default Achievements;
