"use client";

import { useState, useEffect, ReactNode } from "react";
import { BsTranslate } from "react-icons/bs";
import styles from "./menu.module.css";
import { FaGithub, FaLinkedin, FaSteam } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";
import { useTranslations } from "../../utils/useTranslations";

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
        <MenuWithLink
          url={process.env.NEXT_PUBLIC_URL_GITHUB || "#"}
          icon={<FaGithub />}
        />
        <MenuWithLink
          url={process.env.NEXT_PUBLIC_URL_LINKEDIN || "#"}
          icon={<FaLinkedin />}
        />
        <MenuWithLink
          url={process.env.NEXT_PUBLIC_URL_STEAM || "#"}
          icon={<FaSteam />}
        />
        <MenuWithLink
          url={process.env.NEXT_PUBLIC_URL_EMAIL || "#"}
          icon={<IoMail />}
        />
      </div>
      <div className={styles.rightSection}>
        <MenuWithLink url="#about" text={t("menu.about")} />
        <MenuWithLink url="#project" text={t("menu.projects")} />
        <MenuWithLink url="#contact" text={t("menu.contact")} />
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

export function MenuWithLink({
  url,
  icon,
  text,
}: {
  url: string;
  icon?: ReactNode;
  text?: string;
}) {
  return (
    <div className={styles.menuItem}>
      <a href={url} target={icon ? "_blank" : "_self"}>
        {icon ? icon : null}
        {text ? text : null}
        <div></div>
      </a>
    </div>
  );
}
