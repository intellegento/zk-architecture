import React from "react";
import classNames from "classnames";
import { isDesktop } from "../../lib/utils";
import styles from "./styles.module.scss";

const StickySection = ({ children, isDesktopOnly, isFirstSection }) => {
  const [isSticky, setSticky] = React.useState(true);

  React.useEffect(() => {
    if (isDesktopOnly && !isDesktop()) {
      setSticky(false);
    }
  }, []);

  return (
    <div
      className={classNames(styles.stickyContainer, {
        [styles.stickyContainer_sticky]: isSticky,
        [styles.stickyContainer_first]: isFirstSection,
      })}
    >
      {React.cloneElement(children, { className: styles.stickyContainer__sticky })}
    </div>
  );
};

StickySection.defaultProps = {
  options: {},
};

export default StickySection;