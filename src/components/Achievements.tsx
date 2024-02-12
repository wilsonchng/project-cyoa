import { useContext } from "react";
import { StoreContext } from "../App";
import { Banner, Button } from "./common";
import { UpdateType } from "../store";
import { ScreenID } from "../constants";

const Achievements = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    return (
        <>
            <Banner>ACHIEVEMENTS</Banner>
            {/* Todo: Have tracking of achievements, or past characters */}
            <Button onClick={changeScreen(ScreenID.MainMenu)}>BACK</Button>
        </>
    );
};

export default Achievements;
