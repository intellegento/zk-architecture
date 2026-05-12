import { useState, useEffect } from "react";

const useSectionVisibility = (sectionId) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        const sectionRect = sectionElement.getBoundingClientRect();
        const isVisible = sectionRect.top <= window.innerHeight * 0.5 && sectionRect.bottom >= 0;
        setIsVisible(isVisible);
        // console.log(isVisible, "visible123")
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionId]);

  return isVisible;
};

export default useSectionVisibility;
