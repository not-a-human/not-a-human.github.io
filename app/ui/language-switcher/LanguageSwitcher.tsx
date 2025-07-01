"use client";

import { useLanguage } from "../../context/LanguageContext";

export default function LanguageSwitcher({ styles }: { styles: any }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.languageMenu}>
      <button onClick={() => setLanguage("en")} disabled={language === "en"}>
        English
        <div></div>
      </button>
      <button onClick={() => setLanguage("my")} disabled={language === "my"}>
        Malay
        <div></div>
      </button>
      <button onClick={() => setLanguage("cn")} disabled={language === "cn"}>
        Chinese
        <div></div>
      </button>
    </div>
  );
}
