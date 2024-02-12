import { useContext } from "react";
import { StoreContext } from "../App";
import { UpdateType } from "../store";
import { Header, Banner } from "./common";
import { Home } from "./story/Home";
import { ChapterID, ScreenID } from "../constants";

const GameScreen = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    const renderPage = () => {
        switch (store.state.currentChapter) {
            case ChapterID.Home:
            default:
                return <Home />;
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
