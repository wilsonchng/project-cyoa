import { useContext, useState } from "react";
import { StoreContext } from "../../../App";
import { Banner, Button, Fader, Typewriter } from "../../common";
import { changePage } from "../../../utils/actionCreators";
import { Page } from "../../../utils/constants";

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
          "A mysterious infection has swept over Knox country, turning its inhabitants into mindless, insatiable cannibals overnight."
        }
        onDone={() => setPartOne(true)}
      />
      {partOne && (
        <Typewriter
          fullText={
            "In response, the government issued a quarantine, calling in the military to erect a blockade to contain the epidemic."
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
            onClick={() => changePage(store, Page.Tutorial)}
          />
        </Fader>
      )}
    </>
  );
};

export default Prologue;
