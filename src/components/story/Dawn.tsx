import { useContext, useState } from "react";
import { StoreContext } from "../../App";
import { Banner, Button, DiceRoll } from "../common";
import {
    Ability,
    ChapterID,
    Health,
    Hobby,
    Item,
    Occupation,
    ScreenID,
    UpdateType,
} from "../../utils/constants";

enum PageNumber {
    Start,
    Encounter,
    MedicinePass,
    MedicineFail,
    Reanimation,
    Reason,
    WeaponChoice,
    Attack,
    Kill,
    StepKill,
    FailHit,
    RollSave,
    Shove,
    Aftermath,
    ItemChoice,
    SecondItem,
    Flee,
    End,
    Dead,
}

export const Dawn = () => {
    const store = useContext(StoreContext);
    const [weapon, setWeapon] = useState<Item | null>(null);
    const [items, setItems] = useState<Item[]>([]);

    const occupation = store.state.character?.occupation;
    const hobby = store.state.character?.hobby;

    const changePage = (pageNumber: number) => () =>
        store.dispatch({ type: UpdateType.Page, payload: pageNumber });

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    const renderPage = (): JSX.Element => {
        switch (store.state.currentPage) {
            case PageNumber.Encounter:
                return Encounter();
            case PageNumber.MedicinePass:
                return MedicinePass();
            case PageNumber.MedicineFail:
                return MedicineFail();
            case PageNumber.Reanimation:
                return Reanimation();
            case PageNumber.Reason:
                return Reason();
            case PageNumber.WeaponChoice:
                return WeaponChoice();
            case PageNumber.Attack:
                return Attack();
            case PageNumber.Kill:
                return Kill();
            case PageNumber.StepKill:
                return StepKill();
            case PageNumber.FailHit:
                return FailHit();
            case PageNumber.RollSave:
                return RollSave();
            case PageNumber.Shove:
                return Shove();
            case PageNumber.Aftermath:
                return Aftermath();
            case PageNumber.ItemChoice:
                return ItemChoice();
            case PageNumber.SecondItem:
                return SecondItem();
            case PageNumber.Flee:
                return Flee();
            case PageNumber.Dead:
                return Dead();
            case PageNumber.End:
                return End();
            case PageNumber.Start:
            default:
                return Start();
        }
    };

    return renderPage();

    function Start() {
        const flavorText = () => {
            switch (occupation) {
                default:
                    return "";
            }
        };

        return (
            <>
                <Banner>9 July 1993</Banner>
                <p>
                    You slowly open your eyes, the morning light filters through
                    the curtains, casting a soft glow across the room. Blinking
                    away the remnants of sleep, you sit up, the events of the
                    last few days still lingering in your mind. It is the third
                    day of the county-wide quarantine here in Rosewood. Radio
                    and TV broadcasts have been urging everyone to stay indoors.
                    The air is heavy with a strange, sour smell, like a mix of
                    dampness and decay. To make matters worse, the phone lines
                    have been down for at least a week, preventing you and
                    others within the Zone from making contact with the outside
                    world.
                </p>
                <p>
                    As you prepare your morning coffee in the kitchen, you tune
                    into the radio, checking if there are any updates:
                </p>
                <i>
                    "You're on the NNR Network. The end of another troubled day
                    in Kentucky. Here's everything NNR news sources have
                    exclusively uncovered over the last 48 hours. The Knox Event
                    outbreak is localized. It is an influenza-like disease that
                    renders the afflicted unconscious. After a period of
                    illness, sufferers regain motor functions. They are,
                    however, dazed and confused. Panicked and nauseous. It's in
                    this state, we are told, that military scientists are
                    finding them. The infection is widespread in the Zone, and
                    how it spreads is unknown. We have seen soldiers in HazMat
                    suits, however. The US Army is taking absolutely no chances.
                    We're promised a press conference to update the nation
                    tomorrow. It's there that we'll be asking the questions you
                    want answered. Tomorrow, all day. On NNR."
                </i>
                <p>{flavorText()}</p>
                <br />
                <Button onClick={changePage(PageNumber.Encounter)}>
                    Continue
                </Button>
            </>
        );
    }

    function Encounter() {
        return (
            <>
                <p>
                    Suddenly, there is a loud knock on the door, causing you to
                    almost spill your hot drink. "Coming!" you call out as you
                    get up from the couch. The banging gets louder, more
                    frantic, as you wonder who might be paying you a visit so
                    early in the morning.
                </p>
                <p>
                    You swing open the door to come face to face with a tall man
                    you have never met before. A thin film of sweat covers his
                    face, and presses a bloody towel against his neck. He mouths
                    the words "help me" before collapsing into your arms. You
                    just barely catch him as he stumbles, and help him onto your
                    couch.
                </p>
                <p>
                    The man is barely conscious, burning up and bleeding
                    profusely from the neck, his shirt already soaked with
                    blood. You remove the towel and attempt to assess his
                    wound...
                </p>
                <DiceRoll
                    ability={Ability.Medicine}
                    difficulty={4}
                    successPage={PageNumber.MedicinePass}
                    failPage={PageNumber.MedicineFail}
                    changePage={changePage}
                />
            </>
        );
    }

    function MedicinePass() {
        return (
            <>
                <p>
                    Despite the severe bleeding, you notice a large chunk of
                    flesh missing from his neck. His major artery has been
                    severed, and he will bleed out in minutes regardless of what
                    you do. You come to the grim realisation this man is gone.
                </p>
                <p>
                    You do what you can to east the man's suffering, holding his
                    hand and telling him its going to be okay. After a period of
                    agony, the man sighs and goes limp, his eyes close and face
                    softens. You confirm from his pulse that he is dead.
                </p>
                <br />
                <Button onClick={changePage(PageNumber.Reanimation)}>
                    Continue
                </Button>
            </>
        );
    }

    function MedicineFail() {
        return (
            <>
                <p>
                    It is not good. There is too much blood, which squirts out
                    aggressively when you remove the towel. You apply pressure
                    to hopefully reduce the bleeding, while calling out to him
                    to stay awake.
                </p>
                <p>
                    You think of calling for an ambulance, but since the
                    quarantine the phone lines have been down. You consider
                    driving the man to the clinic yourself, but it is not going
                    to be easy to carry him. As you consider the possibilities,
                    the man sighs and goes limp, his eyes close and face
                    softens.
                </p>
                <br />
                <Button onClick={changePage(PageNumber.Reanimation)}>
                    Continue
                </Button>
            </>
        );
    }

    function Reanimation() {
        return (
            <>
                <p>
                    You stare at the motionless body lying on your couch for
                    several moments, trying to process what just happened.
                    <i> Who was he? What could have attacked him?</i> Questions
                    race through your mind, as you wash your hands off the blood
                    at the kitchen sink.
                </p>
                <p>
                    A low guttural moan snaps you out of your thoughts, and
                    sends a chill down your spine. You turn your head towards
                    the sound - and see the man sitting upright and staring
                    straight at you. His vacant eyes gleaming with... hunger?
                </p>
                <p>
                    You stay frozen in place, the words from the radio echoing
                    in your head:{" "}
                    <i>
                        "...disease that renders the afflicted unconscious...
                        after a period of illness sufferers regain motor
                        functions..."
                    </i>{" "}
                    But the man was clearly dead, not merely unconscious!
                </p>
                <p>
                    None of this makes sense, but the unexpected visitor is now
                    standing and walking towards you in uncoordinated, jerky
                    movements, with arms outstretched and fingers curled as if
                    to grab you.
                </p>
                <p>What do you do?</p>
                <br />
                <Button onClick={changePage(PageNumber.Reason)}>
                    Try to reason with him
                </Button>
                <Button onClick={changePage(PageNumber.WeaponChoice)}>
                    Grab a weapon and defend yourself
                </Button>
            </>
        );
    }

    function Reason() {
        return (
            <>
                <p>
                    You raise your palms in peace and try to speak in a calm
                    voice, but your pleas fall upon deaf ears. The man lurches
                    forward, grabbing you with his cold hands...
                </p>
                <Button onClick={changePage(PageNumber.Dead)}>Continue</Button>
            </>
        );
    }

    function WeaponChoice() {
        const onClick = (weapon: Item) => () => {
            setWeapon(weapon);
            changePage(PageNumber.Attack)();
        };

        return (
            <>
                <p>
                    Your eyes dart around the kitchen, scanning for potential
                    weapons. The <b>{Item.KitchenKnife}</b> on the kitchen
                    utensil holder comes into view, as well as the{" "}
                    <b>{Item.FryingPan}</b> on the stovetop, and the{" "}
                    <b>{Item.Broom}</b> in the corner.
                </p>
                <p>
                    Anything is better than nothing. What weapon will you
                    choose?
                </p>
                <br />
                <Button onClick={onClick(Item.KitchenKnife)}>
                    Kitchen knife
                </Button>
                <Button onClick={onClick(Item.FryingPan)}>Frying pan</Button>
                <Button onClick={onClick(Item.Broom)}>Broom</Button>
            </>
        );
    }

    function Attack() {
        const text = () => {
            switch (weapon) {
                case Item.KitchenKnife:
                    return (
                        <p>
                            You grab the chef's knife from the rack, its blade
                            gleaming in the dim light. The man is unfazed by
                            your weapon, and lurches forward at you. With a firm
                            grip on the handle, you steel yourself for the
                            confrontation ahead. Your muscles tense with
                            anticipation, poised to unleash the sharp blade upon
                            the approaching threat...
                        </p>
                    );
                case Item.FryingPan:
                    return (
                        <p>
                            You grab the cast iron pan from the stovetop. It is
                            heavy and unwieldy, but can serve as a makeshift
                            club. The man is unfazed by your weapon, and lurches
                            forward at you. With a firm grip on the metal
                            handle, you adjust your stance, grounding yourself
                            for the impending strike, as you raise the cast iron
                            pan overhead...
                        </p>
                    );
                case Item.Broom:
                    return (
                        <p>
                            You grab the long, slender broom from the corner, it
                            feels too lightweight and flimsy to be a weapon, but
                            it is all you got. The man is unfazed by your
                            weapon, and lurches forward at you. With a firm grip
                            on the handle, you widen your stance and bring the
                            broom over your shoulder like a baseball bat...
                        </p>
                    );
            }
        };

        return (
            <>
                <p>{text()}</p>
                <DiceRoll
                    ability={Ability.Strength}
                    difficulty={4}
                    successPage={PageNumber.Kill}
                    failPage={PageNumber.FailHit}
                    changePage={changePage}
                />
            </>
        );
    }

    function Kill() {
        const onClick = () => {
            changePage(PageNumber.Aftermath)();
            store.dispatch({ type: UpdateType.AddKill });
        };

        const text = () => {
            switch (weapon) {
                case Item.KitchenKnife:
                    return "You lunge forward with the knife, aiming directly for the head. In a blur of motion, the blade pierces through the air, before finding its mark with chilling accuracy. The knife sinks deep into the man's skull. His hungry eyes widen briefly in a final, vacant stare before slumping to the floor at your feet.";
                case Item.FryingPan:
                    return "You swing the frying pan with all your might. The metal connects with the man's head a resounding clang, splitting the skull open with a burst of blood. The impact reverberates through your bones as the man staggers from the blow before crashing onto the ground. Seizing the opportunity, you raise your makeshift weapon and deliver several more blows on the collapsed creature, until its head is a mess of blood and gore on the floor.";
                case Item.Broom:
                    return "You swing the broomstick in a sweeping arc like a baseball bat. The head of the broom connects with the man's temple with a loud smack. The impact reverberates through your bones as the man staggers from the blow before crashing onto the ground. Seizing the opportunity, you raise your makeshift weapon and deliver several more blows on the collapsed creature, until its head is a mess of blood and gore on the floor. ";
            }
        };

        return (
            <>
                <p>{text()}</p>
                <br />
                <Button onClick={onClick}>Continue</Button>
            </>
        );
    }

    function FailHit() {
        const text = () => {
            switch (weapon) {
                case Item.KitchenKnife:
                    return "You lunge forward, thrusting the kitchen knife at the man. The blade penetrates his chest, gliding through flesh with a sickening squelch. The man lets out a grunt, but is otherwise unconcerned by the stab wound.";
                case Item.FryingPan:
                    return "You swing the frying pan at the man. The metal smacks his face with a loud clang, sending blood and teeth flying onto the tiled floor. The man staggers backward briefly, but is otherwise unbothered by the head blow.";
                case Item.Broom:
                    return "You swing broomstick in a sweeping arc like a baseball bat. To your dismay, it glances off the top of the head of your target. The man staggers backward briefly, but is otherwise unbothered by the head blow.";
            }
        };

        return (
            <>
                <p>{`${text()} Before you could prepare another strike, the man pounces at you with unexpected speed, grabbing your arms with his cold hands...`}</p>
                <br />
                <Button onClick={changePage(PageNumber.RollSave)}>
                    Continue
                </Button>
            </>
        );
    }

    function RollSave() {
        return (
            <>
                <p>You try to fend yourself from the man's deadly embrace...</p>
                <DiceRoll
                    ability={Ability.Fitness}
                    difficulty={4}
                    successPage={PageNumber.Shove}
                    failPage={PageNumber.Dead}
                    changePage={changePage}
                />
            </>
        );
    }

    function Shove() {
        const nextPage = () => {
            store.dispatch({
                type: UpdateType.Health,
                payload: Health.MinorDamage,
            });
            changePage(PageNumber.StepKill)();
        };

        return (
            <>
                <p>{`You manage to break free from the vice-like grip, but not without his nails clawing your arms and breaking your skin. Survival instinct kicks in and you shove the assailant back, causing him to lose balance and fall on its back.`}</p>
                <p className="damage-text">Sustained minor damage!</p>
                <br />
                <Button onClick={nextPage}>Continue</Button>
            </>
        );
    }

    function StepKill() {
        const onClick = () => {
            changePage(PageNumber.Aftermath)();
            store.dispatch({ type: UpdateType.AddKill });
        };

        const text = () => {
            switch (weapon) {
                case Item.KitchenKnife:
                    return "You step over the man with your knife raised overhead. In a blur of motion, the blade pierces through the air, before sinking deep into the man's skull. His hungry eyes widen briefly in a final, vacant stare before slumping to the floor at your feet.";
                case Item.FryingPan:
                    return "You step over the man with the frying pan raised overhead. In a blur of motion, the heavy metal splits open skull with a burst of blood. You raise your makeshift weapon and deliver several more blows on the collapsed creature, until its head is a mess of blood and gore on the floor.";
                case Item.Broom:
                    return "You step over the man with the broom raised overhead. In a blur of motion, the wooden handle splits open skull with a burst of blood. You raise your makeshift weapon and deliver several more blows on the collapsed creature, until its head is a mess of blood and gore on the floor. ";
            }
        };

        return (
            <>
                <p>{text()}</p>
                <br />
                <Button onClick={onClick}>Continue</Button>
            </>
        );
    }

    function Aftermath() {
        const onClick = () => {
            setItems(getStarterItems(occupation, hobby));
            changePage(PageNumber.ItemChoice)();
        };

        const text = () => {
            if (store.state.health !== Health.Unharmed) {
                return "You steal a glance at yourself in the bathroom mirror, you're covered in blood, some yours, some his. It will be difficult to explain to anyone in this state. As the adrenaline wears off a stinging pain rises up your arms. You remove your T-shirt and notice angry red streaks across the skin of your arms where you were grabbed earlier, some of them oozing blood. You gingerly clean the scratches under running water and cover them with plasters found in your bathroom cabinet, before changing into a set of fresh clothes.";
            } else {
                return "You steal a glance at yourself in the bathroom mirror, you're covered in blood, not yours. It will be difficult to explain to anyone in this state. You wash your hands and face thoroughly before changing into a set of fresh clothes.";
            }
        };

        return (
            <>
                <p>
                    Silence descends as you stand over your fallen adversary,
                    chest heaving with exertion, victory coursing through your
                    veins. The gravity of what you've done settles over you like
                    a shroud. <em>Did you just commit murder?</em> You remind
                    yourself that it was an act of self-defence, this person had
                    entered your house and tried to assault you. Suddenly you
                    recalled the news today morning that sufferers of the
                    infection regaining motor functions after being unconscious.
                    However, the man was clearly dead! You decide its best to
                    head to the police station to report the incident.
                </p>
                <p>{text()}</p>
                <br />
                <Button onClick={onClick}>Continue</Button>
            </>
        );
    }

    function ItemChoice() {
        const takeItem = (item: Item) => () => {
            store.dispatch({ type: UpdateType.AddItem, payload: item });
            setItems(items.filter((i) => i !== item));
            changePage(PageNumber.SecondItem)();
        };

        return (
            <>
                <p>
                    As you are getting ready you consider that if the situation
                    is this bad a few items might come in handy should you need
                    to defend yourself or leave town. You decide it is best to
                    take your...
                </p>
                <br />
                {items.map((item) => {
                    return <Button onClick={takeItem(item)}>{item}</Button>;
                })}
            </>
        );
    }

    function SecondItem() {
        const takeItem = (item: Item) => () => {
            store.dispatch({ type: UpdateType.AddItem, payload: item });
            setItems(items.filter((i) => i !== item));
            changePage(PageNumber.Flee)();
        };

        return (
            <>
                <p>
                    {pickedItemText(store.state.inventory[0])} You can only take
                    one more thing, so you grab your...
                </p>
                {items.map((item) => {
                    return <Button onClick={takeItem(item)}>{item}</Button>;
                })}
            </>
        );
    }

    function Flee() {
        return (
            <>
                <p>
                    {pickedItemText(store.state.inventory[1])} As you pack your
                    things, the air thickens with an eerie tension. The usual
                    sounds of the morning has been replaced by a haunting
                    silence, broken only by distant moans and shuffling
                    footsteps. Panic rises up your throat as you see them -
                    several figures approaching, their movements erratic and
                    unnatural just like the man before...
                </p>
                <br />
                <Button onClick={changePage(PageNumber.End)}>Continue</Button>
            </>
        );
    }

    function End() {
        return (
            <>
                <p>
                    Your heart races as you quickly sprint towards your car,
                    parked just outside. You fumble for your keys, hands shaking
                    as you unlock the car door. The growls draw closer, spurring
                    you into action. You jump into the driver's seat, the engine
                    roaring to life as you peel out of the driveway.
                </p>
                <p>
                    You glance in the rearview mirror, watching as the figures
                    grow smaller and smaller, swallowed by the distance. You've
                    escaped, for now.
                </p>
                <br />
                <Button onClick={changeScreen(ScreenID.Summary)}>
                    Summary
                </Button>
            </>
        );
    }

    function Dead() {
        return (
            <>
                <p>
                    You try to pull free, but the man has you in a vice-like
                    grip. Your eyes widen in terror as he sinks his teeth onto
                    your neck, tearing through skin and sinew. You try to fight
                    back but it is no use, and your screams are soon replaced by
                    the sounds of frenzied chewing and slurping. The world fades
                    to black as you succumb to your wounds...
                </p>
                <br />
                <Button onClick={changeScreen(ScreenID.Death)}>
                    Game Over
                </Button>
            </>
        );
    }

    function getStarterItems(
        occupation?: Occupation | null,
        hobby?: Hobby | null
    ): Item[] {
        let items = new Set([
            Item.KitchenKnife,
            Item.Flashlight,
            Item.Wallet,
            Item.Lunchbox,
        ]);

        switch (occupation) {
            case Occupation.Burglar:
                items.add(Item.Lockpick);
                break;
            case Occupation.Construction:
                items.add(Item.Hammer);
                break;
            case Occupation.Doctor:
                items.add(Item.FirstAidKit);
                break;
            case Occupation.ParkRanger:
            case Occupation.Firefighter:
                items.add(Item.WalkieTalkie);
                break;
            case Occupation.PoliceOfficer:
                items.add(Item.M36Revolver);
                break;
            default:
                break;
        }

        switch (hobby) {
            case Hobby.Baseball:
                items.add(Item.BaseballBat);
                break;
            case Hobby.Hiking:
                items.add(Item.HikingBag);
                break;
            case Hobby.Scout:
                items.add(Item.FirstAidKit);
                break;
            case Hobby.Shooting:
                items.add(Item.M9Pistol);
                break;
            default:
                break;
        }

        return Array.from(items);
    }

    function pickedItemText(picked: Item): string {
        switch (picked) {
            case Item.KitchenKnife:
                return weapon === Item.KitchenKnife
                    ? "You grab the bloodied knife from the dead body and wipe off the blood and grime."
                    : "You grab the chef's knife from the rack, its blade gleaming from the sunlight.";
            case Item.Wallet:
                return "You grab your leather wallet containing some cash and your ID.";
            case Item.Flashlight:
                return "You grab your yellow flashlight and spare batteries.";
            case Item.Lunchbox:
                return "You grab your lunchbox packed with a peanut butter sandwich, apple and water.";
            case Item.BaseballBat:
                return "You grab your autographed Louisville slugger from the trophy cabinet, its weight familiar in your hands.";
            case Item.FirstAidKit:
                return "You grab your fully stocked first aid kit from the bathroom cabinet.";
            case Item.M36Revolver:
                return "You grab your standard issue police revolver and a box of .38 special bullets.";
            case Item.M9Pistol:
                return "You grab your licensed personal handgun from a guncase tucked under your bed and a box of 9mm rounds.";
            case Item.Lockpick:
                return "You grab your set of lockpicks and other tools from a hidden box in your wardrobe.";
            case Item.WalkieTalkie:
                return "You grab your walkie talkie used at work and spare batteries.";
            case Item.HikingBag:
                return "You grab your hiking bag stocked with fire starting tools, a rolled up tent kit, and other survival amenities.";
            case Item.Hammer:
                return "You grab your hammer used for work, its handle worn from use.";
            default:
                return "";
        }
    }
};
