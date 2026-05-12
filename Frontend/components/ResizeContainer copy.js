import * as React from "react";
import SizeContext from "../context/SizeContext";
import useWindowResize from "../hooks/useWindowResize";
import useDebounce from "../hooks/useDebounce";

export const useWindowSize = () => React.useContext(SizeContext);

const ResizeContainer = ({ children }) => {
  const size = useWindowResize();
  const debouncedSize = useDebounce(size, 300);

  return <SizeContext.Provider value={debouncedSize}>{children}</SizeContext.Provider>;
};

export default ResizeContainer;
