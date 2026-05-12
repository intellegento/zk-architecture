import React, { useEffect, useState } from "react";
// import { gsap, ScrollTrigger } from "../../lib/gsap";
import styles from "./styles.module.scss";
import TaglineAnimationDynamic from "../TaglineAnimationDynamic";


const TaglineFooter = ({ title }) => {
  const [animate, setAnimate] = useState(false);
  return (
    <div className={styles.animated} id="footerTagline">
      <div className={styles.animated__text} >
        {/* <TaglineAnimationDynamic text={title} animate={animate} /> */}
      </div>
    </div>
  );
};

export default TaglineFooter;
