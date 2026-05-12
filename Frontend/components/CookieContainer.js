import * as React from "react";
import Cookies from "js-cookie";
import CookieMessage from "./CookieMessage";

const CookieContext = React.createContext("cookie");

export const useCookie = () => React.useContext(CookieContext);

export const COOKIE_TRUE_VALUE = "accepted";
export const COOKIE_FALSE_VALUE = "declined";

const getCookieStatus = () => {
  return Cookies.get("siteCookieHasConsent");
};

const setCookieStatus = (value) => {
  Cookies.set("siteCookieHasConsent", value, { expires: 365 });
};

const CookieContainer = ({ children }) => {
  const [isShowCookieMessage, setShowCookieMessage] = React.useState(false);
  const [isCookieAccepted, updateCookiePolicyState] = React.useState(COOKIE_FALSE_VALUE);

  const updateCookiePolicy = (nextValue) => {
    setCookieStatus(nextValue);
    updateCookiePolicyState(nextValue);
    setShowCookieMessage(false);
  };

  React.useEffect(() => {
    const isCookieAccepted = getCookieStatus();
    if (isCookieAccepted === COOKIE_TRUE_VALUE || isCookieAccepted === COOKIE_FALSE_VALUE) {
      updateCookiePolicyState(isCookieAccepted);
      setShowCookieMessage(false);
    } else {
      setShowCookieMessage(true);
    }
  }, []);

  const cookieContextValue = React.useMemo(() => {
    return {
      isCookieAccepted: isCookieAccepted === COOKIE_TRUE_VALUE,
      updateCookiePolicy,
      setShowCookieMessage,
    };
  }, [isCookieAccepted]);

  return (
    <>
      <CookieContext.Provider value={cookieContextValue}>
        {children}
      </CookieContext.Provider>
      {/*<CookieMessage isShow={isShowCookieMessage} updateCookiePolicy={updateCookiePolicy} />*/}
    </>
  );
};

export default CookieContainer;
