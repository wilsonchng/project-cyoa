import { useContext } from "react";

import { StoreContext } from "../../App";
import { ScreenID, UpdateType } from "../../utils/constants";

import "./common.css";

const Header = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    return (
        <div className="header">
            {/* Link to main menu */}
            {/* Link to character stats */}
        </div>
    );
};

export default Header;
