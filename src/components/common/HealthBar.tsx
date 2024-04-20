import "./common.css";

enum HealthColor {
  Healthy = "green",
  OK = "darkorange",
  Injured = "orangered",
  Dying = "crimson",
}

const HealthBar = (props: {
  health: number;
  maxHealth: number;
  enemy?: boolean;
}) => {
  const { health, maxHealth, enemy = false } = props;

  const getColor = () => {
    if (enemy) return HealthColor.Dying;

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
          style={{
            width: `${(health / maxHealth) * 100}%`,
            backgroundColor: getColor(),
          }}
        >
          {health}
        </div>
      </div>
    </>
  );
};

export default HealthBar;
