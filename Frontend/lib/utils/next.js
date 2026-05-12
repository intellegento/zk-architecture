import isArray from "./isArray";

const next = (arr, index) => {
  if (arr && isArray(arr)) {
    return arr[index + 1];
  }
  return undefined;
};

export default next;
