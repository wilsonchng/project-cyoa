import { useContext } from "react";
import { StoreContext } from "../App";
import { Dawn } from "./story/Dawn";
import { ChapterID } from "../utils/constants";

const GameScreen = () => {
    const store = useContext(StoreContext);

    const renderPage = () => {
        switch (store.state.currentChapter) {
            case ChapterID.FireStation:
            case ChapterID.Dawn:
            default:
                return <Dawn />;
        }
    };

    return <>{renderPage()}</>;
};

export default GameScreen;
