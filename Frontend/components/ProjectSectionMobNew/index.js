import React from "react";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import NavLink from "../NavLink";
import styles from "./styles.module.scss";

const ProjectsSectionMobNew = ({ data }) => {

  return (
    <section className={styles.projectsSectionMob}>
      <div className={styles.projectsSectionMob__wrapper}>
        {data?.map((item) => {
          const hasLink = item.link?.trim();

          const cardContent = (
            <>
               <div className={styles.projectsSectionMob__card__img}>
              <img src={item.mediaMobile.url} alt={item.mediaMobile.name} />
            </div>
            <div className={styles.projectsSectionMob__card__info}>
              <div className={styles.projectsSectionMob__card__info__description}>
                <div className={styles.projectsSectionMob__card__info__year}>
                  <p>{item.year}</p>
                </div>
                <div className={styles.projectsSectionMob__card__info__category}>
                  <p>{item?.type}</p>
                </div>
              </div>
              <div className={styles.projectsSectionMob__card__info__title}>
                <p>{item.title}</p>
              </div>
            </div>
            </>
          );

          return (
            <div key={item.id} className={styles.projectsSectionMob__card}>
              {hasLink ? (
                <NavLink url={`/projects${item.link}`}>
                  {cardContent}
                </NavLink>
              ) : (
                cardContent
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSectionMobNew;
