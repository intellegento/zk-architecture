import React, { useRef, useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import CursorHover from "../../CursorHover";
import SliderArrow from "../../../public/icons/arrowSliderNews.svg";
import styles from "./styles.module.scss";
import Slider from "../Slider";


const NextArrow = ({ onClick, isLastSlide, hasSlides }) => (
  <button
    className={`${styles.planningSolutionSection__navigation__arrowNext} ${isLastSlide || !hasSlides ? styles.disabled : ""}`}
    onClick={onClick}
    disabled={isLastSlide || !hasSlides}
  >
    <SliderArrow />
  </button>
);

const PrevArrow = ({ onClick, isFirstSlide, hasSlides }) => (
  <button
    className={`${styles.planningSolutionSection__navigation__arrowPrev} ${isFirstSlide || !hasSlides ? styles.disabled : ""}`}
    onClick={onClick}
    disabled={isFirstSlide || !hasSlides}
  >
    <SliderArrow />
  </button>
);

const PlanningSolutionSection = ({ data }) => {
  const [sliderInstance, setSliderInstance] = useState(null);
  const [resetSlider, setResetSlider] = useState(false);

  const sliderRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const onSlideNext = () => {
    if (sliderRef.current) {
      const splideInstance = sliderRef.current.splide;
      if (splideInstance) {
        splideInstance.go("+1", false);
      }
    }
  };

  const onSlidePrev = () => {
    if (sliderRef.current) {
      const splideInstance = sliderRef.current.splide;
      if (splideInstance) {
        splideInstance.go("-1", false);
      }
    }
  };

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
    if (sliderRef.current) {
      const splideInstance = sliderRef.current.splide;
      if (splideInstance) {
        setCurrentIndex(splideInstance.index);
        setIsFirstSlide(splideInstance.index === 0);
        setIsLastSlide(splideInstance.index === splideInstance.length - 1);
      }
    }
  }, [data]);

  useEffect(() => {
    setResetSlider(true);
  }, [data]);

  useEffect(() => {
    if (resetSlider && sliderInstance) {
      sliderInstance.go(0);
      setResetSlider(false);
    }
  }, [resetSlider, sliderInstance]);

  const imagesToUse = data
  ?.map((item, _index) => {
    const isDesktop = item.type === "desktop" || item.type === "all";
    const isMobileImage = item.type === "mobile" || item.type === "all";

    if (isMobile && isMobileImage) {
      return item.url;
    } else if (!isMobile && isDesktop) {
      return item.url;
    }

    return null;
  })
  .filter(Boolean);
  
  return (
    <section className={styles.planningSolutionSection}>
      <div className={styles.planningSolutionSection__header}>
        <div className={styles.planningSolutionSection__title}>
          <h3>Planning solutions</h3>
        </div>
        <div className={styles.planningSolutionSection__navigation}>
          <PrevArrow onClick={onSlidePrev} disabled={isFirstSlide} />
          <NextArrow onClick={onSlideNext} disabled={isLastSlide} />
        </div>
      </div>
      <Splide
        className={styles.planningSolutionSection__splide}
        options={{
          gap: ".5rem",
          type: "slider",
          rewind: true,
          perMove: 1,
          pagination: false,
          drag: true,
          arrows: false,
        }}
        ref={sliderRef}
        onMounted={(splide) => setSliderInstance(splide)}
        onMoved={(splide, newIndex) => {
          setCurrentIndex(newIndex);
          setIsFirstSlide(newIndex === 0);
          setIsLastSlide(newIndex === splide.length - 1);
        }}
      >
        {imagesToUse?.map((item, index) => (
          <SplideSlide className={styles.planningSolutionSection__slide} key={index}>
            <CursorHover label={"prev"} className="projectSectionHover">
              <div className={`${styles.planningSolutionSection__slide__prev} ${isFirstSlide ? styles.offButton : ""}`} onClick={onSlidePrev} />
            </CursorHover>
            <CursorHover label={"next"} className="projectSectionHover">
              <div className={`${styles.planningSolutionSection__slide__next} ${isLastSlide ? styles.offButton : ""}`} onClick={onSlideNext} />
            </CursorHover>
            <div className={styles.planningSolutionSection__slide__photo}>
              <img src={item} alt={`Slide ${index}`} />
            </div>
          </SplideSlide>
        ))}
      </Splide>
{/* <Slider items={imagesToUse} /> */}
    </section>
  );
};

export default PlanningSolutionSection;