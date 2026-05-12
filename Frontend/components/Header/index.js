import React, { useState } from "react";
import MenuContent from "../MenuContent/MenuContent";
import { blockingBodyScrolling } from "../../lib/utils";
import NavLink from "../NavLink";
import { useRouter } from "next/router";
import { getTranslation } from "../../locales";
import Logo from "./Logo";
import CursorHover from "../CursorHover";
import styles from "./styles.module.scss";

const Header = ({ data, normal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const { locale } = useRouter();

const translation = React.useMemo(
  () => getTranslation(locale),
  [locale]
);

  React.useEffect(() => {
    if (!animationPlayed) {
      setAnimationPlayed(true);
    }
  }, [animationPlayed]);

  React.useEffect(() => {
    blockingBodyScrolling(isOpen);
  }, [isOpen]);

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className={styles.header} style={{ mixBlendMode: normal }}>
       <div className={styles.header__container}>
        <NavLink className={styles.header__logoLink} url="/">
            <CursorHover>
              <Logo />
            </CursorHover>
          </NavLink>
          <CursorHover>
            <div className={styles.header__burgerButton}>
              <button className={styles.header__burgerButton__wrapper} onClick={openMenu}>
                 <span>{isOpen ? translation.menuBtnCls : translation.menuBtn}</span>
                <div
                  className={`${styles.header__burgerButton__button} ${isOpen ? styles.header__burgerButton__buttonClose : ""}`}
                ></div>
              </button>
            </div>
            </CursorHover>
       </div>
      </header>
      <MenuContent isOpen={isOpen} closeMenu={closeMenu} />
    </>
  );
};

export default Header;