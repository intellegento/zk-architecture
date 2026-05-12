import React from "react";
import get from "../lib/utils/get";
import Meta from "../components/Meta";
import Header from "../components/Header";
import TypingTextAnimation from "../components/TypingTextAnimation";
import ProjectSectionPP from "../components/ProjectsSectionPP";
import Footer from "../components/Footer";
import api from "../lib/api";

const data = {
  projects: {
    id: 1,
    text: "Projects",
    start: "-1% 0%",
    end: "0% 0%",
    markers: false,
    startEnd: "80% 80%",
    endEnd: "90% 90%",
    markersEnd: false,
  },
};

export async function getStaticProps({ locale }) {

  const siteSettingsResponse = await api.get("/site-setting", { qs: { locale: locale } });

  const projectPageResponse = await api.get("/project-page", {
    qs: { locale: locale, limit: 1000 }
  });

  return {
    props: {
      siteSettingsData: siteSettingsResponse || {},
      projectPageData: projectPageResponse || {},
    },
    revalidate: 10,
  };
}

export default function Projects({ pageData, siteSettingsData, projectPageData }) {
  console.log(siteSettingsData)
  return (
    <>
      <Meta {...get(pageData, "meta", {})} />
     {/* <div className="projectsPageTyping">
     <TypingTextAnimation data={data} />
     </div> */}
      <Header data={data}/>
      <main>
        {projectPageData && <ProjectSectionPP data={projectPageData} /> }
      </main>
      <Footer style={"#1d1d21"} data={siteSettingsData} />
    </>
  );
}

