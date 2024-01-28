import { useContext } from "react";
import { StoreContext } from "../../App";
import { PageNumber, UpdateType } from "../../utils/types";
import Banner from "../Banner";

const Bedroom = () => {
    const store = useContext(StoreContext);

    const gotoPage = (page: PageNumber) => () =>
        store.dispatch({ type: UpdateType.Page, payload: page });

    return (
        <>
            <Banner>{store.state.chapter}</Banner>
            <p>
                The flight instinct takes over, as you turn and sprint into your
                bedroom, shutting the door behind you. A loud slam reverberates
                through the tiny bedroom as the creature throws its full weight
                upon solid wood. The doorframe trembles from the impact,
                splinters spraying into the air like shrapnel as the assailant
                continues to bear down upon it.
            </p>
            <em>The door is not going to last much longer.</em>
            <p>You draw the bedroom curtains and peep outside, </p>
            <button onClick={gotoPage(PageNumber.Bedroom)}></button>
        </>
    );
};

export default Bedroom;
