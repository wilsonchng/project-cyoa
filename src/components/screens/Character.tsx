import { useContext, useState } from "react";
import { Playthrough } from "../../utils/types";
import { Hunger } from "../../utils/constants";
import { Image, Modal } from "../common";
import { StoreContext } from "../../App";

export const CharacterSheet = () => {
  const store = useContext(StoreContext);

  return (
    <>
      <div className="container">
        <br />
      </div>
    </>
  );
};

export default CharacterSheet;
