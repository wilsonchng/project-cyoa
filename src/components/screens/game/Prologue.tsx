import { useContext, useState } from "react";
import { StoreContext } from "../../../App";
import { Banner, Button, Fader, Typewriter } from "../../common";
import { setGameMode } from "../../../utils/actionCreators";
import { GameMode } from "../../../utils/constants";

const Prologue = () => {
  const store = useContext(StoreContext);

  const [partOne, setPartOne] = useState(false);
  const [partTwo, setPartTwo] = useState(false);
  const [partThree, setPartThree] = useState(false);
  const [partFour, setPartFour] = useState(false);

  return (
    <>
      <Banner>Prologue</Banner>
      <Typewriter
        fullText={
          "A mysterious infection has swept over Knox country, turning its inhabitants into mindless, insatiable zombies overnight."
        }
        onDone={() => setPartOne(true)}
      />
      {partOne && (
        <Typewriter
          fullText={
            "In response, the government issued a massive quarantine, calling in the military to erect a blockade to contain the epidemic."
          }
          onDone={() => setPartTwo(true)}
        />
      )}
      {partTwo && (
        <Typewriter
          fullText={
            "You are a resident of Knox, immune to the virus, but caught in the epicentre of the outbreak."
          }
          onDone={() => setPartThree(true)}
        />
      )}
      {partThree && (
        <Typewriter
          fullText={"Will you survive and escape? Or is this is how you died."}
          onDone={() => setPartFour(true)}
        />
      )}
      <br />
      {partFour && (
        <Fader>
          <Button
            text="BEGIN"
            sound="start"
            onClick={() => setGameMode(store, GameMode.Dawn)}
          />
        </Fader>
      )}
    </>
  );
};

export default Prologue;
