import { useContext, useState } from "react";
import { faDoorClosed, faSkull } from "@fortawesome/free-solid-svg-icons";

import { StoreContext } from "../../../App";
import { Banner, Button } from "../../common";
import { changePage, setCombat } from "../../../utils/actionCreators";
import { Page } from "../../../utils/constants";
import { Combat } from "../../../utils/types";

const Tutorial = () => {
  const store = useContext(StoreContext);

  const [doorOpen, setOpen] = useState(false);

  const tutorialCombat: Combat = {
    text: "Frank",
    playersTurn: true,
    enemy: {
      name: "Frank",
      health: 80,
      maxHealth: 80,
      abilities: [
        {
          name: "Weak Claw",
          damage: 10,
        },
        {
          name: "Weak Bite",
          damage: 20,
        },
      ],
    },
  };

  const nextPage = () => {
    setCombat(store, tutorialCombat);
    changePage(store, Page.Combat);
  };

  return (
    <>
      <Banner>9 July 1993</Banner>
      <p>
        Dear diary, it's been a surreal 3 days, and I've decided to finally
        start writing again for my own sanity. It all started with a odd smell
        in the air, like a mix of dampness and decay. The news reported an
        outbreak, urging everyone to stay indoors. The government issued a
        quarantine, and everything was closed. With the phone lines down, the
        radio and TV broadcasts remain my only connection to the outside world.
        I'm trying to keep busy by rearranging the furniture, checking my
        supplies, and rationing my food. But the anxiety gnaws at me. Are we
        truly safe here? What's happening beyond these walls? I can't help but
        peak through a small gap in the curtains, hoping for some reassurance,
        but all I see are empty streets.
      </p>
      <hr />
      <p>
        As you finish writing you hear someone banging on your front door. With
        the quarantine in effect, you wonder who it might be...
      </p>
      {!doorOpen && (
        <Button
          text="Open door..."
          onClick={() => setOpen(true)}
          icon={faDoorClosed}
        />
      )}
      {doorOpen && (
        <>
          <p>
            You open the door to see your neighbor Frank, but he's not the same.
            His clothes and hair are disheveled, his skin pallid and gray, and
            his usual jovial demeanour replaced with a vacant stare. Your gaze
            meets his and you notice a faint flicker behind his dark eyes before
            he opens his mouth and lets out a guttural growl. He lurches forward
            in jerky, uncoordinated movements, arms reaching out as if to grab
            you.
          </p>
          <p>
            You back away instinctively, but you soon find yourself cornered in
            your kitchen, and the distance between you and Frank closing...
          </p>
          <br />
          <Button text="Defend yourself!" onClick={nextPage} icon={faSkull} />
        </>
      )}
    </>
  );
};

export default Tutorial;
