import { useContext } from "react";
import { Banner, Button, Header } from "./common";
import { StoreContext } from "../App";

const DeathScreen = () => {
    const store = useContext(StoreContext);

    return (
        <>
            <Banner>YOU DIED</Banner>
            <p>{`You survived for ${store.state.daysLived} days.`}</p>
            <p>{`You killed ${store.state.killCount} zombies.`}</p>
            <Button onClick={() => location.reload()}>Main Menu</Button>
        </>
    );
};

export default DeathScreen;
