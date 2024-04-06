import { useContext, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faVenus, faMars } from "@fortawesome/free-solid-svg-icons";

import { StoreContext } from "../../App";
import { Banner, Button, Dropdown, IconButton } from "../common";
import {
  Chapter,
  Sex,
  Hunger,
  Occupation,
  Screen,
  Hobby,
} from "../../utils/constants";
import { Playthrough } from "../../utils/types";
import { UpdateType } from "../../utils/store";
import { getRandomEnum, getRandomName } from "../../utils/random";
import { getHobbyIcon, getOccupationIcon, getSkills } from "../../utils/skills";
import { SkillSheet } from "./Character";
import { useSound } from "../../utils/hooks";

import "./screens.css";

const CharacterCreation = () => {
  const store = useContext(StoreContext);

  const changeScreen = (screen: Screen) => () =>
    store.dispatch({ type: UpdateType.Screen, payload: screen });

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

  const onToggle = (selection: Sex) => {
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

    const newCharacter: Playthrough = {
      name: name,
      sex: sex,
      occupation: occupation,
      hobby: hobby,
      skills: skills,
      chapter: Chapter.Rosewood,
      health: 100,
      hunger: Hunger.Satiated,
      inventory: [],
      killCount: 0,
      daysLived: 0,
    };

    store.dispatch({ type: UpdateType.NewPlaythrough, payload: newCharacter });
    store.dispatch({ type: UpdateType.Screen, payload: Screen.Game });
  };

  return (
    <>
      <Banner>NEW GAME</Banner>
      <div className="container">
        <NameInput name={name} error={error} sex={sex} onChange={setName} />
        <SexSelector sex={sex} onToggle={onToggle} />
        <OccupationChoice occupation={occupation} onChange={setOccupation} />
        <HobbyChoice hobby={hobby} onChange={setHobby} />
        <SkillSheet skills={skills} />
      </div>
      <br />
      <Button text="START" sound="start" onClick={startGame} disabled={error} />
      <Button text="BACK" onClick={changeScreen(Screen.MainMenu)} />
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

  const mySound = useSound("diceRoll.mp3");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  const randomName = () => {
    mySound.play();
    onChange(getRandomName(sex));
  };

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
        />
        <IconButton
          icon={faDice}
          onClick={randomName}
          title="Random Name"
          style={{ marginLeft: "5px" }}
          bounce={error}
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

  return (
    <div className="row">
      <label>Occupation:</label>
      <Dropdown
        options={Object.values(Occupation)}
        initial={occupation}
        title="Select Occupation"
        onChange={(o: string) => onChange(o as Occupation)}
        getIcon={getOccupationIcon}
      />
    </div>
  );
};

const HobbyChoice = (props: {
  hobby: Hobby;
  onChange: (hob: Hobby) => void;
}) => {
  const { hobby, onChange } = props;

  return (
    <div className="row">
      <label>Hobby:</label>
      <Dropdown
        options={Object.values(Hobby)}
        initial={hobby}
        title="Select Hobby"
        onChange={(h: string) => onChange(h as Hobby)}
        getIcon={getHobbyIcon}
      />
    </div>
  );
};

export default CharacterCreation;
