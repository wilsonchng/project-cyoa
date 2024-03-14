import { useContext } from "react";
import { StoreContext } from "../App";
import { Background, Stats } from "./character/Character";
import { Banner, Button } from "./common";
import { Screen, UpdateType } from "../utils/constants";

const ChapterSummary = () => {
  const store = useContext(StoreContext);
  const { character, health, hunger, inventory } = store.state;

  const nextChapter = () => {
    store.dispatch({ type: UpdateType.NextChapter });
    store.dispatch({ type: UpdateType.Screen, payload: Screen.Game });
  };

  return (
    <>
      <Banner>Summary</Banner>
      <div className="container">
        {character && <Background character={character} />}
        <br />
        <Stats health={health} hunger={hunger} inventory={inventory} />
        <br />
      </div>
      <p className="info-text">
        Progress is not saved (yet), if you leave this page you will have to
        restart the game!
      </p>
      <br />
      <Button onClick={nextChapter}>Next Chapter</Button>
    </>
  );
};

export default ChapterSummary;
