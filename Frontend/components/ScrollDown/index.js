import React from "react";
import styles from "./styles.module.scss";

const ScrollDown = () => {
  return (
    <div className={styles.scrollContainer}>
    {/* <div className={styles.scrollContainer__text}>scroll down</div> */}
    <div className={styles.scrollContainer__item}></div>
    <div className={styles.scrollContainer__item}></div>
  </div>
  );
};

export default ScrollDown;
