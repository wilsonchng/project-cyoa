import "./common.css";

enum HealthColor {
  Healthy = "green",
  OK = "darkorange",
  Injured = "orangered",
  Dying = "crimson",
}

const HealthBar = (props: { health: number }) => {
  const { health } = props;

  const getColor = () => {
    if (health > 70) {
      return HealthColor.Healthy;
    } else if (health > 50) {
      return HealthColor.OK;
    } else if (health > 20) {
      return HealthColor.Injured;
    } else {
      return HealthColor.Dying;
    }
  };

  if (health === 0) return <span style={{ color: "darkgrey" }}>Deceased</span>;

  return (
    <>
      <div className="healthbar">
        <div
          className="health"
          style={{ width: `${health}%`, backgroundColor: getColor() }}
        >
          {health}
        </div>
      </div>
    </>
  );
};

export default HealthBar;
