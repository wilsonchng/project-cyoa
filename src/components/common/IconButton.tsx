import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./common.css";

const IconButton = (props: {
  icon: IconProp;
  onClick: () => void;
  title?: string;
  style?: any;
}) => {
  const { icon, title, onClick, style } = props;
  return (
    <FontAwesomeIcon
      icon={icon}
      className="icon-button"
      onMouseDown={onClick}
      title={title}
      style={style}
    />
  );
};

export default IconButton;
