import * as React from "react";

const LottieAnimation = ({ className, animationPath, autoPlay, loop, isPlaying, setFadeOut }) => {
  const lottieRef = React.useRef();
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    let destroyed = false;

    async function loadLottie() {
      const bodymovin = (await import("lottie-web")).default;

      if (containerRef.current && !lottieRef.current && !destroyed) {
        lottieRef.current = bodymovin.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          path: `${animationPath.url ? animationPath.url : animationPath}`,
          loop: loop,
          autoplay: autoPlay,
          prerender: true,
          rendererSettings: {
            id: 'loader-lottie__wrapper',
          }
        });

        lottieRef.current.onComplete = () => {
          setFadeOut(true);
        };
      }
    }

    loadLottie();

    return () => {
      destroyed = true;
      if (lottieRef.current) {
        lottieRef.current.destroy();
        lottieRef.current = null;
      }
    };
  }, []);

  React.useEffect(() => {
    if (isPlaying && lottieRef.current) {
      lottieRef.current.goToAndPlay(0);
    } else if (lottieRef.current) {
      lottieRef.current.pause();
    }
  }, [isPlaying]);

  return <div ref={containerRef} className={className} />;
};

LottieAnimation.defaultProps = {
  animation: undefined,
  autoPlay: false,
  isPlaying: false,
  loop: false,
};

export default LottieAnimation;
