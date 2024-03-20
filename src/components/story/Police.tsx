import { useContext, useState } from "react";
import { StoreContext } from "../../App";
import {
  UpdateType,
  Screen,
  Item,
  Hunger,
  Occupation,
  Health,
  Ability,
  Hobby,
} from "../../utils/constants";
import { Banner, Button, DiceRoll, Image } from "../common";

enum Page {
  Start,
  Hunger,
  PoliceStation,
  Choice,
  Sneak,
  SneakPass,
  SneakFail,
  Dash,
  Armory,
  Lockpick,
  Combination,
  SmashLock,
  SmashFail,
  Revolver,
  Shotgun,
  Leave,
  Flee,
  End,
  Dead,
}

const PoliceStation = () => {
  const store = useContext(StoreContext);

  const changePage = (pageNumber: number) => () =>
    store.dispatch({ type: UpdateType.Page, payload: pageNumber });

  const changeScreen = (screen: Screen) => () =>
    store.dispatch({ type: UpdateType.Screen, payload: screen });

  const occupation = store.state.character?.occupation;
  const hobby = store.state.character?.hobby;
  const inventory = store.state.inventory;

  const renderPage = (): JSX.Element => {
    switch (store.state.currentPage) {
      case Page.Start:
      default:
        return Start();
      case Page.Hunger:
        return HungerCheck();
      case Page.PoliceStation:
        return PoliceStation();
      case Page.Choice:
        return Choice();
      case Page.Sneak:
        return Sneak();
      case Page.SneakPass:
        return SneakPass();
      case Page.SneakFail:
        return SneakFail();
      case Page.Dash:
        return Dash();
      case Page.Armory:
        return Armory();
      case Page.Lockpick:
        return Lockpick();
      case Page.Combination:
        return Combination();
      case Page.SmashLock:
        return SmashLock();
      case Page.SmashFail:
        return SmashFail();
      case Page.Revolver:
        return Revolver();
      case Page.Shotgun:
        return Shotgun();
      case Page.Leave:
        return Leave();
      case Page.Flee:
        return Flee();
      case Page.Dead:
        return Dead();
    }
  };

  return renderPage();

  function Start() {
    const onClick = () => {
      const haveFood = inventory.includes(Item.Lunchbox);
      store.dispatch({
        type: UpdateType.Hunger,
        payload: haveFood ? Hunger.Stuffed : Hunger.Hungry,
      });
      haveFood
        ? store.dispatch({
            type: UpdateType.RemoveItem,
            payload: Item.Lunchbox,
          })
        : null;
      changePage(Page.Hunger)();
    };

    return (
      <>
        <Banner>The Police Station</Banner>
        <p>
          You drive down the desolate road towards downtown, the occasional
          house you pass by abandoned. The once-familiar neighbourhood now feels
          foreign, overshadowed by an eerie silence. In the distance, sirens
          wail mournfully, while smoke billows ominously, staining the sky with
          its dark presence.
        </p>
        <p>
          Suddenly, you catch sight of a military aircraft soaring overhead. For
          a moment, hope flickers within you. Maybe help has arrived. But as the
          aircraft draws closer, your optimism fades. With a low rumble, the
          plane releases a flurry of flyers that cascade down like grim
          confetti, fluttering in the wind before settling on the empty streets.
        </p>
        <p>
          One of them lands on your windscreen, you lower your window and grab
          it, unfurling the note:
        </p>
        <br />
        <Image fileName="advisory.png" />
        <br />
        <p>
          The radio crackles with sporadic transmissions, snippets of panic and
          despair. Some civilian channels call those afflicted with the Knox
          infection 'zombies'. You steal glances at the rearview mirror, half
          expecting to see figures following you. But for now, the road
          stretches out before you, a narrow path to an uncertain destination.
        </p>
        <br />
        <Button onClick={onClick}>Continue</Button>
      </>
    );
  }

  function HungerCheck() {
    const text = () => {
      return store.state.hunger === Hunger.Stuffed
        ? "Fortunately, you have brought your lunchbox with you. With one hand on the steering wheel, you unlatch the plastic box with the other and pull out your peanut butter sandwich, wolfing it down greedily before downing your water bottle. The morning's events have left you famished, and you feel your body regaining strength with each bite. You chow down on the apple afterwards, licking your fingers."
        : "Unfortunately, you did not bring your lunchbox, which you had packed this morning. You also do not keep food in the car, for concern of pests, which feels like a really trivial issue now. The morning's events have left you famished, and you now feel a gnawing ache in your stomach.";
    };

    const hungerText = () => {
      return store.state.hunger === Hunger.Stuffed ? (
        <>
          <p className="bonus-text">You are now Stuffed!</p>
          <p className="info-text">
            You get a bonus to Strength & Fitness rolls
          </p>
        </>
      ) : (
        <>
          <p className="damage-text">You are now Hungry!</p>
          <p className="info-text">
            You will experience a penalty to Strength & Fitness rolls
          </p>
        </>
      );
    };

    return (
      <>
        <p>
          Your lower the radio volume, shifting your attention to the road
          ahead. A sudden growl in your stomach breaks your focus, as you are
          reminded that your last meal was yesterday. {text()}
        </p>
        {hungerText()}
        <br />
        <Button onClick={changePage(Page.PoliceStation)}>Continue</Button>
      </>
    );
  }

  function PoliceStation() {
    return (
      <>
        <p>
          As the police station comes into view, you feel a surge of relief.
          Finally, you've found refuge from the chaos unfolding. Rosewood is a
          small town, but it houses the Court of Justice and Kentucky State
          Prison nearby. As such, its police department is a sizeable force,
          supporting the judicial arm of the law as well as its incarceration
          facility. But as you pull up to the station, you get a sense that
          something is terribly wrong. The once imposing building now stands
          eerily silent, absent of the usual hustle and bustle of law
          enforcement activity. Abandoned vehicles litter the parking lot, some
          with doors left ajar.
        </p>
        <p>
          You pull up to the driveway and cautiously approach the entrance,
          noting bloody handprints on the front doors. The interior of the
          station is a scene of devastation, furniture overturned and papers
          strewn accross the floor. The lights above flickers ominously upon
          your arrival. <em>Where are all the officers?</em> The air is thick
          with the stench of blood and smoke, and a sense of dread settles over
          you like a heavy cloak.
        </p>
        <p>
          As you warily make your way through the wreckage, a sudden burst of
          gunfire shatters the silence, followed by the chilling sound of
          screams echoing through the halls. Your instincts urge you to turn
          back, to flee from the danger that lies ahead. But something compels
          you forward, driving you to investigate the source of the commotion.
          The screaming soon stops, followed by the sounds of frenzied groans.
        </p>
        <br />
        <Button onClick={changePage(Page.Choice)}>Continue</Button>
      </>
    );
  }

  function Choice() {
    const flavorText = () => {
      if (occupation === Occupation.PoliceOfficer)
        return "As a police officer, you know the police station armory houses a formidable array of firearms.";
      if (hobby === Hobby.Marksman)
        return "Without a doubt, in your hands those firearms will prove to be effective weapons.";
      else
        return "Without a doubt, there are guns in there which might prove essential for survival.";
    };

    return (
      <>
        <p>
          You turn a corner and freeze in horror at the sight before you. A trio
          of figures hunch over a fallen policeman, bringing their hands from
          his body to their mouths repeatedly. From your angle you notice the
          victim's leg twitching, and the realization hits you like a
          sledgehammer: they're eating him alive. You quickly clamp a hand over
          your mouth, desperately trying to stifle the gag reflex that rises in
          your throat.
        </p>
        <p>
          Your first instinct is to flee, to escape the gruesome sight before
          you. But as your eyes scan the room, they fall upon a high security
          door standing ajar, with a sign above it labelled "ARMORY".{" "}
          {flavorText()} You quickly assess the situation: the cannibals are
          completely focused on the policeman, you could attempt to sneak past
          them to the armory, or not take the risks and return to your car.
        </p>
        <br />
        <Button onClick={changePage(Page.Sneak)}>
          Try and sneak into the Armory
        </Button>
        <Button onClick={changePage(Page.Leave)}>
          Leave the police station
        </Button>
      </>
    );
  }

  function Sneak() {
    return (
      <>
        <p>
          You crouch low and stay close to the wall furthest away from the
          zombies, inching your way towards the armory. Every movement
          painstakingly slow to avoid making any noise. Sounds of rending flesh
          and gurgled screams echo in your ears, intensifying the sickening
          sensation in the pit of your stomach. Your heart races with each
          agonizing second, the fear of discovery clawing at your mind. But you
          steel yourself and press on.
        </p>
        <br />
        <DiceRoll
          ability={Ability.Stealth}
          difficulty={4}
          successPage={Page.SneakPass}
          failPage={Page.SneakFail}
          changePage={changePage}
        />
      </>
    );
  }

  function SneakPass() {
    return (
      <>
        <p>
          After several excruciating moments, you make it to the other side of
          the corridor unnoticed, your nerves frayed but your determination
          unwavering. You successfully sneak to the armory and close the
          security door behind you. The security door stands as a formidable
          barrier, its black steel frame secured firmly by thick bolts. Embedded
          within the steel frame are reinforced glass panels allowing you to
          keep tabs on the creatures still feasting on their poor victim
          outside.
        </p>
        <br />
        <Button onClick={changePage(Page.Armory)}>Continue</Button>
      </>
    );
  }

  function SneakFail() {
    return (
      <>
        <p>
          In a moment of unfortunate clumsiness, your foot kicks a loose piece
          of debris, sending it rattling down the corridor noisily. Time seems
          to stop as the zombies' heads snap up, their milky eyes locking onto
          you. At first they appear confused, but then angry snarls escape their
          gore-filled lips. Panic surges through you as you realize you've been
          discovered.
        </p>
        <br />
        <Button onClick={changePage(Page.Dash)}>
          Make a run for the armory
        </Button>
        <Button onClick={changePage(Page.Flee)}>Flee the station</Button>
      </>
    );
  }

  function Dash() {
    return (
      <>
        <p>
          You break into a sprint for the armory, while the zombies leave their
          meal and lumber towards you in jerky, uncoordinated movements. You
          enter the room and quickly slam the door behind you. The security door
          stands as a formidable barrier, its black steel frame secured firmly
          by thick bolts. Embedded within the steel frame are reinforced glass
          panels allowing you to witness the creatures pound on the sturdy door
          in futile. You watch with a sense of grim satisfaction, knowing that
          for now, at least, you are safe on the other side.
        </p>
        <br />
        <Button onClick={changePage(Page.Armory)}>Continue</Button>
      </>
    );
  }

  function Armory() {
    const getOptions = () => {
      const result = [
        <Button onClick={changePage(Page.SmashLock)}>
          You try to smash open the lock
        </Button>,
      ];

      const isPolice =
        store.state.character?.occupation === Occupation.PoliceOfficer;
      const lockpick = store.state.inventory.includes(Item.LockpickingTools);

      if (isPolice)
        result.push(
          <Button onClick={changePage(Page.Combination)}>
            You know the combination [POLICE]
          </Button>
        );
      if (lockpick)
        result.push(
          <Button onClick={changePage(Page.Lockpick)}>
            You lockpick the padlock [BURGLAR]
          </Button>
        );

      return result;
    };

    return (
      <>
        <p>
          You find yourself in the dimly lit police armory, the air still and
          heavy with the scent of metal. Your eyes scan the room, taking in rows
          of empty weapon racks and barren shelves, a stark reminder of the
          chaos that has unfolded in this once secure facility.
        </p>
        <p>
          Your gaze falls upon a lone metal locker tucked away in the corner,
          its dark green surface gleaming dully in the faint light. As you
          approach, you notice a combination lock securing the locker tightly
          shut. Your heart quickens with anticipation, wondering what treasures
          may lie hidden behind its sturdy exterior.
        </p>
        <br />
        {getOptions()}
      </>
    );
  }

  function Combination() {
    return (
      <>
        <p>
          As a police officer, you know the armory has a rotating set of
          passcodes. With a steady hand, you begin to twist and turn the dial,
          trying each set of digits you can remember. And then, with a
          satisfying clunk, the lock yields to one of your passcodes, its
          metallic resistance giving way to reveal the secrets held within.
        </p>
        <br />
        <Button onClick={changePage(Page.Shotgun)}>Continue</Button>
      </>
    );
  }

  function Lockpick() {
    return (
      <>
        <p>
          You fish out your set of lockpicks, looking for one suitable for this
          type of lock. You slide the slender tool into the narrow gap between
          the dial and lock, feeling for the tumblers within. As you apply
          gentle pressure, you begin to manipulate the tumblers one by one,
          listening intently for the subtle clicks that signal progress. Time
          seems to stand still as you work, your focus unwavering as you inch
          closer to cracking the code. And then, after what seems like an
          eternity, you feel the final tumbler fall into place with a satisfying
          click. A triumphant grin spreads across your face as you twist the
          dial, the lock releasing its hold with a satisfying clunk.
        </p>
        <br />
        <Button onClick={changePage(Page.Shotgun)}>Continue</Button>
      </>
    );
  }

  function SmashLock() {
    return (
      <>
        <p></p>
        <br />
        <DiceRoll
          ability={Ability.Strength}
          difficulty={5}
          successPage={Page.Shotgun}
          failPage={Page.SmashFail}
          changePage={changePage}
        />
      </>
    );
  }

  function SmashFail() {
    return <></>;
  }

  function Revolver() {
    return <></>;
  }

  function Shotgun() {
    return <></>;
  }

  function Leave() {
    return (
      <>
        <p>
          You decide whatever is in the armory is not worth losing your life,
          and slowly creep away from the grisly scene.
        </p>
        <br />
        <Button onClick={changePage(Page.End)}>Continue</Button>
      </>
    );
  }

  function Flee() {
    return (
      <>
        <p>
          You decide whatever is in the armory is not worth losing your life,
          and runs for the entrance.
        </p>
        <br />
        <Button onClick={changePage(Page.End)}>Continue</Button>
      </>
    );
  }

  function End() {
    return (
      <>
        <p>
          Returning to the entrance, you notice a menacing silhouette
          approaching from the west.
        </p>
        <br />
        <Button onClick={changeScreen(Screen.Summary)}>Summary</Button>
      </>
    );
  }

  function Dead() {
    const gameOver = () => {
      store.dispatch({
        type: UpdateType.TakeDamage,
        payload: Health.Dead,
      });
      changeScreen(Screen.Death)();
    };

    return (
      <>
        <p>
          You try to pull free, but the man has you in a vice-like grip. Your
          eyes widen in terror as he sinks his teeth onto your neck, tearing
          through skin and sinew. You try to fight back but it is no use, and
          your screams are soon replaced by the sounds of frenzied chewing and
          slurping. The world fades to black as you succumb to your wounds...
        </p>
        <br />
        <Button onClick={gameOver}>Game Over</Button>
      </>
    );
  }
};

function getWeaponDifficulty(weapon: Item | null): number {
  switch (weapon) {
    default:
    case Item.KitchenKnife:
      return 5; // 33% base success rate
    case Item.BaseballBat:
    case Item.HandAxe:
    case Item.M9Pistol:
    case Item.M36Revolver:
      return 4; // 50% base success rate
  }
}

export default PoliceStation;
