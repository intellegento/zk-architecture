import React from "react";

function useDisableScroll(isDisable) {
  React.useEffect(() => {
    if (isDisable) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => document.body.style.overflow = originalStyle;
    }
  }, [isDisable]);
}

export default useDisableScroll