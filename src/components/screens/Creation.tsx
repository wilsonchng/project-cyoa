import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faVenus, faMars } from "@fortawesome/free-solid-svg-icons";

import { StoreContext } from "../../App";
import { Banner, Button, Dropdown, IconButton } from "../common";
import {
  Chapter,
  Gender,
  Hunger,
  Occupation,
  Screen,
} from "../../utils/constants";
import { Playthrough } from "../../utils/types";
import { UpdateType } from "../../utils/store";
import { getRandomName } from "../../utils/randomName";

import "./screens.css";

const CharacterCreation = () => {
  const store = useContext(StoreContext);

  const changeScreen = (screen: Screen) => () =>
    store.dispatch({ type: UpdateType.Screen, payload: screen });

  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [name, setName] = useState<string>(getRandomName(gender));
  const [occupation, setOccupation] = useState<Occupation>(
    Occupation.Firefighter
  );
  const [error, setError] = useState<boolean>(false);

  const clickSound = require("../../assets/sounds/click.mp3");
  const diceRollSound = require("../../assets/sounds/diceRoll.mp3");

  const clickAudio = new Audio(clickSound);
  const diceRollAudio = new Audio(diceRollSound);

  useEffect(() => {
    if (name && name.length > 0) setError(false);
  }, [name]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onToggle = (selection: Gender) => () => {
    if (gender === selection) return;
    clickAudio.play();
    const newGender = gender === Gender.Male ? Gender.Female : Gender.Male;
    setGender(newGender);
    setName(getRandomName(newGender));
  };

  const randomName = () => {
    diceRollAudio.play();
    setName(getRandomName(gender));
  };

  const startGame = () => {
    if (!name) {
      setError(true);
      return;
    }

    const newCharacter: Playthrough = {
      name: name,
      occupation: occupation,
      chapter: Chapter.Rosewood,
      health: 100,
      hunger: Hunger.Satiated,
      weapon: null,
      inventory: [],
      killCount: 0,
      daysLived: 0,
    };

    store.dispatch({ type: UpdateType.NewPlaythrough, payload: newCharacter });
    store.dispatch({ type: UpdateType.Screen, payload: Screen.Game });
  };

  const GenderSelector = () => {
    return (
      <div className="row">
        <label>Gender:</label>
        <button
          title="Select Male"
          className="gender-button male"
          disabled={gender === Gender.Male}
          onMouseDown={onToggle(Gender.Male)}
        >
          Male
          <FontAwesomeIcon icon={faMars} />
        </button>
        <button
          title="Select Female"
          className="gender-button female"
          disabled={gender === Gender.Female}
          onMouseDown={onToggle(Gender.Female)}
        >
          Female
          <FontAwesomeIcon icon={faVenus} />
        </button>
      </div>
    );
  };

  return (
    <>
      <Banner>NEW GAME</Banner>
      <div className="container">
        <div className="row">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            className={`text-input ${error && "invalid"}`}
            value={name}
            maxLength={24}
            onChange={onChange}
          />
          <IconButton
            icon={faDice}
            onClick={randomName}
            title="Random Name"
            style={{ marginLeft: "5px" }}
          />
        </div>
        {error && <p className="error">Please enter a valid name</p>}
        <GenderSelector />
        <div className="row">
          <label style={{ alignSelf: "flex-start", marginTop: "10px" }}>
            Occupation:
          </label>
          <Dropdown
            onChange={(selection: string) =>
              setOccupation(selection as Occupation)
            }
            options={Object.values(Occupation)}
            initial={occupation}
            title="Select Occupation"
          />
        </div>
        {/* add hobby / traits */}
        {/* add occupation description */}
      </div>
      <br />
      <Button text="START" onClick={startGame} disabled={error} />
      <Button text="BACK" onClick={changeScreen(Screen.MainMenu)} />
    </>
  );
};

export default CharacterCreation;
