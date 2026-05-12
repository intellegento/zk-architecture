import React, {useState} from "react";
import CursorHover from "../CursorHover";
import styles from "./styles.module.scss";

const slideData = [
  {
    title: "Architecture",
    content: [
      "Pre-design analysis",
      "Concept development",
      "Conceptual design",
      "Schematic design",
      "Architectural 3D visualization",
      "Project docimentation",
      "Preliminary cost estimation",
      "Architectural supervision",
    ],
  },
  {
    title: "Interios",
    content: [
      "Pre-design analysis",
      "Concept development",
      "Conceptual design",
      "Schematic design",
      "Interior 3D visualization",
      "Material specification",
      "Furniture selection",
      "Preliminary cost estimation",
      "Interior design supervision"
    ],
  },
  {
    title: "Landscape",
    content: [
      "Pre-design analysis",
      "Concept development",
      "Conceptual design",
      "Planting design",
      "Schematic design",
      "Landscape 3D visualization",
      "Project docimentation",
      "Preliminary cost estimation",
      "Landscape supervision"
    ],
  },
  {
    title: "Design",
    content: [
      "Pre-design analysis",
      "Concept development",
      "Conceptual design",
      "Schematic design",
      "3D visualization",
      "Technical specifications",
      "Preliminary cost estimation",
      "Supervision",
    ],
  },
];

const ServicesSection = ({setCurrentSection, data}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleSlideHover = (index) => {
    setActiveSlideIndex(index);
  };

  return (
    <section className={styles.servicesSection} id="services">
      <div className={styles.servicesSection__wrapper}>
        <div className={styles.servicesSection__slider}>
          <div className={styles.servicesSection__thumbs}>
            {data?.map((slide, index) => (
              <div
                key={slide.id}
                className={index === activeSlideIndex ? styles.servicesSection__activeThumb : styles.servicesSection__thumb}
                // onMouseEnter={() => handleSlideHover(index)}
                onClick={() => handleSlideHover(index)}
              >
                <CursorHover>
                <p>
                {slide.title}
                </p>
                </CursorHover>
              </div>
            ))}
          </div>
          <div className={styles.servicesSection__galleria}>
            {data?.map((slide, index) => (
              <div
                key={slide.id}
                className={index === activeSlideIndex ? styles.servicesSection__activeSlide : styles.servicesSection__slide}
              >
                {index === activeSlideIndex && (
                  <div>
                    {slide?.slideItems?.map((item) => (
                      <p key={item.id}>{item.text}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
