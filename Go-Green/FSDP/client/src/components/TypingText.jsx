import React, { useEffect, useState } from "react";

const TypingText = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [text, speed, onComplete]);

  return <span>{displayedText}</span>;
};

export default TypingText;
