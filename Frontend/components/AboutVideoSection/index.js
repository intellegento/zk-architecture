import React, { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";

const AboutVideoSection = ({ data }) => {
  const { videoDesktop, videoMobile } = data;
  const videoRef = useRef(null);

  const initialSrc = videoDesktop || videoMobile;
  const [videoSrc, setVideoSrc] = useState(initialSrc);

  useEffect(() => {
    const updateSrc = () => {
      if (window.innerWidth >= 1025) {
        setVideoSrc(videoDesktop || videoMobile);
      } else {
        setVideoSrc(videoMobile || videoDesktop);
      }
    };

    updateSrc();
    window.addEventListener("resize", updateSrc);
    return () => window.removeEventListener("resize", updateSrc);
  }, [videoDesktop, videoMobile]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.load();
    vid.play().catch(() => {});
  }, [videoSrc]);


  return (
    <section className={styles.aboutVideoSection} id="awards">
      <video
        ref={videoRef}
        loop
        muted
        preload="auto"
        playsInline
        autoPlay
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </section>
  );
};

export default AboutVideoSection;
