"use client";
import { useState, useEffect } from "react";
import { BsTranslate } from "react-icons/bs";
import styles from "./menu.module.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";
import { useTranslations } from "../../utils/useTranslations";

export const socials = {
  GitHub: "https://github.com/not-a-human",
  LinkedIn: "https://www.linkedin.com/in/avie-sinar/",
  Email: "mailto:avie.phuah@gmail.com",
};

export function Menu() {
  const t = useTranslations();

  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false);

  const handleClick = () => setShowLanguageSwitcher((prev) => !prev);

  // Close LanguageSwitcher when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const languageSwitcher = document.querySelector(
        `.${styles.languageMenu}`
      );
      const languageMenuButton = document.querySelector(`#languageButton`);
      if (
        languageSwitcher &&
        languageMenuButton &&
        !languageSwitcher.contains(event.target as Node) &&
        !languageMenuButton.contains(event.target as Node)
      ) {
        setShowLanguageSwitcher(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.menu}>
      <div className={styles.leftSection}>
        <div className={styles.menuItem}>
          <a href={socials.GitHub} target="_blank">
            <FaGithub />
            <div></div>
          </a>
        </div>
        <div className={styles.menuItem}>
          <a href={socials.LinkedIn} target="_blank">
            <FaLinkedin />
          </a>
          <div></div>
        </div>
        <div className={styles.menuItem}>
          <a href={socials.Email} target="_blank">
            <IoMail />
          </a>
          <div></div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.menuItem}>
          <a href="#about">{t("menu.about")}</a>
          <div></div>
        </div>
        <div className={styles.menuItem}>
          <a href="#project">{t("menu.projects")}</a>
          <div></div>
        </div>
        <div className={styles.menuItem}>
          <a href="#contact">{t("menu.contact")}</a>
          <div></div>
        </div>
        <div
          className={styles.menuItem}
          onClick={handleClick}
          id="languageButton"
        >
          <a>
            <BsTranslate />
          </a>
          <div className={showLanguageSwitcher ? styles.enabledDiv : ""}></div>
        </div>
      </div>
      {showLanguageSwitcher && <LanguageSwitcher styles={styles} />}
    </div>
  );
}
