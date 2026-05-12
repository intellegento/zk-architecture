import React, { useRef, useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import CursorHover from "../../CursorHover";
import styles from "./styles.module.scss";

const Slider = ({ items }) => {
  const [sliderInstance, setSliderInstance] = useState(null);
  const [resetSlider, setResetSlider] = useState(false);

  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  useEffect(() => {
    const splideInstance = sliderRef.current?.splide;

    if (splideInstance) {
      updateButtonsState();
      splideInstance.on("moved", updateButtonsState);
    }
  }, [items]);

  useEffect(() => {
    setResetSlider(true);
  }, [items]);

  useEffect(() => {
    if (resetSlider && sliderInstance) {
      sliderInstance.go(0);
      setResetSlider(false);
    }
  }, [resetSlider, sliderInstance]);

  const updateButtonsState = () => {
    const splideInstance = sliderRef.current?.splide;

    if (splideInstance) {
      const index = splideInstance.index;
      const slideCount = splideInstance.length;

      setIsFirstSlide(index === 0);
      setIsLastSlide(index === slideCount - 1);
    }
  };

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
    if (sliderRef.current) {
      const splideInstance = sliderRef.current.splide;
      if (splideInstance) {
        setCurrentIndex(splideInstance.index);
        setIsFirstSlide(splideInstance.index === 0);
        setIsLastSlide(splideInstance.index === splideInstance.length - 1);
      }
    }
  }, [items]);

  useEffect(() => {
    setResetSlider(true);
  }, [items]);

  useEffect(() => {
    if (resetSlider && sliderInstance) {
      sliderInstance.go(0);
      setResetSlider(false);
    }
  }, [resetSlider, sliderInstance]);

  return (
    <Splide
      className={styles.slider}
      options={{
        gap: ".5rem",
        type: "loop",
        // rewind: true,
        perMove: 1,
        pagination: false,
        drag: true,
        arrows: false,
      }}
      ref={sliderRef}
      onMounted={(splide) => setSliderInstance(splide)}
    >
      {items?.map((item, index) => (
        <SplideSlide key={index} className={styles.slider__slide}>
          <CursorHover label={"next"} className="projectSectionHover">
            <div className={`${styles.slider__slide__next}`} onClick={onSlideNext} />
          </CursorHover>
          <img src={item} />
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default Slider;
