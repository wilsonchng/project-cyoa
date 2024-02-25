import { useContext, useState } from "react";
import { StoreContext } from "../../App";
import { UpdateType } from "../../utils/store";
import { Banner, Button, DiceRoll } from "../common";
import {
    Ability,
    Health,
    Hobby,
    Item,
    Occupation,
    ScreenID,
} from "../../utils/constants";

enum PageNumber {
    Prologue,
    Encounter,
    MedicinePass,
    MedicineFail,
    Reanimation,
    Reason,
    Bedroom,
    WeaponChoice,
    Attack,
    KillZombie,
    FailHit,
    Shove,
    Aftermath,
    Flee,
    Dead,
}

export const Dawn = () => {
    const store = useContext(StoreContext);
    const [weapon, setWeapon] = useState<Item | null>(null);

    const occupation = store.state.character?.occupation;
    const hobby = store.state.character?.hobby;

    const changePage = (pageNumber: number) => () =>
        store.dispatch({ type: UpdateType.Page, payload: pageNumber });

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    const updateHealth = (health: Health) => () =>
        store.dispatch({ type: UpdateType.Health, payload: health });

    const addItem = (item: Item) => () =>
        store.dispatch({ type: UpdateType.AddItem, payload: item });

    const renderPage = (): JSX.Element => {
        switch (store.state.currentPage) {
            case PageNumber.Encounter:
                return Encounter();
            case PageNumber.Bedroom:
                return Bedroom();
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
            case PageNumber.KillZombie:
                return KillZombie();
            case PageNumber.FailHit:
                return FailHit();
            case PageNumber.Shove:
                return Shove();
            case PageNumber.Aftermath:
                return Aftermath();
            case PageNumber.Flee:
                return Flee();
            case PageNumber.Dead:
                return Dead();
            case PageNumber.Prologue:
            default:
                return Prologue();
        }
    };

    return renderPage();

    function Prologue() {
        return (
            <>
                <Banner>9 July 1993</Banner>
                <p>
                    You slowly open your eyes, the morning light filters through
                    the curtains, casting a soft glow across the room. Blinking
                    away the remnants of sleep, you sit up, the events of the
                    last few days still lingering in your mind. It is the third
                    day of the government issued quarantine here in Rosewood.
                    Schools and businesses closed, a curfew is imposed on all
                    residents, and only essential services are allowed to
                    resume. To make matters worse, the phone lines have been
                    down for at least a week, preventing people from making
                    contact with the outside world.
                </p>
                <p>
                    As you prepare your morning coffee in the kitchen, you
                    switch on the radio, which is the only communications still
                    working:
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
                <Button onClick={changePage(PageNumber.Bedroom)}>
                    Run to the bedroom and hide
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

    function Bedroom() {
        return (
            <>
                <p>
                    The flight instinct takes over, as you turn and bolt into
                    your bedroom, slamming the door behind you.
                </p>
                <p></p>
                <br />
                <Button onClick={console.log}>Escape!</Button>
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
                    weapons. The <b>{Item.KitchenKnife}</b> hanging on the
                    kitchen rack comes into view, as well as the{" "}
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
                            You grab the <b>{Item.KitchenKnife}</b> from the
                            rack, its blade gleaming in the dim light. The man
                            is unfazed by your weapon, and lurches forward at
                            you. With a firm grip on the handle, you steel
                            yourself for the confrontation ahead. Your muscles
                            tense with anticipation, poised to unleash the sharp
                            blade upon the approaching threat...
                        </p>
                    );
                case Item.FryingPan:
                    return (
                        <p>
                            You grab the <b>{Item.FryingPan}</b> from the
                            stovetop. It is heavy and unwieldy, but can serve as
                            a makeshift club. The man is unfazed by your weapon,
                            and lurches forward at you. With a firm grip on the
                            metal handle, you adjust your stance, grounding
                            yourself for the impending strike, as you raise the
                            cast iron pan overhead...
                        </p>
                    );
                case Item.Broom:
                    return (
                        <p>
                            You grab the <b>{Item.Broom}</b> from the corner, it
                            feels too lightweight and flimsy to be a weapon, but
                            it is all you got. The man is unfazed by your
                            weapon, and lurches forward at you. With a firm grip
                            on the handle, you widen your stance and point the
                            brush end towards the approaching threat like a
                            spear...
                        </p>
                    );
            }
        };

        return (
            <>
                <p>{text()}</p>
                <DiceRoll
                    ability={Ability.Strength}
                    difficulty={getWeaponDifficulty(weapon)}
                    successPage={PageNumber.KillZombie}
                    failPage={PageNumber.FailHit}
                    changePage={changePage}
                />
            </>
        );
    }

    function FailHit() {
        const text = () => {
            switch (weapon) {
                case Item.KitchenKnife:
                    return "You lunge forward, thrusting the kitchen knife at the man. The blade penetrates his chest, gliding through flesh with a sickening squelch. The man lets out a grunt, but is otherwise unconcerned by the stab wound.";
                case Item.FryingPan:
                    return "You swing the frying pan at the man. The metal smacks his face with a loud clang, sending blood and teeth flying onto the tiled floor. The impact reverberates through your bones as the man staggers backward. For a moment there is a glimmer of hope, but it was short-lived.";
                case Item.HandAxe:
                    return "You swing the hand axe at the man. The axe blade lands on the shoulder, biting into flesh and bone with a heavy thud. The man recoils from the impact, but you know that blow was a dud.";
                case Item.Hammer:
                    return "You swing the hammer down at the man. The metal head misses the head, landing on the shoulder with a heavy thud. The man recoils from the impact, but you know that blow was a dud.";
                case Item.BaseballBat:
                    return "As the man steps into range you unleash the stored energy in a practised swing of your baseball bat. The crack of wood meeting bone echoes throughout the room as the bat connects with his shoulder, sending the man staggering backwards. For a moment there is a glimmer of hope, but it was short-lived.";
                case Item.M36Revolver:
                case Item.M9Pistol:
                    return "You squeeze the trigger. The crack of gunfire echoes through the confined space as the handgun erupts in a deafening roar, the muzzle flash momentarily illuminating the room with a blinding intensity. Somehow, the bullet misses the target, finding its mark on the wall behind instead in a splash of plaster.";
            }
        };

        return (
            <>
                <p>{`${text()} With an angry growl, the man pounces at you with unexpected speed, grabbing your arms with his cold hands...`}</p>
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
        updateHealth(Health.MinorDamage);
        return (
            <>
                <p>{`You manage to break free from the vice-like grip, but not without the man's nails scratching your arms and breaking your skin. Pain shoots up your limbs as you shove the assailant back, before ${
                    true
                        ? "lining up the barrel for another shot..."
                        : "preparing your weapon for another blow..."
                }`}</p>
                <p className="damage-text">Sustained minor damage!</p>
                <br />
                <Button onClick={changePage(PageNumber.KillZombie)}>
                    Continue
                </Button>
            </>
        );
    }

    function KillZombie() {
        const text = () => {
            switch (weapon) {
                case Item.KitchenKnife:
                    return "You lunge forward, aiming directly for the head. In a blur of motion, the blade pierces through the air, before finding its mark with chilling accuracy. The knife sinks deep into the man's skull. His hungry eyes widen briefly in a final, vacant stare before crumpling to the floor at your feet.";
                case Item.FryingPan:
                    return "You swing the frying pan with all your might. The metal connects with the man's head a resounding clang, splitting the skull open with a burst of blood. The man staggers from the blow before crashing onto the ground. Seizing the opportunity, you raise your makeshift weapon and deliver several more blows on the collapsed pile, splattering blood and gore all over the floor.";
                case Item.Broom:
                    return "";
            }
        };

        return (
            <>
                <p>{text()}</p>
                <br />
                <Button onClick={changePage(PageNumber.Aftermath)}>
                    Continue
                </Button>
            </>
        );
    }

    function Flee() {
        return (
            <>
                <p></p>
                <br />
            </>
        );
    }

    function Aftermath() {
        return (
            <>
                <p></p>
                <br />
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

    function getWeaponDifficulty(weapon: Item | null): number {
        switch (weapon) {
            case Item.KitchenKnife:
            case Item.FryingPan:
                return 5;
            case Item.Broom:
                return 4;
            default:
                return 6;
        }
    }
};
