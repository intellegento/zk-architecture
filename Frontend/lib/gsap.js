import { gsap, Power3 } from "gsap/dist/gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitText from "./gsap/SplitText";
import { TextPlugin } from "gsap/dist/TextPlugin";
import isBrowser from "./utils/isBrowser";
import debounce from "./utils/debounced";

if (isBrowser()) {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, TextPlugin, SplitText);
}

// To prevent ScrollTrigger.refresh() from running (and recalculating start/end positions) when a mobile browser shows/hides its address bar,
ScrollTrigger.config({ ignoreMobileResize: true });

const setScrollTriggerScroller = (element) => {
  ScrollTrigger.defaults({
    scroller: element,
  });
};

const getScrollTriggerById = (scrollTriggerId) => {
  return ScrollTrigger.getById(scrollTriggerId);
};

const refreshScrollTrigger = (props) => {
  ScrollTrigger.refresh(props);
};

const debouncedRefreshScrollTrigger = debounce(refreshScrollTrigger, 300)

const updateScrollTrigger = (props) => {
  ScrollTrigger.update(props);
};
const setScrollTriggerProxy = (viewport, bodyScrollBar) => {
  ScrollTrigger.scrollerProxy(viewport, {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value;
      }
      return bodyScrollBar.scrollTop;
    },
  });

  scroll = bodyScrollBar;
};
export {
  gsap,
  ScrollTrigger,
  SplitText,
  Power3,
  refreshScrollTrigger,
  debouncedRefreshScrollTrigger,
  updateScrollTrigger,
  setScrollTriggerScroller,
  getScrollTriggerById,
  setScrollTriggerProxy,
};
