import React, { useEffect } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import get from "../lib/utils/get";
import Meta from "../components/Meta";
import Header from "../components/Header";
import BureauSection from "../components/BureauSection";
import Philosophy from "../components/Philosophy";
import TeamsSection from "../components/TeamsSection";
import AwardsSection from "../components/AwardsSection";
import Footer from "../components/Footer";
import TypingTextAnimation from "../components/TypingTextAnimation";
import AboutVideoSection from "../components/AboutVideoSection";
import api from "../lib/api";

export async function getStaticProps({ locale }) {
  const siteSettingsResponse = await api.get("/site-setting", { qs: { locale } });
  const bureauResponse = await api.get("/bureau", { qs: { locale, limit: 1000 } });

  return {
    props: {
      siteSettingsData: siteSettingsResponse || {},
      bureauData: bureauResponse || {},
    },
    revalidate: 10,
  };
}

export default function Bureau({ pageData, settings, siteSettingsData, bureauData }) {
  // const [currentSection, setCurrentSection] = useState("Bureau");

  const data = {
    bureau: {
      id: 1,
      text: bureauData.pageLabel || "",
      start: "0% 20%",
      end: "0% 5%",
      markers: false,
      startEnd: "0% -10%",
      endEnd: "0% -20%",
      markersEnd: false,
    },
  };

  useEffect(() => {
    const tl = gsap.timeline();
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
      <Header data={data} />
      {/* <TypingTextAnimation data={data} /> */}

      <BureauSection data={bureauData} />
      <Philosophy data={bureauData} />
      <AboutVideoSection data={bureauData} />
     
      {/* <AwardsSection /> */}
      {/* <div className="changeBackgroundColor"> */}
        <TeamsSection data={bureauData} />

        <Footer style={"#1d1d21"} data={siteSettingsData} />
      {/* </div> */}
    </>
  );
}