const Button = (props: {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}) => {
    return (
        <button
            disabled={props.disabled}
            className="button"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default Button;
