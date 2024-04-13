import { useContext } from "react";
import { StoreContext } from "../../../App";

const Dawn = () => {
  const store = useContext(StoreContext);
  const playthrough = store.state.playthrough;

  if (!playthrough) return null; // throw error?

  return <></>;
};

export default Dawn;
