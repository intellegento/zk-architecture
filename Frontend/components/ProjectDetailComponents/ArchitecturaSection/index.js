import React from "react";
import styles from "./styles.module.scss";

const ArchitecturaSection = () => {
  return (
    <section className={styles.architectura}>
      <div className={styles.architectura__text}>
        <div className={styles.architectura__text__title}>
          <h3>Architectura</h3>
        </div>
        <div className={styles.architectura__text__description}>
          <p>
            Miura Shinobu departed from standards and drew not one ring (the usual cross-section of a lighthouse shape), but two, and
            circled them into an ellipse, which became the base of the unique object.
            <br />
            <br />
            We take this cultural code as a basis and continue it in architecture and planning solutions.
          </p>
        </div>
      </div>
      <div className={styles.architectura__images}>
        <div className={styles.architectura__images__first}>
          <img src="/images/projectDetail/architecture-2.jpg" />
        </div>
        <div className={styles.architectura__images__second}>
          <img src="/images/projectDetail/architecture-3.jpg" />
        </div>
        <div className={styles.architectura__images__third}>
          <img src="/images/projectDetail/architecture-4.jpg" />
        </div>
        <div className={styles.architectura__images__fourth}>
          <img src="/images/projectDetail/architecture-5.jpg" />
        </div>
      </div>
    </section>
  );
};

export default ArchitecturaSection;
