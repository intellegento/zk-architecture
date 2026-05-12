import React from "react";

const CopyPropsToChildren = ({ children, ...props }) => {
  return React.Children.map(children, (child) => React.cloneElement(child, { ...props }));
};

export default CopyPropsToChildren;
