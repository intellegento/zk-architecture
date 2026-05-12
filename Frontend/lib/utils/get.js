const get = (object, path, value) => {
  const pathArray = Array.isArray(path)
    ? path
    : path.split(".").filter((key) => key);

  const pathArrayFlat = pathArray.flatMap((part) =>
    typeof part === "string" ? part.split(".") : part
  );

  const checkValue = pathArrayFlat.reduce(
    (obj, key) => obj && obj[key],
    object
  );

  return checkValue === undefined || checkValue === null ? value : checkValue;
};

export default get;
