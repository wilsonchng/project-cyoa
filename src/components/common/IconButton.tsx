import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./common.css";

const IconButton = (props: {
  icon: IconProp;
  onClick: () => void;
  title?: string;
  style?: any;
  bounce?: boolean;
  shake?: boolean;
}) => {
  const { onClick, icon, title, style, bounce, shake } = props;
  return (
    <FontAwesomeIcon
      icon={icon}
      className="icon-button"
      onMouseDown={onClick}
      title={title}
      style={style}
      bounce={bounce}
      shake={shake}
    />
  );
};

export default IconButton;
