import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/router";
import { getTranslation } from "../../locales";
import styles from "./styles.module.scss";
import CursorHover from "../CursorHover";
import NavLink from "../NavLink";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    year: "2022",
    category: "Improvement",
    title: "Aniva Lighthouse",
    imageSrc: "/images/Project1.jpg",
    url: "/projects/aniva-lighthouse",
  },
  {
    year: "2022",
    category: "Improvement",
    title: "Center Innovation",
    imageSrc: "/images/Project2.jpg",
    url: "/projects/high-bay/",
  },
  {
    year: "2022",
    category: "Improvement",
    title: "Obydensky",
    imageSrc: "/images/Project3.jpg",
    url: "/projects/obydenskij/",
  },
  {
    year: "2022",
    category: "Improvement",
    title: "Obydensky",
    imageSrc: "/images/Project4.jpg",
    url: "/projects/obydenskij/",
  },
];

const ProjectsSectionNew = ({ data }) => {
  const cardsRef = useRef([]);

  const { locale } = useRouter();
  
  const translation = React.useMemo(
    () => getTranslation(locale),
    [locale]
  );

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true,
      });

      gsap.fromTo(
        card.querySelector("img"),
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <section className={`${styles.projectsSection} ${styles.transitionWrapper}`} id="projects">
      <div className={styles.projectsSection__wrapper}>
        {data?.map((item, index) => (
          <div key={item.id} className={styles.projectsSection__card} ref={(el) => (cardsRef.current[index] = el)}>
            {item.link ? (
              <NavLink url={`/projects${item.link}`}>
                <CursorHover label={translation.viewCursor}>
                  <div className={styles.projectsSection__card__hover} />
                </CursorHover>
              </NavLink>
            ) : (
              <CursorHover label={translation.comingSoonCursor}>
                <div className={styles.projectsSection__card__hover} />
              </CursorHover>
            )}

            <img src={item.mediaDesktop.url} alt={item.mediaDesktop.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSectionNew;
