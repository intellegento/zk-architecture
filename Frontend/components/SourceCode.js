import * as React from "react";
import parse from "html-react-parser";

const SourceCode = ({ code }) => {
  return <>{parse(code)}</>;
};

SourceCode.defaultProps = {
  code: "",
};

export default SourceCode;
