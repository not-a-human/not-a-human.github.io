"use client";

import { useState, useEffect } from "react";
import styles from "./textbox.module.css"; // Ensure you have styles for typewriter effect
import { VT323 } from "next/font/google";

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export function Textbox() {
  const text =
    "Hello! I am Avie. I am a software engineer. Please scroll down to learn more about me.";
  const typingSpeed = 150; // Typing speed in milliseconds
  const cursorBlinkSpeed = 500; // Cursor blink speed in milliseconds

  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true); // Toggle cursor visibility

  // Typing effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(currentIndex));
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, text]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className={`${styles.padding} ${vt323.className}`}>
      <p className={`${styles.typewriter}`}>
        {displayedText}
        {showCursor && <span className={styles.cursor}>_</span>}
      </p>
      <div className={styles.overlay}></div>
    </div>
  );
}
