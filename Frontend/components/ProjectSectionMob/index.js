import React, { useState, useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import NavLink from "../NavLink";
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
    imageSrc: "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/aniva/aniva_mainPreview_mob_1.jpg",
    smallImgSrc: "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/aniva/aniva_mainPreview_mob_2.jpg",
    smallImgSrc2: "/images/projectSection/slide1/section1-4.jpg",
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
    imageSrc: "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/high_bay/highBay_mainPreview_mob_1.jpg",
    smallImgSrc: "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/high_bay/highBay_mainPreview_mob_2.jpg",
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
    imageSrc: "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/obydenskij/obydenskij_mainPreview_mob_1.jpg",
    smallImgSrc: "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/obydenskij/obydenskij_mainPreview_mob_2.jpg",
    smallImgSrc2: "/images/projectSection/slide3/section3-4.jpg",
    url: "/projects/obydenskij/",
  },
];

const ProjectsSectionMob = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isLastProject, setIsLastProject] = useState(false);
  const [isChangingProject, setIsChangingProject] = useState(false);

  const sectionRef = useRef();
  const splideRef = useRef();

  const handleNextClick = () => {
    if (splideRef.current) {
      splideRef.current.go("+1");
    }
  };

  const handleSplideUpdate = () => {
    const splideInstance = splideRef.current.splide;

    if (splideInstance) {
      const isLastSlide = splideInstance.index === splideInstance.length - 1;
      setIsLastProject(isLastSlide);
    }
  };

  const handleSplideDragged = () => {
    const splideInstance = splideRef.current.splide;

    if (splideInstance && splideInstance.index === splideInstance.length - 1) {
      setIsChangingProject(true);
      setTimeout(() => {
        setIsChangingProject(false);
      }, 200);
    }
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
    <section ref={sectionRef} className={styles.projectsSectionMob} id="projects">
      <Splide
        options={{
          type: "fade",
          // heightRatio: 0.5,
          pagination: false,
          arrows: false,
          perPage: 1,
          gap: 0,
          padding: 0,
          rewind: false,
          width: "100vw",
          drag: true,
        }}
        onMoved={handleSplideUpdate}
        onDragged={handleSplideDragged}
        ref={splideRef}
      >
        {projectsData?.map((project, index) => (
          <SplideSlide key={index}>
            <div className={styles.projectsSectionMob__wrapper}>
             <NavLink url={project.url}>
             <div className={styles.projectsSectionMob__wrapper__title}>
                <h3>{project.title}</h3>
              </div>
              <div className={styles.projectsSectionMob__wrapper__big}>
                <img src={project.imageSrc} alt={project.title} />
              </div>
             </NavLink>
              <div className={styles.projectsSectionMob__wrapper__small}>
                <img src={project.smallImgSrc} alt={project.title} />
                <div className={styles.projectsSectionMob__button}>
                  {isLastProject ? <NavLink url="/projects">All</NavLink> : <button onClick={handleNextClick}>Next</button>}
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
};

export default ProjectsSectionMob;

// const ProjectsSectionMob = () => {
//   const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
//   const currentProject = projectsData[currentProjectIndex];
//   const isLastProject = currentProjectIndex === projectsData.length - 1;
//   const [isChangingProject, setIsChangingProject] = useState(false);

//   const sectionRef = useRef();

//   const handleNextClick = () => {
//     if (currentProjectIndex < projectsData.length - 1) {
//       setIsChangingProject(true);
//       setTimeout(() => {
//         setCurrentProjectIndex(currentProjectIndex + 1);
//         setTimeout(() => {
//           setIsChangingProject(false);
//         }, 200);
//       }, 300);
//     }
//   };

//   const getButtonText = () => {
//     return window.innerWidth <= 768 ? "All" : "All Projects";
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const entry = entries[0];
//         // Если секция не видна и индекс не равен 0, сбрасываем индекс
//         if (!entry.isIntersecting && currentProjectIndex !== 0) {
//           setCurrentProjectIndex(0);
//         }
//       },
//       { threshold: 0 } // Порог вхождения, 0 означает, что хотя бы один пиксель должен быть виден
//     );

//     // Начинаем отслеживать секцию
//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     // Отменяем отслеживание при размонтировании компонента
//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, [currentProjectIndex]);

//   return (
//     <section ref={sectionRef} className={styles.projectsSectionMob} id="projects">
//       <div className={styles.projectsSectionMob__wrapper}>
//         <div className={styles.projectsSectionMob__wrapper__title}>
//           <h3>{currentProject.title}</h3>
//         </div>
//         <div className={styles.projectsSectionMob__wrapper__big}>
//           <img src={currentProject.imageSrc} alt={currentProject.title} />
//         </div>
//         <div className={styles.projectsSectionMob__wrapper__small}>
//           <img src={currentProject.smallImgSrc} alt={currentProject.title} />
//         </div>
//       </div>
//       <div className={styles.projectsSectionMob__button}>
//         {isLastProject ? <NavLink url="/projects">{getButtonText()}</NavLink> : <button onClick={handleNextClick}>Next</button>}
//       </div>
//     </section>
//   );
// };

// export default ProjectsSectionMob;
