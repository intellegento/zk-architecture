import React, { useRef, useState } from "react";
import NavLink from "../../NavLink";
import SliderArrow from "../../../public/icons/arrowSliderNews.svg";
import CursorHover from "../../CursorHover";
import { useRouter } from "next/router";
import { getTranslation } from "../../../locales";
import styles from "./styles.module.scss";

const ArrowsSection = ({ data }) => {
    const { locale } = useRouter();
      
      const translation = React.useMemo(
        () => getTranslation(locale),
        [locale]
      ); 
  return (
    <section className={styles.arrowsSection}>
      <div className={styles.arrowsSection__container}>
        <div className={styles.arrowsSection__left}>
        <CursorHover>
          <NavLink url={data?.prevLink}>
            {translation.prevProject}
          </NavLink>
          </CursorHover>
        </div>
        <div className={styles.arrowsSection__right}>
        <CursorHover>
          <NavLink url={data?.nextLink}>
             {translation.nextProject}
          </NavLink>
          </CursorHover>
        </div>
      </div>
    </section>
  );
};

export default ArrowsSection;
