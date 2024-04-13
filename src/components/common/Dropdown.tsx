import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { useSound } from "../../utils/customHooks";

import "./common.css";

const Dropdown = (props: {
  options: string[];
  initial?: string;
  title?: string;
  onChange: (selection: string) => void;
  getIcon?: (selection: string) => IconDefinition;
}) => {
  const { options, initial, title, onChange, getIcon } = props;

  const mySound = useSound("click.mp3");

  const ref = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(initial || "");

  useEffect(() => {
    const handleClick = (event: any) => {
      if (event.target.className !== `dropdown-btn ${options[0]}`) {
        setIsActive(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [ref.current]);

  const onClick = () => {
    mySound.play();
    setIsActive(!isActive);
  };

  const onSelect = (selection: string) => {
    setSelected(selection);
    setIsActive(!isActive);
    onChange(selection);
  };

  return (
    <div className="dropdown" ref={ref}>
      <div
        className={`dropdown-btn ${options[0]}`}
        title={title}
        onClick={onClick}
      >
        {selected ? selected : "Choose one..."}
        <FontAwesomeIcon icon={isActive ? faCaretUp : faCaretDown} />
      </div>
      <div
        className="dropdown-content"
        style={{ display: isActive ? "block" : "none" }}
      >
        {options.map((opt) => {
          return (
            <div
              key={`option-${opt}`}
              className={`option${opt === selected ? " selected" : ""}`}
              onClick={() => onSelect(opt)}
            >
              {opt}
              {getIcon ? <FontAwesomeIcon icon={getIcon(opt)} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
