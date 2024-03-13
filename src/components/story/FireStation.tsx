import { useContext } from "react";
import { StoreContext } from "../../App";
import { UpdateType, Screen, Item, Hunger } from "../../utils/constants";
import { Banner, Button, Image } from "../common";

enum Page {
  Start,
  Hunger,
  PoliceStation,
  FireStation,
  End,
  Dead,
}

const FireStation = () => {
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
      case Page.FireStation:
        return FireStation();
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
        <Banner>The Fire Station</Banner>
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
          As the police station comes into view, your heart swells with a mix of
          hope and fear. Finally, you've found refuge - or so you thought.
          Abandoned cars litter the parking lot and entrance, some with doors
          left ajar, others with cracked windscreens or blood splattered across
          the hood. The once imposing building now stands as a haunting monument
          to chaos, its windows shattered and doors hanging off their hinges.
          The usual hustle and bustle of law enforcement activity is absent.
          Instead, eerie silence hangs heavy in the air. The burning scent of
          smoke wafts through the air, mingling with the metallic tang of blood.
        </p>
        <p>
          Your stomach knots as you realize the magnitude of the situation.
          Rosewood is a small town, but it houses the Court of Justice and
          Kentucky State Prison nearby. As such, its police department is a
          sizeable force, supporting the judicial arm of the law as well as its
          incarceration facility. You did not expect it to fall so quickly to
          the outbreak. The station, once a symbol of safety and order, now
          stands as a fortress of the infected. Zombies emerge from its
          entrance, clad in the navy blue uniform of law enforcement. Their
          movements sluggish and disjointed, but their intentions unmistakable.
        </p>
        <p>
          Your mind races as you weigh your options. Panic threatens to consume
          you, but you know you can't afford to lose control now. With slow,
          deliberate steps, the zombies advance through the maze of abandoned
          vehicles. Their progress is agonizingly slow, hampered by the
          obstacles in their path.
        </p>
        <p>
          There is only one thing to do for now: run. You quickly shift your
          gear into reverse and retreat from the scene, before maneuvering a
          hasty three point turn to drive the way from which you came.
        </p>
        <br />
        <Button onClick={changePage(Page.FireStation)}>Continue</Button>
      </>
    );
  }

  function FireStation() {
    return (
      <>
        <p>test</p>
        <br />
        <Button onClick={changePage(Page.FireStation)}>Continue</Button>
      </>
    );
  }
};

export default FireStation;
