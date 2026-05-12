import isPlainObject from "lodash/isPlainObject";
import isEmpty from "lodash/isEmpty";
import isFunction from "lodash/isFunction";

const join = (rules) => (value, data) => rules?.map((rule) => rule(value, data)).filter((error) => !!error)[0];

export const required = (value) => {
  if (!value) {
    return "Required field";
  }
};

export const isInvalidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(email);
};

export const validateEmail = (value) => {
  if (value && isInvalidEmail(value)) {
    return "Invalid e-mail address";
  }

  return required(value);
};

export const createValidator =
  (rules) =>
  (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      if (isPlainObject(rules[key])) {
        const nextedErrors = createValidator(rules[key], data[key]);
        if (!isEmpty(nextedErrors)) {
          errors[key] = nextedErrors;
        }
      } else if (isFunction(rules[key])) {
        const nextedErrors = rules[key](data[key]);
        if (!isEmpty(nextedErrors)) {
          errors[key] = nextedErrors;
        }
      } else {
        const rule = join([...rules[key]]);
        const error = rule(data[key], data);
        if (error) {
          errors[key] = error;
        }
      }
    });

    return errors;
  };
