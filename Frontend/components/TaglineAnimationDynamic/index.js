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
    .5,
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

const TaglineAnimationDynamic = ({ text }) => {
  const typeRef = React.useRef();
  const containerRef = React.useRef();

  React.useEffect(() => {
    const tl = buildCharAnimation(typeRef.current, text);

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: "footer",
      start: "top 210%",
      // end: "top 15%",
      // markers: true,
      onEnter: () => tl.play(),
      onEnterBack: () => tl.play(),
    });

    // ScrollTrigger.create({
    //   trigger: "#footer",
    //   start: "top 85%",
    //   end: "top 95%",
    //   onLeave: () => tl.reverse(),
    //   onLeaveBack: () => tl.reverse(),
    // });

    return () => {
      tl.kill();
    };
  }, [text]);

  return (
    <div className={styles.changeable} ref={containerRef}>
      <span ref={typeRef}></span>
    </div>
  );
};

TaglineAnimationDynamic.defaultProps = {
  text: "",
};


export default TaglineAnimationDynamic;
