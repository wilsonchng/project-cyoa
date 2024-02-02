import { useContext } from "react";
import { StoreContext } from "../App";
import { ScreenID, UpdateType } from "../utils/types";
import { Banner, Button } from "./common";

const DeathScreen = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    return (
        <>
            <Banner>YOU DIED</Banner>
            {/* Display of character data, days lived, zombies killed */}
            <Button onClick={() => location.reload()}>Main Menu</Button>
        </>
    );
};

export default DeathScreen;
