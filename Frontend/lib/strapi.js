import isEmpty from "../lib/utils/isEmpty";
import last from "../lib/utils/last";
import get from "../lib/utils/get";
import pick from "./utils/pick";

const apiUrl = process.env.NEXT_PUBLIC_HOST;

const privateAttr = ["created_at", "published_at", "updated_at"];

// Get the url of the Strapi API based om the env variable or the default local one.
export function getStrapiURL(path) {
  return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"}${path}`;
}

// This function will get the url of your medias depending on where they are hosted
export function getStrapiMedia(url) {
  if (url == null) {
    return null;
  }
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_HOST || "http://localhost:1337"}${url}`;
}

// handle the redirection to the homepage if the page we are browsinng doesn't exists
export function redirectToHomepage() {
  return {
    redirect: {
      destination: `/`,
      permanent: false,
    },
  };
}

// This function will build the url to fetch on the Strapi API
export function getData(slug, locale) {
  const slugToReturn = `/${slug}?lang=${locale}`;
  const apiUrl = `/pages?slug=${slug}&_locale=${locale}`;

  return {
    data: getStrapiURL(apiUrl),
    slug: slugToReturn,
  };
}

const getImageObject = (image) => {
  return {
    mime: image.mime || "",
    url: image.url || "",
    alt: image.alternativeText || "",
    width: image.width || "auto",
    height: image.height || "auto",
  };
};

export const safePickProps = (object, props, defaultValue = {}) => {
  if (!isEmpty(object)) {
    return pick(object, props);
  }

  return defaultValue;
};

const getSelectedFormat = (media, format) => {
  return get(media, `formats.${format}`);
};

const getImageBySize = (media, size) => {
  const image = getSelectedFormat(media, size);
  if (!isEmpty(image)) return getImageObject(image);
  return getImageObject(media);
};

const getImagesSet = (media) => {
  if (media.formats) {
    return Object.keys(media.formats).reduce((acc, key) => {
      if (key !== "thumbnail") acc[key] = getImageObject(media.formats[key]);
      return acc;
    }, {});
  }

  return {};
};

export const getStrapiMediaSet = (media) => {
  if (isEmpty(media)) return {};

  return {
    ...getImagesSet(media),
    original: getImageObject(media),
  };
};

export const getStrapiMediaBySize = (media, size) => {
  if (isEmpty(media) || !media.formats) return {};
  return getImageBySize(media, size);
};

const parseComponentName = (name) => {
  const nameParts = String(name).split(".");
  return last(nameParts).replace(/-/g, "_");
};

export const parseDynamicComponents = (pageData, dynamicKey) => {
  if (!pageData[dynamicKey]) {
    return pageData;
  }

  return {
    ...pageData,
    [dynamicKey]: pageData[dynamicKey].reduce((acc, section) => {
      const name = parseComponentName(section.__component);
      acc[name] = section;
      return acc;
    }, {}),
  };
};

export const removeCurrentFromArray = (array, current, byKey = "id") => {
  if (isEmpty(current)) return array;
  return array.filter((arrayItem) => arrayItem[byKey] !== current[byKey]);
};

const getOrderValue = (obj) => {
  if (!isEmpty(obj.order)) return obj.order;
  return 999;
};

export const sortByOrder = (array = []) => {
  return array.sort((a, b) => getOrderValue(a) - getOrderValue(b));
};

const buildAuthors = (authors) => {
  return authors?.map((author) => (!isEmpty(author) ? author.initials : ""));
};

export const buildSliderArticleData = (data) => {
  return data?.map((item) => ({
    id: item.id,
    image: item.cover,
    url: `/article/${item.slug}`,
    title: item.title,
    authors: buildAuthors(item.authors),
    initials: item.initials,
  }));
};

export const buildSliderMemberData = (data) => {
  return data?.map((item) => ({
    id: item.id,
    image: item.image,
    url: `/shoulders/${item.slug}`,
    fullname: item.fullname,
    position: item.position,
    initials: item.initials,
  }));
};

export const getStrapiData = (response) => {
  if (response && response.data) {
    return {
      id: response.data.id,
      ...response.data.attributes,
    };
  }

  return {};
};

export const getStrapiDataArray = (object) => {
  const { data = [] } = object;
  if (data.length) {
    return data?.map((item) => {
      return {
        id: item.id,
        ...item.attributes,
      };
    });
  }

  return [];
};

export const isVideoContent = (url) => {
  const format = last(url.trim().split("."));
  return format === "mp4";
};
