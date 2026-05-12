import React, { useState, useEffect, useRef } from "react";
import NavLink from "../NavLink";
import CursorHover from "../CursorHover";
import styles from "./styles.module.scss";

const projectsData = [
  {
    year: "2022",
    category: "Improvement",
    title: "Aniva Lighthouse",
    description:
      "Read more Only the actions of the representatives of the opposition are verified in a timely manner. To this day, the actions of the representatives of the opposition remain the lot of liberals who yearn to be associatively distributed across the branches.",
    clientName: "Bogdan Kim",
    location: "Russia, Sakhalin",
    totalArea: "199 980km",
    totalProjectArea: "199 980 km",
    objective: "Reconstruction",
    status: "In progress",
    imageSrc: "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/aniva/aniva_mainPreview.jpg",
    smallImgSrc: "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/aniva/aniva_mainPreview.jpg",
    smallImgSrc2: "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/aniva/aniva_mainPreview.jpg",
    url: "/projects/aniva-lighthouse",
  },
  {
    year: "2022",
    category: "Improvement",
    title: "Center Innovation",
    description:
      "Read more Only the actions of the representatives of the opposition are verified in a timely manner. To this day, the actions of the representatives of the opposition remain the lot of liberals who yearn to be associatively distributed across the branches.",
    clientName: "Baga Kim",
    location: "Russia, Sakhalin",
    totalArea: "199km",
    totalProjectArea: "19km",
    objective: "Reconstruction",
    status: "In progress",
    imageSrc: "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/high_bay/highBay_mainPreview_1.jpg",
    smallImgSrc: "/images/projectSection/slide2/section2-7.jpg",
    smallImgSrc2: "/images/projectSection/slide2/section2-4.jpg",
    url: "/projects/high-bay/",
  },
  {
    year: "2022",
    category: "Improvement",
    title: "Obydensky",
    description:
      "Read more Only the actions of the representatives of the opposition are verified in a timely manner. To this day, the actions of the representatives of the opposition remain the lot of liberals who yearn to be associatively distributed across the branches.",
    clientName: "Bogdan Kim",
    location: "Russia, Sakhalin",
    totalArea: "199 980km",
    totalProjectArea: "199 980 km",
    objective: "Reconstruction",
    status: "In progress",
    imageSrc: "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/obydenskij/obydenskij_mainPreview.jpg",
    smallImgSrc: "/images/projectSection/slide3/section3-7.jpg",
    smallImgSrc2: "/images/projectSection/slide3/section3-4.jpg",
    url: "/projects/obydenskij/",
  },
];

const ProjectsSection = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const currentProject = projectsData[currentProjectIndex];
  const isLastProject = currentProjectIndex === projectsData.length - 1;
  const [isChangingProject, setIsChangingProject] = useState(false);

  const sectionRef = useRef();

  const handleNextClick = () => {
    if (currentProjectIndex < projectsData.length - 1) {
      setIsChangingProject(true);
      setTimeout(() => {
        setCurrentProjectIndex(currentProjectIndex + 1);
        setTimeout(() => {
          setIsChangingProject(false);
        }, 300);
      }, 300);
    }
  };

  const getButtonText = () => {
    return window.innerWidth <= 768 ? "All" : "All Projects";
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting && currentProjectIndex !== 0) {
          setCurrentProjectIndex(0);
        }
      },
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [currentProjectIndex]);

  return (
    <section ref={sectionRef} className={`${styles.projectsSectionBlack} ${styles.transitionWrapper}`} id="projects">
      <div className={styles.projectsSectionBlack__wrapper}>
        <div className={styles.projectsSectionBlack__header}>
          <div
            className={styles.projectsSectionBlack__header__left}
            style={{
              // transform: isChangingProject ? "translateX(-50vh)" : "translateX(0)",
              opacity: isChangingProject ? 0 : 1,
            }}
          >
            <div className={styles.projectsSectionBlack__header__title}>
              <h3>{currentProject.title}</h3>
            </div>
            <div className={styles.projectsSectionBlack__header__year}>
              <p>{currentProject.year}</p>
            </div>
            <div className={styles.projectsSectionBlack__header__category}>
              <p>{currentProject.category}</p>
            </div>
          </div>

          <div className={styles.projectsSectionBlack__header__right}>
            {isLastProject ? (
              <CursorHover>
                <NavLink url="/projects">{getButtonText()}</NavLink>
              </CursorHover>
            ) : (
              <CursorHover>
                <button onClick={handleNextClick}>Next</button>
              </CursorHover>
            )}
          </div>
        </div>
        <div
          className={`${styles.projectsSectionBlack__main} ${styles.transitionContent}`}
          style={{
            // transform: isChangingProject ? "translateX(50vh)" : "translateX(0)",
            opacity: isChangingProject ? 0 : 1,
          }}
        >
          <div className={`${styles.projectsSectionBlack__main__textSide}`}>
            <div className={styles.projectsSectionBlack__main__textSide__title}>
              <h3>{currentProject.title}</h3>
            </div>
            <div className={styles.projectsSectionBlack__main__textSide__description}>
              <p>{currentProject.description}</p>
            </div>
            <div className={styles.projectsSectionBlack__main__textSide__infoBlock}>
              <div className={styles.projectsSectionBlack__main__textSide__column}>
                <div className={styles.projectsSectionBlack__main__textSide__info}>
                  <span>Client:</span>
                  <p>{currentProject.clientName}</p>
                </div>
                <div className={styles.projectsSectionBlack__main__textSide__info}>
                  <span>Location</span>
                  <p>{currentProject.location}</p>
                </div>
                <div className={styles.projectsSectionBlack__main__textSide__info}>
                  <span>Total area:</span>
                  <p>{currentProject.totalArea}</p>
                </div>
              </div>
              <div className={styles.projectsSectionBlack__main__textSide__column}>
                <div className={styles.projectsSectionBlack__main__textSide__info}>
                  <span>Total project area:</span>
                  <p>{currentProject.totalProjectArea}</p>
                </div>
                <div className={styles.projectsSectionBlack__main__textSide__info}>
                  <span>Objective:</span>
                  <p>{currentProject.objective}</p>
                </div>
                <div className={styles.projectsSectionBlack__main__textSide__info}>
                  <span>Status:</span>
                  <p>{currentProject.status}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.projectsSectionBlack__main__imgSide}>
            <CursorHover blendMode="normal" label={"more"} className="projectSectionHover">
              <NavLink url={currentProject.url}>
                <img src={currentProject.imageSrc} alt={currentProject.title} />
              </NavLink>
            </CursorHover>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
