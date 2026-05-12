import React, { Children, useEffect, useRef, useContext } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { isMobile } from "../../lib/utils";
import TypingTextContext from "../../context/TypingText";
import styles from "./styles.module.scss";

const textAnimationInit = (textElemRef, data) => {
  return Object.keys(data).map((key, index) => {
    const textValue = data[key].text;
    const timelineType = gsap.timeline({
      scrollTrigger: {
        id: data[key].id + data[key].text,
        trigger: "#" + key,
        start: data[key].start,
        end: data[key].end,
        scrub: true,
        markers: data[key].markers,
        onUpdate: () => {
          const progress = timelineType.progress();
          const textLength = Math.floor(progress * textValue.length);
          const newText = textValue.slice(0, textLength);
          if (textElemRef.current) {
            textElemRef.current.textContent = newText;
          }
        },
      },
    });

    timelineType.to(textElemRef?.current, {});

    const timelineDelete = gsap.timeline({
      scrollTrigger: {
        id: "delete" + data[key].id + data[key].text,
        trigger: "#" + key,
        start: data[key].startEnd,
        end: data[key].endEnd,
        scrub: true,
        markers: data[key].markersEnd,
        onUpdate: () => {
          const progress = timelineDelete.progress();
          const textLength = Math.floor((1 - progress) * textValue.length);
          const newText = textValue.slice(0, textLength);
          if (textElemRef.current) {
            textElemRef.current.textContent = newText;
          }
        },
      },
    });

    timelineDelete.to(textElemRef?.current, {});
  });
};

const TypingTextAnimation = ({ children, data ={} }) => {
  const textElemRef = useRef(null);
  const [isTypingTextReady, setTypingTextReady] = React.useState(true);

  useEffect(() => {
    if (isTypingTextReady) {
      textAnimationInit(textElemRef, data);
    }
  }, [isTypingTextReady]);

  const typingTextValue = React.useMemo(() => {
    return {
      isTypingTextReady: isTypingTextReady,
      setTypingTextReady: setTypingTextReady,
    };
  }, [isTypingTextReady]);

  return (
    <TypingTextContext.Provider value={typingTextValue}>
      <div className={styles.textAnimationWrapper} id="wrapper123">
        <div className={styles.textAnimationWrapper__pin} id="pin123">
          <span ref={textElemRef}></span>
        </div>
      </div>
      {children}
    </TypingTextContext.Provider>
  );
};

export default TypingTextAnimation;
