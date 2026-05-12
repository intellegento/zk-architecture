import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { parseHtml } from "../../lib/parser";

const ourPhilosophy = [
  {
    number: "01",
    title: "Analysis",
    description: "Exploring, questioning, and uncovering the essence of every project",
  },
  {
    number: "02",
    title: "Idea",
    description: "From this foundation, a clear and powerful idea emerges — simple yet meaningful",
  },
  {
    number: "03",
    title: "FORM",
    description: "Transforming the ideas into memorable forms that inspire and effortlessly blend emotion and function",
  },
  {
    number: "04",
    title: "DETAILS",
    description: "Refining every detail with precision and excellence, because perfection is in the details"
  },
];
const Philosophy = ({ data }) => {
  return (
    <section className={styles.philosophy} >
      <div className={styles.philosophy__container}>
        <div className={styles.philosophy__title}>
          <p>{data.philosophyTitle}</p>
        </div>
        <div className={styles.philosophy__table}>
          {data?.philosophyCards?.map((item, index) => (
            <div className={styles.philosophy__item} key={index}>
              <div className={styles.philosophy__item__text}>
                <div className={styles.philosophy__item__title}>
                  <p>{item.title}</p>
                </div>
                <div className={styles.philosophy__item__description}>
                  {parseHtml(item.description)}
                </div>
              </div>
              <div className={styles.philosophy__item__number}>
                <p>{String(index + 1).padStart(2, "0")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;