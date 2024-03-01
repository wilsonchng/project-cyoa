import { useContext, useRef, useState } from "react";
import { StoreContext } from "../../App";
import { Banner, Button } from "../common";
import { Occupation, Hobby, ScreenID, UpdateType } from "../../utils/constants";
import { CharacterStats } from "./CharacterSummary";
import { AbilityScore, Character } from "../../utils/types";

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
                {Object.values(Occupation).map((key, index) => {
                    return (
                        <Button
                            onClick={onClick(key as Occupation)}
                            key={index}
                        >
                            {key as string}
                        </Button>
                    );
                })}
                <br />
                <em className="info-text">
                    Occupations affect starting skills, some provide unique
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
                {Object.values(Hobby).map((key, index) => {
                    return (
                        <Button onClick={onClick(key as Hobby)} key={index}>
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

        const getStarterAbilities = () => {
            const skills1 = getOccupationAbilities(occupation);
            const skills2 = getHobbyAbilities(hobby);

            return {
                Strength: (skills1.Strength || 0) + (skills2.Strength || 0),
                Fitness: (skills1.Fitness || 0) + (skills2.Fitness || 0),
                Firearms: (skills1.Firearms || 0) + (skills2.Firearms || 0),
                Medicine: (skills1.Medicine || 0) + (skills2.Medicine || 0),
                Stealth: (skills1.Stealth || 0) + (skills2.Stealth || 0),
                Survival: (skills1.Survival || 0) + (skills2.Survival || 0),
            };
        };

        const charData: Character = {
            name: name,
            occupation: occupation,
            hobby: hobby,
            ability: getStarterAbilities(),
        };

        return (
            <>
                <Banner>Your Character</Banner>
                <br />
                <CharacterStats character={charData} />
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

// Balance notes: Combat abilities (Stealth, Firearms, Strength, Endurance) are worth more than non-combat ones (Survival & Medicine)
const getOccupationAbilities = (
    occupation: Occupation | null
): Partial<AbilityScore> => {
    switch (occupation) {
        case Occupation.Firefighter:
            return { Strength: 1, Fitness: 1 };
        case Occupation.Construction:
            return { Strength: 2 };
        case Occupation.Burglar:
            return { Stealth: 2 };
        case Occupation.PoliceOfficer:
            return { Firearms: 2 };
        case Occupation.Doctor:
            return { Medicine: 3 };
        case Occupation.ParkRanger:
            return { Survival: 3 };
        default:
            return {};
    }
};

const getHobbyAbilities = (hobby: Hobby | null): Partial<AbilityScore> => {
    switch (hobby) {
        case Hobby.Baseball:
            return { Strength: 1 };
        case Hobby.Runner:
            return { Fitness: 1 };
        case Hobby.Shooting:
            return { Firearms: 1 };
        case Hobby.Gymnast:
            return { Stealth: 1 };
        case Hobby.Scout:
            return { Survival: 1, Medicine: 1 };
        case Hobby.Hiking:
            return { Survival: 2 };
        default:
            return {};
    }
};

const getOccupationDescription = (occupation: Occupation | null) => {
    switch (occupation) {
        case Occupation.Burglar:
            return "You were a person of dual identities. By day, you stood behind the cash register, exchanging pleasantries and handling transactions with a smile. However, when the night fell, a different side of you emerged. The shadows become your ally, and the darkness of the night concealed your clandestine activities. As a burglar, you moved with calculated precision, sneaking past watchful eyes. Your fingers, nimble and quick with handling currency during the day, were equally adept at picking locks at night. It was a life of secrets, where the monotony of the day job provided the perfect cover for your nocturnal escapades.";
        case Occupation.Doctor:
            return "You were once a respected and skilled doctor, dedicated to the well-being of your patients. Your days were filled with the precision of medical procedures, the compassion of healing, and the tireless pursuit of saving lives. Your hands, once accustomed to the delicate art of surgery, are steady and sure with the scalpel and needle. You are not just a survivor; you are a healer in a world desperately in need of one.";
        case Occupation.Firefighter:
            return "You were a dedicated firefighter, a hero clad in protective gear with a heart ablaze with courage. You sprint towards danger where others would flee, navigating the chaos of a burning building with calm determination. Your physique is a testament to the rigourous exercises and drills, training for the most demanding of situations. Even amongst your fellow firefighters, your expertise with the axe is unparalleled. Whether it is breaching doors, venting roofs, or overcoming whatever obstacles in the way of your mission, the axe is an extension of your own strength.";
        case Occupation.PoliceOfficer:
            return "The choice to be a police officer was not just a career; it was a calling. As you patrolled the streets, interacted with citizens, and enforced the law, you carried the weight of responsibility on your shoulders, driven by a commitment to uphold justice and protect those you served. Your proficiency with firearms set you apart in the line of duty. Your accuracy and precision with your service weapon a testament to the countless hours of training and practice you dedicated to honing your marksmanship skills.";
        case Occupation.ParkRanger:
            return "As a park ranger with a deep knowledge of the wilderness, you navigate the rugged terrain with ease, your footsteps guided by years of experience and an intimate understanding of nature's ways. Your senses are finely tuned to the subtlest changes in the environment. You can read the signs of impending weather, foresee the movements of wildlife, and anticipate the ebb and flow of nature's rhythms. Your survival skills are forged through countless hours of training and real-world experience. You know how to find water in the driest of places, how to build a shelter with nothing but the materials at hand, and how to kindle a fire from the barest spark.";
        case Occupation.Construction:
            return "Your impressive physique speaks volumes, sculpted by years of lifting, hauling, and building at construction sites. Your hands, calloused from manual labor, are your most valuable tools. Whether laying bricks, erecting scaffolding, or pouring concrete, you work with precision and skill. The elements are your constant companion. Under the scorching sun or amidst biting winds, you persevere, your determination unwavering as you strive to meet deadlines and exceed expectations. As a construction worker, you are the foundation upon which the future is built.";
        default:
            return "";
    }
};

const getHobbyDescription = (hobby: Hobby | null) => {
    switch (hobby) {
        case Hobby.Baseball:
            return "Once a feared competitor on the baseball field, you relish the memories of your days as a player. The echo of cleats on the field, the satisfying thud of a well-connected bat, and the camaraderie with teammates linger in your mind, forever shaping your love for the sport. Though your playing days may be behind you, the muscles in your shoulders and arms carry the memory of powerful drives and precision hits.";
        case Hobby.Gymnast:
            return "You possess a fluidity and elegance in your movements forged by years of training to do flips, spins and stunts. The lightness in your step is matched by a keen awareness of space, a skill once crucial for executing flawless routines on narrow beams and sprung floors. Though the high school gymnastics days may be in the past, the nimble and lightfooted grace remains, a constant reminder of the dedication and artistry that once defined your athletic journey.";
        case Hobby.Hiking:
            return "Nature is your sanctuary, a place where you feel a profound connection to the Earth. In the wilderness, you are in your element. You easily pick up the subtle signs and patterns of the natural world, allowing you to anticipate changes in weather, track wildlife, and find your way through dense terrain with ease. Your knowledge of edible plants, water sources, and basic survival techniques is impressive. Whether it's starting a fire with rudimentary tools or constructing makeshift shelter, you possess the necessary skills to thrive in the wild.";
        case Hobby.Runner:
            return "You are a force of perpetual motion, a person with an insatiable love for running coupled with a boundless reservoir of stamina. Miles disappear beneath your sneakers as you effortlessly cover ground, and the concept of fatigue takes a backseat to the sheer joy of the run. The world unfolds before you in a blur of landscapes, and the wind rushing past becomes your constant companion. Whether it's a solitary sunrise run or a group jog through the woods, you relish every moment on the track or trail.";
        case Hobby.Scout:
            return "As a former scout leader, you've spent many summers mentoring young scouts through the wilderness. Your years of service have honed your skills in outdoor survival, navigation, and, most importantly, first aid. You've dealt with everything from minor scrapes and bruises to more serious injuries like sprains and fractures. You always carry a well-stocked first aid kit, complete with bandages, antiseptics, splints, and other essential supplies. Whether you're out on a camping trip or simply enjoying the great outdoors, you're ever ready to lend a helping hand in times of trouble.";
        case Hobby.Shooting:
            return "You are someone that enjoys shooting guns as a hobby. For you, the crack of gunfire and the recoil of a well-aimed shot are not just sensations, but sources of exhilaration and joy. Whether you're shooting pistols, rifles, or shotguns, each firearm offers its own unique experience. From the crisp precision of a well-tuned rifle to the satisfying spread of a shotgun blast, you revel in the diversity of shooting sports and the challenges they present.";
        default:
            return "";
    }
};

export default CharacterCreation;
