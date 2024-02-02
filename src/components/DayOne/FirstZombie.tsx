import { useContext } from "react";
import { StoreContext } from "../../App";
import { PageNumber, UpdateType } from "../../utils/types";
import Banner from "../common/Banner";

const FirstZombie = () => {
    const store = useContext(StoreContext);

    const gotoPage = (page: PageNumber) => () =>
        store.dispatch({ type: UpdateType.Page, payload: page });

    return (
        <>
            <Banner>{store.state.chapter}</Banner>
            <p>
                Adrenaline surges through your veins as the fight or flight
                instincts kick into overdrive. You search desperately for an
                escape, but the creature cuts off your path to the door. Behind
                you is your bedroom, which has a door you can put between
                yourself and the creature, as well as a window which you could
                climb out of. However, you don't know what dangers might be out
                there. Alternatively, you make your stand here against the
                approaching horror.
            </p>
            <p>You decide to:</p>
            <button onClick={gotoPage(PageNumber.Bedroom)}>
                Flee to your bedroom
            </button>
            <button onClick={gotoPage(PageNumber.FirstWeapon)}>
                Prepare to fight
            </button>
        </>
    );
};

export default FirstZombie;
