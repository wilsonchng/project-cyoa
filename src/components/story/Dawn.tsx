import { useContext, useState } from "react";
import { StoreContext } from "../../App";
import { UpdateType } from "../../utils/store";
import { Button } from "../common";
import {
    Health,
    Hobby,
    Item,
    Occupation,
    ScreenID,
} from "../../utils/constants";

enum PageNumber {
    Prologue,
    Encounter,
    FirstZombie,
    Bedroom,
    WindowEscape,
    BackHome,
    CarKeys,
    StealWeaponChoice,
    StealWeapon,
    Reason,
    SneakAttack,
    SneakFail,
    ThreatenGun,
    WeaponChoice,
    Attack,
    FailHit,
    BreakFree,
    SuccessHit,
    Dead,
    Aftermath,
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

    const carryingGun = weapon === Item.M36Revolver || weapon === Item.M9Pistol;

    const renderPage = (): JSX.Element => {
        switch (store.state.currentPage) {
            case PageNumber.Encounter:
                return Encounter();
            case PageNumber.FirstZombie:
                return FirstZombie();
            case PageNumber.Reason:
                return Reason();
            case PageNumber.Bedroom:
                return Bedroom();
            case PageNumber.WindowEscape:
                return WindowEscape();
            case PageNumber.BackHome:
                return BackHome();
            case PageNumber.CarKeys:
                return CarKeys();
            case PageNumber.StealWeaponChoice:
                return StealWeaponChoice();
            case PageNumber.SneakAttack:
                return SneakAttack();
            case PageNumber.StealWeapon:
                return StealWeapon();
            case PageNumber.SneakFail:
                return SneakFail();
            case PageNumber.ThreatenGun:
                return ThreatenGun();
            case PageNumber.WeaponChoice:
                return WeaponChoice();
            case PageNumber.Attack:
                return Attack();
            case PageNumber.FailHit:
                return FailHit();
            case PageNumber.Dead:
                return Dead();
            case PageNumber.BreakFree:
                return BreakFree();
            case PageNumber.SuccessHit:
                return SuccessHit();
            case PageNumber.Aftermath:
                return Aftermath();
            case PageNumber.Prologue:
            default:
                return Prologue();
        }
    };

    return renderPage();

    function Prologue() {
        const flavorText = () => {
            switch (occupation) {
                case Occupation.Burglar:
                    return "Another mundane day working at the counter of Greene's Grocer, you thought as you slip into your sneakers.";
                case Occupation.Construction:
                    return "Another long day laying bricks at the construction yard, you thought as you lace on your workman boots.";
                case Occupation.Doctor:
                    return "Another interesting day at the clinic helping the town's patients, you thought as you slip on your loafers.";
                case Occupation.Firefighter:
                    return "Another exciting day doing exercises and drills at the station, you thought as you lace on your boots.";
                case Occupation.ParkRanger:
                    return "Another quiet day in the woods, you thought as you don your ranger uniform and shoes.";
                case Occupation.PoliceOfficer:
                    return "Another uneventful day on patrol duty, you hope as you don your police uniform and shoes.";
            }
        };

        return (
            <>
                <p>
                    You slowly awaken from the depths of slumber, the soft light
                    of dawn greeting you through the curtains. You are in the
                    familiar surroundings of your home. {flavorText()} As you
                    prepare for the day, a feeling of unease creeps over you.
                    Something is amiss. The air hangs heavy with silence, devoid
                    of the usual hum of life outside.
                </p>
                <p>
                    A sudden noise shatters the stillness of the moment - a loud
                    crash that echoes through the house. You tense up, straining
                    to comprehend the source of the disturbance. There is a
                    moment of disbelief, a split second where reality feels
                    suspended. And then it hits you like a thunderbolt: someone,{" "}
                    <em>or something</em> just broke into your home!
                </p>
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
                    You race toward the sound, unaware of what is to come next.
                    Suddenly, a low, guttural growl of unknown origin echoes
                    through the house. You freeze midway, a primal instinct
                    warning you of the danger that lies ahead.
                </p>
                <p>
                    Slowly, you creep forward from your living room, only to be
                    met with a surreal sight. There, standing amidst your
                    kitchen, is a figure that defies reason.
                </p>
                <p>
                    The intruder is a tall man with ashen and pallid skin, clad
                    in the tattered remains of his clothes. Jagged fragments of
                    the broken window protrude from his body like macabre
                    spikes. Yet he seemed oblivious to his numerous wounds,
                    while blood trickled down onto the floorboards. His head
                    snaps in your direction, eyes gleaming with hunger as they
                    lock onto you with an intensity that sends a shiver down
                    your spine.
                </p>
                <p>
                    Time seems to stand still, as your mind struggles to make
                    sense of the nightmare unfolding before you. The abomination
                    lurches forward with a grunt, its movements jerky and
                    unnatural, as you realize with a sinking dread this is all
                    too real.
                </p>
                <br />
                <Button onClick={changePage(PageNumber.FirstZombie)}>
                    Continue
                </Button>
            </>
        );
    }

    function FirstZombie() {
        return (
            <>
                <p>
                    Adrenaline surges through your veins as the fight or flight
                    instincts kick into overdrive. This man is dangerous and
                    quickly closing the distance between the two of you. You can
                    run back to your bedroom and shut the door on him, locking
                    him out. Or you can make a stand and try to fight him.
                    Lastly, you can try to appeal to the man's reason, maybe he
                    will cease his actions if you understand what he is seeking.
                </p>
                <p>You decide to:</p>
                <br />
                <Button onClick={changePage(PageNumber.WeaponChoice)}>
                    Stand and fight
                </Button>
                <Button onClick={changePage(PageNumber.Bedroom)}>
                    Flee to the bedroom
                </Button>
                <Button onClick={changePage(PageNumber.Reason)}>
                    Try to reason with him
                </Button>
            </>
        );
    }

    function Bedroom() {
        const getGun = () => {
            if (occupation === Occupation.PoliceOfficer) {
                setWeapon(Item.M36Revolver);
                addItem(Item.M36Revolver);
                return (
                    <p>
                        Before leaving, you grab your police standard issue{" "}
                        <b>{Item.M36Revolver}</b> from your nightstand drawer.
                    </p>
                );
            } else if (hobby === Hobby.Shooting) {
                setWeapon(Item.M9Pistol);
                addItem(Item.M9Pistol);
                return (
                    <p>
                        Before leaving, you grab your favourite{" "}
                        <b>{Item.M9Pistol}</b> from the gun case tucked in your
                        wardrobe.
                    </p>
                );
            }
            return null;
        };

        return (
            <>
                <p>
                    The flight instinct takes over, as you turn and sprint back
                    into your bedroom, shutting the door behind you. A loud slam
                    reverberates through the tiny bedroom as the man throws his
                    full weight upon solid wood. The doorframe trembles from the
                    impact, but otherwise holds for now. You hear frenzied
                    groans pierce through the door, as the man pounds on it
                    relentlessly. Something is seriously wrong with that man,
                    and you do not intend to wait for things to calm down.
                </p>
                <p>
                    You draw the bedroom curtains and glance outside: the
                    backyard appears clear. You decide to climb out the window
                    and make your escape.{getGun()}
                </p>
                <br />
                <Button onClick={changePage(PageNumber.WindowEscape)}>
                    Escape!
                </Button>
            </>
        );
    }

    function WindowEscape() {
        return (
            <>
                <p>
                    You hurriedly unlatch the bolt, and the window pane slides
                    up smoothly. With both hands on the frame and one foot on
                    the sill, you hoist yourself up and out of the room.
                </p>
                <p>
                    You land on untrimmed grass with a soft rustle, turning to
                    shut close the window pane, hoping it will buy you more time
                    against your pursuer. A cold breeze sweeps past you as you
                    realise you are standing in your backyard in nothing but
                    your pyjamas.
                </p>
                <p>
                    <em>What the hell was that?</em> That was no ordinary
                    breaking and entering, that man appeared insane. Maybe he
                    was on some kind of drugs. You probably should contact the
                    authorities about this situation, but the phone lines have
                    been down for weeks. The police station is a short drive
                    down, you thought, and then it dawned on you: your car keys
                    still inside. You're going to need to head back in.
                </p>
                <br />
                <Button onClick={changePage(PageNumber.BackHome)}>
                    Continue
                </Button>
            </>
        );
    }

    function BackHome() {
        return (
            <>
                <p>
                    You make your way around to the front door, unlocking it
                    with the spare key hidden under a potted plant. You turn the
                    doorknob and enter cautiously. The intruder is still
                    preoccupied with knocking down the door, and remains
                    oblivious to your entrance. You spot your key ring on the
                    table in the living room, just a few steps away from the
                    man. Alternatively, it might be prudent to prepare for
                    self-defence.{" "}
                    {carryingGun &&
                        "Lastly, you could threaten the man with your gun."}
                </p>
                <br />
                <Button onClick={changePage(PageNumber.CarKeys)}>
                    Grab car keys
                </Button>
                <Button onClick={changePage(PageNumber.StealWeaponChoice)}>
                    Find a Weapon
                </Button>
                {carryingGun && (
                    <Button onClick={changePage(PageNumber.ThreatenGun)}>
                        Threaten with gun
                    </Button>
                )}
            </>
        );
    }

    function CarKeys() {
        return (
            <>
                <p></p>
                <br />
                <Button onClick={changePage(PageNumber.CarKeys)}>
                    Car keys
                </Button>
                <Button onClick={changePage(PageNumber.StealWeaponChoice)}>
                    Weapon
                </Button>
            </>
        );
    }

    function StealWeaponChoice() {
        const onClick = (weapon: Item) => () => {
            setWeapon(weapon);
            addItem(weapon);
            changePage(PageNumber.StealWeapon)();
        };

        const getWeaponText = () => {
            let result: string[] = [];

            switch (occupation) {
                case Occupation.Construction:
                    result.push("the hammer in your toolbox from work");
                    break;
                case Occupation.ParkRanger:
                    result.push("the hand axe in your ranger pack");
                    break;
                default:
                    break;
            }

            switch (hobby) {
                case Hobby.Baseball:
                    result.push(
                        "the signed baseball bat in your trophy cabinet"
                    );
                    break;
                default:
                    break;
            }

            if (result.length > 0) {
                return "Also, " + result.join(", or ").concat(".");
            }
            return "";
        };

        return (
            <>
                <p>
                    Your eyes scan around the house for potential weapons. A few
                    options come to mind:
                </p>
                <p>
                    In the kitchen drawer there is a chef's knife, or the frying
                    pan on the stovetop. {getWeaponText()}
                </p>
                {carryingGun && (
                    <p>Or you could just threaten the man with your gun.</p>
                )}
                <p>What will you choose?</p>
                <br />
                <Button onClick={onClick(Item.KitchenKnife)}>
                    Kitchen knife
                </Button>
                <Button onClick={onClick(Item.FryingPan)}>Frying pan</Button>
                {occupation === Occupation.Construction && (
                    <Button onClick={onClick(Item.Hammer)}>Hammer</Button>
                )}
                {occupation === Occupation.ParkRanger && (
                    <Button onClick={onClick(Item.HandAxe)}>Hand axe</Button>
                )}
                {hobby === Hobby.Baseball && (
                    <Button onClick={onClick(Item.BaseballBat)}>
                        Baseball bat
                    </Button>
                )}
                {carryingGun && (
                    <Button onClick={changePage(PageNumber.ThreatenGun)}>
                        Threaten with gun
                    </Button>
                )}
            </>
        );
    }

    function ThreatenGun() {
        return (
            <>
                <p>{`You brandish your ${weapon} at the man, demanding that he drops to the ground. Despite the threat of your weapon, the man remains undeterred, pivoting towards you with outstretched arms. After another verbal warning to stop, you realise you have to shoot.`}</p>
                <br />
                <p>
                    Roll [<b>FIREARMS</b>] to determine your outcome...
                </p>
                {/* Add die roll */}
                <br />
                <Button onClick={changePage(PageNumber.SuccessHit)}>
                    Success
                </Button>
                <Button onClick={changePage(PageNumber.FailHit)}>Fail</Button>
            </>
        );
    }

    function StealWeapon() {
        return (
            <>
                <p>
                    You inch forward cautiously, your movements deliberate and
                    calculated, toward the <b>{weapon}</b> lying just a few
                    steps away. Your heart pounds in your chest as the strange
                    man continues to pound the door, unaware of your presence.
                </p>
                <p>
                    Roll <b>[STEALTH]</b> to determine your outcome.
                </p>
                {/* Add die roll */}
                <br />
                <Button onClick={changePage(PageNumber.SneakAttack)}>
                    Success
                </Button>
                <Button onClick={changePage(PageNumber.SneakFail)}>Fail</Button>
            </>
        );
    }

    function SneakAttack() {
        return (
            <>
                <p></p>
                <br />
                <Button onClick={changePage(PageNumber.Aftermath)}>
                    Continue
                </Button>
            </>
        );
    }

    function SneakFail() {
        return (
            <>
                <p></p>
                <p>
                    Roll <b>[STRENGTH]</b> to determine your outcome
                </p>
                {/* Add die roll */}
                <br />
                <Button onClick={changePage(PageNumber.SuccessHit)}>
                    Success
                </Button>
                <Button onClick={changePage(PageNumber.FailHit)}>Fail</Button>
            </>
        );
    }

    function WeaponChoice() {
        const onClick = (weapon: Item) => () => {
            setWeapon(weapon);
            addItem(weapon);
            changePage(PageNumber.Attack)();
        };

        const getWeaponText = () => {
            let result: string[] = [];

            switch (occupation) {
                case Occupation.PoliceOfficer:
                    result.push(
                        "your police standard issue M36 revolver in your nightstand"
                    );
                    break;
                case Occupation.Construction:
                    result.push("the hammer in your toolbox from work");
                    break;
                case Occupation.ParkRanger:
                    result.push("the hand axe in your ranger pack");
                    break;
                default:
                    break;
            }

            switch (hobby) {
                case Hobby.Shooting:
                    result.push(
                        "your personal M9 pistol in the bedroom wardrobe"
                    );
                    break;
                case Hobby.Baseball:
                    result.push(
                        "the signed baseball bat in your trophy cabinet"
                    );
                    break;
                default:
                    break;
            }

            if (result.length > 0) {
                return "Also, " + result.join(", or ").concat(".");
            }
            return "";
        };

        return (
            <>
                <p>
                    The fight instinct kicks in, as you tense up and prepare to
                    fight. Your eyes scan around the house for potential
                    weapons. A few options come to mind:
                </p>
                <p>
                    In the kitchen drawer there is a chef's knife, or the frying
                    pan on the stovetop. {getWeaponText()}
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
                {occupation === Occupation.PoliceOfficer && (
                    <Button onClick={onClick(Item.M36Revolver)}>
                        Police revolver
                    </Button>
                )}
                {occupation === Occupation.Construction && (
                    <Button onClick={onClick(Item.Hammer)}>Hammer</Button>
                )}
                {occupation === Occupation.ParkRanger && (
                    <Button onClick={onClick(Item.HandAxe)}>Hand axe</Button>
                )}
                {hobby === Hobby.Baseball && (
                    <Button onClick={onClick(Item.BaseballBat)}>
                        Baseball bat
                    </Button>
                )}
                {hobby === Hobby.Shooting && (
                    <Button onClick={onClick(Item.M9Pistol)}>M9 Pistol</Button>
                )}
            </>
        );
    }

    function Attack() {
        const text = () => {
            switch (weapon) {
                case Item.KitchenKnife:
                    return (
                        <p>
                            You dash to the kitchen and retrieve the{" "}
                            <b>{Item.KitchenKnife}</b> from the drawer, its
                            blade gleaming in the dim light. The man is unfazed
                            by your weapon, and lurches forward at you. With a
                            firm grip on the handle, you steel yourself for the
                            confrontation ahead. Your muscles tense with
                            anticipation, poised to unleash the sharp blade upon
                            the approaching threat...
                        </p>
                    );
                case Item.FryingPan:
                    return (
                        <p>
                            You dash to the kitchen and grab the{" "}
                            <b>{Item.FryingPan}</b>. The makeshift club is heavy
                            and unwieldy. The man is unfazed by your weapon, and
                            lurches forward at you. With a firm grip on the
                            metal handle, you adjust your stance, grounding
                            yourself for the impending strike, as you raise the
                            cast iron pan overhead...
                        </p>
                    );
                case Item.BaseballBat:
                    return (
                        <p>
                            You quickly open the cabinet and grab your{" "}
                            <b>{Item.BaseballBat}</b>, its weight familiar in
                            your hands. The man is unfazed by your weapon, and
                            lurches forward at you. You take your batting stance
                            and your body coils like a spring, gathering energy
                            for the impending strike...
                        </p>
                    );
                case Item.HandAxe:
                    return (
                        <p>
                            You hastily grab your ranger backpack stocked with
                            camping supplies and pull out your{" "}
                            <b>{Item.HandAxe}</b>. The man is unfazed by your
                            weapon, and lurches forward at you. With a steady
                            grip on the handle, you adjust your stance, planting
                            your feet firmly on the ground, and raise the axe
                            overhead, visualising the arc of the axeblade making
                            its way to the target...
                        </p>
                    );
                case Item.Hammer:
                    return (
                        <p>
                            You hurriedly reach for your toolbox and retrieve
                            your <b>{Item.Hammer}</b>. The weight of the tool
                            feels reassuring in your grip, its handle worn
                            smooth by countless hours of use. The man is unfazed
                            by your weapon, and lurches forward at you. Your
                            breath quickens as you raise the hammer overhead,
                            its head poised to deliver a devastating blow...
                        </p>
                    );
                case Item.M36Revolver:
                    return (
                        <p>
                            You dash into the bedroom and retrieve the{" "}
                            <b>{Item.M36Revolver}</b> from your nightstand, the
                            weight of it in your hand both reassuring and
                            ominous. The man is unfazed, and lurches forward at
                            you. You raise the revolver, its barrel trained on
                            the advancing form. The world falls away, leaving
                            only you and the target in your sights...
                        </p>
                    );
                case Item.M9Pistol:
                    return (
                        <p>
                            You dash into the bedroom and grab the gun case in
                            your wardrobe, flipping it open and retrieving the{" "}
                            <b>{Item.M9Pistol}</b> within. In one fluid motion
                            you insert the loaded magazine and cock the sidearm.
                            The man is unfazed, and lurches forward at you. You
                            raise the pistol, its barrel trained on the
                            advancing form. The world falls away, leaving only
                            you and the target in your sights...
                        </p>
                    );
            }
        };

        return (
            <>
                <p>{text()}</p>
                <p>
                    Roll <b>{`[${carryingGun ? "FIREARMS" : "STRENGTH"}]`}</b>{" "}
                    to determine your outcome
                </p>
                {/* Add die roll */}
                <br />
                <Button onClick={changePage(PageNumber.SuccessHit)}>
                    Success
                </Button>
                <Button onClick={changePage(PageNumber.FailHit)}>Fail</Button>
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
                <p>
                    Roll [<b>FITNESS</b>] to determine your outcome...
                </p>
                {/* Add die roll */}
                <br />
                <Button onClick={changePage(PageNumber.BreakFree)}>
                    Success
                </Button>
                <Button onClick={changePage(PageNumber.Dead)}>Fail</Button>
            </>
        );
    }

    function BreakFree() {
        updateHealth(Health.MinorDamage);
        return (
            <>
                <p>{`You manage to break free from the vice-like grip, but not without the man's nails scratching your arms and breaking your skin. Pain shoots up your limbs as you shove the assailant back, before ${
                    carryingGun
                        ? "lining up the barrel for another shot..."
                        : "preparing your weapon for another blow..."
                }`}</p>
                <p className="damage-text">Sustained minor damage!</p>
                <br />
                <Button onClick={changePage(PageNumber.SuccessHit)}>
                    Continue
                </Button>
            </>
        );
    }

    function SuccessHit() {
        const text = () => {
            switch (weapon) {
                case Item.KitchenKnife:
                    return "You lunge forward, aiming directly for the head. In a blur of motion, the blade pierces through the air, before finding its mark with chilling accuracy. The knife sinks deep into the man's skull. His hungry eyes widen briefly in a final, vacant stare before crumpling to the floor at your feet.";
                case Item.FryingPan:
                    return "You swing the frying pan with all your might. The metal connects with the man's head a resounding clang, splitting the skull open with a burst of blood. The man staggers from the blow before crashing onto the ground. Seizing the opportunity, you raise your makeshift weapon and deliver several more blows on the collapsed pile, splattering blood and gore all over the floor.";
                case Item.HandAxe:
                    return "Weapon raised, you lunge forward. The hand axe arcs through the air, finding its mark on the man's head. The skull splits open in a burst of blood. The man's momentum falters, reeling back from the blow before collapsing to the floor at your feet.";
                case Item.Hammer:
                    return "You bring the hammer down with all your might. The metal head splits open the man's skull with a sickening crunch, sending it crashing onto the ground face down. You seize the opportunity to deliver another devastating blow on the collapsed man, splattering blood and gore all over the floor.";
                case Item.BaseballBat:
                    return "In one fluid motion, you swing the bat like you have practised a thousand times before. The force of your blow is unstoppable, and its precision undeniable. The man's head snaps back with a sickening crunch, as his body crumples onto the ground in a heap.";
                case Item.M36Revolver:
                case Item.M9Pistol:
                    return "You pull the trigger. With a sharp crack, the gunshot echoes through the room, reverberating off the walls like a thunderclap. Time seems to stand still as the bullet finds its mark, piercing through the man's decaying skull with devastating accuracy. The man staggers backward, his lifeless gaze fixed on some distant horizon, before finally crumbling to the ground in a heap.";
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

    function Aftermath() {
        const hurt = store.state.health !== Health.Unharmed;

        const text = () => {
            if (occupation === Occupation.Doctor) {
                return "Your expertise tells you these scratches could lead to infection if not treated properly. Without your equipment at the clinic, you do your best to clean the cuts with a damp cloth, before concealing them with plasters.";
            } else if (hobby === Hobby.Scout) {
                return "Your experience with cuts and wounds tells you these scratches could lead to infection if not treated properly. Thankfully, as a former scout you always have a fully stocked first aid kit at home. You first clean the wound, then apply some antiseptic before covering them with bandages.";
            } else {
                return "They are but scratches, you should be fine, you think. You cover the bleeding cuts with plasters.";
            }
        };

        return (
            <>
                <p>
                    Silence descends as you stand over your fallen adversary,
                    chest heaving with exertion, victory coursing through your
                    veins. The gravity of what you've done settles over you like
                    a shroud. <em>Who was that man? What happened to him?</em>{" "}
                    Questions race through your mind as you tried to make sense
                    of the situation.
                </p>
                {hurt && (
                    <>
                        <p>
                            You check your wounds, the assailant has left angry
                            red streaks running across your arms, some of them
                            bleeding. {text()}
                        </p>
                    </>
                )}
                {/* take items, leave home */}
                <br />
                <Button onClick={changePage(PageNumber.Aftermath)}>
                    Continue
                </Button>
            </>
        );
    }

    function Reason() {
        return (
            <>
                <p>
                    You raise your palms in peace and call out to the strange
                    man to stop. But your words fall upon deaf ears, as
                    approaching figure pays no heed to your desperate pleas.
                    With a guttural moan, the man lunges forward, its cold hands
                    seizing you.
                </p>
                <br />
                <Button onClick={changePage(PageNumber.Dead)}>Continue</Button>
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
                    to black as you succumb to his relentless hunger...
                </p>
                <br />
                <Button onClick={changeScreen(ScreenID.Death)}>Continue</Button>
            </>
        );
    }
};
