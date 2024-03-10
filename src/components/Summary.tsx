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
            {/* game tooltips */}
            <br />
            <p>Congratulations, you've completed the tutorial</p>
            <Button onClick={() => location.reload()}>Main Menu</Button>
            {/* <Button onClick={nextChapter}>Next Chapter</Button> */}
        </>
    );
};

export default ChapterSummary;
