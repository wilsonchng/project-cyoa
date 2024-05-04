import { useContext, useEffect, useState } from "react";
import {
  faBriefcase,
  faRunning,
  faHandFist,
  faCrosshairs,
  faShieldAlt,
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
import { Combat, CombatLog, Player } from "../../../utils/types";
import {
  DIFFICULTY_MODIFIER,
  Item,
  UNARMED,
  WeaponClass,
} from "../../../utils/items";
import { setPlayer } from "../../../utils/actionCreators";
import { getRandomInteger } from "../../../utils/random";
import { Enemy, EnemyStatus } from "../../../utils/enemy";
import { Skills, shoveEnemy } from "../../../utils/skills";
import { Hunger, PlayerStatus } from "../../../utils/constants";

const Battle = () => {
  const store = useContext(StoreContext);
  const player = store.state.player;

  if (!player?.combat) return null; // throw error?

  const { combat, status, hunger, stamina, skills, weapon, inventory } = player;
  const { playersTurn, enemy, combatLog, noFlee = true } = combat;

  const [showInventory, setInventory] = useState<boolean>(false);

  useEffect(() => {
    if (!playersTurn) {
    }
  }, [playersTurn]);

  const updateState = (playerState: Player) => {
    setPlayer(store, {
      ...playerState,
    });
  };

  const useItem = (item: Item) => console.log(item);

  const attack = () => {
    let newCombatLog = combatLog;
    const damage = damageCalculator(weapon, skills, status, hunger);

    const newStamina = Math.max(0, stamina - (weapon.weight || 1));
    const newStatus = updateFatigue(status, newStamina);

    if (newStatus.includes(PlayerStatus.Exhausted)) {
      newCombatLog.push({
        text: "You are exhausted! Get some rest!",
        color: "red",
      });
    } else if (newStatus.includes(PlayerStatus.Tired)) {
      newCombatLog.push({
        text: "You are starting to feel tired... Melee damage reduced.",
        color: "yellow",
      });
    }

    const durability = weapon.durability! - 1;
    let weaponState = weapon;
    if (durability === 0) {
      newCombatLog.push({
        text: `Your ${weapon.name} has broken!`,
        color: "red",
      });
      weaponState = UNARMED;
    } else {
      weaponState = { ...weapon, durability: durability } as Item;
    }

    // add stagger/prone etc
    // add when enemy dies
    const enemyState = {
      ...enemy,
      health: enemy.health - damage,
    } as Enemy;

    newCombatLog.push({
      text: `${weapon.attack}, dealing ${damage} damage!`,
      color: "white",
    } as CombatLog);

    const combatState = {
      ...combat,
      playersTurn: false,
      enemy: enemyState,
      combatLog: newCombatLog,
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
    let newCombatLog = combatLog;
    const rollValue = shoveEnemy(skills.Strength, hunger, status);

    const enemyStatus = enemy.status || [];
    if (rollValue > enemy.weight) {
      newCombatLog.push({
        text: `You successfully shoved them back! ${enemy.name} is now prone!`,
        color: "white",
      });
      enemyStatus.push(EnemyStatus.Prone);
    } else {
      newCombatLog.push({
        text: `You failed to shove them back! (Rolled: ${rollValue})`,
        color: "red",
      });
    }
    const enemyState = {
      ...enemy,
      status: enemyStatus,
    } as Enemy;

    const newStamina = Math.max(0, stamina - 10);
    const newStatus = updateFatigue(status, newStamina);

    if (newStatus.includes(PlayerStatus.Exhausted)) {
      newCombatLog.push({
        text: "You are exhausted! Get some rest!",
        color: "red",
      });
    } else if (newStatus.includes(PlayerStatus.Tired)) {
      newCombatLog.push({
        text: "You are starting to feel tired... Melee effectiveness reduced.",
        color: "yellow",
      });
    }

    const combatState = {
      ...player.combat,
      playersTurn: false,
      enemy: enemyState,
      combatLog: newCombatLog,
    } as Combat;

    const playerState = {
      ...player,
      status: newStatus,
      stamina: newStamina,
      combat: combatState,
    } as Player;

    updateState(playerState);
  };

  const defend = () => {
    let newCombatLog = combatLog;
    newCombatLog.push({
      text: `You back up and try to catch your breath...`,
      color: "white",
    });

    const newStamina = Math.min(player.maxStamina, stamina + 20);
    const newStatus = updateFatigue(status, newStamina);

    if (!newStatus.includes(PlayerStatus.Exhausted)) {
      newCombatLog.push({
        text: "You are no longer exhausted!",
        color: "lawngreen",
      });
    } else if (!newStatus.includes(PlayerStatus.Tired)) {
      newCombatLog.push({
        text: "You are no longer tired!",
        color: "lawngreen",
      });
    }

    const combatState = {
      ...player.combat,
      playersTurn: false,
      combatLog: newCombatLog,
    } as Combat;

    const playerState = {
      ...player,
      status: newStatus,
      stamina: newStamina,
      combat: combatState,
    } as Player;

    updateState(playerState);
  };

  const flee = () => {};

  const PlayerOptions = () => {
    const gunEquipped = weapon.weaponClass === WeaponClass.Firearm;
    const isGrabbed = !!status?.find((s) => s === PlayerStatus.Grabbed);
    const exhausted = !!status?.find((s) => s === PlayerStatus.Exhausted);
    const enemyProne = enemy.status?.includes(EnemyStatus.Prone);

    const getFleeTitle = () => {
      if (isGrabbed) return "You cannot run while you are being grabbed!";
      if (noFlee) return "You cannot run away from this fight";
      if (exhausted) return "You are too tired to flee!";
      return "Run away from this fight";
    };

    const getAttackTitle = () => {
      if (isGrabbed) return "You cannot attack while you are grabbed!";
      if (exhausted && !gunEquipped)
        return "You are too tired to swing your weapon!";
      return `${gunEquipped ? "Shoot" : "Attack"} ${enemy.name} with ${
        weapon.name
      }`;
    };

    const getShoveTitle = () =>
      enemyProne
        ? "The enemy is already prone!"
        : "Push back an enemy, potentially making them fall prone";

    const getDefendTitle = () =>
      isGrabbed
        ? "You are grabbed! Push them back!"
        : "Protect yourself and regain some stamina";

    if (showInventory) {
      return (
        <ButtonGroup>
          {inventory.length === 0 ? (
            <p className="info-text">You have no items!</p>
          ) : (
            inventory.map((item) => (
              <Button text={item.name} onClick={() => useItem(item)} />
            ))
          )}
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
            title={getShoveTitle()}
            disabled={enemyProne}
          />
          <Button
            text="DEFEND"
            title={getDefendTitle()}
            onClick={defend}
            icon={faShieldAlt}
            disabled={isGrabbed}
          />
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
            disabled={noFlee || isGrabbed || exhausted}
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
      <CombatLogDisplay log={combatLog} />
      <HealthBar health={player.health} maxHealth={player.maxHealth} />
      <StaminaBar stamina={player.stamina} maxStamina={player.maxStamina} />
      {/* status effects w modal description of moodles */}
      <br />
      <PlayerOptions />
    </div>
  );
};

const CombatLogDisplay = (props: { log: CombatLog[] }) => {
  return (
    <div className="battle-log">
      {props.log.map((log: CombatLog, index: number) => {
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
  skills: Skills,
  status: PlayerStatus[],
  hunger: Hunger
) => {
  const { minDmg, maxDmg } = weapon;
  const rawDamage = getRandomInteger(minDmg || 1, maxDmg || 2);
  const skillMod = getSkillsModifier(skills, weapon.weaponClass);
  const fatigueMod = getStatusModifier(status);
  const hungerMod = getHungerModifier(hunger);
  return Math.round(
    rawDamage * (fatigueMod + hungerMod + skillMod + DIFFICULTY_MODIFIER)
  );
};

const getSkillsModifier = (
  skills: Skills,
  weaponClass: WeaponClass | undefined
) => {
  switch (weaponClass) {
    case WeaponClass.Firearm:
      return skills.Firearms * 0.1;
    case WeaponClass.Axe:
      return skills.Axes * 0.1 + skills.Strength * 0.05;
    case WeaponClass.Blade:
      return skills.Blades * 0.1 + skills.Strength * 0.05;
    case WeaponClass.Blunt:
      return skills.Bludgeon * 0.1 + skills.Strength * 0.05;
    default:
      return 0;
  }
};

// 25% less melee damage when tired
const getStatusModifier = (status: PlayerStatus[]) =>
  status.includes(PlayerStatus.Tired) ? -0.25 : 0;

const getHungerModifier = (hunger: Hunger) => {
  switch (hunger) {
    case Hunger.Full:
      return 0.05;
    case Hunger.Hungry:
      return -0.05;
    case Hunger.Starving:
      return -0.1;
    case Hunger.Satiated:
    default:
      return 0;
  }
};

const updateFatigue2 = (
  stamina: number,
  newStamina: number,
  status: PlayerStatus[],
  log: CombatLog[]
) => {
  if (newStamina > stamina) {
  } else {
    if (stamina === 0) {
    }
  }
};

const updateFatigue = (
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
