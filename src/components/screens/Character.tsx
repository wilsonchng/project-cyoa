import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import {
  faAddressCard,
  faMars,
  faUtensils,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";

import { Player } from "../../utils/types";
import { Hunger, Sex } from "../../utils/constants";
import {
  Banner,
  IconButton,
  Modal,
  HealthBar,
  Button,
  StaminaBar,
} from "../common";
import { StoreContext } from "../../App";
import {
  Skills,
  getHobbyIcon,
  getOccupationIcon,
  getSkillDescription,
} from "../../utils/skills";
import { changeScreen } from "../../utils/actionCreators";

export const CharacterSheet = () => {
  const store = useContext(StoreContext);
  const player = store.state.player;

  return (
    <>
      {player && (
        <div className="container">
          <Banner>{player.name}</Banner>
          <Background character={player} />
          <Status character={player} />
          <SkillSheet skills={player.skills} />
        </div>
      )}
      <br />
      <Button
        text="Back"
        onClick={() => changeScreen(store, store.state.lastScreen)}
      />
    </>
  );
};

const Status = (props: { character: Player }) => {
  const {
    health,
    maxHealth,
    stamina,
    maxStamina,
    hunger,
    killCount,
    daysLived,
  } = props.character;

  return (
    <>
      <div className="row">
        <label>Health:</label>
        <HealthBar health={health} maxHealth={maxHealth} />
      </div>
      <div className="row">
        <label>Stamina:</label>
        <StaminaBar stamina={stamina} maxStamina={maxStamina} />
      </div>
      <div className="row">
        <HungerStatus hunger={hunger} />
      </div>
      <div className="row">
        <label>Zombies Killed:</label>
        <span>{killCount}</span>
      </div>
      <div className="row">
        <label>Days Survived:</label>
        <span>{daysLived}</span>
      </div>
    </>
  );
};

const HungerStatus = (props: { hunger: Hunger }) => {
  const { hunger } = props;

  const [open, setOpen] = useState<boolean>(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const getColor = () => {
    switch (hunger) {
      case Hunger.Full:
        return "lawngreen";
      case Hunger.Satiated:
        return "bisque";
      case Hunger.Hungry:
        return "darkorange";
      case Hunger.Starving:
        return "red";
    }
  };

  return (
    <>
      <label>Hunger:</label>
      <span style={{ color: getColor() }}>{hunger}</span>
      <IconButton
        icon={faCircleQuestion}
        style={{ marginLeft: "5px" }}
        onClick={openModal}
      />
      <Modal header="HUNGER" icon={faUtensils} open={open} onClose={closeModal}>
        <div className="container">
          <p>Affects physical performance, eat food to reduce hunger.</p>
          <p>
            <strong>FULL</strong> +5% MELEE damage, +5% chance to SHOVE, +10 MAX
            STAMINA
          </p>
          <p>
            <strong>SATIATED</strong> no bonuses or penalties
          </p>
          <p>
            <strong>HUNGRY</strong> -5% MELEE damage, -5% chance to SHOVE, -10
            MAX STAMINA
          </p>
          <p>
            <strong>STARVING</strong> -10% MELEE damage, -10% chance to SHOVE,
            -20 MAX STAMINA
          </p>
        </div>
      </Modal>
    </>
  );
};

const Background = (props: { character: Player }) => {
  const { sex, occupation, hobby, chapter } = props.character;

  return (
    <>
      <div className="row">
        <label>Sex:</label>
        <span>{sex}</span>
        <FontAwesomeIcon icon={sex === Sex.Male ? faMars : faVenus} />
      </div>
      <div className="row">
        <label>Occupation:</label>
        <span>{occupation}</span>
        <FontAwesomeIcon icon={getOccupationIcon(occupation)} />
      </div>
      <div className="row">
        <label>Hobby:</label>
        <span>{hobby}</span>
        <FontAwesomeIcon icon={getHobbyIcon(hobby)} />
      </div>
      <div className="row">
        <label>Chapter:</label>
        <span>{chapter}</span>
      </div>
    </>
  );
};

export const SkillSheet = (props: { skills: Skills }) => {
  const { skills } = props;

  const [open, setOpen] = useState<boolean>(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <div className="skills-description">
        <div className="contents">
          <h3>Skills</h3>
          <IconButton icon={faCircleQuestion} onClick={openModal} />
        </div>
        <div className="contents">
          <div className="column">
            {Object.entries(skills)
              .slice(0, 4)
              .map(([key, value]) => {
                return (
                  <div
                    key={key}
                    title={getSkillDescription(key)}
                  >{`${key}: ${value}`}</div>
                );
              })}
          </div>
          <div className="column">
            {Object.entries(skills)
              .slice(4)
              .map(([key, value]) => {
                return (
                  <div
                    key={key}
                    title={getSkillDescription(key)}
                  >{`${key}: ${value}`}</div>
                );
              })}
          </div>
        </div>
      </div>
      <Modal
        header="SKILLS"
        icon={faAddressCard}
        open={open}
        onClose={closeModal}
      >
        <div className="container">
          {Object.keys(skills).map((key) => {
            return (
              <p key={key}>
                <strong>{key.toUpperCase()}</strong> {getSkillDescription(key)}
              </p>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default CharacterSheet;
