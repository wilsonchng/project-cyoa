import { useContext } from "react";
import { StoreContext } from "../../App";
import { PageNumber, UpdateType } from "../../utils/types";
import Banner from "../Banner";

const Discovered = () => {
    const store = useContext(StoreContext);

    const gotoPage = (page: PageNumber) => () =>
        store.dispatch({ type: UpdateType.Page, payload: page });

    return (
        <>
            <Banner>{store.state.chapter}</Banner>
            <p>
                A faint rustle of grass outside cuts through the silence,
                interrupting your thoughts. You freeze in your tracks, senses
                heightened to discern the source of the sound. The rustling
                grows louder and more ominous. A shiver crawls up your spine
                when the rustling is accompanied by a low, guttural moan. As you
                lay frozen in bed with bated breath, a dark silhouette forms
                over the barricaded window.
            </p>
            <p>
                Suddenly, a scraping noise confirms your deepest fears. How did
                it know you are here? Was it the radio? But you ensured the
                volume was at a minimum. Somehow, despite your best efforts to
                live in darkness and silence, your presence have been picked up
                by one of them.
            </p>
            <p>
                The scraping has now escalated to thudding, spurring you to jump
                out of bed. A different sound pierces the window, a louder,
                raspier moan, as if the creature was alerting others to your
                location. A crack in the window pane chases you into the living
                hall, shutting the bedroom door behind you.
            </p>
            <button onClick={gotoPage(PageNumber.StartingItems)}>
                Continue
            </button>
        </>
    );
};

export default Discovered;
