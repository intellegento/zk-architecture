import React, { useEffect } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import get from "../lib/utils/get";
import Meta from "../components/Meta";
import Header from "../components/Header";
// import TypingTextAnimation from "../components/TypingTextAnimation";
import IntroVideo from "../components/IntroVideo";
import ScrollDown from "../components/ScrollDown";
import IntroSectionMob from "../components/IntroSectionMob";
import IntroSectionDesktop from "../components/IntroSectionDesktop";
import ServicesSection from "../components/ServicesSection";
import ProjectsSectionNew from "../components/ProjectsSectionNew";
import ProjectsSectionMobNew from "../components/ProjectSectionMobNew";
import Footer from "../components/Footer";
import Line from "../components/Line";
import api from "../lib/api";

const data = {
  projects: {
    id: 8,
    text: "Projects",
    start: "0% 20%",
    end: "0% 5%",
    markers: false,
    startEnd: "0% -10%",
    endEnd: "0% -20%",
    markersEnd: false,
  },

  services: {
    id: 6,
    text: "Services",
    start: "0% 20%",
    end: "0% 5%",
    markers: false,
    startEnd: "0% -10%",
    endEnd: "0% -20%",
    markersEnd: false,
  },
  // newsSlider: {
  //   id: 10,
  //   text: "News",
  //   start: "-200% -205%",
  //   end: "-200% -225%",
  //   markers: false,
  //   startEnd: "-200% -260%",
  //   endEnd: "-200% -270%",
  //   markersEnd: false,
  // },
};

export async function getStaticProps({ locale }) {
  const mainPageResponse = await api.get("/main-page", { qs: { lang: locale, limit: 1000 } });
  const projectsResponse = await api.get("/projects", { qs: { lang: locale } });
  const siteSettingsResponse = await api.get("/site-setting", { qs: { locale: locale } });

  return {
    props: {
      mainPageData: mainPageResponse || {},
      projectsData: projectsResponse || [],
      siteSettingsData: siteSettingsResponse || {},
    },
    revalidate: 10,
  };
}
export default function Home({ pageData, mainPageData, projectsData, siteSettingsData }) {
  useEffect(() => {
    const tl = gsap.timeline();

    //nav menu visible
    // tl.fromTo(
    //   ".headerMain",
    //   {
    //     css: {
    //       display: "none",
    //     },
    //   },
    //   {
    //     scrollTrigger: {
    //       trigger: "#introSectionBlock",
    //       scrub: true,
    //       end: "15% top",
    //     },
    //     css: {
    //       display: "flex",
    //     },
    //   }
    // );

    //scrolldown visible
    tl.fromTo(
      ".scrollDownAnimation",
      {
        css: {
          opacity: 1,
        },
      },
      {
        scrollTrigger: {
          // trigger: "#introSectionBlock",
          scrub: true,
          end: "15% top",
        },
        css: {
          opacity: 0,
        },
      }
    );

    tl.fromTo(
      "#videoBlock",
      {
        css: {
          opacity: 1,
        },
      },
      {
        scrollTrigger: {
          // trigger: ".snapSection",
          scrub: true,
          end: "15% top",
        },
        css: {
          opacity: 0,
        },
      }
    );

    //finish blure for intro section
    tl.fromTo(
      ".forBlure",
      {
        css: {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
        },
      },
      {
        scrollTrigger: {
          trigger: "#projects",
          scrub: true,
          end: "bottom 99.9%",
        },
        css: {
          filter: "blur(100px)",
          opacity: 0,
          y: "-20vh",
        },
      }
    );

    //color footer change
    tl.fromTo(
         ".changeBackgroundColor",
         {
           backgroundColor: gsap.getProperty("html", "--light"),
         },
         {
           scrollTrigger: {
             trigger: "#footer",
             scrub: true,
             start: "top center",
             end: "90% 110%",
           },
           backgroundColor: gsap.getProperty("html", "--dark"),
         }
       );
  });

  return (
    <>
      <Meta {...get(pageData, "meta", {})} />
      {/* <TypingTextAnimation data={data} /> */}
      <article className="snapSection forScrollDown">
        <div className="scrollDownAnimation">
          <ScrollDown />
        </div>
        <div className="videoHide">
        <IntroVideo data={mainPageData} />
        </div>
      </article>
      <div className="headerMain">
        <Header data={data} />
      </div>
      <main>
        <article className="snapSection" style={{ scrollSnapAlign: "start" }} id="introSectionBlock">
          <IntroSectionMob />
          <div className="forBlure">
            <IntroSectionDesktop />
          </div>
        </article>
        <Line />

        <article  className="snapSection">
          <ProjectsSectionNew data={mainPageData.projects} />
          <ProjectsSectionMobNew data={mainPageData.projects} />
        </article>
        <div className="changeBackgroundColor">
          <article className="snapSection">
            <ServicesSection data={mainPageData.services} />
          </article>
          <article className="snapSection">
            <Footer data={siteSettingsData} />
          </article>
        </div>
      </main>
    </>
  );
}