import { useContext } from "react";
import { StoreContext } from "../../App";
import { Banner, Button } from "../common";
import { Screen } from "../../utils/constants";
import { UpdateType } from "../../utils/store";

const Summary = () => {
  const store = useContext(StoreContext);

  const returnToMenu = () => {
    store.dispatch({ type: UpdateType.ResetState });
    store.dispatch({ type: UpdateType.Screen, payload: Screen.MainMenu });
  };

  return (
    <>
      <Banner>Summary</Banner>
      <div className="container">
        <p className="info-text">
          Thank you for playing! This was the tutorial, more chapters to come
          soon!
        </p>
        <br />
        <Button text="Return to Menu" onClick={returnToMenu} />
      </div>
    </>
  );
};

export default Summary;
