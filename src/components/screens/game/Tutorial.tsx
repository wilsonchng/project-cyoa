import { useContext } from "react";
import { faDoorClosed, faSkull } from "@fortawesome/free-solid-svg-icons";

import { StoreContext } from "../../../App";
import { Banner, Button, ButtonGroup } from "../../common";
import {
  changePage,
  setCombat,
  setMetaData,
  setWeapon,
} from "../../../utils/actionCreators";
import { Page } from "../../../utils/constants";
import { Combat } from "../../../utils/types";
import { Item, ItemID, UNARMED, getItem } from "../../../utils/items";
import { EnemyID, getEnemy } from "../../../utils/enemy";

const Tutorial = () => {
  const store = useContext(StoreContext);

  const doorOpen = !!store.state.player?.metaData?.tutorialDoor;
  const openDoor = () => setMetaData(store, { tutorialDoor: true });

  const weapon = store.state.player?.weapon;
  const grabWeapon = (item: Item) => setWeapon(store, item);

  const tutorialCombat: Combat = {
    playersTurn: true,
    combatLog: [{ text: "Frank approaches menacingly...", color: "red" }],
    enemy: getEnemy(EnemyID.Frank)!,
    tutorial: true,
  };

  const tutorialWeapons: ItemID[] = [
    ItemID.KitchenKnife,
    ItemID.FryingPan,
    ItemID.BroomStick,
  ];

  const nextPage = () => {
    setCombat(store, tutorialCombat);
    setMetaData(store, null);
    changePage(store, Page.Battle);
  };

  return (
    <>
      <Banner>9 July 1993</Banner>
      <p className="dear-diary">Dear diary,</p>
      <p>
        It's been a surreal 3 days, and I've decided to finally start writing
        again for my own sanity. It all started with a odd smell in the air,
        like a mix of dampness and decay. The news reported an outbreak, urging
        everyone to stay indoors. The government issued a quarantine, and
        everything was closed. With the phone lines down, the radio and TV
        broadcasts remain my only connection to the outside world. I'm trying to
        keep busy by rearranging the furniture, checking my supplies, and
        rationing my food. But the anxiety gnaws at me. Are we truly safe here?
        What's happening beyond these walls? I can't help but peak through a
        small gap in the curtains, hoping for some reassurance, but all I see
        are empty streets.
      </p>
      <hr />
      <p>
        As you finish writing you hear someone banging on your front door. With
        the quarantine in effect, you wonder who it might be...
      </p>
      {!doorOpen && (
        <Button text="Open door..." onClick={openDoor} icon={faDoorClosed} />
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
            you. You back away instinctively, but find yourself cornered in your
            kitchen.
          </p>
          {weapon && weapon !== UNARMED ? (
            <>
              <p>
                You grab the <strong>{weapon.name}</strong> and brandish it at
                your unexpected guest, giving him one final warning. But Frank
                ignores your threats and advances toward you with sinister
                intent...
              </p>
              <br />
              <Button
                text="Defend yourself"
                onClick={nextPage}
                icon={faSkull}
              />
            </>
          ) : (
            <>
              <p>
                Your eyes dart around for a weapon, something, anything to
                defend yourself with. You decide to grab...
              </p>
              <br />
              <ButtonGroup>
                {tutorialWeapons.map((id) => {
                  const item = getItem(id);
                  return (
                    item && (
                      <Button
                        key={`button-${id}`}
                        text={item.name || ""}
                        onClick={() => grabWeapon(item)}
                        title={item.name}
                      />
                    )
                  );
                })}
              </ButtonGroup>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Tutorial;
