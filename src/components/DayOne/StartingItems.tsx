import { useContext, useState } from "react";
import { StoreContext } from "../../App";
import { PageNumber, UpdateType } from "../../utils/types";
import Banner from "../Banner";

const StartingItems = () => {
    const store = useContext(StoreContext);
    const pickedItems = useState([]);

    const gotoPage = (page: PageNumber) => () =>
        store.dispatch({ type: UpdateType.Page, payload: page });

    const getStartingItems = () => {
        switch (store.state.character?.hobby) {
            default:
                return [];
        }
    };

    const renderPage = () => {};

    return (
        <>
            <Banner>{store.state.chapter}</Banner>
            <p>
                You stand alone in the dimly lit interior of your home, the
                atmosphere thick with tension. The sound of the window
                shattering pierces through the bedroom door. Outside the walls,
                you hear distant moans and shuffling footsteps from multiple
                directions.
            </p>
            <p>
                You resist the urge to panic, reminding yourself that succumbing
                to fear would be your undoing. Your safehouse has been
                compromised, <em>they are coming.</em> It is just a matter of
                time before your fragile barriers will be torn down, and you
                will have to face the horrors outside.
            </p>
            <p>
                The clock is ticking, you will need to grab what you can and
                make a run for it. Your car is parked outside, if you can make
                to it unscathed, you can flee from the encroaching danger.
            </p>
            <p>The first thing you grab is your:</p>
            <button onClick={gotoPage(PageNumber.StartingItems)}>
                Continue
            </button>
        </>
    );
};

export default StartingItems;
