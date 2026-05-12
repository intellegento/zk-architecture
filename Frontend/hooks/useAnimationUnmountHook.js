import React from "react";

function useAnimationUnmount() {
  const savedHandler = React.useRef(null);
  const setUnmount = (callback) => savedHandler.current = callback;

  React.useEffect(() => {
    return () => {
      if (savedHandler.current) {
        savedHandler.current();
      }
    }
  }, []);

  return setUnmount
}

export default useAnimationUnmount