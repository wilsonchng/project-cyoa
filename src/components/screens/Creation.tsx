import { useContext, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDice,
  faVenus,
  faMars,
  faBiohazard,
} from "@fortawesome/free-solid-svg-icons";

import { StoreContext } from "../../App";
import { Banner, Button, Dropdown, IconButton } from "../common";
import {
  Chapter,
  Sex,
  Hunger,
  Occupation,
  Screen,
  Hobby,
  Page,
} from "../../utils/constants";
import { Player } from "../../utils/types";
import { getRandomEnum, getRandomName } from "../../utils/random";
import {
  getHobbyIcon,
  getHobbySkills,
  getMaxStamina,
  getOccupationIcon,
  getOccupationSkills,
  getSkills,
} from "../../utils/skills";
import { SkillSheet } from "./Character";
import { useSound } from "../../utils/customHooks";
import { changeScreen, setPlayer } from "../../utils/actionCreators";
import { UNARMED } from "../../utils/items";

import "./screens.css";

const CharacterCreation = () => {
  const store = useContext(StoreContext);

  const [sex, setSex] = useState<Sex>(Sex.Male);
  const [name, setName] = useState<string>(getRandomName(sex));
  const [error, setError] = useState<boolean>(false);
  const [hobby, setHobby] = useState<Hobby>(getRandomEnum(Hobby) as Hobby);
  const [occupation, setOccupation] = useState<Occupation>(
    getRandomEnum(Occupation) as Occupation
  );

  const skills = useMemo(
    () => getSkills(occupation, hobby),
    [occupation, hobby]
  );

  useEffect(() => {
    if (name && name.length > 0) setError(false);
  }, [name]);

  const allRandom = () => {
    const newSex = getRandomEnum(Sex) as Sex;
    setSex(newSex);
    setName(getRandomName(newSex));
    setHobby(getRandomEnum(Hobby) as Hobby);
    setOccupation(getRandomEnum(Occupation) as Occupation);
  };

  const onSexToggle = (selection: Sex) => {
    if (sex === selection) return;
    const newSex = sex === Sex.Male ? Sex.Female : Sex.Male;
    setSex(newSex);
    setName(getRandomName(newSex));
  };

  const startGame = () => {
    if (!name) {
      setError(true);
      return;
    }

    const stamina = getMaxStamina(skills.Fitness, Hunger.Satiated);

    const newCharacter: Player = {
      name: name,
      sex: sex,
      occupation: occupation,
      hobby: hobby,
      skills: skills,
      chapter: Chapter.Rosewood,
      // page: Page.Prologue,
      page: Page.Tutorial,
      combat: null,
      health: 100,
      maxHealth: 100,
      stamina: stamina,
      maxStamina: stamina,
      hunger: Hunger.Satiated,
      status: [],
      weapon: UNARMED,
      inventory: [],
      killCount: 0,
      daysLived: 0,
      metaData: null,
    };

    setPlayer(store, newCharacter);
    changeScreen(store, Screen.Game);
  };

  return (
    <>
      <Banner>NEW GAME</Banner>
      <div className="container">
        <NameInput name={name} error={error} sex={sex} onChange={setName} />
        <SexSelector sex={sex} onToggle={onSexToggle} />
        <OccupationChoice occupation={occupation} onChange={setOccupation} />
        <HobbyChoice hobby={hobby} onChange={setHobby} />
        <SkillSheet skills={skills} />
      </div>
      <br />
      <Button
        text="START"
        onClick={startGame}
        disabled={error}
        icon={faBiohazard}
      />
      <Button
        text="RANDOM"
        onClick={allRandom}
        sound="diceRoll"
        icon={faDice}
      />
      <Button
        text="BACK"
        onClick={() => changeScreen(store, Screen.MainMenu)}
      />
    </>
  );
};

const NameInput = (props: {
  name: string;
  error: boolean;
  sex: Sex;
  onChange: (s: string) => void;
}) => {
  const { name, error, sex: sex, onChange } = props;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <div style={{ display: "flex" }}>
      <div className="row">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          className={`text-input ${error && "invalid"}`}
          value={name}
          maxLength={24}
          onChange={onInputChange}
          autoFocus={true}
        />
      </div>
      {error && (
        <span
          className="error"
          style={{ marginTop: "36px", marginLeft: "52px" }}
        >
          Please enter a valid name
        </span>
      )}
    </div>
  );
};

const SexSelector = (props: { sex: Sex; onToggle: (sex: Sex) => void }) => {
  const { sex: sex, onToggle } = props;

  const clickSound = useSound("click.mp3");

  const onClick = (sex: Sex) => () => {
    clickSound.play();
    onToggle(sex);
  };

  return (
    <div className="row">
      <label>Sex:</label>
      <button
        title="Select Male"
        className="sex-button male"
        disabled={sex === Sex.Male}
        onMouseDown={onClick(Sex.Male)}
      >
        Male
        <FontAwesomeIcon icon={faMars} />
      </button>
      <button
        title="Select Female"
        className="sex-button female"
        disabled={sex === Sex.Female}
        onMouseDown={onClick(Sex.Female)}
      >
        Female
        <FontAwesomeIcon icon={faVenus} />
      </button>
    </div>
  );
};

const OccupationChoice = (props: {
  occupation: Occupation;
  onChange: (occ: Occupation) => void;
}) => {
  const { occupation, onChange } = props;

  const bonuses = Object.entries(getOccupationSkills(occupation))
    .map((skill) => {
      return `+${skill[1]} ${skill[0]}`;
    })
    .join(", ");

  return (
    <>
      <div className="row">
        <label>Occupation:</label>
        <Dropdown
          options={Object.values(Occupation)}
          selected={occupation}
          title="Select Occupation"
          onChange={(o: string) => onChange(o as Occupation)}
          getIcon={getOccupationIcon}
        />
      </div>
      <span className="bonus-text">{bonuses}</span>
    </>
  );
};

const HobbyChoice = (props: {
  hobby: Hobby;
  onChange: (hob: Hobby) => void;
}) => {
  const { hobby, onChange } = props;

  const bonuses = Object.entries(getHobbySkills(hobby))
    .map((skill) => {
      return `+${skill[1]} ${skill[0]}`;
    })
    .join(", ");

  return (
    <>
      <div className="row">
        <label>Hobby:</label>
        <Dropdown
          options={Object.values(Hobby)}
          selected={hobby}
          title="Select Hobby"
          onChange={(h: string) => onChange(h as Hobby)}
          getIcon={getHobbyIcon}
        />
      </div>
      <span className="bonus-text">{bonuses}</span>
    </>
  );
};

export default CharacterCreation;
