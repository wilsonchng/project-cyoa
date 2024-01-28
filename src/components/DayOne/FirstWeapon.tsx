import { useContext } from "react";
import { StoreContext } from "../../App";
import { PageNumber, UpdateType } from "../../utils/types";
import Banner from "../Banner";

const FirstWeapon = () => {
    const store = useContext(StoreContext);

    const gotoPage = (page: PageNumber) => () =>
        store.dispatch({ type: UpdateType.Page, payload: page });

    return (
        <>
            <Banner>{store.state.chapter}</Banner>
            <p>
                Adrenaline surges through your veins as the fight or flight
                instincts kick into overdrive. You search desperately for an
                escape, scanning the room for something, anything to fend off
                the approaching horror.
            </p>
            <p>A few options come to mind:</p>
            <button onClick={gotoPage(PageNumber.Bedroom)}>
                Return to your bedroom and shut the door
            </button>
            <button onClick={gotoPage(PageNumber.FirstZombie)}>Continue</button>
            <button onClick={gotoPage(PageNumber.FirstZombie)}>Continue</button>
        </>
    );
};

export default FirstWeapon;
