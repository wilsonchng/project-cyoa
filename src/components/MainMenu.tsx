import { useContext } from "react";
import { ScreenID, UpdateType } from "../utils/types";
import { GAME_NAME, StoreContext } from "../App";
import Banner from "./Banner";

const MainMenu = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    return (
        <>
            <Banner>{GAME_NAME}</Banner>
            <button onClick={changeScreen(ScreenID.CharacterCreation)}>
                START
            </button>
            <button onClick={changeScreen(ScreenID.Achievements)}>
                ACHIEVEMENTS
            </button>
            <button onClick={changeScreen(ScreenID.Credits)}>CREDITS</button>
        </>
    );
};

export default MainMenu;
