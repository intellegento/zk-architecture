import React, { useState, useRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import classNames from "classnames";
import SliderArrow from "../../public/icons/arrowSliderNews.svg";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { useInView } from "react-intersection-observer";
import styles from "./styles.module.scss";

const slideData = [
  {
    type: "standart",
    title: "Read more \n are verified in \n atimely manner.",
    image: "/images/standart.jpg",
    description: "",
    roundImage: "",
    bigImage: "",
    link: "",
  },
  {
    type: "text",
    title: "Read more \n are verified in \n atimely manner.",
    image: "",
    description:
      "Read more Only the actions of the representatives of the opposition are verified in a timely manner. To this day, the actions of the representatives of the opposition remain the lot of liberals who yearn to be associatively distributed across the branches.",
    roundImage: "",
    bigImage: "",
    link: "",
  },
  {
    type: "rounded",
    title: "Read more verified \natimelymanner.",
    image: "",
    description: "",
    roundImage: "/images/rounded.jpg",
    bigImage: "",
    link: "",
  },
  {
    type: "bigImage",
    title: "",
    image: "",
    description: "",
    roundImage: "",
    bigImage: "/images/big.jpg",
    link: "",
  },
  {
    type: "standart",
    title: "Read more \n are verified in \n atimely manner.",
    image: "/images/standart.jpg",
    description: "",
    roundImage: "",
    bigImage: "",
    link: "",
  },
  {
    type: "text",
    title: "Read more \n are verified in \n atimely manner.",
    image: "",
    description:
      "Read more Only the actions of the representatives of the opposition are verified in a timely manner. To this day, the actions of the representatives of the opposition remain the lot of liberals who yearn to be associatively distributed across the branches.",
    roundImage: "",
    bigImage: "",
    link: "",
  },
  {
    type: "rounded",
    title: "Read more verified \natimelymanner.",
    image: "",
    description: "",
    roundImage: "/images/rounded.jpg",
    bigImage: "",
    link: "",
  },
  {
    type: "bigImage",
    title: "",
    image: "",
    description: "",
    roundImage: "",
    bigImage: "/images/big.jpg",
    link: "",
  },
];

const NextArrow = ({ onClick, isLastSlide }) => {
  const items = document.querySelectorAll(".splide__slide");
  const lastIndex = items.length - 1;

  return (
    <button
      className={classNames(styles.newsSlider__arrowNext, {
        [styles.newsSlider__arrowNext_active]: isLastSlide === lastIndex,
      })}
      onClick={onClick}
    >
      <SliderArrow />
    </button>
  );
};

const PrevArrow = ({ onClick, isFirstSlide }) => {
  return (
    <button
      className={classNames(styles.newsSlider__arrowPrev, {
        [styles.newsSlider__arrowPrev_active]: !isFirstSlide,
      })}
      onClick={onClick}
    >
      <SliderArrow />
    </button>
  );
};

const NewsSlider = ({ setCurrentSection }) => {
  const sliderNewsRef = useRef();
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
  });

  const onSlideChanged = (splide) => {
    setActiveSlide(splide.index);
  };

  const onSlideNext = () => {
    if (sliderNewsRef.current) {
      sliderNewsRef.current.go(">");
    }
  };

  const onSlidePrev = () => {
    if (sliderNewsRef.current) {
      sliderNewsRef.current.go("<");
    }
  };

  return (
    <>
      <section className={styles.newsSlider} id="newsSlider" ref={sectionRef}>
        <div className={styles.newsSlider__wrapper}>
          <Splide
            className={styles.newsSlider__splide}
            ref={sliderNewsRef}
            options={{
              gap: "1rem",
              type: "slide",
              pagination: false,
              drag: true,
              arrows: false,
            }}
            onActive={onSlideChanged}
          >
            {slideData?.map((slider, index) => {
              return (
                <SplideSlide key={index} className={`${styles[slider.type]}`}>
                  <div className={`${styles[slider.type + "__constructor"]}`}>
                    <img className={`${styles[slider.type + "__constructor__firstImage"]}`} src={slider.image} alt="" />
                    <h3 className={`${styles[slider.type + "__constructor__title"]}`}>{slider.title}</h3>
                    <p className={`${styles[slider.type + "__constructor__description"]}`}>{slider.description}</p>
                    <img className={`${styles[slider.type + "__constructor__roundedImage"]}`} src={slider.roundImage} alt="" />
                    <img className={`${styles[slider.type + "__constructor__bigImage"]}`} src={slider.bigImage} alt="" />
                  </div>
                  <button className={`${styles[slider.type + "__link"]}`}>learn more</button>
                </SplideSlide>
              );
            })}
          </Splide>
          <div className={styles.newsSlider__navigation}>
            <PrevArrow onClick={onSlidePrev} isFirstSlide={activeSlide} />
            <NextArrow onClick={onSlideNext} isLastSlide={activeSlide} />
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsSlider;
