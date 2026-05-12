import isArray from "./isArray";

const first = (arr) => {
  if (arr && isArray(arr)) return arr[0];
  return undefined;
};

export default first;
