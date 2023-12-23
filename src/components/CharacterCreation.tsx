import { useContext, useRef, useState } from "react";
import {
    Hobby,
    Backstory,
    ScreenID,
    UpdateType,
    Character,
    Item,
} from "../utils/types";
import { StoreContext } from "../App";
import Banner from "./Banner";

const CharacterCreation = () => {
    const store = useContext(StoreContext);

    const [stage, setStage] = useState<Stage>(Stage.Name);
    const [name, setName] = useState<string>("");
    const [backstory, setBackstory] = useState<Backstory | null>(null);
    const [hobby, setHobby] = useState<Hobby | null>(null);
    const [items, setItems] = useState<Item[]>([]);

    const changeScreen = (screen: ScreenID) =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    const changeStage = (stage: Stage) => () => setStage(stage);

    const NameInput = () => {
        const inputRef = useRef<HTMLInputElement>(null);

        const onSubmit = () => {
            setName(inputRef.current?.value || "");
            setStage(Stage.BackstoryChoice);
        };

        const randomName = (event: React.MouseEvent) => {
            // todo: add random name generator
            event.preventDefault();
            setName("test");
        };

        return (
            <>
                <Banner>Who are you?</Banner>
                <form onSubmit={onSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        ref={inputRef}
                        required={true}
                        autoFocus={true}
                        minLength={1}
                        maxLength={16}
                    />
                    {/* <button onClick={randomName}>Random!</button> */}
                    <input type="submit" />
                </form>
            </>
        );
    };

    const BackstoryChoice = () => {
        const onClick = (selection: Backstory) => () => {
            setBackstory(selection);
            setStage(Stage.BackstoryInfo);
        };

        return (
            <>
                <Banner>What was your occupation?</Banner>
                {Object.values(Backstory).map((key) => {
                    return (
                        <button key={key} onClick={onClick(key as Backstory)}>
                            {key}
                        </button>
                    );
                })}
            </>
        );
    };

    const BackstoryInfo = () => {
        const getText = () => {
            switch (backstory) {
                case Backstory.Burglar:
                    return "Your day job is a cashier at Greene's Grocery, but it is just a guise. Your real money maker are the planned heists or burglary you commit every once in a while. You are good at breaking into homes, sneaking around, and hotwiring cars.";
                case Backstory.Doctor:
                    return "You have a medical degree from Louisville State University. After several years at Louisville General, you have settled for the quieter role of local physician at Rosewood Medical. You have extensive knowledge in medicine and first aid.";
                case Backstory.Firefighter:
                    return "You were an active firefighter in the Rosewood Fire Department. Years of physical training has left you with a fit and strong body.";
                case Backstory.PoliceOfficer:
                    return "You were an officer of the local law enforcement. Rosewood has a larger than normal police force due to the nearby Kentucky State Prison, and your job often includes escorting inmates to the correctional facility. You are proficient with firearms.";
                case Backstory.Veteran:
                    return "You served two tours in the Vietnam War. Having witnessed firsthand the atrocities committed there you have become desensitized to blood and violence. However, it has also left you with lifelong PTSD, and frequent night terrors. You retain your skill with firearms.";
                case Backstory.Unemployed:
                    return "Times have been hard even before the outbreak, and you were living off social welfare for months. You have no notable skills.";
                default:
                    return "";
            }
        };

        return (
            <>
                <Banner>{backstory}</Banner>
                <p>{getText()}</p>
                <button onClick={changeStage(Stage.HobbyChoice)}>Next</button>
            </>
        );
    };

    const HobbyChoice = () => {
        const getStarterItems = (selection: Hobby) => {
            switch (selection) {
                case Hobby.Angler:
                    return [Item.FishingRod];
                case Hobby.Baseball:
                    return [Item.BaseballBat];
                case Hobby.Cooking:
                    return [Item.KitchenKnife];
                case Hobby.Hiking:
                    return [Item.Tent, Item.Campfire];
                case Hobby.Scout:
                    return [Item.FirstAid];
                default:
                    return [];
            }
        };

        const onClick = (selection: Hobby) => () => {
            setHobby(selection);
            setItems(getStarterItems(selection));
            setStage(Stage.HobbyInfo);
        };

        return (
            <>
                <Banner>What was your hobby?</Banner>
                {Object.values(Hobby).map((key) => {
                    return (
                        <button key={key} onClick={onClick(key as Hobby)}>
                            {key}
                        </button>
                    );
                })}
            </>
        );
    };

    const HobbyInfo = () => {
        const getText = () => {
            switch (hobby) {
                case Hobby.Angler:
                    return "You were an avid angler and participated in several fishing competitions. You start with fishing equipment.";
                case Hobby.Baseball:
                    return "You are a fan of baseball and used to play competitively in college. You start with a baseball bat.";
                case Hobby.Cooking:
                    return "You have a deep and profound passion for cooking. You've watched all the cooking shows and know all the common recipes. You start with your chef's knife.";
                case Hobby.Gymnast:
                    return "You were a gymnast in high school. Having exceptional balance, you are nimble and lightfooted.";
                case Hobby.Hiking:
                    return "You love the outdoors and would often camp in the woods during summers. You start with some camping equipment.";
                case Hobby.Runner:
                    return "You love to run. Years of marathon training have given you with exceptional endurance and the ability to sprint quickly.";
                case Hobby.Scout:
                    return "You were a former scout in high school. You know basic first aid and survival skills. You start with a first aid kit.";
                default:
                    return "";
            }
        };

        return (
            <>
                <Banner>{hobby}</Banner>
                <p>{getText()}</p>
                <button onClick={changeStage(Stage.Final)}>Next</button>
            </>
        );
    };

    const FinalPage = () => {
        const beginGame = () => {
            store.dispatch({
                type: UpdateType.Character,
                payload: {
                    name: name,
                    backstory: backstory,
                    hobby: hobby,
                } as Character,
            });
            items.forEach((item: Item) => {
                store.dispatch({
                    type: UpdateType.AddItem,
                    payload: item,
                });
            });
            changeScreen(ScreenID.Game);
        };

        return (
            <>
                <Banner>Your Character</Banner>
                <p>{`Name: ${name}`}</p>
                <p>{`Backstory: ${backstory}`}</p>
                <p>{`Hobby: ${hobby}`}</p>
                <p>{`Starting Items: ${items.join(", ")}`}</p>
                <button onClick={changeStage(Stage.Name)}>
                    Change selection
                </button>
                <button onClick={beginGame}>BEGIN</button>
            </>
        );
    };

    const renderPage = () => {
        switch (stage) {
            case Stage.BackstoryChoice:
                return <BackstoryChoice />;
            case Stage.BackstoryInfo:
                return <BackstoryInfo />;
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
    BackstoryChoice,
    BackstoryInfo,
    HobbyChoice,
    HobbyInfo,
    Final,
}

export default CharacterCreation;
