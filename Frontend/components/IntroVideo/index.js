import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from "./styles.module.scss";

const IntroVideo = ({ data }) => {
  const { videoDesktop, videoMobile, videoUniversal } = data;
  const [videoSrc, setVideoSrc] = useState(videoUniversal);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    const updateSrc = () => {
      if (window.innerWidth >= 1025) {
        setVideoSrc(videoDesktop || videoUniversal);
      } else {
        setVideoSrc(videoMobile || videoUniversal);
      }
    };

    updateSrc();
    window.addEventListener('resize', updateSrc);
    return () => window.removeEventListener('resize', updateSrc);
  }, [videoDesktop, videoMobile, videoUniversal]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc]);

  const playVideo = () => {
    if (inView) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const [introAnimationComplete, setIntroAnimationComplete] = useState(false);

  useEffect(() => {
    if (introAnimationComplete) {
      playVideo();
    }
  }, [introAnimationComplete]);

  return (
    <div ref={ref} className={styles.videoContainer} >
      <video
        id="videoBlock"
        ref={videoRef}
        loop
        muted
        preload="auto"
        onCanPlay={playVideo}
        onEnded={playVideo}
        playsInline
        autoPlay
        // style={{ opacity: 0.99 }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video> 
      
    </div>
  );
};

export default IntroVideo;