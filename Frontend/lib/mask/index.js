import rxmask from "./parser";

const phoneParser = new rxmask({
  mask: "***** / ** ** ** - *",
  placeholderSymbol: "*",
});

export const formatPhone = (value = '') => {
  phoneParser.options.value = value;
  phoneParser.parseMask();
  return phoneParser.output;
};
