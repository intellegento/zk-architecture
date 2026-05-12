import * as React from "react";
import classNames from "classnames";
import { gsap, debouncedRefreshScrollTrigger } from "../../../lib/gsap";
import { getHeight } from "../../../lib/utils";
import styles from "./styles.module.scss";
import { useWindowSize } from "../../ResizeContainer";
import useFirstRender from "../../../hooks/useFirstRenderHook";

const animatedHeight = (element, height, callback) => {
  gsap.to(element, {
    ease: "Power1.easeInOut",
    height,
    duration: 0.5,
    onComplete: callback,
  });
};

const instantlyHeight = (element, height, callback) => {
  gsap.set(element, {
    height,
    onComplete: callback,
  });
};

const setHeight = (element, height) => {
  gsap.set(element, { height });
};

const Collapse = ({ className, children, isOpen, height, isRefreshScrollTrigger }) => {
  const isInit = useFirstRender();
  const { width } = useWindowSize();
  const titleRef = React.useRef(null);
  const collapseRef = React.useRef(null);
  const [header, body] = React.Children.toArray(children);

  React.useEffect(() => {
    const minHeight = getHeight(titleRef.current);
    setHeight(collapseRef.current, minHeight);
  }, [width]);

  React.useEffect(() => {
    const minHeight = getHeight(titleRef.current);
    const refreshScrollTrigger = isRefreshScrollTrigger ? debouncedRefreshScrollTrigger : undefined;

    if (isInit) {
      if (isOpen) {
        animatedHeight(collapseRef.current, height, refreshScrollTrigger);
      } else {
        animatedHeight(collapseRef.current, minHeight, refreshScrollTrigger);
      }
    } else {
      if (isOpen) {
        instantlyHeight(collapseRef.current, height, refreshScrollTrigger);
      } else {
        instantlyHeight(collapseRef.current, minHeight, refreshScrollTrigger);
      }
    }
  }, [isInit, isOpen, isRefreshScrollTrigger]);

  const handleResize = () => {
    animatedHeight(collapseRef.current, height, debouncedRefreshScrollTrigger);
  };

  React.useEffect(() => {
    if (!width) return;
    // instantlyHeight();
  }, [width]);

  return (
    <li ref={collapseRef} className={classNames(styles.collapse, className)}>
      {React.cloneElement(header, { ref: titleRef })}
      {body}
    </li>
  );
};

Collapse.defaultProps = {
  height: "auto",
  isOpen: false,
  isRefreshScrollTrigger: false,
};

export default Collapse;
