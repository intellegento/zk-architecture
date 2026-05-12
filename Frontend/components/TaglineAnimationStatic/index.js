import * as React from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { SteppedEase } from "gsap";
import { isDesktop } from "../../lib/utils";
import styles from "./styles.module.scss";

const buildCharAnimation = (char, text) => {
  var tl = gsap.timeline();

  gsap.set(char, { text: "", width: "auto" });

  tl.fromTo(
    char,
    {
      "border-right-color": "#000",
    },
    {
      "border-right-color": "transparent",
      repeat: 1,
      ease: SteppedEase.config(text.length),
    },
    0
  );
  tl.fromTo(
    char,
    text.length * .1,
    {
      width: "auto",
      whiteSpace: isDesktop(767) ? "nowrap" : "normal",
    },
    {
      text: text,
      ease: SteppedEase.config(text.length),
    },
    0
  );

  return tl;
};

const AnimatedText = ({ text }) => {
  const typeRef = React.useRef();
  const containerRef = React.useRef();

  React.useEffect(() => {
    const tl = buildCharAnimation(typeRef.current, text);

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 99%",
      end: "top 85%",
      markers: false,
      onEnter: () => tl.play(),
      onEnterBack: () => tl.play(),
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      end: "top 90%",
      onLeave: () => tl.reverse(),
      onLeaveBack: () => tl.reverse(),
    });

    return () => {
      tl.kill();
    };
  }, [text]);

  return (
    <div className={styles.changeableText} ref={containerRef}>
      <span ref={typeRef}></span>
    </div>
  );
};

AnimatedText.defaultProps = {
  text: "",
};

export default AnimatedText;
