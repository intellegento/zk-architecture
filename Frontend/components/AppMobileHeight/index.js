import * as React from "react";
import { getHeight } from "../../lib/utils";
import useFirstRender from "../../hooks/useFirstRenderHook";
import { useWindowSize } from "../ResizeContainer";

const getHeaderHeight = () => {
  return getHeight(document.querySelector("header"));
}

function AppMobileHeight() {
  const isFirstRender = useFirstRender();
  const { width, height } = useWindowSize();

  const updateVars = (width, height) => {
    const headerHeight = getHeaderHeight()
    if (height > width) {
      document.documentElement.style.setProperty("--app-height", `${height}px`);
      document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
      document.documentElement.style.setProperty("--section-height", `${height - headerHeight}px`);
    } else {
      document.documentElement.style.setProperty("--app-height", "100vh");
      document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
      document.documentElement.style.setProperty("--section-height", `${height - headerHeight}px`);
    }
  }

  React.useEffect(() => {
    updateVars(window.innerWidth, window.innerHeight);
  }, []);

  React.useEffect(() => {
    if (!isFirstRender || width < 1000) return
    updateVars(width, height);
  }, [width, height]);

  return null;
}

export default AppMobileHeight;
