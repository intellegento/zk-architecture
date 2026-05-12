import React from "react";
import {getScrollTriggerById, gsap} from "../../lib/gsap";
import {TypeAnimation} from "react-type-animation";
import {generateRandomId, getHeight} from "../../lib/utils";
import SizeContext from "../../context/SizeContext";
import styles from "./styles.module.scss";

const data = {
  intro: {
    id: 1,
    text: "Architectural bureau",
    start: "100vh 120%",
    end: "100vh 105%",
    markers: false,
    startEnd: "100vh -110%",
    endEnd: "100 -120%",
    markersEnd: false,
  },
}

const initMainAnimation = ({container, changeColor, videoAnimation, typingText}) => {
  const scrollTriggerId = generateRandomId();
  const containerHeight = getHeight(container);

  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      id: scrollTriggerId,
      trigger: container,
      scrub: .5,
      // pin: true,
      // snap: true,
      start: "10% top",
      end: `+=${containerHeight}px`,
    },
  });

  mainTimeline.fromTo(
    ".first",
    {opacity: 1, y: "0"},
    {opacity: 0, y: "-20vh", duration: 0.3},
    "firstTextAnimation");

  mainTimeline.fromTo(
    ".second",
    {opacity: 0, y: "30vh", background: "#1D1D21"},
    {opacity: 1, y: "-12vh", background: "#f5f5f5"},
    "secondTextAnimation=-1"
  );

  mainTimeline.fromTo(
    changeColor,
    {background: "#1D1D21", color: "#f5f5f5"},
    {background: "#f5f5f5", color: "#1D1D21"},
    "secondTextAnimation=-0.6"
  );

  mainTimeline.fromTo(
    typingText,
    {opacity: 1, bottom: "60px"},
    {opacity: 0, bottom: "-5vh", display: "none"},
    "secondTextAnimation=-0.6"
  )

  return () => {
    const scrollTrigger = getScrollTriggerById(scrollTriggerId);
    scrollTrigger.kill();
    mainTimeline.revert().clear().kill();
  };
}

const IntroSectionMob = () => {
  const changeColorRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const videoAnimationMobRef = React.useRef(null);
  const typingTextRef = React.useRef(null);
  const {width} = React.useContext(SizeContext);

  React.useEffect(() => {
    return initMainAnimation({
      container: containerRef.current,
      changeColor: changeColorRef.current,
      videoAnimation: videoAnimationMobRef.current,
      typingText: typingTextRef.current
    })
  }, [width])

  return (
    <>
    
    <div className={styles.introSection} ref={changeColorRef} id="Architectural bureau">
      <div className={styles.introSection__wrapper} ref={containerRef}>
        <div className={styles.introSection__animation}>
          <div className={styles.introSection__containerWrapper}>
            <div className={styles.introSection__container}>
              <span className="first">
                <p>Don&rsquo;t</p>
                <p>think of</p>
                <p>cost</p>
              </span>
              <span className="second">
                <p>Think</p>
                <p>of</p>
                <p>value</p>
              </span>
            </div>
           
          </div>
        </div>
        {/* <div className={styles.introSection__typingBlock} ref={typingTextRef}>

        
          <TypeAnimation
          style={{ whiteSpace: 'pre-line'}}
            sequence={[
              "",
              2000,
              `Architectural bureau`,
              6000,
            ]}
            omitDeletionAnimation={true}
            speed={50}
            cursor={false}
            repeat={Infinity}
          />
        </div>  */}
      </div>
    </div>
    </>
  );
};

export default IntroSectionMob;