import isArray from "./isArray";

const isEmpty = (value) => {
  if (isArray(value)) return value.length === 0;
  return !value || value === "" || value === "null" || Object.keys(value).length === 0;
};

export default isEmpty;
