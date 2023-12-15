import { useContext } from "react";
import { StoreContext } from "../App";
import { ScreenID } from "../utils/types";

const Credits = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) =>
        store.dispatch({ type: "screen", payload: screen });

    return (
        <>
            <header className="banner">CREDITS</header>
            {/* Credits */}
            <button
                className="button"
                onClick={() => changeScreen(ScreenID.MainMenu)}
            >
                Back
            </button>
        </>
    );
};

export default Credits;
