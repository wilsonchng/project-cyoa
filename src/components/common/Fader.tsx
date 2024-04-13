const Fader = (props: {
  children: React.ReactNode;
  fadeIn?: boolean;
  duration?: number;
}) => {
  const { fadeIn = true, duration = 2, children } = props;

  return (
    <span style={{ animation: `fade-${fadeIn ? "in" : "out"} ${duration}s` }}>
      {children}
    </span>
  );
};

export default Fader;
