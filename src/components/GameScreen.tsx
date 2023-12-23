import { useContext } from "react";
import { ScreenID, UpdateType } from "../utils/types";
import { StoreContext } from "../App";

const GameScreen = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    return (
        <>
            <p>test</p>
            <button onClick={changeScreen(ScreenID.Death)}>Death</button>
        </>
    );
};

export default GameScreen;
