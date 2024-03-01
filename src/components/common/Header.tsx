import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGear,
    faUserCircle,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import { GAME_NAME, StoreContext } from "../../App";
import { ScreenID, UpdateType } from "../../utils/constants";

const Header = () => {
    const store = useContext(StoreContext);
    const [showStats, setShowStats] = useState<boolean>(false);

    const openSettings = () => {
        // opens modal containing settings panel
        // settings options: main menu, theme
        store.dispatch({ type: UpdateType.ResetState });
        changeScreen(ScreenID.MainMenu);
    };

    const switchToStats = () => {
        setShowStats(true);
        changeScreen(ScreenID.CharacterSummary);
    };

    const changeScreen = (screen: ScreenID) =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    const backToGame = () => {
        setShowStats(false);
        store.dispatch({
            type: UpdateType.Screen,
            payload: ScreenID.Game,
        });
    };

    if (showStats) {
        return (
            <div className="header">
                <FontAwesomeIcon icon={faArrowLeft} onClick={backToGame} />
                <span style={{ flexGrow: 1 }} />
                <span>Character Stats</span>
            </div>
        );
    }

    return (
        <div className="header">
            <span>{GAME_NAME}</span>
            <span style={{ flexGrow: 1 }} />
            {store.state.character && (
                <FontAwesomeIcon icon={faUserCircle} onClick={switchToStats} />
            )}
            <FontAwesomeIcon icon={faGear} onClick={openSettings} />
        </div>
    );
};

export default Header;
