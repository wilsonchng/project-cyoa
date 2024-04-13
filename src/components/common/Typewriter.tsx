import { useEffect, useRef, useState } from "react";

import "./common.css";

const Typewriter = (props: {
  fullText: string;
  delay?: number;
  style?: object;
  onDone?: () => void;
}) => {
  const { fullText, delay = 40, style, onDone } = props;

  const [text, setText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prevText: string) => prevText + fullText[index]);
        setIndex((prevIndex: number) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      if (onDone) onDone();
    }
  }, [index, delay, text]);

  useEffect(() => {
    const handleClick = () => {
      setText(fullText);
      setIndex(fullText.length);
      if (onDone) onDone();
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [ref.current]);

  return (
    <p ref={ref} className="typewriter" style={style}>
      {text}
    </p>
  );
};

export default Typewriter;
