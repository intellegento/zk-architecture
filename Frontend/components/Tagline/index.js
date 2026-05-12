import React, { useEffect, useState, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "../../lib/gsap";
import styles from "./styles.module.scss";
import AnimatedText from "../TaglineAnimation";
import useSectionVisibility from "../../hooks/useSectionVisibility";
// import AnimatedText from "../TaglineAnimationStatic";

const data = {
  section1: [
    { id: 1, text: "We put an idea into every project that has value" },
    { id: 2, text: "We design public and residential spaces" },
  ],

  menu: [
    { id: 11, text: "Menu"}
  ],
 
  footer: [
    { id: 12, text: "Don't think of cost" },
    { id: 13, text: "Think of VALUE" },
  ],
};
const TAGLINE_ANIMATION_INTERVAL = 3000;

const Tagline = ({ section, title }) => {
  const [text, setText] = useState("");
  const [animate, setAnimate] = useState(false);
  const isVisible = useSectionVisibility(section); // Проверяем видимость секции

  useEffect(() => {
    let interval;
    let current = 0;

    const sectionData = data[section];
    const isMultipleTexts = sectionData && sectionData.length > 1;

    const animateWords = () => {
      if (sectionData) {
        setText(sectionData[current]?.text);
        current = (current + 1) % sectionData.length;

        if (!isMultipleTexts && current === 0) {
          clearInterval(interval);
          setAnimate(false);
        }
      }
    };

    // Применяем анимацию только тогда, когда секция видима
    if (isVisible && isMultipleTexts) {
      setAnimate(true);
      interval = setInterval(animateWords, TAGLINE_ANIMATION_INTERVAL);
      animateWords();
    } else {
      // Сбрасываем анимацию или не выполняем ее
      setText("");
      setAnimate(false);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [section, isVisible]);

  return (
    <div className={styles.animatedText}>
      <div className={styles.animatedText__text} id="introAnimationText">
        <AnimatedText text={title || text} />
      </div>
    </div>
  );
};

export default Tagline;