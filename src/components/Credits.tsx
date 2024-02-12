import { useContext } from "react";
import { StoreContext } from "../App";
import { Banner, Button } from "./common";
import { UpdateType } from "../store";
import { ScreenID } from "../constants";

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
