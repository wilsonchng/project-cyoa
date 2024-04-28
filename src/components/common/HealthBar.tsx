import "./common.css";

enum BarColour {
  Healthy = "green",
  OK = "darkorange",
  Injured = "orangered",
  Dying = "crimson",
  Stamina = "deepskyblue",
}

export const StaminaBar = (props: { stamina: number; maxStamina: number }) => {
  const { stamina, maxStamina } = props;
  const value = Math.max(0, stamina);

  return (
    <>
      <div className="healthbar" title="Your Stamina">
        <div
          className="health"
          style={{
            width: `${(value / maxStamina) * 100}%`,
            backgroundColor: BarColour.Stamina,
          }}
        >
          {value}
        </div>
      </div>
    </>
  );
};

export const HealthBar = (props: {
  health: number;
  maxHealth: number;
  enemy?: boolean;
}) => {
  const { health, maxHealth, enemy = false } = props;
  const value = Math.max(0, health);

  const getColor = () => {
    if (enemy) return BarColour.Dying;

    if (value > 70) {
      return BarColour.Healthy;
    } else if (value > 50) {
      return BarColour.OK;
    } else if (value > 20) {
      return BarColour.Injured;
    } else {
      return BarColour.Dying;
    }
  };

  if (value === 0) return <span style={{ color: "darkgrey" }}>Deceased</span>;

  return (
    <>
      <div className="healthbar" title={enemy ? "Enemy Health" : "Your Health"}>
        <div
          className="health"
          style={{
            width: `${(value / maxHealth) * 100}%`,
            backgroundColor: getColor(),
          }}
        >
          {value}
        </div>
      </div>
    </>
  );
};
