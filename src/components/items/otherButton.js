import * as React from "react"
import * as styles from "./otherButton.module.css"

import { useTranslation } from "gatsby-plugin-react-i18next"
import { useState } from 'react';

const OtherButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const { t, i18n } = useTranslation();

  const statutesUrl =
  i18n.language === "en"
    ? "https://statutes.uiogaming.no"
    : "https://vedtekter.uiogaming.no"

  const links = [
    { url: statutesUrl, label: t("footer.statutes") },
    { url: "https://klage.uiogaming.no", label: t("footer.complaints") },
    { url: "https://github.com/UiO-Gaming/dokumenter", label: t("documents") }
  ]

  return (
    <div>
      <button onClick={toggleDropdown} className={styles.button}>
        {t("other")} <span className={isOpen ? styles.arrowUp : styles.arrowDown}></span>
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {links.map((link, index) => (
            <button
              key={index}
              onClick={() => window.open(link.url, '_blank')}
              className={styles.dropdownButton}
              style={{ marginTop: index === 0 ? '8px' : '4px' }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OtherButton;