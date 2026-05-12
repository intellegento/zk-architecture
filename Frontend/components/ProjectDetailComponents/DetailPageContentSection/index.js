import React, { useRef, useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import SliderArrow from "../../../public/icons/arrowSliderNews.svg";
import CursorHover from "../../CursorHover";
import SliderModal from "../SliderModal";
import styles from "./styles.module.scss";
import { parseHtml } from "../../../lib/parser";

const NextArrow = ({ onClick, isLastSlide, hasSlides }) => (
  <button
    className={`${styles.detailPageContentSection__navigation__arrowNext} ${isLastSlide || !hasSlides ? styles.disabled : ""}`}
    onClick={onClick}
    disabled={isLastSlide || !hasSlides}
  >
    <SliderArrow />
  </button>
);

const PrevArrow = ({ onClick, isFirstSlide, hasSlides }) => (
  <button
    className={`${styles.detailPageContentSection__navigation__arrowPrev} ${isFirstSlide || !hasSlides ? styles.disabled : ""}`}
    onClick={onClick}
    disabled={isFirstSlide || !hasSlides}
  >
    <SliderArrow />
  </button>
);

const DetailPageContentSection = ({ data }) => {
  const [sliderInstance, setSliderInstance] = useState(null);
  const [resetSlider, setResetSlider] = useState(false);

  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const sliderOrder = data?.top ? 2 : 3;
  const imagesBlockOrder = data?.top ? 3 : 2;

  const openModal = (imageData) => {
    setModalImage(imageData);
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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onSlideNext = () => {
    if (sliderRef.current?.splide) {
      sliderRef.current.splide.go("+1", false);
    }
  };

  const onSlidePrev = () => {
    if (sliderRef.current?.splide) {
      sliderRef.current.splide.go("-1", false);
    }
  };

  useEffect(() => {
    if (sliderRef.current?.splide) {
      const splide = sliderRef.current.splide;
      setCurrentIndex(splide.index);
      setIsFirstSlide(splide.index === 0);
      setIsLastSlide(splide.index === splide.length - 1);
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

  const imagesToUse = data?.sliderImages
    ?.map((item) => {
      const isDesktop = item.type === "desktop" || item.type === "all";
      const isMobileImage = item.type === "mobile" || item.type === "all";
      if (isMobile && isMobileImage) return item.media.url;
      if (!isMobile && isDesktop) return item.media.url;
      return null;
    })
    .filter(Boolean);

  const imagesToUseGrid = data?.images
    ?.filter((item) => (isMobile && item.type === "mobile") || (!isMobile && item.type === "desktop"))
    .map((item, index) => ({
      type: item.type,
      preview: item?.preview?.url,
      original: item?.original?.url,
      id: index,
    }));

  const sliderImagesLength = imagesToUse?.length || 0;

  const hasContent =
    (data?.title && data.title.length > 1) ||
    (data?.sliderTitle && sliderImagesLength > 1) ||
    data?.text ||
    sliderImagesLength > 0 ||
    (imagesToUseGrid && imagesToUseGrid.length > 0);

  return (
    <>
      {hasContent && (
        <section className={styles.detailPageContentSection}>
          <div className={styles.detailPageContentSection__container}>
            <div style={{ order: 1 }} className={styles.detailPageContentSection__text}>
              {data?.title && data.title.length > 1 && (
                <div className={styles.detailPageContentSection__text__title}>
                  <h3>{data.title}</h3>
                </div>
              )}
              {data?.sliderTitle && sliderImagesLength > 1 && (
                <div className={styles.detailPageContentSection__text__titleSlider}>
                  <h3>{data?.sliderTitle}</h3>
                </div>
              )}
              <div className={styles.detailPageContentSection__text__description}>{parseHtml(data?.text)}</div>
            </div>

            {/* {sliderImagesLength === 1 && (
          <div style={{ order: sliderOrder }} className={styles.detailPageContentSection__slider}>
            <img
              className={styles.detailPageContentSection__singleImage}
              src={imagesToUse[0]}
              alt="Single Slide"
            />
          </div>
        )} */}

            {sliderImagesLength > 0 && (
              <div style={{ order: sliderOrder }} className={styles.detailPageContentSection__slider}>
                {/* <div className={styles.detailPageContentSection__header}>
                  <div className={styles.detailPageContentSection__titleMob}>
                    <h3>{data?.sliderTitle}</h3>
                  </div>
                  <div className={styles.detailPageContentSection__navigation}>
                    <PrevArrow onClick={onSlidePrev} isFirstSlide={isFirstSlide} hasSlides={true} />
                    <NextArrow onClick={onSlideNext} isLastSlide={isLastSlide} hasSlides={true} />
                  </div>
                </div> */}

                <Splide
                  className={styles.detailPageContentSection__splide}
                  options={{
                    gap: ".5rem",
                    type: isMobile ? "slide" : "loop", // 👈 главное изменение
                    perPage: isMobile ? 1.1 : 1,
                    perMove: 1,
                    pagination: false,
                    arrows: false,

                    drag: "free", // 👈 плавное движение пальцем
                    snap: true, // 👈 фиксируемся ровно на 1 слайде
                    focus: 0, // 👈 всегда первый активный

                    speed: 600,
                    easing: "ease",

                    flickPower: 100, // 👈 убирает перелёты
                    flickMaxPages: 1, // 👈 максимум 1 слайд за свайп
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
                    <SplideSlide className={styles.detailPageContentSection__slide} key={index}>
                      {/* <CursorHover label={"prev"} className="projectSectionHover">
                        <div
                          className={`${styles.detailPageContentSection__slide__photo__prev} ${isFirstSlide ? styles.offButton : ""}`}
                          onClick={onSlidePrev}
                        />
                      </CursorHover> */}
                      <CursorHover label={"next"} className="projectSectionHover">
                        <div
                          className={`${styles.detailPageContentSection__slide__photo__next} ${isLastSlide ? styles.offButton : ""}`}
                          onClick={onSlideNext}
                        />
                      </CursorHover>
                      <img src={item} alt={`Slide ${index}`} />
                    </SplideSlide>
                  ))}
                </Splide>
              </div>
            )}

            <div style={{ order: imagesBlockOrder }} className={styles.detailPageContentSection__imagesBlock}>
              {imagesToUseGrid?.map((item, index) => (
                <div className={styles.detailPageContentSection__imagesBlock__item} key={index}>
                  <div
                    className={styles.detailPageContentSection__imagesBlock__item__img}
                    style={{ backgroundImage: `url(${item?.preview})` }}
                  />
                  {item?.original !== undefined && (
                    <CursorHover label="+" type="plus" className="projectSectionHover">
                      <div className={styles.detailPageContentSection__imagesBlock__item__cover} onClick={() => openModal(item)} />
                    </CursorHover>
                  )}
                </div>
              ))}

              {modalImage && <SliderModal images={imagesToUseGrid} index={modalImage?.id + 1} closeModal={closeModal} />}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default DetailPageContentSection;
