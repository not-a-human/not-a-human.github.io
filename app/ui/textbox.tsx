"use client";
import { useState, useEffect } from "react";
import styles from "./textbox.module.css";

export function Textbox() {
  const text = "Hi! My name is Avie. I am a software engineer.";
  const typingSpeed = 100; // Adjust typing speed (milliseconds)

  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(displayedText + text.charAt(currentIndex));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);

      // Cleanup timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, displayedText, text]);

  return <p className={styles.typewriter}>{displayedText}</p>;
}
