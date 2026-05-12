import last from "./utils/last";

export const isVideoContent = (url) => {
  const format = last(url.trim().split("."));
  return format === "mp4";
};
