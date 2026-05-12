function cleanNullToUndefined(obj) {
  if (obj === null) {
    return undefined;
  }
  if (typeof obj !== "object") {
    return obj;
  }
  if (obj instanceof Array) {
    return obj.map(cleanNullToUndefined);
  }

  return Object.keys(obj).reduce(
    (result, key) => ({
      ...result,
      [key]: cleanNullToUndefined(obj[key]),
    }),
    {}
  );
}

export default cleanNullToUndefined;
