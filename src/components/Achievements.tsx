import { useContext } from "react";
import { ScreenID, UpdateType } from "../utils/types";
import { StoreContext } from "../App";
import Banner from "./Banner";

const Achievements = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    return (
        <>
            <Banner>ACHIEVEMENTS</Banner>
            <p>Todo: Have tracking of achievements, or past characters</p>
            <button onClick={changeScreen(ScreenID.MainMenu)}>Back</button>
        </>
    );
};

export default Achievements;
