export const zeroPad = (number, pad = 2) => {
  return String(number).padStart(pad, "0");
};

export function getNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const nope = () => false;

export const isBrowser = () => typeof window !== "undefined";

export const isViewPortZoomed = () => {
  return window.innerWidth >= 1440;
};

export const getWindowDimensions = () => {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }
  // Возврат значения по умолчанию при SSR
  return { width: 0, height: 0 };
};


export const getOptionsByViewPort = (options) => {
  const { width } = getWindowDimensions();
  const optionSize = Object.keys(options).reduce((acc, size) => {
    if (size <= width) acc = size;
    return acc;
  }, 0);
  return options[optionSize];
};

export const getViewPortDimensions = () => {
  const viewport = getElementById("page-viewport");
  const { offsetWidth: width, offsetHeight: height, clientWidth } = viewport;
  return { width, height, scrollbarWidth: width - clientWidth };
};

export const getClientDimensions = () => {
  const { clientWidth: width, clientHeight: height } = document.documentElement;
  return { width, height };
};

export const isMobile = () => {
  const { width } = getWindowDimensions();
  return width < 1000;
}

export const isDesktop = (mdWidth = 1000) => {
  const { width } = getWindowDimensions();
  return width >= mdWidth;
};

export const isTablet = () => {
  const { width, height } = getWindowDimensions();
  return height >= width;
};

export const isLargeDesktop = (lgWidth = 1200) => {
  const { width } = getViewPortDimensions();
  return width >= lgWidth;
};

export const isLottieAnimation = (value) => !value || value.mime === "application/json";

export const getElementPadding = (el) => {
  const style = window.getComputedStyle(el);
  return parseInt(style.paddingTop) + parseInt(style.paddingBottom);
};

export const getPositionFromViewport = (viewport, element) => {
  const scrollTop = viewport.scrollTop || 0;
  const scrollLeft = viewport.scrollLeft || 0;
  const clientTop = viewport.clientTop || 0;
  const clientLeft = viewport.clientLeft || 0;
  const rect = element.getBoundingClientRect();

  return {
    top: Math.round(rect.top + rect.height / 2 + scrollTop - clientTop),
    left: Math.round(rect.left + rect.width / 2 + scrollLeft - clientLeft),
    height: rect.height,
    width: rect.width,
  };
};

export const getLastElement = (points) => {
  return points[points.length - 1];
};

export const getFirstElement = (points) => {
  return points[0];
};

export const getCalculatedPosition = (element) => {
  const root = document.documentElement;
  const body = document.body;

  const rect = element.getBoundingClientRect();

  const scrollTop = window.pageYOffset || root.scrollTop || body.scrollTop || 0;
  const scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;

  const clientTop = root.clientTop || body.clientTop || 0;
  const clientLeft = root.clientLeft || body.clientLeft || 0;

  return {
    top: Math.round(rect.top + scrollTop - clientTop),
    left: Math.round(rect.left + scrollLeft - clientLeft),
    height: rect.height,
    width: rect.width,
  };
};

export const getHeight = (element) => (element ? element.offsetHeight : 0);

export const getWidth = (element) => (element ? element.offsetWidth : 0);

export const getSize = (element) => {
  if (element) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight,
    };
  }

  return {};
};

export const getImageSize = (element) => {
  if (element) {
    return {
      width: element.naturalWidth,
      height: element.naturalHeight,
    };
  }

  return {};
};

export const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    right: rect.right + window.scrollX,
    top: rect.top + window.scrollY,
    bottom: rect.bottom + window.scrollY,
    height: rect.height,
    width: rect.width,
  };
};

export const getElementsByClass = (className) => {
  return document.querySelectorAll(`.${className}`);
};

export const getElementByClass = (className) => {
  return document.querySelector(`.${className}`);
};

export const getElement = (selector) => {
  return document.querySelector(selector);
};

export const getElementById = (idName) => {
  return document.querySelector(`#${idName}`);
};

export const isElementExist = (element) => {
  return !!element;
};

export const removeClassName = (element, className) => {
  element.classList.remove(className);
};

export const addClassName = (element, className) => {
  element.classList.add(className);
};

export const toggleClassName = (element, className) => {
  element.classList.toggle(className);
};

export const isElementHasClassName = (element, className) => {
  return element.classList.contains(className);
};

export const getPreviousSibling = function (elem, className) {
  let sibling = elem.previousElementSibling;
  if (!className) return sibling;

  while (sibling) {
    if (sibling.matches(className)) return sibling;
    sibling = sibling.previousElementSibling;
  }
};

export const getNextSibling = function (elem, className) {
  let sibling = elem.nextElementSibling;
  if (!className) return sibling;

  while (sibling) {
    if (sibling.matches(className)) return sibling;
    sibling = sibling.nextElementSibling;
  }
};

export const blockingBodyScrolling = (isOpened) => {
  document.body.classList.toggle("no-scroll", isOpened);
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const isEvenIndex = (index) => !(index % 2);
export const isOddIndex = (index) => !!(index % 2);

export const splitValue = (value, divider) => {
  const string = String(value);
  const dividerIndex = string.indexOf(divider);
  if (dividerIndex === -1) return value;

  return [string.substring(0, dividerIndex + 1), string.substring(dividerIndex + 1)];
};

export const emitResize = () => {
  const event = new Event("resize");
  window.dispatchEvent(event);
};

export const loadImage = (url, callback) => {
  const img = new Image();
  img.src = url;
  img.onload = () => callback(img);
};

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

export const uniq = (array) => array.filter(onlyUnique);

export const generateRandomId = () => Math.random().toString(36).substring(2, 15);

export const isFirefox = () => {
  return navigator.userAgent.toLowerCase().includes("firefox");
};

export const calculatePosition = (containerEl) => {
  const containerWidth = getWidth(containerEl);
  const children = Array.from(containerEl.children);
  children.reduce(
    (acc, element) => {
      if (element.dataset.type === "tag") {
        const elWidth = getWidth(element);
        const nextTotalWidth = acc.totalWidth + elWidth;
        if (nextTotalWidth < containerWidth) {
          acc.totalWidth = nextTotalWidth;
        } else {
          acc.order = acc.order + 2;
          acc.totalWidth = elWidth;
        }
        element.style.order = acc.order;
      }
      if (element.dataset.type === "description") {
        element.style.order = acc.order + 1;
      }
      return acc;
    },
    { order: 1, totalWidth: 0 }
  );
};

export const isElementPined = (element) => {
  return element.style.position === "fixed";
};

export const getFirstTwoSymbol = (username) => String(username).substring(0, 2);
export const getFirstThreeSymbol = (name) => name?.split(" ").map((strPart) => strPart.trim().substring(0, 1));

export const onFontsReady = (callback) => {
  return document.fonts.ready.then(callback);
};

export const tryOrWait = (condition, callback, time = 25) => {
  if (condition()) {
    callback();
  } else {
    setTimeout(() => {
      tryOrWait(condition, callback, time);
    }, time);
  }
};

export const isExternalUrl = (string) => {
  const pattern = /^((http|https):\/\/)/;
  return pattern.test(string);
};

export const replaceObjInArray = (array, objToReplace, byField = "id") => {
  const elementIndex = array.findIndex((item) => item[byField] === objToReplace[byField]);
  if (elementIndex === -1) {
    return array;
  }
  return [].concat(array.slice(0, elementIndex), objToReplace, array.slice(elementIndex + 1));
};

export const replaceObjInArrayByIndex = (array, objToReplace, index) => {
  return [].concat(array.slice(0, index), objToReplace, array.slice(index + 1));
};

export function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const parseValue = (number, dig = 0) => {
  return Number(number).toFixed(dig);
};

export const divideArrayToTwoParts = (array) => {
  const middleIndex = Math.ceil(array.length / 2);
  return [array.slice(0, -middleIndex), array.slice(-middleIndex)];
}
