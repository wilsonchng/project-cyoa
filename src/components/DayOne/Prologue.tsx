import { useContext } from "react";
import { StoreContext } from "../../App";
import { PageNumber, UpdateType } from "../../utils/types";
import Banner from "../Banner";

export const Prologue = () => {
    const store = useContext(StoreContext);

    const gotoPage = (page: PageNumber) => () =>
        store.dispatch({ type: UpdateType.Page, payload: page });

    return (
        <>
            <Banner>9 July 1993</Banner>
            <p>
                You awake in the darkened bedroom of your home, its
                once-familiar comfort replaced by an eerie silence that hung in
                the air like a thick fog. Your eyes dart to the only window,
                breathing a sigh of relief as the planks hastily nailed across
                it were still intact. The makeshift barricade was the only thing
                keeping you from those <em>things</em> out there. You glance at
                your watch, 9:00 AM, just in time for the morning broadcast. You
                switch on your radio, ensuring its volume has been turned to the
                minimum as you tune in to the local news frequency.
            </p>
            <em>
                Good morning. You're listening to LBMW.
                <br />
                Its day three of the Knox evacuation.
                <br />
                Still NO official statement on the contagion that has gripped
                Kentucky.
                <br />
                The Exclusion Zone remains in place.
                <br />
                Military personnel from the local bases have a HUGE area closed
                off.
                <br />
                Their primary deployment south of Louisville.
                <br />
                The Exclusion Zone stretches out below the curve of the Ohio
                river and contains the small towns of Muldraugh and West Point.
                <br />
                We have been told: there will be answers. <br />
                LBMW understands a press conference will be held this afternoon
                on the brewing chaos of the last four days.
                <br />
                Will the communications black-out be explained?
                <br />
                Until then, the only advice for those nearby remains: stay
                indoors.
                <br />
                This is Frank Hemingway for LBMW.
                <br />
                <p>*static*</p>
            </em>
            <p>
                You sigh as you turn off the radio, still no news of a rescue.
                Ever since the outbreak first arrived at Rosewood you have
                hunkered down, boarding up the windows and reinforcing the doors
                with whatever you could find. Your home has become both
                sanctuary and prison. Days blend together as you carefully
                conserve resources, rationing food and water, meanwhile
                routinely scanning the radio for any updates. The weight of
                solitude presses upon you, as you grapple with the uncertainty
                of how long you can remain hidden.
            </p>
            <button onClick={gotoPage(PageNumber.FirstZombie)}>Continue</button>
        </>
    );
};
