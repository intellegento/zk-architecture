import React from "react";
import { gsap, scrollTo } from "../lib/gsap";
import { getElementById, isDesktop } from "../lib/utils";

export const onScrollToSection = (section) => {
  if (isDesktop()) {
    gsap.to(window, {
      ease: "power1.easeInOut",
      duration: 1.5,
      scrollTo: `#${section}`,
    });
  } else scrollTo(getElementById(section));
};

export const scrollToSection = (className, name) => {
  const section = document.querySelector(`.${className}[data-group="${name}"]`);
  if (section) {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: section,
    });
  }
};
