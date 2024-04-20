import { useContext, useState } from "react";
import { StoreContext } from "../../../App";
import { Banner, Button, ButtonGroup, HealthBar } from "../../common";
import {
  faBriefcase,
  faRunning,
  faHandFist,
} from "@fortawesome/free-solid-svg-icons";
import { Item } from "../../../utils/types";

const Combat = () => {
  const store = useContext(StoreContext);

  const [showInventory, setInventory] = useState(false);

  const useItem = (item: Item) => console.log(item);

  const player = store.state.player;

  if (!player?.combat) return null; // throw error?

  const noItems = player.inventory.length === 0;

  const { text, playersTurn, enemy, noFlee = true } = player.combat;

  const playerOptions = () => {
    if (showInventory) {
      return (
        <ButtonGroup>
          {player.inventory.map((item) => {
            return <Button text={item.name} onClick={() => useItem(item)} />;
          })}
          <Button text="BACK" onClick={() => setInventory(false)} />
        </ButtonGroup>
      );
    } else {
      return (
        <ButtonGroup>
          <Button
            text="ATTACK"
            icon={faHandFist}
            onClick={console.log}
            title="Attack with main weapon"
            disabled={!playersTurn}
          />
          <Button
            text="FLEE"
            icon={faRunning}
            onClick={console.log}
            title={noFlee ? "Run away!" : "You cannot run away from this fight"}
            disabled={!playersTurn || noFlee}
          />
          <Button
            text="ITEM"
            icon={faBriefcase}
            onClick={() => setInventory(true)}
            title={
              noItems
                ? "You have no items"
                : "Select an item from your inventory"
            }
            disabled={!playersTurn || noItems}
          />
        </ButtonGroup>
      );
    }
  };

  return (
    <div className="combat">
      <Banner>{enemy.name}</Banner>
      <div className="row">
        <label>Enemy health:</label>
        <HealthBar
          health={enemy.health}
          maxHealth={enemy.maxHealth}
          enemy={true}
        />
      </div>
      <div className="row">
        <label>Your health:</label>
        <HealthBar health={player.currHealth} maxHealth={player.maxHealth} />
      </div>
      {playerOptions()}
    </div>
  );
};

export default Combat;
