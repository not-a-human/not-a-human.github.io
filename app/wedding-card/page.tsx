"use client";

import styles from "./page.module.css";
import { Menu } from "./ui/menu/menu";
import { MainPage } from "./ui/main-page/mainPage";
import { Intro } from "./ui/intro/intro";
import { useState, useEffect } from "react";
import { Countdown } from "./ui/countdown/countdown";
import { Guestbook } from "./ui/guesbook/guestbook";
import { Footer } from "./ui/footer/footer";

export default function WeddingCardPage() {
  const [isClient, setIsClient] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show menu when scrolled past the MainPage (approximately 100vh)
      const scrollThreshold = window.innerHeight * 0.8; // 80% of viewport height
      const shouldShowMenu = window.scrollY > scrollThreshold;
      setShowMenu(shouldShowMenu);
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container} style={{ paddingBottom: "10rem" }}>
      {/* Animated Background Elements */}
      <div className={styles.backgroundAnimation}>
        {isClient && (
          <div className={styles.floatingParticles}>
            {/* Floating hearts */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`heart-${i}`}
                className={`${styles.particle} ${styles.heart}`}
                style={
                  {
                    "--delay": `${i * 2}s`,
                    "--duration": `${15 + i * 2}s`,
                    "--start-x": `${Math.random() * 100}%`,
                    "--end-x": `${Math.random() * 100}%`,
                  } as React.CSSProperties
                }
              >
                ♥
              </div>
            ))}
            {/* Floating sparkles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className={`${styles.particle} ${styles.sparkle}`}
                style={
                  {
                    "--delay": `${i * 1.5}s`,
                    "--duration": `${10 + i}s`,
                    "--start-x": `${Math.random() * 100}%`,
                    "--end-x": `${Math.random() * 100}%`,
                  } as React.CSSProperties
                }
              >
                ✨
              </div>
            ))}
          </div>
        )}

        {/* Gradient overlays */}
        <div className={styles.gradientOverlay1}></div>
        <div className={styles.gradientOverlay2}></div>

        {/* Subtle pattern */}
        <div className={styles.patternOverlay}></div>
      </div>

      <MainPage />
      <Intro />
      <Countdown targetDate="2025-11-09T09:00:00.000Z" />
      <Guestbook />
      <Footer />
      {showMenu && <Menu />}
    </div>
  );
}
