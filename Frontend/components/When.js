import * as React from "react";

const When = ({ condition, children }) => {
  return condition ? children : null;
};

export default When;
