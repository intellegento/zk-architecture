import * as React from "react";

const ScrollContext = React.createContext({
  isScrollInit: false,
  isMobileDevice: true,
  setIsSmoothScrollDisabled: true,
  scrolledSection: '',
  setScrolledSection: (scrolledSection) => {},
});

export default ScrollContext;
