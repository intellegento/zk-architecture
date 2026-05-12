import React, { useEffect, useState, useMemo } from "react";
import { parseHtml } from "../../../lib/parser";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

const MOBILE_BREAKPOINT = 768;

const ConceptSection = ({ data }) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const router = useRouter();
  const isAnivaLighthouse = router.query.slug === "aniva-lighthouse";

  /** Подбираем одно нужное изображение */
  const chosenImage = useMemo(() => {
    if (!Array.isArray(data?.conceptImages)) return null;

    const preferred = isMobile ? "mobile" : "desktop";

    // 1. точное совпадение mobile|desktop
    let img = data.conceptImages.find(i => i.type === preferred);
    // 2. если нет — ищем универсальное 'all'
    if (!img) img = data.conceptImages.find(i => i.type === "all");

    return img?.media ?? null;
  }, [data?.conceptImages, isMobile]);

  if (!chosenImage) return null; // нет картинки — ничего не рисуем

  return (
    <section className={styles.concept}>
      <div className={styles.concept__wrap}>
        <div className={styles.concept__description}>
          <div className={styles.concept__description__title}>
            <h3>{data?.conceptTitle}</h3>
          </div>
          <div className={styles.concept__description__text}>
            {parseHtml(data?.conceptText)}
          </div>
        </div>

        <div
          className={`${styles.concept__image} ${
            isAnivaLighthouse && !isMobile ? styles.concept__image_aniva : ""
          }`}
        >
          <img
            src={chosenImage.url}
            alt={chosenImage.name || "Concept image"}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;



//old version

// import React, { useEffect, useState } from "react";
// import { parseHtml } from "../../../lib/parser";
// import Slider from "../Slider";
// import styles from "./styles.module.scss";
// import { useRouter } from "next/router";
// import { isDesktop } from "../../../lib/utils";

// const ConceptSection = ({ data }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const router = useRouter();
//   const { slug } = router.query;
//   const isAnivaLighthouse = slug === "aniva-lighthouse";
//   const sliderItems = data?.slider || [];

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 1024);
//     };

//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const imagesToUse = Array.isArray(data?.images)
//     ? data.images
//       .map((item) => {
//         const isDesktop = item?.type === "desktop" || item?.type === "all";
//         const isMobileImage = item?.type === "mobile" || item?.type === "all";

//         if (isMobile && isMobileImage) {
//           return item?.url;
//         } else if (!isMobile && isDesktop) {
//           return item?.url;
//         }

//         return null;
//       })
//       .filter(Boolean)
//     : [];

//   const getImageUrl = () => {
//     if (isMobile && data?.conceptImageMobile?.url) {
//       return {
//         url: data.conceptImageMobile.url,
//         name: data.conceptImageMobile.name
//       };
//     } else if (!isMobile && data?.conceptImageDesktop?.url) {
//       return {
//         url: data.conceptImageDesktop.url,
//         name: data.conceptImageDesktop.name
//       };
//     }
//     return {
//       url: data?.conceptImage?.url,
//       name: data?.conceptImage?.name
//     };
//   };

//   return (
//     <section className={styles.concept}>
//       <div className={styles.concept__wrap}>
//         <div className={styles.concept__description}>
//           <div className={styles.concept__description__title}>
//             <h3>{data?.conceptTitle}</h3>
//           </div>
//           <div className={styles.concept__description__text}>
//             {parseHtml(data?.conceptText)}
//           </div>
//         </div>
//         <div className={`${styles.concept__image} ${isAnivaLighthouse && isDesktop ? styles.concept__image_aniva : ''}`}>
//           <img src={getImageUrl().url} alt={getImageUrl().name || 'Concept image'} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ConceptSection;
