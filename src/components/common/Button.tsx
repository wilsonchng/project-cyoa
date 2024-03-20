const Button = (props: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  title?: string;
  style?: any;
}) => {
  const { onClick, children, disabled, style } = props;

  const mySound = require("../../assets/sounds/click-button-sound-effect.mp3");
  const audio = new Audio(mySound);

  const clickFunc = () => {
    audio.play();
    onClick();
  };

  return (
    <button
      title={props.title}
      disabled={disabled}
      className="button"
      onClick={clickFunc}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
