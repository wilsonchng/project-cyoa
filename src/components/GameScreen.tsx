import { useContext } from "react";
import { StoreContext } from "../App";
import Header from "./Header";
import { ChapterID, PageNumber, ScreenID, UpdateType } from "../utils/types";
import { Discovered, StartingItems, Prologue } from "./DayOne";

const GameScreen = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    const renderPage = () => {
        switch (store.state.chapter) {
            case ChapterID.DayOne:
            default:
                switch (store.state.page) {
                    case PageNumber.Discovered:
                        return <Discovered />;
                    case PageNumber.StartingItems:
                        return <StartingItems />;
                    case PageNumber.Start:
                    default:
                        return <Prologue />;
                }
        }
    };

    return (
        <>
            <Header />
            {renderPage()}
        </>
    );
};

export default GameScreen;
