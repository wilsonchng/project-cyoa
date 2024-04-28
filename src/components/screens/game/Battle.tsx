import { useContext, useEffect, useState } from "react";
import {
  faBriefcase,
  faRunning,
  faHandFist,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { faHand } from "@fortawesome/free-regular-svg-icons";

import { StoreContext } from "../../../App";
import {
  Banner,
  Button,
  ButtonGroup,
  HealthBar,
  StaminaBar,
} from "../../common";
import { Combat, BattleLog, Player } from "../../../utils/types";
import { DIFFICULTY_MODIFIER, Item } from "../../../utils/items";
import { setPlayer } from "../../../utils/actionCreators";
import { getRandomInteger } from "../../../utils/random";
import { Enemy, EnemyStatus } from "../../../utils/enemy";
import { shoveEnemy } from "../../../utils/skills";
import { Hunger, PlayerStatus } from "../../../utils/constants";

const Battle = () => {
  const store = useContext(StoreContext);
  const player = store.state.player;

  if (!player?.combat) return null; // throw error?

  const { combat, status, hunger, stamina, skills, weapon } = player;
  const { playersTurn, enemy, battleLog, noFlee = true } = combat;

  const [showInventory, setInventory] = useState<boolean>(false);

  useEffect(() => {
    if (!playersTurn) {
    }
  }, [playersTurn]);

  const updateState = (playerState: Player) => setPlayer(store, playerState);

  const useItem = (item: Item) => console.log(item);

  const attack = () => {
    const damage = damageCalculator(weapon, status, hunger);

    const newStamina = Math.max(0, stamina - (weapon?.weight || 1));
    const newStatus = addFatigueStatus(status, newStamina);

    const durability = weapon ? weapon.durability! - 1 : null;
    const weaponState = weapon
      ? ({ ...weapon, durability: durability } as Item)
      : null;

    // add stagger/prone etc
    // add when enemy dies
    const enemyState = {
      ...enemy,
      health: enemy.health - damage,
    } as Enemy;

    const newLog = {
      text: `${weapon.attack}, dealing ${damage} damage!`,
      color: "white",
    } as BattleLog;

    const combatState = {
      ...combat,
      playersTurn: false,
      enemy: enemyState,
      battleLog: battleLog.concat(newLog),
    } as Combat;

    const playerState = {
      ...player,
      status: newStatus,
      stamina: newStamina,
      weapon: weaponState,
      combat: combatState,
    } as Player;

    updateState(playerState);
  };

  const shove = () => {
    const enemy = combat?.enemy;

    const success = shoveEnemy(enemy?.weight, skills.Strength, hunger);

    const enemyStatus = enemy?.status || [];
    if (success) enemyStatus.push(EnemyStatus.Prone);

    const enemyState = {
      ...enemy,
      status: enemyStatus,
    } as Enemy;

    const newStamina = Math.max(0, stamina - 10);
    const newStatus = addFatigueStatus(status, newStamina);

    const newLog = {
      text: success ? `You successfully ` : ``,
      color: "white",
    };

    const combatState = {
      ...player.combat,
      playersTurn: false,
      enemy: enemyState,
      battleLog: [...battleLog, newLog],
    } as Combat;

    const playerState = {
      ...player,
      status: newStatus,
      stamina: newStamina,
      combat: combatState,
      // status: playerStatus,
    } as Player;

    updateState(playerState);
  };

  const flee = () => {};

  const PlayerOptions = () => {
    const gunEquipped = weapon?.weapon === "firearm";
    const isGrabbed = !!status?.find((s) => s === PlayerStatus.Grabbed);
    const exhausted = !!status?.find((s) => s === PlayerStatus.Exhausted);

    const getFleeTitle = () => {
      if (isGrabbed) return "You cannot run while you are being grabbed!";
      if (noFlee) return "You cannot run away from this fight";
      return "Run away from this fight";
    };

    const getAttackTitle = () => {
      if (isGrabbed) return "You cannot attack while you are grabbed!";
      if (exhausted && !gunEquipped)
        return "You are too tired to swing your weapon!";
      return `Attack ${enemy.name} with ${
        player.weapon?.name || "your bare fists"
      }`;
    };

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
            icon={gunEquipped ? faCrosshairs : faHandFist}
            onClick={attack}
            title={getAttackTitle()}
            disabled={isGrabbed || (exhausted && !gunEquipped)}
          />
          <Button
            text="SHOVE"
            icon={faHand}
            onClick={shove}
            title={
              exhausted
                ? "You are too tired to push them back!"
                : "Pushes back an enemy, using STRENGTH"
            }
            disabled={exhausted}
          />
          {/* defend option, recover stamina while taking less damage */}
          {/* <Button
            text="HIDE"
            icon={faUserNinja}
            onClick={hide}
            title="Attempts to hide from enemies"
            disabled={hidden}
          /> */}
          <Button
            text="FLEE"
            icon={faRunning}
            onClick={flee}
            title={getFleeTitle()}
            disabled={noFlee || isGrabbed}
          />
          <Button
            text="ITEM"
            icon={faBriefcase}
            onClick={() => setInventory(true)}
            title={
              isGrabbed
                ? "You are grabbed! You cannot use items"
                : "Select an item from your inventory"
            }
            disabled={isGrabbed}
          />
        </ButtonGroup>
      );
    }
  };

  return (
    <div className="battle">
      <Banner>{enemy.name}</Banner>
      <HealthBar
        health={enemy.health}
        maxHealth={enemy.maxHealth}
        enemy={true}
      />
      <BattleLogDisplay log={battleLog} />
      <HealthBar health={player.health} maxHealth={player.maxHealth} />
      <StaminaBar stamina={player.stamina} maxStamina={player.maxStamina} />
      {/* status effects w modal description of moodles */}
      <br />
      <PlayerOptions />
    </div>
  );
};

const BattleLogDisplay = (props: { log: BattleLog[] }) => {
  return (
    <div className="battle-log">
      {props.log.map((log: BattleLog, index: number) => {
        return (
          <span key={`battlelog-${index}`} style={{ color: log.color }}>
            {log.text}
          </span>
        );
      })}
    </div>
  );
};

const damageCalculator = (
  weapon: Item,
  status: PlayerStatus[],
  hunger: Hunger
) => {
  const { minDmg, maxDmg } = weapon;
  const rawDamage = getRandomInteger(minDmg || 1, maxDmg || 2);
  const fatigueMod = status.includes(PlayerStatus.Tired) ? 0.5 : 1;
  const hungerMod = getHungerModifier(hunger);
  return Math.round(rawDamage * fatigueMod * hungerMod * DIFFICULTY_MODIFIER);
};

const getHungerModifier = (hunger: Hunger) => {
  switch (hunger) {
    case Hunger.Full:
      return 1.05;
    case Hunger.Hungry:
      return 0.95;
    case Hunger.Starving:
      return 0.9;
    case Hunger.Satiated:
    default:
      return 1;
  }
};

const addFatigueStatus = (
  currEffects: PlayerStatus[],
  stamina: number
): PlayerStatus[] => {
  if (stamina > 30) {
    return currEffects.filter(
      (s) => s !== PlayerStatus.Tired && s !== PlayerStatus.Exhausted
    );
  }

  if (stamina <= 30 && stamina > 0) {
    const status = currEffects.filter((s) => s !== PlayerStatus.Exhausted);
    return status.concat(PlayerStatus.Tired);
  }

  if (stamina <= 10) {
    const status = currEffects.filter((s) => s !== PlayerStatus.Tired);
    return status.concat(PlayerStatus.Exhausted);
  }

  return currEffects;
};

export default Battle;
