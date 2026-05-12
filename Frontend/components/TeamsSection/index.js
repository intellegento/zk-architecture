import React, { useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import SliderArrow from "../../public/icons/arrowSliderNews.svg";
import CursorHover from "../CursorHover";
import CrosClose from "../../public/icons/crossclose.svg";
import MoreOpen from "../../public/icons/more.svg";
import { parseHtml } from "../../lib/parser";
import styles from "./styles.module.scss";

const tableData = [
  {
    index: "01",
    name: "Vlad Alexandrov",
    position: "Founder of VALUE",
    photo: "/images/founder_1.jpg",
    description:
      "“Since childhood, I’ve been fascinated by creating new worlds — building with LEGO, mixing sets, and breaking the rules.<br/><br/>I grew up, my interests expanded: football taught me teamwork, climbing summits like Kilimanjaro, Aconcagua, and Elbrus taught me perseverance. But my most significant ascent started seven years ago when I set my sights on conquering the peak of architecture.<br/><br/>I gathered a team, and together we push the boundaries of what’s possible, turning ambitious ideas into reality”.",
  },
  {
    index: "02",
    name: "Marina Urtaeva",
    position: "Co-founder of 11.19 Architecture & Design",
    photo: "/images/founder_2.jpg",
    description:
      '“I’ve always known design was my path. From art school and studies in Vladikavkaz to internships in London and Milan, and finally Stroganov Academy — everything reinforced my belief that design has no limits."',
  },
  {
    index: "03",
    name: "Nelly Bigaeva",
    position: "Co-founder of 11.19 Architecture & Design",
    photo: "/images/founder_3.jpg",
    description:
      "“My childhood was about balancing art and sport. Gymnastics taught me discipline and goal-setting, while drawing gave me freedom. <br/><br/>At Stroganov Academy, Marina and I met and realized we shared the same dreams. We’re connected not only by friendship but also by our passion for design, art, and creating spaces that inspire.”",
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
      className={`${styles.teamsSectionMobile__navigation__arrowNext} ${isLastSlide || !hasSlides ? styles.disabled : ""}`}
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
      className={`${styles.teamsSectionMobile__navigation__arrowPrev} ${isFirstSlide || !hasSlides ? styles.disabled : ""}`}
      onClick={handleClick}
      disabled={isFirstSlide || !hasSlides}
    >
      <SliderArrow />
    </button>
  );
};

const TeamsSection = ({ data }) => {
  const [selectedName, setSelectedName] = useState("");
  const [isFirstSlide, setIsFirstSlide] = useState(false);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const sliderRef = useRef();
  const [openedSlide, setOpenedSlide] = useState(null); // индекс активного описания

  const toggleDescription = (index) => {
    setOpenedSlide((prev) => (prev === index ? null : index));
  };

  const handleNameHover = (name) => {
    setSelectedName(name);
  };

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
      <section className={styles.teamsSection} id="teams">
        <div className={styles.teamsSection__container}>
          <div className={styles.teamsSection__title}>
            <p>{data.founderTitle}</p>
          </div>
          <div className={styles.teamsSection__meet}>
            {data?.founderCards?.map((item, index) => {
              return (
                <div className={styles.teamsSection__card} key={index}>
                  <div className={styles.teamsSection__card__info}>
                    <div className={styles.teamsSection__card__info__name}>
                      <p>{item.name}</p>
                    </div>
                    <div className={styles.teamsSection__card__info__position}>
                      <p>{item.position}</p>
                    </div>
                    <div className={styles.teamsSection__card__info__text}>
                      {parseHtml(item.bio)}
                    </div>
                  </div>
                  <div className={styles.teamsSection__card__wrapper}>
                    <div className={styles.teamsSection__card__description}>
                      <div className={styles.teamsSection__card__description__photo}>
                       <img src={item.photo.url} alt={item.photo.name} />
                      </div>
                    </div>
                    <div className={styles.teamsSection__card__index}>
                      <p>{String(index + 1).padStart(2, "0")}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className={styles.teamsSectionMobile} id="teams">
        <div className={styles.teamsSectionMobile__header}>
          <div className={styles.teamsSectionMobile__title}>
            <p>{data.founderTitle}</p>
          </div>
          <div className={styles.teamsSectionMobile__navigation}>
            <PrevArrow onClick={onSlidePrev} isFirstSlide={isFirstSlide} hasSlides={tableData.length > 1} />
            <NextArrow onClick={onSlideNext} isLastSlide={isLastSlide} hasSlides={tableData.length > 1} />
          </div>
        </div>
        <Splide
          className={styles.teamsSectionMobile__splide}
          options={{
            pagination: false,
            drag: true,
            arrows: false,
            perMove: 1,
            focus: '0',
            padding: 0,
            gap: '1rem',
            snap: false,
            trimSpace: true,
            perPage: 1.2,
          }}
          ref={sliderRef}
        >
          {data?.founderCards?.map((item, index) => {
            const isOpen = openedSlide === index;

            return (
              <SplideSlide className={styles.teamsSectionMobile__slide} key={index}>
                <div className={styles.teamsSectionMobile__slide__photoWrapper}>
                  <div className={styles.teamsSectionMobile__slide__photo}>
                    <img src={item.photo.url} alt={`Slide ${index}`} />
                    <div className={`${styles.infoButton} ${isOpen ? styles.open : ""}`} onClick={() => toggleDescription(index)}>
                      {!isOpen ? <MoreOpen/> : <CrosClose/>}
                    </div>
                    <div className={`${styles.infoOverlay} ${isOpen ? styles.visible : ""}`}>
                      <div className={styles.infoText}>
                        {parseHtml(item.bio)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.teamsSectionMobile__slide__bio}>
                  <div className={styles.teamsSectionMobile__slide__name}>
                    <p>{item.name}</p>
                  </div>
                  <div className={styles.teamsSectionMobile__slide__position}>
                    <p>{item.position}</p>
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </section>
    </>
  );
};

export default TeamsSection;
