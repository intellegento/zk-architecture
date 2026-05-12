import React, { useEffect, useState } from 'react';
import LottieAnimation from '../LottieAnimation';
// import Background from '../Background';
import styles from './styles.module.scss';

const Preloader = () => {
  const animationPath = '/animation/lotties/preloaderGeneral1.json';
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false);

  useEffect(() => {
    if (!animationPlayed) {
      setAnimationPlayed(true);

      const animationTimer = setTimeout(() => {
        setFadeOut(true); 
      }, 100);

      return () => clearTimeout(animationTimer);
    } else {
      setAnimateLogo(true);
    }
  }, [animationPlayed]);

  const handleAnimationEnd = () => {
    setAnimationPlayed(false);

    const projectSection = document.querySelector('#introStart'); 
    if (projectSection) {
      projectSection.classList.add(styles.addAnimation);
    }
  };

  return (
    <div
      className={`${styles.preloader} ${fadeOut ? styles.hidden : ''}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={styles.preloader__animation} animate={animateLogo}>
        <LottieAnimation animationPath={animationPath} loop={false} autoPlay={true} setFadeOut={setFadeOut} />
      </div>
    </div>
  );
};

export default Preloader;
