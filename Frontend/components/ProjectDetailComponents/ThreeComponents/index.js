import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { parseHtml } from "../../../lib/parser";
import Collapse from "../Collapse";

const AccordionItem = ({ title, content }) => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <Collapse className={styles.history__accordion__item} isOpen={isOpen}>
      <div className={styles.history__accordion__header} onClick={() => setOpen(!isOpen)} aria-pressed={`${isOpen}`} role="button">
        <div className={styles.history__accordion__title}>
          <h4>{title}</h4>
        </div>
        <div className={`${styles.history__accordion__arrow} ${isOpen ? styles.up : ""}`}>
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.60779L7 7.60515L13 1.60779" stroke="black" strokeLinecap="square" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className={styles.history__accordion__content}>
        <p>{content}</p>
      </div>
    </Collapse>
  );
};

const ThreeComponents = ({ data }) => {
  return (
    <section className={styles.threeComponents}>
        <div className={styles.threeComponents__item}>
          <div className={styles.threeComponents__story}>
            <div className={styles.threeComponents__title}>
              <h3>{data?.storyTitle}</h3>
            </div>
            {/* <div className={styles.history__accordion} key={key}>
              {data.map((item, index) => (
                <AccordionItem key={index} title={item.title} content={item.content} />
              ))}
            </div> */}
            <div className={styles.threeComponents__text}>
              {parseHtml(data?.storyText)}
            </div>
          </div>
          <div className={styles.threeComponents__location}>
            <div className={styles.threeComponents__title}>
              <h3>{data?.locationTitle}</h3>
            </div>
            <div className={styles.threeComponents__location}>
              <img src={data?.locationImage?.url} alt={data?.locationImage?.name} />
            </div>
          </div>
        </div>
       <div className={styles.threeComponents__item}>
        <div className={styles.threeComponents__map}>
            <img src={data?.mapImage?.url} alt={data?.mapImage?.name} />
        </div>
       </div>
    </section>
  );
};

export default ThreeComponents;
