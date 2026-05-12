import React from "react";
import styles from "./styles.module.scss";

const teamData = [
  {
    name: "Iliya Kovalenko",
    position: "art director / CG artist",
  },
  {
    name: "Anna Petrova",
    position: "lead designer",
  },
  {
    name: "Alexey Ivanov",
    position: "senior developer",
  },
  {
    name: "Elena Sidorova",
    position: "marketing manager",
  },
  {
    name: "Dmitry Smirnov",
    position: "UX/UI specialist",
  },
  {
    name: "Olga Mikhailova",
    position: "project manager",
  },
  {
    name: "Vladimir Popov",
    position: "creative writer",
  },
  {
    name: "Maria Kuznetsova",
    position: "frontend developer",
  },
  {
    name: "Maxim Petrov",
    position: "3D artist",
  },
  {
    name: "Natalia Ivanova",
    position: "social media manager",
  },
  {
    name: "Anton Sergeyev",
    position: "backend developer",
  },
  {
    name: "Yulia Fedorova",
    position: "graphic designer",
  },
];


const TeamSection = ({data}) => {
  return (
    <section className={styles.teamSection}>
    <div className={styles.teamSection__container}>
    <div className={styles.teamSection__header}>
        <h3>Team</h3>
      </div>
      <div className={styles.teamSection__list}>
        {data?.map((member, index) => (
          <div className={styles.teamSection__list__item} key={index}>
            <div className={styles.teamSection__list__item__name}>
              <p>{member.name}</p>
            </div>
            <div className={styles.teamSection__list__item__position}>
              <p>{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default TeamSection;
