import { useContext } from "react";
import { StoreContext } from "../App";
import { ScreenID, UpdateType } from "../utils/types";
import Banner from "./Banner";

const Credits = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    return (
        <>
            <Banner>CREDITS</Banner>
            {/* Credits */}
            <button onClick={changeScreen(ScreenID.MainMenu)}>Back</button>
        </>
    );
};

export default Credits;
