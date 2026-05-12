import isMobile from "ismobilejs";

const isMobileDevice = () => {
  return isMobile(window.navigator).any;
};

export default isMobileDevice;
