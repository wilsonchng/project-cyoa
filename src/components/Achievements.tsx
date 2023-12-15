import { useContext } from "react";
import { ScreenID } from "../utils/types";
import { StoreContext } from "../App";

const Achievements = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) =>
        store.dispatch({ type: "screen", payload: screen });

    return (
        <>
            <header className="banner">ACHIEVEMENTS</header>
            {/* TODO: List of achievements */}
            <button
                className="button"
                onClick={() => changeScreen(ScreenID.MainMenu)}
            >
                Back
            </button>
        </>
    );
};

export default Achievements;
