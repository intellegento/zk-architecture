import React, { useEffect, useRef } from "react";
import { getScrollTriggerById, gsap, ScrollTrigger } from "../../lib/gsap";
import { generateRandomId, getHeight, isDesktop } from "../../lib/utils";
import ScrollContext from "../../context/ScrollContext";
import SizeContext from "../../context/SizeContext";
import { TypeAnimation } from "react-type-animation";
import styles from "./styles.module.scss";
const data = {
  intro: {
    id: 1,
    text: "Architectural bureau",
    start: "100vh 120%",
    end: "100vh 105%",
    markers: false,
    startEnd: "100vh -230%",
    endEnd: "100vh -240%",
    markersEnd: true,
  },
}


  const animationMainTimelineSection = ({
    mainContainerRef,
    firstTextAnimationRef,
    secondTextAnimationRef,
    setTimeline,
  }) => {
    const scrollTriggerId = generateRandomId();
    const mainContainerHeight = getHeight(mainContainerRef);

    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        id: scrollTriggerId,
        trigger: mainContainerRef,
        pin: false,
        snap: true,
        scrub: .7,
        start: "18% top",
        end: `+=${mainContainerHeight}px`,
        pinSpacing: false,
      }
    });

    if (!ScrollTrigger.isScrolling()){
      // gsap.from(firstTextAnimationRef, { autoAlpha: 0, y: 50, duration: .9 });
    }
    mainTimeline.fromTo(firstTextAnimationRef, { opacity: 1, y: "0" }, { opacity: 0, y: "-100px", filter: "blur(10px)" }, "firstTextAnimation");
    mainTimeline.fromTo(secondTextAnimationRef, { opacity: 0, y: "100px" }, { opacity: 1, y: "-100px"}, "secondTextAnimation=-2");

    mainTimeline.fromTo(
      "#introSection",
      { color: "#f5f5f5", background: "#1D1D21", duration: 1 },
      { color: "#1D1D21",  background: "#f5f5f5", duration: 1},
      "firstTextAnimation=-0.01"
    );
    
    // mainTimeline.fromTo(
    //   "#typingBlock",
    //   {opacity: 1},
    //   {opacity: 0},
    //   "secondTextAnimation=-0.6"
    // )
    

    

    setTimeline(mainTimeline);

    return () => {
      const scrollTrigger = getScrollTriggerById(scrollTriggerId);
      scrollTrigger.kill();
      mainTimeline.revert().clear().kill();
    };
  };

const animationTimeline = ({ mainContainerRef, firstTextAnimationRef, secondTextAnimationRef }) => {
  const isDesktopView = isDesktop();
  const timeline = gsap.timeline({ defaults: { ease: "power3.easeInOut" } });

  const containerHeight = getHeight(mainContainerRef);
  const firstTextAnimationHeight = getHeight(firstTextAnimationRef);
  const secondTextAnimationHeight = getHeight(secondTextAnimationRef);

  return () => {
    timeline.revert().clear().kill();
    gsap.set(mainContainerRef, { clearProps: "all" });
  };
};

const IntroSectionDesktop = () => {
  const mainContainerRef = useRef(null);
  const firstTextAnimationRef = useRef(null);
  const secondTextAnimationRef = useRef(null);
  const videoAnimationRef = useRef(null);
  const { width, height} = React.useContext(SizeContext);
  const timelineRef = React.useRef();
  const [isAnimationRun, setAnimationRun] = React.useState(false);
  const { isMobileDevice, isScrollInit } = React.useContext(ScrollContext);
  const [isMainTimelineInitialized, setMainTimelineInitialized] = React.useState(false);

  React.useEffect(() => {
    const setTimelineToRef = (timeline) => {
      timelineRef.current = timeline;
    };
    if (isAnimationRun) {
      const cleanup = animationMainTimelineSection({
        mainContainerRef: mainContainerRef.current,
        firstTextAnimationRef: firstTextAnimationRef.current,
        secondTextAnimationRef: secondTextAnimationRef.current,
        videoAnimationRef: videoAnimationRef.current,
        setTimeline: setTimelineToRef,
      });

      setMainTimelineInitialized(true);

      return cleanup;
    }
  }, [isAnimationRun, height]);

  React.useEffect(() => {
    const isScrollInitialized = isMobileDevice || isScrollInit;

    if (isScrollInitialized && !isMainTimelineInitialized) {
      setAnimationRun(true);
    }
  }, [isMobileDevice, isMainTimelineInitialized]);


  return (
    <div className={styles.introSection} id="introSection" >
      <div className={styles.introSection__background} ref={mainContainerRef} />
      <div className={styles.introSection__wrap}>
        <div className={styles.introSection__animation} id="introStart">
          <div className={styles.introSection__container} ref={firstTextAnimationRef} id="firstRow">
            <h2>
              <span>Don&rsquo;t</span>
              <span>think of</span>
              <span>cost</span>
            </h2>
          </div>
          <div className={styles.introSection__container} ref={secondTextAnimationRef}>
            <h2>
              <span>Think</span>
              <span>of</span>
              <span>value</span>
            </h2>
          </div>
        </div>
        {/* <div className={styles.introSection__typingBlock} id="typingBlock">
          <TypeAnimation
            sequence={[
              "",
              2500,
              "Architectural bureau",
              // "Projects",
              6000,
            ]}
            omitDeletionAnimation={true}
            speed={50}
            cursor={false}
            repeat={Infinity}
          />
        </div> */}
      </div>
    </div>
  );
};

export default IntroSectionDesktop;
