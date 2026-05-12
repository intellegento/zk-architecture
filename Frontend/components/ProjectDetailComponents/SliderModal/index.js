import React, { useRef, useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import styles from "./styles.module.scss";
import CursorHover from "../../CursorHover";

const SliderModal = ({ images, index, closeModal }) => {

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
    }, [images]);
  
    useEffect(() => {
      setResetSlider(true);
    }, [images]);
  
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
        // setIsLastSlide(index === slideCount - 1);
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
  
    // useEffect(() => {
    //   if (sliderRef.current) {
    //     const splideInstance = sliderRef.current.splide;
    //     if (splideInstance) {
    //       setCurrentIndex(splideInstance.index);
    //       setIsFirstSlide(splideInstance.index === 0);
    //       setIsLastSlide(splideInstance.index === splideInstance.length - 1);
    //     }
    //   }
    // }, [images]);

    useEffect(() => {
      if (sliderRef.current) {
        const splideInstance = sliderRef.current.splide;
        if (splideInstance) {
          splideInstance.go(Number(index - 1)); // Устанавливаем слайдер на нужный индекс
          setCurrentIndex(splideInstance.index);
          setIsFirstSlide(splideInstance.index === 0);
          setIsLastSlide(splideInstance.index === splideInstance.length - 1);
        }
      }
    }, [index]);
  
    useEffect(() => {
      setResetSlider(true);
    }, [images]);
  
    useEffect(() => {
      if (resetSlider && sliderInstance) {
        sliderInstance.go(0);
        setResetSlider(false);
      }
    }, [resetSlider, sliderInstance]);

  const onButtonClick = () => {
    if (isLastSlide) {
      closeModal();
    } else {
      onSlideNext();
    }

    updateButtonsState();
  };

  return (
    <div className={styles.sliderModal}>
       <CursorHover>
       <div className={styles.sliderModal__burgerButton}>
              <button className={styles.sliderModal__burgerButton__wrapper} onClick={closeModal}>
                <span>{closeModal ? "[Close]" : "[Menu]"}</span>
                <div
                  className={`${styles.sliderModal__burgerButton__button} ${closeModal ? styles.sliderModal__burgerButton__buttonClose : ""}`}
                ></div>
              </button>
            </div>
       </CursorHover>
      <Splide
        options={{
          gap: ".5rem",
          type: "loop",
          // rewind: false,
          perMove: 1,
          pagination: false,
          drag: true,
          arrows: false,
        }}
        ref={sliderRef}
      >
        {images?.map((item, index) => (
          <SplideSlide key={index} className={styles.sliderModal__slide}>
            {/* <CursorHover label={"prev"} className="projectSectionHover">
            <div
              className={`${styles.sliderModal__prev} ${isFirstSlide ? styles.offButton : ""}`}
              onClick={onSlidePrev}
            />
          </CursorHover> */}
          <CursorHover label={"next"} className="projectSectionHover">
            <div
              className={`${styles.sliderModal__next} ${isLastSlide ? styles.offButton : ""}`}
              onClick={onSlideNext}
            />
          </CursorHover>
            <img src={item.original} alt={`Slide ${index - 1}`} />

           
          </SplideSlide>
        ))}
      </Splide>
     
    </div>
  );
};

export default SliderModal;
