import React, { useEffect } from "react";
import styles from "./styles.module.scss";

const AwardsSection = ({ setCurrentSection }) => {
  const awardsData = [
    {
      year: "2023",
      title: "STONE TOWERS",
      description:
        "Read more Only the actions of the representatives of the opposition are verified in a timely manner. To this day, the actions of the representatives of the opposition remain the lot of liberals who yearn to be associatively distributed across the branches.",
    },
    {
      year: "2022",
      title: "BRODSKY",
      description:
        "Read more Only the actions of the representatives of the opposition are verified in a timely manner. To this day, the actions of the representatives of the opposition remain the lot of liberals who yearn to be associatively distributed across the branches.",
    },
    {
      year: "2021",
      title: "SAVVIN RIVER RESIDENCE",
      description:
        "Read more Only the actions of the representatives of the opposition are verified in a timely manner. To this day, the actions of the representatives of the opposition remain the lot of liberals who yearn to be associatively distributed across the branches.",
    },
    {
      year: "2020",
      title: "LUMIN",
      description:
        "Read more Only the actions of the representatives of the opposition are verified in a timely manner. To this day, the actions of the representatives of the opposition remain the lot of liberals who yearn to be associatively distributed across the branches.",
    },
  ];

  return (
    <section className={styles.awardsSection} id="awards">
      <div className={styles.awardsSection__container}>
        <div className={styles.awardsSection__title}>
          <p>Awards</p>
        </div>
        <div className={styles.awardsSection__table}>
          {awardsData?.map((item, index) => (
            <div className={styles.awardsSection__item} key={index}>
              <div className={styles.awardsSection__item__years}>
                <p>{item.year}</p>
              </div>
              <div className={styles.awardsSection__item__text}>
                <div className={styles.awardsSection__item__title}>
                  <p>{item.title}</p>
                </div>
                <div className={styles.awardsSection__item__description}>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
