import React, { useEffect, useState } from "react";
import { parseHtml } from "../../../lib/parser";
import Slider from "../Slider";
import styles from "./styles.module.scss";

const DescriptionSection = ({ data }) => {
  return (
    <section className={styles.descriptionSection}>
      <div className={styles.descriptionSection__wrap}>
        {data?.map((item, index) => {
          return (
            <div key={index} className={styles.descriptionSection__item}>
              <div className={styles.descriptionSection__item__title}>
                <p>{item.title}</p>
              </div>
              <div className={styles.descriptionSection__item__info}>
                <p>{item.info}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DescriptionSection;
