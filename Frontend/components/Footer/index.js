import React from "react";
import useSectionVisibility from "../../hooks/useSectionVisibility";
import TaglineFooter from "../TaglineFooter";
import { TypeAnimation } from "react-type-animation";
import LanguageSwitcher from "../LanguageSwitcher";
import CursorHover from "../CursorHover";
import { parseHtml } from "../../lib/parser";
import styles from "./styles.module.scss";

const Footer = ({ style, data }) => {
  return (
    <section className={styles.footer} id="footer" style={{ background: `${style}` }}>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__title}>
          <p>{parseHtml(data.footerTitle)}</p>
        </div>

        <div className={styles.footer__contacts}>
          <div className={styles.footer__contacts__item}>
            <div className={styles.footer__contacts__title}>
              <p>{data.footerOfficeTitle}</p>
            </div>
            <CursorHover>
              <a href="#" target="_blank" rel="noreferrer">
              {data.footerOfficeAddress}<br/>
              {data.footerOfficeCity} 
              </a>
            </CursorHover>
          </div>
          <div className={styles.footer__contacts__item}>
            <div className={styles.footer__contacts__title}>
              <p>{data.footerContactTitle}</p>
            </div>
            <CursorHover>
              <a href={`mailto:${data.footerContactEmail}`} target="_blank" rel="noreferrer">
                {data.footerContactEmail}
              </a>
            </CursorHover>
          </div>
        </div>

        <div className={styles.footer__linkSocials}>
          <div className={styles.footer__socials}>
            {/* {data.footerSocialLinks?.map(item => (
              <CursorHover key={item.id}>
                <a href={item.url}>{item.platform}</a>
              </CursorHover>
            ))} */}
<LanguageSwitcher />
          </div>
          <div className={styles.footer__copyright}>
            <p>{data.footerCopyrightText}</p>
          </div>
        </div>
        <div className={styles.footer__trixcode}>
        <CursorHover >
          <a  href="https://trixcode.io/">made by //TR1Xcode</a>
        </CursorHover>
      </div>
      </div>
      
      
    </section>
  );
};

export default Footer;