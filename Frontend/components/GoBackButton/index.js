import * as React from "react";
import {useRouter} from "next/router";

import NavLink from "../NavLink";
import Arrow from "../../public/icons/arrow.svg";
import CursorHover from "../CursorHover";
import {getTranslation} from "../../locales";
import styles from './styles.module.scss';
import classNames from "classnames";
import uiEvents from "../../lib/uiEvents";

function GoBackButton({className, next, nextSlug, ...props}) {
  const router = useRouter();
  // const translation = React.useMemo(() => getTranslation(router.locale), [router.locale]);

  const onGoBack = () => {
    uiEvents.emit("goBack")
  };
  return (
    <CursorHover label={!next ? ("back") : ("next")}>
      {!next ? (
          <button className={classNames(styles.goBackButton, className)} onClick={onGoBack} {...props}>
            <div className={styles.goBackButton__arrow}>
              <Arrow/>
            </div>
            <span>BACK</span>
          </button>) :
        (
          <NavLink url={nextSlug} locale={router.locale} className={classNames(styles.goNextButton, className)}>
            <div className={classNames(styles.goBackButton__arrow, {
              [styles.goBackButton__arrow_next]: next,
            })}>
              <Arrow/>
            </div>
            <span>NEXT</span>
          </NavLink>
        )
      }
    </CursorHover>
  );
}

export default GoBackButton;
