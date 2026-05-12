import React, { useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import SliderArrow from "../../../public/icons/arrowSliderNews.svg";
import styles from "./styles.module.scss";

const tableData = [
  {
    photo: "/images/projectDetail/interior-1.jpg",
  },
  {
    photo: "/images/projectDetail/interior.jpg",
  },
  {
    photo: "/images/projectDetail/interior-1.jpg",
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
      className={`${styles.interiorSectionMob__navigation__arrowNext} ${isLastSlide || !hasSlides ? styles.disabled : ""}`}
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
      className={`${styles.interiorSectionMob__navigation__arrowPrev} ${isFirstSlide || !hasSlides ? styles.disabled : ""}`}
      onClick={handleClick}
      disabled={isFirstSlide || !hasSlides}
    >
      <SliderArrow />
    </button>
  );
};

const InteriorSectionMob = () => {
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
    <>
    <section className={styles.interiorSectionMob}>
      <div className={styles.interiorSectionMob__title}>
        <h3>Interior</h3>
      </div>
      <div className={styles.interiorSectionMob__description}>
        <p>
          Miura Shinobu departed from standards and drew not one ring (the usual cross-section of a lighthouse shape), but two, and
          circled them into an ellipse, which became the base of the unique object.
          <br />
          <br />
          We take this cultural code as a basis and continue it in architecture and planning solutions.
        </p>
      </div>
      <div className={styles.interiorSectionMob__imagesBlock}>
          <div className={styles.interiorSectionMob__imagesBlock__first}>
            <img src="/images/projectDetail/interior_1.jpg" />
          </div>
          <div className={styles.interiorSectionMob__imagesBlock__second}>
            <img src="/images/projectDetail/interior_2.jpg" />
          </div>
          <div className={styles.interiorSectionMob__imagesBlock__third}>
            <img src="/images/projectDetail/interior_3.jpg" />
          </div>
          <div className={styles.interiorSectionMob__imagesBlock__fourth}>
            <img src="/images/projectDetail/interior_4.jpg" />
          </div>
      </div>
    </section>
    </>
  );
};

export default InteriorSectionMob;
