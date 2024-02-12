import { useContext, useState } from "react";
import { StoreContext } from "../../App";
import { UpdateType } from "../../store";
import { Button } from "../common";
import { Damage, Hobby, Item, Occupation, ScreenID } from "../../constants";

enum PageNumber {
    Prologue,
    Encounter,
    FirstZombie,
    Bedroom,
    WindowEscape,
    BackHome,
    CarKeys,
    SneakWeapon,
    SneakAttack,
    ThreatenGun,
    WeaponChoice,
    Attack,
    FailHit,
    BreakFree,
    SuccessHit,
    Dead,
    Aftermath,
}

export const Home = () => {
    const store = useContext(StoreContext);
    const [weapon, setWeapon] = useState<Item | null>(null);

    const occupation = store.state.character?.occupation;
    const hobby = store.state.character?.hobby;

    const changePage = (pageNumber: number) => () =>
        store.dispatch({ type: UpdateType.Page, payload: pageNumber });

    const changeScreen = (screen: ScreenID) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    const updateHealth = (health: Damage) => () =>
        store.dispatch({ type: UpdateType.Health, payload: health });

    const carryingGun = weapon === Item.M36Revolver || weapon === Item.M9Pistol;

    const renderPage = () => {
        switch (store.state.currentPage) {
            case PageNumber.Encounter:
                return Encounter();
            case PageNumber.FirstZombie:
                return FirstZombie();
            case PageNumber.Bedroom:
                return Bedroom();
            case PageNumber.WindowEscape:
                return WindowEscape();
            case PageNumber.BackHome:
                return BackHome();
            case PageNumber.CarKeys:
                return CarKeys();
            case PageNumber.SneakWeapon:
                return SneakWeapon();
            case PageNumber.SneakAttack:
                return SneakAttack();
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
        return (
            <>
                <p>
                    As you slowly awaken from the depths of slumber, the soft
                    morning light greets you through the curtains. The familiar
                    surroundings of your home offering a semblance of security.
                    Yet, as your senses gradually come alive, a feeling of
                    unease creeps over you like a chilling breeze. Today,
                    something is amiss. The air hangs heavy with silence, devoid
                    of the usual hum of life outside.
                </p>
                <p>
                    A sudden noise shatters the stillness of the moment - a loud
                    crash that echoes through the house. Panic grips your heart
                    as you bolt up, straining to comprehend the source of the
                    disturbance. There is a moment of disbelief, a split second
                    where reality feels suspended. And then it hits you like a
                    thunderbolt: someone, <em>or something</em> just broke into
                    your home!
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
                    You jump out of bed and race toward the sound, unaware of
                    what is to come next. Suddenly, a low, guttural growl of
                    unknown origin echoes through the house. You freeze midway,
                    a primal instinct warning you of the danger that lies ahead.
                </p>
                <p>
                    Slowly, you creep forward from your living room, only to be
                    met with a surreal sight. There, standing amidst your
                    kitchen, is a figure that defies reason.
                </p>
                <p>
                    The intruder is a man with ashen and pallid skin, clad in
                    the tattered remains of his clothes. His hands and mouth are
                    covered in crimson, with bits of glass sticking out from his
                    arms and face. His bloodshot eyes gleam with hunger, as they
                    lock onto you with an intensity that sends a shiver down
                    your spine.
                </p>
                <p>
                    Time seems to stand still, as your mind struggles to make
                    sense of the nightmare unfolding before you. The abomination
                    lurches forward with a grunt, its movements jagged and
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
                    instincts kick into overdrive. You search desperately for an
                    escape, but the man cuts off your path to the door. Behind
                    you is your bedroom, which has a door you can put between
                    yourself and the man. Alternatively, you make your stand
                    here and fight the approaching horror.
                </p>
                <p>You decide to:</p>
                <br />
                <Button onClick={changePage(PageNumber.WeaponChoice)}>
                    Stand and fight
                </Button>
                <Button onClick={changePage(PageNumber.Bedroom)}>
                    Flee to the bedroom
                </Button>
            </>
        );
    }

    function Bedroom() {
        const getGun = () => {
            if (occupation === Occupation.PoliceOfficer) {
                setWeapon(Item.M36Revolver);
                return "Before leaving, you grab your police standard issue M36 revolver from your nightstand drawer.";
            } else if (hobby === Hobby.Shooting) {
                setWeapon(Item.M9Pistol);
                return "Before leaving, you grab your M9 pistol from the gun case tucked in your wardrobe.";
            }
            return "";
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
                    {`You draw the bedroom curtains and glance outside: the
                    backyard appears clear. You decide to climb out the window
                    and make your escape. ${getGun()}`}
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
        const haveGun = weapon === Item.M36Revolver || weapon === Item.M9Pistol;
        return (
            <>
                <p>
                    {`You make your way around to the front door, unlocking it
                    with the spare key hidden under a potted plant. You turn the
                    doorknob and enter cautiously. The intruder is still
                    preoccupied with knocking down the door, and remains
                    oblivious to your entrance. You spot your key ring on the
                    table in the living room, just a few steps away from the
                    man. Alternatively, it might be prudent to prepare for
                    self-defence. ${
                        haveGun &&
                        "Lastly, you could threaten the man with your gun."
                    }`}
                </p>
                <br />
                <Button onClick={changePage(PageNumber.CarKeys)}>
                    Grab car keys
                </Button>
                <Button onClick={changePage(PageNumber.SneakWeapon)}>
                    Find a Weapon
                </Button>
                {haveGun && (
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
                <Button onClick={changePage(PageNumber.SneakWeapon)}>
                    Weapon
                </Button>
            </>
        );
    }

    function SneakWeapon() {
        const onClick = (weapon: Item) => () => {
            setWeapon(weapon);
            changePage(PageNumber.SneakAttack)();
        };

        return (
            <>
                <p>
                    Your eyes scan around the house for potential weapons. A few
                    options come to mind:
                </p>
                <p>
                    In the kitchen drawer there is a chef's knife, or the frying
                    pan on the stovetop.
                </p>
                {occupation === Occupation.Construction && (
                    <p>The hammer in your toolbox from work.</p>
                )}
                {occupation === Occupation.ParkRanger && (
                    <p>The hand axe in your ranger pack.</p>
                )}
                {hobby === Hobby.Baseball && (
                    <p>The signed baseball bat in your trophy cabinet.</p>
                )}
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
                    Roll <b>[FIREARMS]</b> to determine your outcome
                </p>
                {/* Add die roll */}
                <br />
                <Button onClick={changePage(PageNumber.SuccessHit)}>
                    Continue
                </Button>
                <Button onClick={changePage(PageNumber.FailHit)}>
                    Continue
                </Button>
            </>
        );
    }

    function SneakAttack() {
        return (
            <>
                <p>
                    You inch forward, your movements deliberate and calculated,
                    toward the weapon lying just a few feet away. Your heart
                    pounds in your chest as you pray the zombie remains
                    oblivious to your presence. Each step is a silent
                    negotiation with fate, your breath held in anticipation of
                    any telltale sound that might betray your intentions. With
                    every passing moment, the weight of the impending danger
                    hangs heavy in the air, urging you to reach the weapon
                    before the zombie senses your presence.
                </p>
                <br />
                <Button onClick={changePage(PageNumber.CarKeys)}>
                    Car keys
                </Button>
                <Button onClick={changePage(PageNumber.SneakWeapon)}>
                    Weapon
                </Button>
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
                    The fight instinct kicks in, as you tense up and prepare to
                    fight. Your eyes scan around the house for potential
                    weapons. A few options come to mind:
                </p>
                <p>
                    In the kitchen drawer there is a chef's knife, or the frying
                    pan on the stovetop.
                </p>
                {occupation === Occupation.PoliceOfficer && (
                    <p>
                        Your police standard issue M36 revolver in your
                        nightstand
                    </p>
                )}
                {occupation === Occupation.Construction && (
                    <p>The hammer in your toolbox from work.</p>
                )}
                {occupation === Occupation.ParkRanger && (
                    <p>The hand axe in your ranger pack.</p>
                )}
                {hobby === Hobby.Shooting && (
                    <p>Your favourite M9 pistol in the bedroom wardrobe.</p>
                )}
                {hobby === Hobby.Baseball && (
                    <p>The signed baseball bat in your trophy cabinet.</p>
                )}
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
                    return "You dash to the kitchen and retrieve the chef's knife from the drawer, its blade gleaming in the dim light. The man is unfazed by your weapon, and lurches forward at you. With a firm grip on the handle, you steel yourself for the confrontation ahead. Your muscles tense with anticipation, poised to unleash the sharp blade upon the approaching threat...";
                case Item.FryingPan:
                    return "You dash to the kitchen and grab the frying pan. The makeshift club is heavy and unwieldy. The man is unfazed by your weapon, and lurches forward at you. With a firm grip on the metal handle, you adjust your stance, grounding yourself for the impending strike, as you raise the cast iron pan overhead...";
                case Item.BaseballBat:
                    return "You quickly open the cabinet and grab your vintage Louisville slugger, its weight familiar in your hands. The man is unfazed by your weapon, and lurches forward at you. You take your batting stance and your body coils like a spring, gathering energy for the impending strike...";
                case Item.HandAxe:
                    return "You hastily grab your ranger backpack stocked with camping supplies and pull out your hand axe. The man is unfazed by your weapon, and lurches forward at you. With a steady grip on the handle, you adjust your stance, planting your feet firmly on the ground, and raise the axe overhead, visualising the arc of the axeblade making its way to the target...";
                case Item.Hammer:
                    return "You hurriedly reach for your toolbox and retrieve your hammer. The weight of the tool feels reassuring in your grip, its handle worn smooth by countless hours of use. The man is unfazed by your weapon, and lurches forward at you. Your breath quickens as you raise the hammer overhead, its head poised to deliver a devastating blow...";
                case Item.M36Revolver:
                    return "You dash into the bedroom and retrieve the service weapon from your nightstand, the weight of it in your hand both reassuring and ominous. The man is unfazed, and lurches forward at you. You raise the revolver, its barrel trained on the advancing form. The world falls away, leaving only you and the target in your sights...";
                case Item.M9Pistol:
                    return "You dash into the bedroom and grab the gun case in your wardrobe, flipping it open and retrieving the weapon within. In one fluid motion you insert the loaded magazine and cock the sidearm. The man is unfazed, and lurches forward at you. You raise the pistol, its barrel trained on the advancing form. The world falls away, leaving only you and the target in your sights...";
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
                    Continue
                </Button>
                <Button onClick={changePage(PageNumber.FailHit)}>
                    Continue
                </Button>
            </>
        );
    }

    function FailHit() {
        const text = () => {
            switch (weapon) {
                case Item.KitchenKnife:
                    return "You lunge forward, thrusting the kitchen knife at the man. The blade penetrates his chest, gliding through flesh with a sickening squelch. The man lets out a grunt, but is otherwise unconcerned by the stab wound.";
                case Item.FryingPan:
                    return "You swing the frying pan at the man. The metal smacks his face with a loud clang, sending blood and teeth flying onto the tiled floor. The impact reverberates through your bones as the man staggers backward, his movements jerky and uncoordinated. For a moment there is a glimmer of hope, but it was short-lived.";
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
                    Roll [<b>STRENGTH</b>] to determine your outcome...
                </p>
                {/* Add die roll */}
                <br />
                <Button onClick={changePage(PageNumber.BreakFree)}>
                    Continue
                </Button>
                <Button onClick={changePage(PageNumber.Dead)}>Continue</Button>
            </>
        );
    }

    function BreakFree() {
        updateHealth(Damage.Minor);
        return (
            <>
                <p>{`You manage to break free from the vice-like grip, but not without the man's nails tearing your sleeves and digging into your skin. Pain sears up from your arms as you shove the assailant back, before ${
                    carryingGun
                        ? "lining up the barrel for another shot..."
                        : "preparing your weapon for another blow..."
                }`}</p>
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
                    return "You pull the trigger. With a sharp crack, the gunshot echoes through the room, reverberating off the walls like a thunderclap. Time seems to stand still as the bullet finds its mark, piercing through the man's decaying skull with devastating accuracy. For a moment, there is silence. The man staggers backward, his lifeless gaze fixed on some distant horizon, before finally crumbling to the ground in a heap.";
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
        const hurt = store.state.status.health !== Damage.Unharmed;

        <>
            <p>
                Silence descends as you stand over your fallen adversary, chest
                heaving with exertion, victory coursing through your veins. The
                gravity of what you've done settles over you like a shroud.
                <em>Who was that man? What happened to him?</em> Questions race
                through your mind.
            </p>
            {hurt && <p>You check your wounds, the assailant </p>}
            <br />
            <Button onClick={changePage(PageNumber.Aftermath)}>Continue</Button>
        </>;
    }

    function Dead() {
        return (
            <>
                <p>
                    You try to pull free, but the man has you in a vice-like
                    grip. Your eyes widen in terror as the zombie sinks its
                    teeth onto your neck, causing you to cry out in pain. You
                    try to fight back but it is no use, as your screams are soon
                    replaced by the sounds of frenzied chewing and slurping.
                    Darkness slowly envelopes your senses...
                </p>
                <br />
                <Button onClick={changeScreen(ScreenID.Death)}>Continue</Button>
            </>
        );
    }
};
