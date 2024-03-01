import { useContext } from "react";
import { GAME_NAME, StoreContext } from "../App";
import { Banner, Button } from "./common";
import { ScreenID, UpdateType } from "../utils/constants";

const MainMenu = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    return (
        <>
            <Banner>{GAME_NAME}</Banner>
            <br />
            <Button onClick={changeScreen(ScreenID.CharacterCreation)}>
                START
            </Button>
            <Button onClick={changeScreen(ScreenID.Achievements)}>
                ACHIEVEMENTS
            </Button>
            <Button onClick={changeScreen(ScreenID.Credits)}>CREDITS</Button>
        </>
    );
};

export default MainMenu;
