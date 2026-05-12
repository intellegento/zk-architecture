import { useState, useEffect } from "react";

const useIsMobile = (width = 767) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= width) {
      setIsMobile(true);
    }

    const handleResize = () => {
      if (window.innerWidth <= width) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
