import React, { useEffect, useState, useRef } from "react";
import { gsap } from "../../lib/gsap";
import styles from "./styles.module.scss";

const LoaderContext = React.createContext({
  isOpen: true,
});

export const useSiteLoader = () => React.useContext(LoaderContext);

const SiteLoader = ({ children }) => {
  const [showWhiteFade, setShowWhiteFade] = useState(false);
  const [isLoaderOpened, setLoaderOpen] = useState(false);
  const textRef = useRef(null);
  const wrapperRef = useRef(null);
  const whiteFadeRef = useRef(null);
  const fullText = "Architectural bureau";

  useEffect(() => {
  if (isLoaderOpened) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }

  return () => {
    document.body.classList.remove('no-scroll');
  };
}, [isLoaderOpened]);


  // Проверка на первый визит или перезагрузку
  useEffect(() => {
    const isPageReload = performance.navigation.type === 1; // type === 1 -> Reload
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited || isPageReload) {
      sessionStorage.setItem("hasVisited", "true");
      setLoaderOpen(true);
    }
  }, []);
  

  // Анимация прелоадера
  useEffect(() => {
    if (!isLoaderOpened) return;

    let charIndex = 0;
    const interval = setInterval(() => {
      if (textRef.current && charIndex < fullText.length) {
        textRef.current.textContent += fullText[charIndex];
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          gsap.to(wrapperRef.current, {
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => {
              setShowWhiteFade(true);
              gsap.fromTo(
                whiteFadeRef.current,
                { opacity: 0 },
                {
                  opacity: 1,
                  duration: 0.5,
                  onComplete: () => {
                    gsap.to(whiteFadeRef.current, {
                      opacity: 0,
                      duration: 1,
                      delay: 0.2,
                      onComplete: () => {
                        setLoaderOpen(false);
                      },
                    });
                  },
                }
              );
            },
          });
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isLoaderOpened]);

  const loaderContext = React.useMemo(() => ({
    isOpen: isLoaderOpened,
  }), [isLoaderOpened]);

  return (
    <LoaderContext.Provider value={loaderContext}>
      {isLoaderOpened && (
        <div ref={wrapperRef} className={styles.preloader}>
          <div className={styles.preloader__typing}>
            <span ref={textRef}></span>
          </div>
        </div>
      )}
      {showWhiteFade && <div ref={whiteFadeRef} className={styles.whiteFade} />}
      <div className={`${styles.pageContent} ${!isLoaderOpened ? styles.fadeIn : ""}`}>
        {children}
      </div>
    </LoaderContext.Provider>
  );
};

export default SiteLoader;
