import React from "react";
import { useRouter } from "next/router";
import CursorHover from "../CursorHover";
import classNames from "classnames";
import styles from "./styles.module.scss";

const HoverWrapper = ({ enabled, children }) => {
  if (!enabled) return children;
  return <CursorHover>{children}</CursorHover>;
};

const LanguageSwitcher = ({ className }) => {
  const router = useRouter();
  const { locale, asPath } = router;

  const changeLocale = React.useCallback(
    (newLocale) => {
      if (newLocale === locale) return;

      router.push(asPath, asPath, {
        locale: newLocale,
        scroll: false,
      });
    },
    [router, locale, asPath]
  );

  return (
    <div className={classNames(styles.switcher, className)}>
      <HoverWrapper enabled={locale !== "ru"}>
        <button
          type="button"
          onClick={() => changeLocale("ru")}
          className={classNames(styles.switcher__item, {
            [styles.switcher__active]: locale === "ru",
          })}
        >
          RU
        </button>
      </HoverWrapper>

      <span className={styles.switcher__separator}>/</span>

      <HoverWrapper enabled={locale !== "en"}>
        <button
          type="button"
          onClick={() => changeLocale("en")}
          className={classNames(styles.switcher__item, {
            [styles.switcher__active]: locale === "en",
          })}
        >
          ENG
        </button>
      </HoverWrapper>
    </div>
  );
};

export default LanguageSwitcher;