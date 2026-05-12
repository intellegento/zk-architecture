import React, { useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import SliderArrow from "../../../public/icons/arrowSliderNews.svg";
import styles from "./styles.module.scss";
import { parseHtml } from "../../../lib/parser";

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

const NextArrow = ({ onClick, isLastSlide, hasSlides }) => {
  const handleClick = () => {
    if (!isLastSlide && hasSlides) {
      onClick();
    }
  };

  return (
    <button
      className={`${styles.identitySection__navigation__arrowNext} ${isLastSlide || !hasSlides ? styles.disabled : ""}`}
      onClick={handleClick}
      disabled={isLastSlide || !hasSlides}
    >
      <SliderArrow />
    </button>
  );
};
const PrevArrow = ({ onClick, isFirstSlide, hasSlides }) => {
  const handleClick = () => {
    if (!isFirstSlide && hasSlides) {
      onClick();
    }
  };

  return (
    <button
      className={`${styles.identitySection__navigation__arrowPrev} ${isFirstSlide || !hasSlides ? styles.disabled : ""}`}
      onClick={handleClick}
      disabled={isFirstSlide || !hasSlides}
    >
      <SliderArrow />
    </button>
  );
};

const IdentitySection = ({ data }) => {
  const [isFirstSlide, setIsFirstSlide] = useState(false);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const sliderRef = useRef();

  const onSlideNext = () => {
    if (sliderRef.current) {
      const splideInstance = sliderRef.current.splide;

      if (splideInstance) {
        const nextSlideIndex = splideInstance.index + 1;
        const totalSlides = splideInstance.length;

        if (nextSlideIndex < totalSlides) {
          splideInstance.go(nextSlideIndex);
        }
      }
    }
  };

  const onSlidePrev = () => {
    if (sliderRef.current) {
      const splideInstance = sliderRef.current.splide;

      if (splideInstance) {
        const prevSlideIndex = splideInstance.index - 1;

        if (prevSlideIndex >= 0) {
          splideInstance.go(prevSlideIndex);
        }
      }
    }
  };

  return (
    <section className={styles.identitySection}>
      {data.slider.slides && data.slider.slides.length > 1 && (
        <div className={styles.identitySection__header}>
          <div className={styles.identitySection__titleMob}>
            <h3>{data?.slider?.title}</h3>
          </div>
          <div className={styles.identitySection__navigation}>
            <PrevArrow onClick={onSlidePrev} isFirstSlide={isFirstSlide} hasSlides={tableData.length > 1} />
            <NextArrow onClick={onSlideNext} isLastSlide={isLastSlide} hasSlides={tableData.length > 1} />
          </div>
        </div>
      )}
      {data?.slider?.slides && data?.slider?.slides?.length > 1 && (
        <Splide
          className={styles.identitySection__splide}
          options={{
            gap: ".5rem",
            type: "slider",
            pagination: false,
            drag: true,
            arrows: false,
          }}
          ref={sliderRef}
        >
          {data?.slider?.slides?.map((item, index) => {
            return (
              <SplideSlide className={styles.identitySection__slide} key={index}>
                <div className={styles.identitySection__slide__photo}>
                  <img src={item} alt={`Slide ${index}`} />
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      )}

      <div className={styles.identitySection__text}>
      {data?.title && data?.title.length > 1 && (
        <div className={styles.identitySection__text__title}>
        <h3>{data?.title}</h3>
      </div>
      )}
       {data?.slider?.title && data.slider.slides.length > 1 && (
        <div className={styles.identitySection__text__titleSlider}>
        <h3>{data?.slider?.title}</h3>
      </div>
      )}
        <div className={styles.identitySection__text__description}>
          <p>{parseHtml(data?.text)}</p>
        </div>
      </div>
      
      <div className={styles.identitySection__imagesBlock}>
        {data?.images?.map((item, index) => {
          return (
            <div className={styles.identitySection__imagesBlock__item} key={index}>
              <img src={item} alt={`Image ${index}`} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default IdentitySection;
