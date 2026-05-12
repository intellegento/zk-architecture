import { ru } from "./ru/common";
import { en } from "./en/common";

export const getTranslation = (locale) => {
  return locale === "en" ? en : ru;
};
