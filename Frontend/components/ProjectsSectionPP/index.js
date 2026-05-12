import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CursorHover from "../CursorHover";
import styles from "./styles.module.scss";
import NavLink from "../NavLink";

import { isDesktop } from "../../lib/utils";
import TaglineBureau from "../TaglineBureau";

const projectData = [
  {
    img: "/images/projectPage/aniva.jpg",
    year: "2022",
    category: "Architecture",
    title: "Aniva Lighthouse",
    url: "/projects/aniva-lighthouse",
  },
  {
    img: "/images/projectPage/Obydenskij.jpg",
    year: "2022",
    category: "Reconstruction",
    title: "Obydenskij",
    url: "/projects/obydenskij",
  },
  {
    img: "/images/projectPage/qatar.jpg",
    year: "2022",
    category: "Architecture, Interior Design ",
    title: "Qatar Desert Rose",
    url: "/projects/qatar-desert-rose",
  },
  {
    img: "/images/projectPage/highbay.jpg",
    year: "2022",
    category: "Architecture, Interior Design",
    title: "High Bay",
    url: "/projects/high-bay",
  },
  {
    img: "/images/projectPage/project2.jpg",
    year: "2022",
    category: "ArchiDesigntecture",
    title: "Aniva Lighthouse",
    url: "",
  },
  {
    img: "/images/projectPage/project6.jpg",
    year: "2022",
    category: "Architecture",
    title: "Aniva Lighthouse",
    url: "",
  },
  {
    img: "/images/projectPage/project7.jpg",
    year: "2022",
    category: "Architecture",
    title: "Aniva Lighthouse",
    url: "",
  },
  {
    img: "/images/projectPage/project4.jpg",
    year: "2022",
    category: "Architecture",
    title: "Aniva Lighthouse",
    url: "",
  },
  {
    img: "/images/projectPage/project9.jpg",
    year: "2022",
    category: "Architecture",
    title: "Aniva Lighthouse",
    url: "",
  },
  {
    img: "/images/projectPage/project10.jpg",
    year: "2022",
    category: "Architecture",
    title: "Aniva Lighthouse",
    url: "",
  },
  {
    img: "/images/projectPage/project11.jpg",
    year: "2022",
    category: "Landscaping",
    title: "Aniva Lighthouse",
    url: "",
  },
  {
    img: "/images/projectPage/project12.jpg",
    year: "2022",
    category: "Landscaping",
    title: "Aniva Lighthouse",
    url: "",
  },
];

const ProjectSectionPP = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getImageData = (card) => {
    if (!card) return { url: "", name: "" };
    const media = isMobile && card.mediaMobile ? card.mediaMobile : card.mediaDesktop;
    return {
      url: media?.url || "",
      name: media?.name || "",
    };
  };

  const filteredProjects =
    selectedCategory === "All" ? data?.projects : data?.projects.filter((project) => project?.type === selectedCategory);

  return (
    <section className={styles.projectsSectionPP}>
      <div className={styles.projectsSectionPP__container}>
        <div className={styles.projectsSectionPP__header}>
          <div className={styles.projectsSectionPP__header__title}>
            <h3>{data?.title}</h3>
          </div>
          <div className={styles.projectsSectionPP__header__filters}>
            <div
              className={`${styles.projectsSectionPP__header__filters__item} ${selectedCategory === "All" ? styles.active : ""}`}
              onClick={() => setSelectedCategory("All")}
            >
              <CursorHover>
                <span>All</span>
              </CursorHover>
            </div>
            <div
              className={`${styles.projectsSectionPP__header__filters__item} ${
                selectedCategory === "Architecture" ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory("Architecture")}
            >
              <CursorHover>
              <span>
                Architecture
              </span>
              </CursorHover>
            </div>
            <div
              className={`${styles.projectsSectionPP__header__filters__item} ${selectedCategory === "Interiors" ? styles.active : ""}`}
              onClick={() => setSelectedCategory("Interiors")}
            >
              <CursorHover>
                <span>Interiors</span>
              </CursorHover>
            </div>
            <div
              className={`${styles.projectsSectionPP__header__filters__item} ${selectedCategory === "Landscape" ? styles.active : ""}`}
              onClick={() => setSelectedCategory("Landscape")}
            >
              <CursorHover>
                <span>Landscape</span>
              </CursorHover>
            </div>
            <div
              className={`${styles.projectsSectionPP__header__filters__item} ${selectedCategory === "Design" ? styles.active : ""}`}
              onClick={() => setSelectedCategory("Design")}
            >
              <CursorHover>
                <span>Design</span>
              </CursorHover>
            </div>
          </div>
          {/* <button onClick={() => router.back()} className={styles.projectsSectionPP__goBackButton}>
            <NavLink url="/#projects">
              <CursorHover label="">
                <span>← GO BACK</span>
              </CursorHover>
            </NavLink>
          </button> */}
        </div>

        <div className={styles.projectsSectionPP__main}>
          {filteredProjects?.map((card, index) => {
            const hasLink = card.link?.trim();
            const imageData = getImageData(card);
            return (
              <div className={styles.projectsSectionPP__card} key={index}>
                <CursorHover blendMode="normal" label={card?.link ? "more" : "coming soon"} key={index}>
                  {hasLink ? (
                    <NavLink url={`/projects${card.link}`}>
                      <img src={imageData?.url} alt={imageData?.name} />
                    </NavLink>
                  ) : (
                    <img src={imageData?.url} alt={imageData?.name} />
                  )}
                </CursorHover>
                <div className={styles.projectsSectionPP__card__textBlock}>
                  <div className={styles.projectsSectionPP__card__textBlock__description}>
                    <p>{card?.year}</p>
                    <p>{card?.type}</p>
                  </div>
                  <div className={styles.projectsSectionPP__card__textBlock__title}>
                    <p>{card?.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectSectionPP;
