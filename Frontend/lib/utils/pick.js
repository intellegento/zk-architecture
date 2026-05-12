import isEmpty from "./isEmpty";

function pick(object, keys) {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key) && !isEmpty(object[key])) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
}

export default pick;
