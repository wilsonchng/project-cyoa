const Button = (props: {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}) => {
    const { onClick, children, disabled } = props;

    const mySound = require("../../assets/sounds/click-button-sound-effect.mp3");
    const audio = new Audio(mySound);

    const clickFunc = () => {
        audio.play();
        onClick();
    };

    return (
        <button disabled={disabled} className="button" onClick={clickFunc}>
            {children}
        </button>
    );
};

export default Button;
