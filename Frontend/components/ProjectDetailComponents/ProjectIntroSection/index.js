import React, { useEffect, useState, useRef } from "react";
import NavLink from "../../NavLink";
import { parseHtml } from "../../../lib/parser";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import CursorHover from "../../CursorHover";
import { useRouter } from "next/router";
import { getTranslation } from "../../../locales";
import styles from "./styles.module.scss";
import Image from "next/image";

const ProjectIntroSection = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sliderInstance, setSliderInstance] = useState(null);
  const [resetSlider, setResetSlider] = useState(false);
  const { locale } = useRouter();
    
    const translation = React.useMemo(
      () => getTranslation(locale),
      [locale]
    );

  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setResetSlider(true);
  }, [data]);

  useEffect(() => {
    if (resetSlider && sliderInstance) {
      sliderInstance.go(0);
      setResetSlider(false);
    }
  }, [resetSlider, sliderInstance]);

  const imagesToUse = Array.isArray(data?.images)
  ? data?.images
      ?.map((item) => {
        const isDesktop = item?.type === "desktop" || item?.type === "all";
        const isMobileImage = item?.type === "mobile" || item?.type === "all";

        if (isMobile && isMobileImage) {
          return item?.media.url;
        } else if (!isMobile && isDesktop) {
          return item?.media?.url;
        }

        return null;
      })
      .filter(Boolean)
  : [];

  const gapValue = isMobile ? ".5rem" : ".0001rem";

  return (
    <section className={styles.projectComponent} id="projectIntroSection">
      <div className={styles.projectComponent__mobTitle}>
        <h2>{data?.title}</h2>
      </div>
      <div className={styles.projectComponent__wrapper}>
      <div className={styles.projectComponent__sliderMob}>
          <Splide
            className={styles.projectComponent__splide}
            options={{
              type: "loop",
              gap: gapValue,
              pagination: false,
              drag: true,
              arrows: false,
              autoplay: true,
              snap: true,
              perPage: 1,
              interval: 4000,
              pauseOnHover: false,
            }}
            ref={sliderRef}
            onMounted={(splide) => setSliderInstance(splide)}
          >
            {imagesToUse && imagesToUse.map((item, index) => (
              <SplideSlide key={index}>
                <div
                  className={styles.projectComponent__cover}
                  style={{ backgroundImage: `url(${item})` }}
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
        <div className={styles.projectComponent__textInfo}>
          <div className={styles.projectComponent__textInfo__title}>
            <h2>{data?.title}</h2>
          </div>
          <div className={styles.projectComponent__textInfo__row}>
            <div className={styles.projectComponent__textInfo__info}>
              <div className={styles.projectComponent__textInfo__year}>
                <span>{data?.year}</span>
              </div>
              <div className={styles.projectComponent__textInfo__category}>
                 <span>{data?.category}</span>
              </div>
            </div>
            {/* кнопка next*/}
            {/* <div className={styles.projectComponent__textInfo__button}>
              <button>
              <CursorHover>
                <NavLink url={data?.nextLink}>
                  {translation.nextProject}
                </NavLink>
                </CursorHover>
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div className={styles.projectComponent__slider}>
          <Splide
            className={styles.projectComponent__splide}
            options={{
              type: "loop",
              gap: gapValue,
              pagination: false,
              drag: true,
              arrows: false,
              autoplay: true,
              snap: true,
              perPage: 1,
              interval: 4000,
              pauseOnHover: false,
            }}
            ref={sliderRef}
            onMounted={(splide) => setSliderInstance(splide)}
          >
            {imagesToUse?.map((item, index) => (
              <SplideSlide key={index}>
                <div
                  className={styles.projectComponent__cover}
                  style={{ backgroundImage: `url(${item})` }}
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
    </section>
  );
};

export default ProjectIntroSection;
