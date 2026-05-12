import React, { useRef, useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import SliderArrow from "../../../public/icons/arrowSliderNews.svg";
import CursorHover from "../../CursorHover";
import styles from "./styles.module.scss";

const NextArrow = ({ onClick, isLastSlide, hasSlides }) => (
  <button
    className={`${styles.planingSolutionSection__navigation__arrowNext} ${isLastSlide || !hasSlides ? styles.disabled : ""}`}
    onClick={onClick}
    disabled={isLastSlide || !hasSlides}
  >
    <SliderArrow />
  </button>
);

const PrevArrow = ({ onClick, isFirstSlide, hasSlides }) => (
  <button
    className={`${styles.planingSolutionSection__navigation__arrowPrev} ${isFirstSlide || !hasSlides ? styles.disabled : ""}`}
    onClick={onClick}
    disabled={isFirstSlide || !hasSlides}
  >
    <SliderArrow />
  </button>
);

const PlaningSolutionSection = ({ data }) => {
  const [sliderInstance, setSliderInstance] = useState(null);
  const [resetSlider, setResetSlider] = useState(false);

  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
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
    <section className={styles.planingSolutionSection}>
     <div className={styles.planingSolutionSection__container}>
     {data && data?.length > 1 && (
        <div className={styles.planingSolutionSection__header}>
          <div className={styles.planingSolutionSection__titleMob}>
            <h3>Layouts</h3>
          </div>
          <div className={styles.planingSolutionSection__navigation}>
            <PrevArrow onClick={onSlidePrev} isFirstSlide={isFirstSlide} hasSlides={Boolean(data?.length)} />
            <NextArrow onClick={onSlideNext} isLastSlide={isLastSlide} hasSlides={Boolean(data?.length)} />
          </div>
        </div>
      )}
      {imagesToUse && imagesToUse.length > 1 && (
        <Splide
          className={styles.planingSolutionSection__splide}
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
          {imagesToUse?.map((item, index) => {
            return (
              <SplideSlide className={styles.planingSolutionSection__slide} key={index}>
                <CursorHover label={"prev"} className="projectSectionHover">
                  <div
                    className={`${styles.planingSolutionSection__slide__photo__prev} ${isFirstSlide ? styles.offButton : ""}`}
                    onClick={onSlidePrev}
                  />
                </CursorHover>
                <CursorHover label={"next"} className="projectSectionHover">
                  <div
                    className={`${styles.planingSolutionSection__slide__photo__next} ${isLastSlide ? styles.offButton : ""}`}
                    onClick={onSlideNext}
                  />
                </CursorHover>
                <img src={item} alt={`Slide ${index}`} />
              </SplideSlide>
            );
          })}
        </Splide>
      )}
     </div>
    </section>
  );
};

export default PlaningSolutionSection;
