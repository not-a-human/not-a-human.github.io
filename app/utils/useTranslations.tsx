"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// Utility function to resolve keys using dot notation
const resolveKey = (obj: Record<string, any>, path: string): any => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj);
};

export const useTranslations = () => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const res = await import(`../../locales/${language}/common.json`);
        setTranslations(res);
      } catch (error) {
        console.error("Error loading translations:", error);
        setTranslations({}); // Fallback to an empty object
      }
    };
    loadTranslations();
  }, [language]);

  // Return a function to access translations using dot notation
  return (key: string): string => resolveKey(translations, key) || key;
};
