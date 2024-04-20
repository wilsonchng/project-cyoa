import "./common.css";

const ButtonGroup = (props: { children: React.ReactNode }) => {
  return <div className="button-group">{props.children}</div>;
};

export default ButtonGroup;
