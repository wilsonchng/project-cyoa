import { useContext } from "react";
import { StoreContext } from "../../App";
import { PageNumber, UpdateType } from "../../utils/types";
import Banner from "../Banner";

const Prologue = () => {
    const store = useContext(StoreContext);

    const gotoPage = (page: PageNumber) => () =>
        store.dispatch({ type: UpdateType.Page, payload: page });

    return (
        <>
            <Banner>{store.state.chapter}</Banner>
            <p>
                As you slowly awaken from the depths of slumber, the soft
                morning light greets you through the curtains. The familiar
                surroundings of your home offering a semblance of security. Yet,
                as your senses gradually come alive, a feeling of unease creeps
                over you like a chilling breeze. Today, something is amiss. The
                air hangs heavy with silence, devoid of the usual hum of life
                outside.
            </p>
            <p>
                A sudden noise shatters the stillness of the moment - a loud
                crash that echoes through the house. Panic grips your heart as
                you bolt up, straining to comprehend the source of the
                disturbance. There is a moment of disbelief, a split second
                where reality feels suspended. And then it hits you like a
                thunderbolt: someone, <em>or something</em> just broke into your
                home!
            </p>
            <button onClick={gotoPage(PageNumber.Encounter)}>Continue</button>
        </>
    );
};

export default Prologue;
