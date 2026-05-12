import * as React from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import NavLink from "../NavLink";
import uiEvents from "../../lib/uiEvents";
import { COOKIE_FALSE_VALUE, COOKIE_TRUE_VALUE } from "../CookieContainer";
import useFirstRender from "../../hooks/useFirstRenderHook";
import styles from "./styles.module.scss";
// import { getTranslation } from "../../locales";

const CookieMessage = ({ isShow, updateCookiePolicy, cookieData }) => {
  const { headline = "", description = "" } = cookieData;
  const containerRef = React.useRef();
  const isInitialized = useFirstRender();
  const router = useRouter();
  // const translation = React.useMemo(() => getTranslation(router.locale), [router.locale]);

  React.useEffect(() => {
    if (isShow) {
      uiEvents.emit("showOverlay");
    } else {
      uiEvents.emit("hideOverlay");
    }
  }, [isShow]);

  const acceptCookiePolicy = () => {
    updateCookiePolicy(COOKIE_TRUE_VALUE);
  };

  const declineCookiePolicy = () => {
    updateCookiePolicy(COOKIE_FALSE_VALUE);
  };

  return (
    <div
      ref={containerRef}
      className={classNames(styles.cookieInfo, {
        [styles.cookieInfo_opened]: isInitialized && isShow,
        [styles.cookieInfo_transition]: isInitialized,
      })}
    >
      <div className={styles.cookieInfo__container}>
        <div className={styles.cookieInfo__content}>
          <div className={styles.cookieInfo__content__headline}>
            <span>{translation.cookies_bunner}</span>
          </div>
          <div className={styles.cookieInfo__content__informationLink}>
            <NavLink url="/datenschutz" locale={router.locale}>#</NavLink>
          </div>
        </div>
        <div className={styles.cookieInfo__action}>
          <div className={styles.cookieInfo__action__button}>
            <button onClick={declineCookiePolicy}>{translation.back_button}</button>
          </div>
          <div className={classNames(styles.cookieInfo__action__button, styles.cookieInfo__action__button_active)}>
            <button onClick={acceptCookiePolicy}>{translation.accept_button}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

CookieMessage.defaultProps = {
  isShow: false,
  cookieData: {},
}

export default CookieMessage;
