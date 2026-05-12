import { gsap } from "../gsap";

const animatedHeight = (element, height, callback) => {
  gsap.to(element, {
    ease: "Power1.easeInOut",
    height,
    duration: 0.5,
    onComplete: callback,
  });
};

export default animatedHeight;
