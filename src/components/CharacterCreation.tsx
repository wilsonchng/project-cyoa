import { useContext } from "react";
import { ScreenID } from "../utils/types";
import { StoreContext } from "../App";

const CharacterCreation = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) =>
        store.dispatch({ type: "screen", payload: screen });

    return (
        <>
            <header className="banner">Who are you?</header>
            {/* Input for character name */}
            {/* Button to randomise name */}
            {/* Dropdown for selecting occupation */}
            {/* Dropdown for selecting hobby */}
            {/* Dropdown for selecting quirk */}
            {/* Display for starting stats */}
            {/* Display for starting items */}
            {/* Button to start game */}
            <button
                className="button"
                onClick={() => changeScreen(ScreenID.MainMenu)}
            >
                Back
            </button>
        </>
    );
};

export default CharacterCreation;
