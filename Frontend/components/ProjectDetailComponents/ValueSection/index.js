import React, { useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import SliderArrow from "../../../public/icons/arrowSliderNews.svg";
import { parseHtml } from "../../../lib/parser";
import styles from "./styles.module.scss";

const tableData = [
  {
    photo: "/images/projectDetail/identity.jpg",
  },
  {
    photo: "/images/projectDetail/interior.jpg",
  },
  {
    photo: "/images/projectDetail/identity.jpg",
  },
  {
    photo: "/images/projectDetail/interior.jpg",
  },
];

const ValueSection = ({data}) => {
  return (
    <section className={styles.valueSection}>
     <div className={styles.valueSection__container}>
     <div className={styles.valueSection__infoBlock}>
        {data?.info?.map((item, index) => {
          return (
            <div className={styles.valueSection__infoBlock__item} key={index}>
              <div className={styles.valueSection__infoBlock__item__title}>
                <p>{item.title}</p>
              </div>
              <div className={styles.valueSection__infoBlock__item__value}>
                <p>{item.value}</p>
              </div>
          </div>
          )
        })}
      </div>
      <div className={styles.valueSection__textBlock}>
        <div className={styles.valueSection__textBlock__title}>
          <h3>Value</h3>
        </div>
        <div className={styles.valueSection__textBlock__description}>
          <p>{parseHtml(data?.text)}</p>
        </div>
      </div>
     </div>
    </section>
  );
};

export default ValueSection;
