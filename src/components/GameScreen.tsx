import { useContext } from "react";
import { StoreContext } from "../App";
import { PageNumber, ScreenID, UpdateType } from "../utils/types";
import Header from "./Header";
import { Prologue } from "./DayOne/Prologue";
import { FirstZombie } from "./DayOne/FirstZombie";

const GameScreen = () => {
    const store = useContext(StoreContext);

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    const renderPage = () => {
        switch (store.state.page) {
            case PageNumber.FirstZombie:
                return <FirstZombie />;
            case PageNumber.Start:
            default:
                return <Prologue />;
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
