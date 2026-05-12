import React from "react";
import styles from "./styles.module.scss";

const BurgerIcon = ({ isOpen }) => {
  return (
    <svg
      className={`${styles.burgerIcon} ${isOpen ? styles.open : ""}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <line
        className={styles.line}
        x1="4"
        y1="7"
        x2="20"
        y2="7"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        className={styles.line}
        x1="4"
        y1="17"
        x2="20"
        y2="17"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default BurgerIcon;
