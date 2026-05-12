import React from "react";
import classNames from "classnames";
import NavLink from "../NavLink";
import { TypeAnimation } from "react-type-animation";
import LanguageSwitcher from "../LanguageSwitcher";
import { useRouter } from "next/router";
import { getTranslation } from "../../locales";
import styles from "./styles.module.scss";
import CursorHover from "../CursorHover";

const MenuContent = ({ isOpen, closeMenu }) => {
  const { locale } = useRouter();
  
  const translation = React.useMemo(
    () => getTranslation(locale),
    [locale]
  );
  const handleClick = () => {
    if (isOpen) {
      closeMenu();
    }
  };

  return (
    <div
      className={classNames(styles.menuContent, {
        [styles.menuContent__closing]: !isOpen,
      })}
    >
      <div className={styles.menuContent__container}>
        <div className={styles.menuContent__typeSection}>
          <LanguageSwitcher />
          {/* <TypeAnimation sequence={[translation.menu_mob_typing, 1000]} speed={500} cursor={false} repeat={false} /> */}
        </div>
       <CursorHover>
      <NavLink url="/bureau" onClick={handleClick}>
        {translation.bureau}
      </NavLink>
      </CursorHover>

      <CursorHover>
      <NavLink url="/projects" onClick={handleClick}>
        {translation.projects}
      </NavLink>
      </CursorHover>

      <CursorHover>
      <NavLink url="/#services" onClick={handleClick}>
        {translation.services}
      </NavLink>
      </CursorHover>
      {/* <NavLink url="/#newsSlider" onClick={handleClick}>
        news
      </NavLink> */}
      <CursorHover>
      <NavLink url="#footer"  onClick={handleClick}>
        {translation.contacts}
      </NavLink>
      </CursorHover>
      </div>
    </div>
  );
};

export default MenuContent;