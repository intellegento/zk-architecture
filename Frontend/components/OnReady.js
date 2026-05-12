import * as React from "react";
import { debouncedRefreshScrollTrigger } from "../lib/gsap";

const OnReady = () => {
  const handleRouteAfterChange = () => {
    debouncedRefreshScrollTrigger(true);
  };

  React.useEffect(() => {
    document.fonts.ready.then(handleRouteAfterChange);
    document.addEventListener("DOMContentLoaded", handleRouteAfterChange);

    return () => {
      document.removeEventListener("DOMContentLoaded", handleRouteAfterChange);
    };
  }, []);

  return null;
};

export default OnReady;
