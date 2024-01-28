import { useContext, useRef, useState } from "react";
import {
    ScreenID,
    UpdateType,
    Character,
    Hobby,
    Occupation,
} from "../../utils/types";
import { StoreContext } from "../../App";
import { Banner, Button } from "../common";
import {
    getOccupationDescription,
    getHobbyDescription,
    getStarterAbilities,
    getOccupationAbilities,
    getHobbyAbilities,
} from ".";
import CharacterDescription from "./CharacterStats";

const CharacterCreation = () => {
    const store = useContext(StoreContext);

    const [stage, setStage] = useState<Stage>(Stage.Name);
    const [name, setName] = useState<string>("");
    const [occupation, setOccupation] = useState<Occupation | null>(null);
    const [hobby, setHobby] = useState<Hobby | null>(null);

    const changeScreen = (screen: ScreenID) =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    const changeStage = (stage: Stage) => () => setStage(stage);

    const NameInput = () => {
        const [error, setError] = useState<boolean>(false);
        const inputRef = useRef<HTMLInputElement>(null);

        const onSubmit = () => {
            const inputValue = inputRef.current?.value;

            if (!inputValue) {
                setError(true);
                return;
            }

            setName(inputRef.current?.value || "");
            setStage(Stage.OccupationChoice);
        };

        const onChange = () => setError(false);

        const randomName = (event: React.MouseEvent) => {
            // todo: add random name generator
            event.preventDefault();
            setError(false);
            setName("test");
        };

        return (
            <>
                <Banner>Who are you?</Banner>
                <br />
                <div className="row">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className={`text-input ${error && "invalid"}`}
                        id="name"
                        placeholder="Character name..."
                        ref={inputRef}
                        autoFocus={true}
                        minLength={1}
                        maxLength={24}
                        onChange={onChange}
                    />
                    {/* <button onClick={randomName}>Random!</button> */}
                </div>
                {error && <p className="error">Please enter a valid name</p>}
                <br />
                <Button disabled={error} onClick={onSubmit}>
                    Next
                </Button>
            </>
        );
    };

    const OccupationChoice = () => {
        const onClick = (selection: Occupation) => () => {
            setOccupation(selection);
            setStage(Stage.OccupationInfo);
        };

        return (
            <>
                <Banner>What was your profession?</Banner>
                <br />
                {Object.values(Occupation).map((key) => {
                    return (
                        <Button onClick={onClick(key as Occupation)}>
                            {key as string}
                        </Button>
                    );
                })}
                <br />
                <em className="info-text">
                    Backstories affect starting skills, some provide unique
                    abilities, and influence endings
                </em>
            </>
        );
    };

    const OccupationInfo = () => {
        const abilities = getOccupationAbilities(occupation);
        const text = Object.entries(abilities)
            .map(([key, value]) => {
                return `+${value} ${key}`;
            })
            .join(", ");

        return (
            <>
                <Banner>{occupation}</Banner>
                <p>{getOccupationDescription(occupation)}</p>
                <p className="bonus-text">{text}</p>
                <br />
                <Button onClick={changeStage(Stage.HobbyChoice)}>Next</Button>
            </>
        );
    };

    const HobbyChoice = () => {
        const onClick = (selection: Hobby) => () => {
            setHobby(selection);
            setStage(Stage.HobbyInfo);
        };

        return (
            <>
                <Banner>What was your hobby?</Banner>
                <br />
                {Object.values(Hobby).map((key) => {
                    return (
                        <Button onClick={onClick(key as Hobby)}>
                            {key as string}
                        </Button>
                    );
                })}
                <br />
                <em className="info-text">
                    Hobbies provide additional skills or unique abilities
                </em>
            </>
        );
    };

    const HobbyInfo = () => {
        const abilities = getHobbyAbilities(hobby);
        const text = Object.entries(abilities)
            .map(([key, value]) => {
                return `+${value} ${key}`;
            })
            .join(", ");

        return (
            <>
                <Banner>{hobby}</Banner>
                <p>{getHobbyDescription(hobby)}</p>
                <p className="bonus-text">{text}</p>
                <br />
                <Button onClick={changeStage(Stage.Final)}>Next</Button>
            </>
        );
    };

    const FinalPage = () => {
        const beginGame = () => {
            store.dispatch({
                type: UpdateType.Character,
                payload: charData,
            });
            changeScreen(ScreenID.Game);
        };

        const reset = () => {
            setName("");
            setOccupation(null);
            setHobby(null);
            changeStage(Stage.Name)();
        };

        const charData: Character = {
            name: name,
            occupation: occupation,
            hobby: hobby,
            ability: getStarterAbilities(occupation, hobby),
        };

        return (
            <>
                <Banner>Your Character</Banner>
                <br />
                <CharacterDescription character={charData} />
                <br />
                <Button onClick={beginGame}>BEGIN</Button>
                <Button onClick={reset}>Change selection</Button>
            </>
        );
    };

    const renderPage = () => {
        switch (stage) {
            case Stage.OccupationChoice:
                return <OccupationChoice />;
            case Stage.OccupationInfo:
                return <OccupationInfo />;
            case Stage.HobbyChoice:
                return <HobbyChoice />;
            case Stage.HobbyInfo:
                return <HobbyInfo />;
            case Stage.Final:
                return <FinalPage />;
            case Stage.Name:
            default:
                return <NameInput />;
        }
    };

    return renderPage();
};

const enum Stage {
    Name,
    OccupationChoice,
    OccupationInfo,
    HobbyChoice,
    HobbyInfo,
    Final,
}

export default CharacterCreation;
