import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import AnimatedTextStatic from "../TaglineAnimationStatic";


const TaglineBureau = ({ title }) => {
  const [animate, setAnimate] = useState(false);
  return (
    <div className={styles.animatedText}>
      <div className={styles.animatedText__text} id="introAnimationText">
        <AnimatedTextStatic text={title} animate={animate} />
      </div>
    </div>
  );
};

export default TaglineBureau;
