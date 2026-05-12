import React, { useEffect, useState } from "react";
import { parseHtml } from "../../../lib/parser";
import Slider from "../Slider";
import styles from "./styles.module.scss";


const ImageSlider = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const imagesToUse = Array.isArray(data)
  ? data?.map((item) => {
        const isDesktop = item?.type === "desktop" || item?.type === "all";
        const isMobileImage = item?.type === "mobile" || item?.type === "all";

        if (isMobile && isMobileImage) {
          return item?.media.url;
        } else if (!isMobile && isDesktop) {
          return item?.media?.url;
        }

        return null;
      })
      .filter(Boolean)
  : [];

  return (
   <>
   {data?.length > 1 && (
    <section className={styles.imageSlider}>
    <div className={styles.imageSlider__slider}>
      <Slider items={imagesToUse} />
    </div>
  </section>
   )}
   </>
  );
};

export default ImageSlider;
