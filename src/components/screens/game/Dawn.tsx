import { useContext } from "react";
import { StoreContext } from "../../../App";
import { Banner, Button } from "../../common";

const Dawn = () => {
  const store = useContext(StoreContext);
  const player = store.state.player;

  if (!player) return null; // throw error?

  return (
    <>
      <Banner>Dawn</Banner>
      <br />
      <Button text="Explore" onClick={console.log} />
      <Button text="Supplies" onClick={console.log} />
      <Button text="Objectives" onClick={console.log} />
      <Button text="Travel" onClick={console.log} />
    </>
  );
};

export default Dawn;
