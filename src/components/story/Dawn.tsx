import { useContext, useState } from "react";
import { StoreContext } from "../../App";
import { Banner, Button, DiceRoll } from "../common";
import {
  Ability,
  Health,
  Hobby,
  Item,
  Occupation,
  Screen,
  UpdateType,
} from "../../utils/constants";

enum Page {
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
  Dash,
  Through,
  Trip,
  Sneak,
  SneakPass,
  SneakFail,
  Run,
  Car,
  End,
  Dead,
}

const Dawn = () => {
  const store = useContext(StoreContext);
  const [weapon, setWeapon] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  const occupation = store.state.character?.occupation;
  const hobby = store.state.character?.hobby;

  const changePage = (pageNumber: number) => () =>
    store.dispatch({ type: UpdateType.Page, payload: pageNumber });

  const changeScreen = (screen: Screen) => () =>
    store.dispatch({ type: UpdateType.Screen, payload: screen });

  const renderPage = (): JSX.Element => {
    switch (store.state.currentPage) {
      case Page.Start:
      default:
        return Start();
      case Page.Encounter:
        return Encounter();
      case Page.MedicinePass:
        return MedicinePass();
      case Page.MedicineFail:
        return MedicineFail();
      case Page.Reanimation:
        return Reanimation();
      case Page.Reason:
        return Reason();
      case Page.WeaponChoice:
        return WeaponChoice();
      case Page.Attack:
        return Attack();
      case Page.Kill:
        return Kill();
      case Page.StepKill:
        return StepKill();
      case Page.FailHit:
        return FailHit();
      case Page.RollSave:
        return RollSave();
      case Page.Shove:
        return Shove();
      case Page.Aftermath:
        return Aftermath();
      case Page.ItemChoice:
        return ItemChoice();
      case Page.SecondItem:
        return SecondItem();
      case Page.Flee:
        return Flee();
      case Page.Dash:
        return Dash();
      case Page.Through:
        return Through();
      case Page.Trip:
        return Trip();
      case Page.Sneak:
        return Sneak();
      case Page.SneakPass:
        return SneakPass();
      case Page.SneakFail:
        return SneakFail();
      case Page.Run:
        return Run();
      case Page.Car:
        return Car();
      case Page.Dead:
        return Dead();
      case Page.End:
        return End();
    }
  };

  return renderPage();

  function Start() {
    const flavorText = () => {
      switch (occupation) {
        case Occupation.Burglar:
          return "Another boring day at home, with the quarantine in full effect, it might be best to lay low for a while before you resume any illicit operations.";
        case Occupation.Doctor:
          return "Another long day at the clinic. Ever since the quarantine there has been more and more people reporting sick from the outbreak, when will the government send more medical staff to help treat the epidemic?";
        case Occupation.Firefighter:
          return "Another busy day at the fire station. Despite the quarantine emergency services like the fire department resumes, and your job is only made more difficult with the military blockades and cut phone lines.";
        case Occupation.Lumberjack:
          return "Another lazy day at home, since the logging operations have been disrupted by the quarantine. Maybe you will do some practise swings at the backyard today with your personal hand axe.";
        case Occupation.ParkRanger:
          return "Another quiet day at home, since the quarantine the parks have been closed to all. All rangers were recalled home save for a few left at Deerhead Lake to monitor for wildfires.";
        case Occupation.PoliceOfficer:
          return "Another hectic day at the police station. Over the last two days the military has enlisted the help of the local law enforcement to assist in the blockades and routine check-ups of inhabitants here in Rosewood.";
        default:
          return "";
      }
    };

    return (
      <>
        <Banner>9 July 1993</Banner>
        <p>
          You slowly open your eyes, pale light filters through the curtains,
          casting a soft glow across the room. Blinking away the remnants of
          sleep, you sit up, the events of the last few days still lingering in
          your mind. It is the third day of the county-wide quarantine here at
          Rosewood. Radio and TV broadcasts have been urging everyone to stay
          indoors. The military has airdropped thousands of leaflets, reminding
          inhabitants to avoid contact with the infected. The air is heavy with
          a strange, sour smell, like a mix of dampness and decay. To make
          matters worse, the phone lines have been down for at least a week,
          preventing you and others within the Zone from making contact with the
          outside world.
        </p>
        <p>
          As you prepare your morning coffee in the kitchen, you tune into the
          radio, checking if there are any updates:
        </p>
        <i>
          "You're on the NNR Network. The end of another troubled day in
          Kentucky. Here's everything NNR news sources have exclusively
          uncovered over the last 48 hours. The Knox Event outbreak is
          localized. It is an influenza-like disease that renders the afflicted
          unconscious. After a period of illness, sufferers regain motor
          functions. They are, however, dazed and confused. Panicked and
          nauseous. It's in this state, we are told, that military scientists
          are finding them. The infection is widespread in the Zone, and how it
          spreads is unknown. We have seen soldiers in HazMat suits, however.
          The US Army is taking absolutely no chances. We're promised a press
          conference to update the nation tomorrow. It's there that we'll be
          asking the questions you want answered. Tomorrow, all day. On NNR."
        </i>
        <p>
          You switch off the radio, and slump onto the couch. {flavorText()}
        </p>
        <br />
        <Button onClick={changePage(Page.Encounter)}>Continue</Button>
      </>
    );
  }

  function Encounter() {
    return (
      <>
        <p>
          Suddenly, there is a loud knock on the door, causing you to almost
          spill your hot drink. "Coming!" you call out as you get up from the
          couch. The banging gets louder, more frantic, as you wonder who might
          be paying you a visit so early in the morning.
        </p>
        <p>
          You swing open the door to come face to face with a tall man you have
          never met before. A thin film of sweat covers his face, and presses a
          bloody towel against his neck. He mouths the words "help me" before
          collapsing into your arms. There is a thick scent of his cologne and
          body odour, mixed with the metallic tang of blood. You just barely
          catch him as he stumbles, and help him onto your couch.
        </p>
        <p>
          The man is barely conscious, burning up and bleeding profusely from
          the neck, his shirt already soaked with blood. You remove the towel
          and attempt to assess his wound...
        </p>
        <DiceRoll
          ability={Ability.Medicine}
          difficulty={4}
          successPage={Page.MedicinePass}
          failPage={Page.MedicineFail}
          changePage={changePage}
        />
      </>
    );
  }

  function MedicinePass() {
    return (
      <>
        <p>
          Despite the severe bleeding, you notice a large chunk of flesh missing
          from his neck. His major artery has been severed, and he will bleed
          out in minutes regardless of what you do. You come to the grim
          realisation this man is gone.
        </p>
        <p>
          You do what you can to ease the man's suffering, holding his hand and
          telling him its going to be okay. After a period of agony, the man
          sighs and goes limp, his eyes close and face softens. You confirm from
          his pulse that he is dead.
        </p>
        <br />
        <Button onClick={changePage(Page.Reanimation)}>Continue</Button>
      </>
    );
  }

  function MedicineFail() {
    return (
      <>
        <p>
          It is not good. There is too much blood, which squirts out
          aggressively when you remove the towel. You apply pressure to
          hopefully reduce the bleeding, while calling out to him to stay awake.
        </p>
        <p>
          You think of calling for an ambulance, but since the quarantine the
          phone lines have been down. You consider driving the man to the clinic
          yourself, but it is not going to be easy to carry him. As you consider
          the possibilities, the man sighs and goes limp, his eyes close and
          face softens.
        </p>
        <br />
        <Button onClick={changePage(Page.Reanimation)}>Continue</Button>
      </>
    );
  }

  function Reanimation() {
    return (
      <>
        <p>
          You stare at the motionless body lying on your couch for several
          moments, trying to process what just happened.
          <i> Who was he? What could have attacked him?</i> Questions race
          through your mind, as you wash your hands off the blood at the kitchen
          sink.
        </p>
        <p>
          A low guttural moan snaps you out of your thoughts, and sends a chill
          down your spine. You turn your head towards the sound - and see the
          unexpected visitor sitting upright and staring straight at you with
          vacant eyes. His skin has turned pallid with dark veins stretching
          from his neck across his face like a black spiderweb.
        </p>
        <p>
          You watch frozen in horror as the man suddenly bolts upright in a
          jerky motion, struggling to balance. He shambles towards you in
          awkward, uncoordinated movements, knocking over the coffee table, with
          arms outstretched and fingers curled as if trying to grab you.
        </p>
        <p>What do you do?</p>
        <br />
        <Button onClick={changePage(Page.Reason)}>
          Try to reason with him
        </Button>
        <Button onClick={changePage(Page.WeaponChoice)}>
          Grab a weapon and defend yourself
        </Button>
      </>
    );
  }

  function Reason() {
    return (
      <>
        <p>
          You raise your palms in peace and try to speak in a calm voice, but
          your pleas fall upon deaf ears. The man lurches forward, grabbing you
          with his cold hands...
        </p>
        <Button onClick={changePage(Page.Dead)}>Continue</Button>
      </>
    );
  }

  function WeaponChoice() {
    const onClick = (weapon: Item) => () => {
      setWeapon(weapon);
      changePage(Page.Attack)();
    };

    return (
      <>
        <p>
          Your eyes dart around the kitchen, scanning for potential weapons. The{" "}
          <b>{Item.KitchenKnife}</b> on the kitchen utensil holder comes into
          view, as well as the <b>{Item.FryingPan}</b> on the stovetop, and the{" "}
          <b>{Item.Broom}</b> in the corner.
        </p>
        <p>Anything is better than nothing. What weapon will you choose?</p>
        <br />
        <Button onClick={onClick(Item.KitchenKnife)}>Kitchen knife</Button>
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
              You grab the chef's knife from the rack, its blade gleaming in the
              dim light. The man is unfazed by your weapon, and lurches forward
              at you. With a firm grip on the handle, you steel yourself for the
              confrontation ahead. Your muscles tense with anticipation, poised
              to unleash the sharp blade upon the approaching threat...
            </p>
          );
        case Item.FryingPan:
          return (
            <p>
              You grab the cast iron pan from the stovetop. It is heavy and
              unwieldy, but can serve as a makeshift club. The man is unfazed by
              your weapon, and lurches forward at you. With a firm grip on the
              metal handle, you adjust your stance, grounding yourself for the
              impending strike, as you raise the cast iron pan overhead...
            </p>
          );
        case Item.Broom:
          return (
            <p>
              You grab the long, slender broom from the corner, it feels too
              lightweight and flimsy to be a weapon, but it is all you got. The
              man is unfazed by your weapon, and lurches forward at you. With a
              firm grip on the handle, you widen your stance and bring the broom
              over your shoulder like a baseball bat...
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
          successPage={Page.Kill}
          failPage={Page.FailHit}
          changePage={changePage}
        />
      </>
    );
  }

  function Kill() {
    const onClick = () => {
      changePage(Page.Aftermath)();
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
        <Button onClick={changePage(Page.RollSave)}>Continue</Button>
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
          successPage={Page.Shove}
          failPage={Page.Dead}
          changePage={changePage}
        />
      </>
    );
  }

  function Shove() {
    const nextPage = () => {
      store.dispatch({
        type: UpdateType.TakeDamage,
        payload: 20,
      });
      changePage(Page.StepKill)();
    };

    return (
      <>
        <p>{`You manage to break free from the vice-like grip, but not without his nails clawing your arms and breaking your skin. Panic kicks in and you shove the assailant back, causing him to lose balance and fall on its back.`}</p>
        <p className="damage-text">Sustained minor damage!</p>
        <br />
        <Button onClick={nextPage}>Continue</Button>
      </>
    );
  }

  function StepKill() {
    const onClick = () => {
      changePage(Page.Aftermath)();
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
      changePage(Page.ItemChoice)();
    };

    const text = () => {
      if (store.state.health === 100) {
        return "You steal a glance at yourself in the bathroom mirror, you're covered in blood, not yours. It will be difficult to explain to anyone in this state. You wash your hands and face thoroughly before changing into a set of fresh clothes.";
      } else {
        return "You steal a glance at yourself in the bathroom mirror, you're covered in blood, some yours, some his. It will be difficult to explain to anyone in this state. As the adrenaline wears off a stinging pain rises up your arms. You remove your T-shirt and notice angry red streaks across the skin of your arms where you were grabbed earlier, some of them oozing blood. You gingerly clean the scratches under running water and cover them with plasters found in your bathroom cabinet, before changing into a set of fresh clothes.";
      }
    };

    return (
      <>
        <p>
          Silence descends as you stand over your fallen adversary, chest
          heaving with exertion, victory coursing through your veins. The
          gravity of what you've done settles over you like a shroud.{" "}
          <em>Did you just commit murder?</em>
        </p>
        <p>
          You stare at the corpse for the longest time, processing the whole
          ordeal. You recognise the symptoms as what the radio described just
          moments before... The man must have been afflicted with the Knox
          infection. A sudden dread creeps up on you as you realise the
          government have not been forthcoming with the true nature of the
          outbreak.
        </p>
        <p>
          You decide to take this to the local authorities, you cannot just stay
          at home with the body, what if it rises again?
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
      changePage(Page.SecondItem)();
    };

    return (
      <>
        <p>
          As you are getting ready you consider that if the situation is this
          bad a few items might come in handy should you need to defend yourself
          or leave town. You decide it is best to take your...
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
      changePage(Page.Flee)();
    };

    return (
      <>
        <p>
          {pickedItemText(store.state.inventory[0])} You can only take one more
          thing, so you grab your...
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
          {pickedItemText(store.state.inventory[1])} As you pack your things,
          the air thickens with an eerie tension. The usual sounds of the
          morning has been replaced by a haunting silence, broken only by
          distant moans and shuffling footsteps. Panic rises up your throat as
          you see them - several figures approaching, their movements erratic
          and unnatural. They are coming straight towards you, they know you are
          here!
        </p>
        <p>
          Your instincts tell you that you need to leave immediately. Your car
          is parked out in front on the driveway. You could try make a dash for
          it, or try sneaking around from the backdoor.
        </p>
        <br />
        <Button onClick={changePage(Page.Dash)}>Dash</Button>
        <Button onClick={changePage(Page.Sneak)}>Sneak</Button>
      </>
    );
  }

  function Sneak() {
    return (
      <>
        <p>
          You creep out the backdoor, there are at least five, no, six of them,
          men and women, all with pale skin and dark veins and various degrees
          of wounds. With hollow eyes transfixed on your home, they advance in a
          slow, ominous march. Their moans and groans fill the air, as you
          patiently wait for them to arrive at your doorstep. They poke and prod
          the door and windows, trying to find an entry. With their attention
          focused solely on the house, you can slowly sneak behind their backs
          towards your car.
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
          You chart your path around the horde to your car. First, you will
          crouch low and follow along the length of your picket fence. Then,
          under cover of the shadow of a tree, you will make it around the edge
          of the fence to your car parked on the driveway.
        </p>
        <p>
          With nerves of steel, you inch forward, your movements slow and
          deliberate, each step a silent prayer. The grass whispers beneath your
          feet, threatening to betray your presence, but you press on,
          determined to defy the odds stacked against you. Each second feels
          like an eternity as you navigate the path, and your movements go
          unnoticed.
        </p>
        <p>
          As you near your goal, one of the infected, a woman with half her head
          wrapped in soiled bandages, spots you coming around the back. Your
          heart skips a beat as she lets out an unearthly shriek that alerts the
          others to you. You abandon stealth and sprint towards the car, who
          remains just a few steps away.
        </p>
        <br />
        <Button onClick={changePage(Page.Car)}>Continue</Button>
      </>
    );
  }

  function SneakFail() {
    return (
      <>
        <p>
          You chart your path around the horde to your car. First, you will
          crouch low and follow along the length of your picket fence. Then,
          under cover of the shadow of a tree, you will make it around the edge
          of the fence to your car parked on the driveway.
        </p>
        <p>
          With nerves of steel, you inch forward, your movements slow and
          deliberate, each step a silent prayer. The grass whispers beneath your
          feet, threatening to betray your presence, but you press on,
          determined to defy the odds stacked against you. Each second feels
          like an eternity as you navigate the path, and your movements go
          unnoticed.
        </p>
        <p>
          As you are making your way, your foot accidentally lands on a dry twig
          tucked between the grass. Your heart sinks as you hear and feel a loud
          snap from underfoot, followed by an unearthly shriek coming from the
          horde.
        </p>
        <br />
        <Button onClick={changePage(Page.Run)}>Run!</Button>
      </>
    );
  }

  function Run() {
    const nextPage = () => {
      store.dispatch({
        type: UpdateType.TakeDamage,
        payload: 20,
      });
      changePage(Page.Car)();
    };

    return (
      <>
        <p>
          Abandoning stealth, you vault over the fence and break into a sprint
          towards your car. However, one of the infected intercepts your path,
          you attempt to duck under his grasping hands, but an unseen obstacle
          catches your foot, causing you to stumble and lose your balance. With
          a sharp thud you hit the ground, feeling the rough texture of gravel
          scraping your knees as you struggle to regain your footing amidst the
          chaos. You quickly pick yourself up and rush to the car before the
          rest could reach you.
        </p>
        <p className="damage-text">Sustained minor damage!</p>
        <br />
        <Button onClick={nextPage}>Continue</Button>
      </>
    );
  }

  function Dash() {
    return (
      <>
        <p>
          You open the front door, there are at least five, no, six of them, men
          and women, all with pale skin and dark veins and various degrees of
          wounds. Their moans transform into frenzied growls at the sight of
          you, as they pick up the pace and close in on you from all sides. You
          sprint toward your car as they begin closing in onto your position
          from all angles. Two of them block your path, but you gather your
          resolve and try to maneuver past them...
        </p>
        <br />
        <DiceRoll
          ability={Ability.Fitness}
          difficulty={4}
          successPage={Page.Through}
          failPage={Page.Trip}
          changePage={changePage}
        />
      </>
    );
  }

  function Through() {
    return (
      <>
        <p>
          The creatures reach out, their fingers brushing your clothes, but you
          slip through their grasps like a wisp of smoke. Adrenaline surges
          through your body as you dart and weave, narrowly avoiding their
          clumsy attempts to ensare you. In a heart pounding moment, you break
          free from the blockade, the cool metal of the car door within reach.
        </p>
        <br />
        <Button onClick={changePage(Page.Car)}>Continue</Button>
      </>
    );
  }

  function Trip() {
    const nextPage = () => {
      store.dispatch({
        type: UpdateType.TakeDamage,
        payload: 20,
      });
      changePage(Page.Car)();
    };

    return (
      <>
        <p>
          As you attempt to duck and weave through their grasping hands, a
          sudden obstacle catches your foot, causing you to stumble and lose
          your balance. With a sharp thud you hit the ground, feeling the rough
          texture of gravel scraping your knees as you struggle to regain your
          footing amidst the chaos. You quickly pick yourself up and rush to the
          car before they could reach you.
        </p>
        <p className="damage-text">Sustained minor damage!</p>
        <br />
        <Button onClick={nextPage}>Continue</Button>
      </>
    );
  }

  function Car() {
    return (
      <>
        <p>
          Your heart races as you fumble for your keys, hands shaking as you
          unlock the car door. The growls draw closer, spurring you into action.
          You jump into the driver's seat, and with the first twist, the
          ignition finds purchase. The roar of the engine instantly drowns out
          the cacophony of approaching danger. With tires screeching against
          asphalt, you tear away from the driveway and onto the road.
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
          You glance in the rearview mirror, watching as the figures grow
          smaller and smaller, fading into the distance. Sweat beads on your
          brow, your hands still gripping the wheel with white-knuckled
          intensity, but a sense of relief washes over you. You've escaped, for
          now.
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

  function getStarterItems(
    occupation?: Occupation | null,
    hobby?: Hobby | null,
  ): Item[] {
    let items = new Set([
      Item.KitchenKnife,
      Item.Torchlight,
      Item.Wallet,
      Item.Lunchbox,
    ]);

    switch (occupation) {
      case Occupation.Burglar:
        items.add(Item.LockpickingTools);
        break;
      case Occupation.Lumberjack:
        items.add(Item.HandAxe);
        break;
      case Occupation.Doctor:
        items.add(Item.FirstAidKit);
        break;
      case Occupation.ParkRanger:
        items.add(Item.HikingBag);
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
      case Hobby.Hiker:
        items.add(Item.HikingBag);
        break;
      case Hobby.Scout:
        items.add(Item.FirstAidKit);
        break;
      case Hobby.Marksman:
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
          ? "You grab the bloodied knife from the dead body and wipe off the blood and grime. It has served well as a makeshift weapon, and you feel like you will need it again soon."
          : "You grab the chef's knife from the rack, its blade gleaming from the sunlight. It will serve as a makeshift weapon, something you feel like you might need soon.";
      case Item.Wallet:
        return "You grab your leather wallet containing some cash and your ID. It might be important to have those on hand in emergency situations.";
      case Item.Torchlight:
        return "You grab your torchlight, flicking it on ensuring that the batteries still have juice. Having a light source might be useful when it turns dark.";
      case Item.Lunchbox:
        return "You grab your lunchbox already packed this morning with a peanut butter sandwich, an apple and a bottle of water.";
      case Item.BaseballBat:
        return "You grab your autographed Louisville slugger from the trophy cabinet, its weight familiar in your hands.";
      case Item.FirstAidKit:
        return "You grab your first aid kit fully stocked with bandages, alcohol wipes, disinfectant, painkillers and a cold pack from the bathroom cabinet.";
      case Item.M36Revolver:
        return "You grab your standard issue police revolver and a box of accompanying .38 special bullets.";
      case Item.M9Pistol:
        return "You grab your licensed personal handgun from a guncase tucked under your bed and a box of 9mm rounds.";
      case Item.LockpickingTools:
        return "You grab a box of paperclips and a screwdriver, your preferred choice of tools for lockpicking.";
      case Item.HikingBag:
        return "You grab your hiking bag stocked with fire starting tools, a rolled up tent kit, and other survival amenities.";
      case Item.HandAxe:
        return "You grab your personal hand axe used for light woodchopping.";
      default:
        return "";
    }
  }
};

export default Dawn;
