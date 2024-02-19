import { useContext } from "react";
import { StoreContext } from "../App";
import { Header, Banner } from "./common";
import { Dawn } from "./story/Dawn";
import { ChapterID } from "../utils/constants";

const GameScreen = () => {
    const store = useContext(StoreContext);

    const renderPage = () => {
        switch (store.state.currentChapter) {
            case ChapterID.Home:
            default:
                return <Dawn />;
        }
    };

    return (
        <>
            <Header />
            <Banner>{store.state.currentChapter}</Banner>
            {renderPage()}
        </>
    );
};

export default GameScreen;
