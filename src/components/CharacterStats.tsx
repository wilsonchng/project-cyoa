import { useContext } from "react";
import { StoreContext } from "../App";
import { ScreenID, UpdateType } from "../utils/types";

const CharacterStats = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    return (
        <>
            {/* Display for character name */}
            {/* Display for occupation */}
            {/* Display for hobby */}
            {/* Display for quirk */}
            {/* Display for stats */}
            {/* Display for items */}
            <button onClick={changeScreen(ScreenID.MainMenu)}>Back</button>
        </>
    );
};

export default CharacterStats;
