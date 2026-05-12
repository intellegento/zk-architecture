import React, { useState } from "react";
import MenuContent from "../MenuContent/MenuContent";
import { blockingBodyScrolling } from "../../lib/utils";
import NavLink from "../NavLink";
import Logo from "./Logo";
import styles from "./styles.module.scss";
import TypingTextAnimation from "../TypingTextAnimationMobile";

const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);

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
      <header className={styles.header}>
        <NavLink url="/">
          <Logo />
        </NavLink>
        <TypingTextAnimation />
        <div className={styles.header__burgerButton}>
          <button className={styles.header__burgerButton__wrapper} onClick={openMenu}>
            <span>{isOpen ? "[Close]" : ""}</span>
            <div className={`${styles.header__burgerButton__button} ${isOpen ? styles.header__burgerButton__buttonClose : ""}`}></div>
          </button>
        </div>
      </header>
      <MenuContent isOpen={isOpen} closeMenu={closeMenu} />
    </>
  );
};

export default HeaderMobile;
