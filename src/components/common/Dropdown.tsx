import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import "./common.css";

const Dropdown = (props: {
  onChange: (selection: string) => void;
  options: string[];
  initial: string;
  title?: string;
}) => {
  const { onChange, options, initial, title } = props;

  const mySound = require("../../assets/sounds/click.mp3");
  const audio = new Audio(mySound);

  const ref = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(initial);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (event.target.className !== "dropdown-btn") {
        setIsActive(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [ref.current]);

  const onClick = () => {
    audio.play();
    setIsActive(!isActive);
  };

  const onSelect = (selection: string) => {
    audio.play();
    setSelected(selection);
    setIsActive(!isActive);
    onChange(selection);
  };

  return (
    <div className="dropdown" ref={ref}>
      <div className="dropdown-btn" title={title} onClick={onClick}>
        {selected}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
