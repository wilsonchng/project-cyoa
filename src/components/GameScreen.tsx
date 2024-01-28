import { useContext } from "react";
import { StoreContext } from "../App";
import { ChapterID, PageNumber, ScreenID, UpdateType } from "../utils/types";
import Header from "./Header";
import * as DayOne from "./DayOne";

const GameScreen = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    const renderPage = () => {
        switch (store.state.chapter) {
            case ChapterID.DayOne:
            default:
                switch (store.state.page) {
                    case PageNumber.Encounter:
                        return <DayOne.Encounter />;
                    case PageNumber.FirstZombie:
                        return <DayOne.FirstZombie />;
                    case PageNumber.Bedroom:
                        return <DayOne.Bedroom />;
                    case PageNumber.FirstWeapon:
                        return <DayOne.FirstWeapon />;
                    case PageNumber.Start:
                    default:
                        return <DayOne.Prologue />;
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
