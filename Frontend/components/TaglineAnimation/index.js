import React, { useEffect, useState } from "react";
import { gsap } from "../../lib/gsap";
import styles from "./styles.module.scss";

const AnimatedText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set("#introAnimationText span", { text: "", width: "auto" });

    for (let i = 0; i < text.length; i++) {
      tl.to("#introAnimationText span", {
        text: text.substr(0, i + 1),
        duration: 0.1,
      });
    }

    tl.eventCallback("onComplete", () => {
      setDisplayText(text);
    });
  }, [text]);

  return (
    <div className={styles.changeableText}>
      <span>{displayText}</span>
    </div>
  );
};


export default AnimatedText;
