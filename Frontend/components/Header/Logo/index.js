import React from "react";
import LogoImg from "../../../public/icons/logo.svg";
import styles from "./styles.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
        <LogoImg />
    </div>
   
  );
};

export default Logo;