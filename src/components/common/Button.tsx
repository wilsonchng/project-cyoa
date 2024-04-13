import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useSound } from "../../utils/customHooks";

import "./common.css";

const Button = (props: {
  onClick: () => void;
  text: string;
  icon?: IconProp;
  sound?: string;
  disabled?: boolean;
  title?: string;
}) => {
  const { onClick, text, icon, sound, disabled, title } = props;

  const clickSound = useSound(`${sound ? sound : "click"}.mp3`);

  const clickFunc = () => {
    clickSound.play();
    onClick();
  };

  return (
    <div>
      <button
        title={title ? title : text}
        disabled={disabled}
        className="button"
        onMouseDown={clickFunc}
      >
        {text}
        {icon && <FontAwesomeIcon icon={icon} />}
      </button>
    </div>
  );
};

export default Button;
