import { useContext } from "react";
import { StoreContext } from "../App";
import { Dawn, PrisonBus } from "./story";
import { Chapter } from "../utils/constants";

const GameScreen = () => {
    const store = useContext(StoreContext);

    const renderPage = () => {
        switch (store.state.currentChapter) {
            case Chapter.Dawn:
            default:
                return <Dawn />;
            case Chapter.PrisonBus:
                return <PrisonBus />;
        }
    };

    return <>{renderPage()}</>;
};

export default GameScreen;
