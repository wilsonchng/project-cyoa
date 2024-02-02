import { useContext } from "react";
import { StoreContext } from "../App";
import { ScreenID, UpdateType } from "../utils/types";
import { Banner, Button } from "./common";

const Credits = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    return (
        <>
            <Banner>CREDITS</Banner>
            {/* Credits */}
            <Button onClick={changeScreen(ScreenID.MainMenu)}>BACK</Button>
        </>
    );
};

export default Credits;
