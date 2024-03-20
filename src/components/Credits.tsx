import { useContext } from "react";
import { GAME_NAME, StoreContext } from "../App";
import { Banner, Button } from "./common";
import { Screen, UpdateType } from "../utils/constants";

const Credits = () => {
  const store = useContext(StoreContext);

  const changeScreen = (screen: Screen) => () =>
    store.dispatch({ type: UpdateType.Screen, payload: screen });

  return (
    <>
      <Banner>CREDITS</Banner>
      <div className="container">
        <span>
          <strong>Game Title</strong>
        </span>
        <p>{GAME_NAME}</p>
        <br />
        <span>
          <strong>Game Design & Development</strong>
        </span>
        <p>Wilson Chng</p>
        <br />
        <span>
          <strong>Writing & Story Design</strong>
        </span>
        <p>Wilson Chng</p>
        <br />
        <span>
          <strong>Programming & Scripting</strong>
        </span>
        <p>Wilson Chng</p>
        <br />
        <span>
          <strong>Artwork & Graphics</strong>
        </span>
        <p>
          Borrowed from the{" "}
          <a
            href="https://pzwiki.net/wiki/Project_Zomboid_Wiki"
            target="_blank"
          >
            Project Zomboid Wiki
          </a>
        </p>
        <br />
        <span>
          <strong>Original Soundtrack & Sound Effects</strong>
        </span>
        <p>
          Royalty free from{" "}
          <a href="https://pixabay.com/" target="_blank">
            Pixabay
          </a>
        </p>
        <br />
        <span>
          <strong>Special Thanks</strong>
        </span>
        <p>
          <span>Family and friends for their support and encouragement</span>
          <span>OpenAI for providing powerful tools for game development</span>
          <span>
            The Indie Stone for creating the game that inspired all this
          </span>
        </p>
      </div>
      <br />
      <Button onClick={changeScreen(Screen.MainMenu)}>BACK</Button>
    </>
  );
};

export default Credits;
