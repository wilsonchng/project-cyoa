import { useContext, useState } from "react";
import { StoreContext } from "../../App";
import { Banner, Typewriter } from "../common";
import { Occupation } from "../../utils/constants";

const Tutorial = () => {
  const store = useContext(StoreContext);
  const playthrough = store.state.playthrough!;

  const [showButton, setShowButton] = useState<boolean>(false);

  const getFlavorText = () => {
    switch (playthrough.occupation) {
      case Occupation.Police:
        return "Even the police station is operating on minimum staff capacity, sending half of us back home for our 'safety'.";
      case Occupation.Firefighter:
        return "Even the fire department is operating on minimum staff capacity, sending half of us back home for our 'safety'.";
      case Occupation.Doctor:
        return "The military has taken over my clinic downtown without an explanation, surely they could use another doctor in an epidemic.";
      case Occupation.Lumberjack:
        return "McCoy's halted all logging operations, sending us home without a paycheck. I hope this all blows over soon.";
      case Occupation.Burglar:
        return "My day job at Greene's grocer was also affected, best to lay low for a while.";
    }
  };

  const getText = () => {
    return `It's been a surreal 3 days, and I've decided to write this journal for my own sanity. It all started with a weird smell in the air, like a mix of dampness and decay. The news reported an outbreak here in Knox county, urging everyone to stay indoors. The government is calling it a quarantine, and all non-essential services were stopped abruptly, including schools and supermarkets. ${getFlavorText()} With the phone lines down, the radio and TV broadcasts remain my only connection to the outside world. I'm trying to keep busy by rearranging the furniture, checking my supplies, and rationing my food. But the anxiety gnaws at me. Are we truly safe here? What's happening beyond these walls? I can't help but peak through a small gap in the curtains, hoping for some reassurance, but all I see are empty streets.`;
  };

  return (
    <>
      <Banner>9 July 1993</Banner>
      <p>{getText()}</p>
      <Typewriter
        fullText={"Wait, I hear someone knocking on the door..."}
        delay={70}
        onDone={() => setShowButton(true)}
      />
    </>
  );
};

export default Tutorial;
