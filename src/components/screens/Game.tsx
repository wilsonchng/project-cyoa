import { useContext } from "react";
import { StoreContext } from "../../App";

const Game = () => {
  const store = useContext(StoreContext);

  const renderPage = () => {
    <p>test</p>;
  };

  return <>{renderPage()}</>;
};

export default Game;
