import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const SimplyTypingAnimation = ({ text, delay = 3000, speed = 100, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const startTimer = setTimeout(() => {
      let index = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index === text.length) {
          clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, delay, speed]);

  return <div className={styles.simplyTypingAnimation}>
    <p>{displayedText}</p>
  </div>;
};

export default SimplyTypingAnimation;
