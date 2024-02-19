import { useContext } from "react";
import { StoreContext } from "../App";
import { Banner, Button } from "./common";
import { UpdateType } from "../utils/store";
import { ScreenID } from "../utils/constants";

const MainMenu = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    return (
        <>
            <Banner>ESCAPE: KNOX</Banner>
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
