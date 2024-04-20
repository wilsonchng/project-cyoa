import { useContext } from "react";
import { Banner, Button } from "../common";
import { StoreContext } from "../../App";

const Death = () => {
  const store = useContext(StoreContext);

  return (
    <>
      <Banner>YOU DIED</Banner>
      {/* todo: add cause of death */}
      <p className="center-text">{`You survived for ${store.state.player?.daysLived} days.`}</p>
      <p className="center-text">{`You killed ${store.state.player?.killCount} zombies.`}</p>
      <br />
      <Button text="Main Menu" onClick={() => location.reload()} />
    </>
  );
};

export default Death;
