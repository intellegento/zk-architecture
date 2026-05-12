export const buildOgImageUrl = (imageObj, url) => {
  return imageObj ? url + imageObj.url : "";
};

export const getMetaData = (metaArray) => {
  const meta = metaArray.filter((item) => item.__component === "pages.meta")[0];
  if (meta) return meta;
  return {
    title: "",
    description: "",
  };
};

export const getOpenGraphData = (metaArray, configs) => {
  const og = metaArray.filter((item) => item.__component === "pages.open-graph")[0] || {};

  return {
    ogTitle: og.og_title || "",
    ogDescription: og.og_description || "",
    ogImage: buildOgImageUrl(og.og_image, configs.url),
  };
};
