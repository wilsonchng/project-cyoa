import { useContext } from "react";
import { Banner, Button } from "./common";
import { StoreContext } from "../App";

const DeathScreen = () => {
  const store = useContext(StoreContext);

  return (
    <>
      <Banner>YOU DIED</Banner>
      {/* todo: add cause of death */}
      <p className="center-text">{`You survived for ${store.state.daysLived} days.`}</p>
      <p className="center-text">{`You killed ${store.state.killCount} zombies.`}</p>
      <br />
      <Button onClick={() => location.reload()}>Main Menu</Button>
    </>
  );
};

export default DeathScreen;
