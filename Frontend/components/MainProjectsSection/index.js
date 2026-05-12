import React from 'react';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styles from "./styles.module.scss";
import CursorHover from "../CursorHover";
import Link from 'next/link';
import { projectsData } from './data';

const ProjectGroup = ({ projects }) => {
  const [sliderInstance, setSliderInstance] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isFirstSlide, setIsFirstSlide] = React.useState(true);
  const [isLastSlide, setIsLastSlide] = React.useState(false);
  const sliderRef = React.useRef(null);

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

  const smallProjects = projects.filter(project => project.type === 'small');
  const largeProject = projects.find(project => project.type === 'large');

  if (!projects || !smallProjects.length || !largeProject) {
    return null;
  }

  return (
    <div className={styles.mainProjects__container}>
      <div className={styles.mainProjects__smallCards}>
        {smallProjects?.map((project, index) => (
          <div key={index} className={styles.mainProjects__card}>
            <CursorHover label={"go to"}>
              <Link href={project.url} >
                <div className={styles.mainProjects__card__media}>
                    {project.media.endsWith('.mp4') ? (
                      <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className={styles.mainProjects__card__video}
                      >
                        <source src={project.media} type="video/mp4" />
                      </video>
                    ) : (
                      <img 
                        src={project.media} 
                        alt={project.title} 
                        className={styles.mainProjects__card__image}
                      />
                    )}
                  </div>
                  <div className={styles.mainProjects__info}>
                    <div className={styles.mainProjects__info__title}>
                      <h3>{project.title}</h3>
                    </div>
                    <div className={styles.mainProjects__info__description}>
                      <p>{project.description}</p>
                    </div>
                  </div>
              </Link>
            </CursorHover>
          </div>
        ))}
      </div>

      <div className={styles.mainProjects__largeCard}>
       <CursorHover label={"go to"}>
       <Link href={largeProject.url}>
          <div className={styles.mainProjects__largeCard__media}>
            {largeProject && largeProject.media && largeProject.media.slides && (
              <Splide
                className={styles.mainProjects__slider}
                options={{
                  gap: ".5rem",
                  type: "fade",
                  rewind: true,
                  // autoplay: true,
                  // interval: 3000,
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
                {largeProject?.media?.slides?.map((slide, index) => (
                  <SplideSlide key={index} className={styles.mainProjects__slide}>  
                    {/* <CursorHover className="projectSectionHover">
                      <div
                        className={`${styles.mainProjects__slide__prev} ${isFirstSlide ? styles.offButton : ""}`}
                        onClick={onSlidePrev}
                      />
                    </CursorHover>
                    <CursorHover label={"next"}>
                      <div
                        className={`${styles.mainProjects__slide__next} ${isLastSlide ? styles.offButton : ""}`}
                        onClick={onSlideNext}
                      />
                    </CursorHover> */}
                    <img src={slide} alt={`Slide ${index}`} />
                  </SplideSlide>
                ))}
              </Splide>
            )}
          </div>
          <div className={styles.mainProjects__info}>
            <div className={styles.mainProjects__info__title}>
              <h3>{largeProject.title}</h3>
            </div>
            <div className={styles.mainProjects__info__description}>
              <p>{largeProject.description}</p>
            </div>
          </div>
        </Link>
       </CursorHover>
      </div>
    </div>
  );
};

const MainProjectsSection = ({ data = projectsData }) => {
  return (
    <section className={styles.mainProjects}>
      {data?.map((projectGroup, index) => (
        <ProjectGroup key={index} projects={projectGroup} />
      ))}
    </section>
  );
};

export default MainProjectsSection;
