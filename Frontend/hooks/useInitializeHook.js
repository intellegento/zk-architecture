import React from "react";

function useInitialize() {
  const savedHandler = React.useRef(false);
  const isInit = savedHandler.current;
  const setInit = () => (savedHandler.current = true);
  return [isInit, setInit];
}

export default useInitialize;
