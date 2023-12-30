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
                    return "You were a person of dual identities. By day, you stood behind the cash register, exchanging pleasantries and handling transactions with a smile. However, when the night fell, a different side of you emerged. The shadows become your ally, and the darkness of the night concealed your clandestine activities. As a burglar, you moved with calculated precision, sneaking past watchful eyes. Your fingers, nimble and quick with handling currency during the day, were equally adept at picking locks at night. It was a life of secrets, where the monotony of the day job provided the perfect cover for your nocturnal escapades.";
                case Backstory.Doctor:
                    return "You were once a respected and skilled doctor, dedicated to the well-being of your patients. Your days were filled with the precision of medical procedures, the compassion of healing, and the tireless pursuit of saving lives. Your hands, once accustomed to the delicate art of surgery, are steady and sure with the scalpel and needle. You are not just a survivor; you are a healer in a world desperately in need of one.";
                case Backstory.Firefighter:
                    return "You were a dedicated firefighter, a hero clad in protective gear with a heart ablaze with courage. You sprint towards danger where others would flee, navigating the chaos of a burning building with calm determination. Your physique is a testament to the rigourous exercises and drills, training for the most demanding of situations. Even amongst your fellow firefighters, your expertise with the axe is unparalleled. Whether it is breaching doors, venting roofs, or overcoming whatever obstacles in the way of your mission, the axe is an extension of your own strength.";
                case Backstory.PoliceOfficer:
                    return "The choice to be a police officer was not just a career; it was a calling. As you patrolled the streets, interacted with citizens, and enforced the law, you carried the weight of responsibility on your shoulders, driven by a commitment to uphold justice and protect those you served. Your proficiency with firearms set you apart in the line of duty. Your accuracy and precision with your service weapon a testament to the countless hours of training and practice you dedicated to honing your marksmanship skills.";
                case Backstory.Veteran:
                    return "You are a seasoned veteran of the Vietnam War, a person marked by the indelible experience of war. The memories etched in your mind were not picturesque landscapes but the harsh realities. Violence and terror became constant companions, shaping your perception of the world. Desensitization was a coping mechanism that allowed you to navigate the brutalities of war without being overwhelmed by the emotional toll. The war may have ended, but its echoes persist in the shadows of your consciousness.";
                case Backstory.Unemployed:
                    return "You find yourself in a rough patch, where luck seemed to have turned its back on you. Despite your best efforts, the road to employment appears to be strewn with obstacles, and the job market seems unyielding. Days blend into each other as you send out countless resumes, fill out application forms, and attend interviews, only to face disappointment. Financial strain intensifies, and the bills become a constant reminder of the precariousness of your situation. Little did you know that the difficulties of unemployment would soon pale in comparison to the survival challenges posed by the impending catastrophe.";
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
        const onClick = (selection: Hobby) => () => {
            setHobby(selection);
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
                case Hobby.Fishing:
                    return "In your hands, a fishing rod becomes an extension of your passion. Whether standing alone on a quiet dock or sharing stories with your fellow anglers, the pursuit of that elusive catch brings you both tranquility and excitement. You know how to fish, find bait, and even fashion a makeshift fishing rod. Where there is water, you will not starve.";
                case Hobby.Baseball:
                    return "Once a feared competitor on the baseball field, you relish the memories of your days as a player. The echo of cleats on the field, the satisfying thud of a well-connected bat, and the camaraderie with teammates linger in your mind, forever shaping your love for the sport. Though your playing days may be behind you, the muscles in your shoulders and arms carry the memory of powerful drives and precision hits.";
                case Hobby.Cooking:
                    return "For you, cooking is more than a task, its an exploration of tastes and textures. From experimenting with exotic spices to perfecting classic recipes, your culinary repertoire knows no bounds. The kitchen is a canvas, and each dish is a stroke of your culinary artistry. You can turn simple ingredients into delicious, joyous experiences.";
                case Hobby.Gymnast:
                    return "You possess a fluidity and elegance in your movements forged by years of training to do flips, spins and stunts. The lightness in your step is matched by a keen awareness of space, a skill once crucial for executing flawless routines on narrow beams and sprung floors. Though the high school gymnastics days may be in the past, the nimble and lightfooted grace remains, a constant reminder of the dedication and artistry that once defined your athletic journey.";
                case Hobby.Hiking:
                    return "Nature is your sanctuary, a place where you feel a profound connection to the Earth. In the wilderness, you are in your element. You easily pick up the subtle signs and patterns of the natural world, allowing you to anticipate changes in weather, track wildlife, and find your way through dense terrain with ease. Your knowledge of edible plants, water sources, and basic survival techniques is impressive. Whether it's starting a fire with rudimentary tools or constructing makeshift shelter, you possess the skills to thrive in the wild.";
                case Hobby.Runner:
                    return "You are a force of perpetual motion, a person with an insatiable love for running coupled with a boundless reservoir of stamina. Miles disappear beneath your sneakers as you effortlessly cover ground, and the concept of fatigue takes a backseat to the sheer joy of the run. The world unfolds before you in a blur of landscapes, and the wind rushing past becomes your constant companion. Whether it's a solitary sunrise run or a group sprint through the city streets, you relish every moment on the track or trail. ";
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
            changeScreen(ScreenID.Game);
        };

        return (
            <>
                <Banner>Your Character</Banner>
                <p>{`Name: ${name}`}</p>
                <p>{`Backstory: ${backstory}`}</p>
                <p>{`Hobby: ${hobby}`}</p>
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
