import { useContext } from "react";
import { ScreenID } from "../utils/types";
import { StoreContext } from "../App";

const MainMenu = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) =>
        store.dispatch({ type: "screen", payload: screen });

    return (
        <>
            <header className="banner">CYOA: Outbreak</header>
            <button
                className="button"
                onClick={() => changeScreen(ScreenID.CharacterCreation)}
            >
                START
            </button>
            <button
                className="button"
                onClick={() => changeScreen(ScreenID.Achievements)}
            >
                ACHIEVEMENTS
            </button>
            <button
                className="button"
                onClick={() => changeScreen(ScreenID.Credits)}
            >
                CREDITS
            </button>
        </>
    );
};

export default MainMenu;
