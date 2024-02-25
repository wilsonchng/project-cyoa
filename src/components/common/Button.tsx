import "./common.css";

const Button = (props: {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}) => {
    const { onClick, children, disabled } = props;
    return (
        <button disabled={disabled} className="button" onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
