import React, { useState, useEffect } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import Header from "../../components/Header";
import ProjectsDetailComponent from "../../components/ProjectDetailComponents";
import Footer from "../../components/Footer";
import content from "../../mock/dataArray";
import { useMediaQuery } from "@react-hook/media-query";
import api from "../../lib/api";

export async function getServerSideProps({ params, locale }) {
  const { slug } = params;
  const siteSettingsResponse = await api.get("/site-setting", { qs: { locale } });
  const projectsResponse = await api.get("/projects", {
    qs: {
      filters: {
        slug: { $eq: slug },
      },
      locale,
    },
  });
  const projectData = projectsResponse || {};
  const project = projectData[0];

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      siteSettingsData: siteSettingsResponse || {},
      project,
    },
  };
}

const Detail = ({ pageData, page, siteSettingsData, project }) => {
  const matches = useMediaQuery("(min-width: 1024px)");
  const [isIntroSectionInView, setIsIntroSectionInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const introSection = document.getElementById("projectIntroSection");

      if (introSection) {
        const rect = introSection.getBoundingClientRect();
        setIsIntroSectionInView(rect.top <= window.innerHeight && rect.bottom >= 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sum = matches && isIntroSectionInView;

  return (
    <>
      <Header
      // normal={sum ? "normal" : ""}
      />
      <ProjectsDetailComponent data={project} />
      <Footer style={"#1d1d21"} data={siteSettingsData} />
    </>
  );
};

export default Detail;
