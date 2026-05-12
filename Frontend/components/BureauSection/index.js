import React from "react";
// import TaglineBureau from "../TaglineBureau";
import ValueLogo from "../../public/icons/value11-19.svg";
import styles from "./styles.module.scss";
import { isDesktop } from "../../lib/utils";
import TaglineBureau from "../TaglineBureau";
import { parseHtml } from "../../lib/parser";
import SimplyTypingAnimation from "../SimplyTypingAnimation";
const BureauSection = ({ data }) => {
  isDesktop();
  return (
    <section className={styles.bureauSection} id="bureau">
      <div className={styles.bureauSection__container}>
        <div className={styles.bureauSection__logo}>
          <ValueLogo />
        </div>
        <div className={styles.bureauSection__description}>
          {parseHtml(data.introDescription)}
        </div>
        
      </div>
     <div className={styles.bottom}>
        <SimplyTypingAnimation text="Bureau" delay={2000} speed={100}  />
     </div>
    </section>
  );
};

export default BureauSection;
