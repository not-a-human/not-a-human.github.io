"use client";

import styles from "./page.module.css";
import { Menu } from "./ui/menu/menu";
import { MainPage } from "./ui/main-page/mainPage";
import { Intro } from "./ui/intro/intro";
import { useState, useEffect } from "react";
import { Countdown } from "./ui/countdown/countdown";
import { Guestbook } from "./ui/guesbook/guestbook";
import { Footer } from "./ui/footer/footer";
import {
  useScrollAnimation,
  getAnimationClasses,
} from "./hooks/useScrollAnimation";

export default function WeddingCardPage() {
  const [isClient, setIsClient] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Scroll animation hooks for each section
  const mainPageAnimation = useScrollAnimation({ threshold: 0.2 });
  const introAnimation = useScrollAnimation({ threshold: 0.3 });
  const countdownAnimation = useScrollAnimation({ threshold: 0.3 });
  const guestbookAnimation = useScrollAnimation({ threshold: 0.3 });
  const footerAnimation = useScrollAnimation({ threshold: 0.3 });

  useEffect(() => {
    setIsClient(true);

    // Prevent browser scroll restoration and scroll to top
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Scroll to top when page loads/reloads
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Apply wedding-specific body and html styles
    const originalBodyStyle = {
      margin: document.body.style.margin,
      padding: document.body.style.padding,
      backgroundColor: document.body.style.backgroundColor,
      height: document.body.style.height,
    };

    const originalHtmlStyle = {
      scrollBehavior: document.documentElement.style.scrollBehavior,
      scrollbarColor: document.documentElement.style.scrollbarColor,
      scrollbarTrackColor: (document.documentElement.style as any)
        .scrollbarTrackColor,
      height: document.documentElement.style.height,
    };

    // Apply wedding styles
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "0";
    document.body.style.height = "100vh";

    document.documentElement.style.scrollBehavior = "smooth";
    document.documentElement.style.scrollbarColor =
      "var(--primary-color) var(--background-color)";
    (document.documentElement.style as any).scrollbarTrackColor = "0";
    document.documentElement.style.height = "100vh";

    // Cleanup function to restore original styles
    return () => {
      document.body.style.margin = originalBodyStyle.margin;
      document.body.style.padding = originalBodyStyle.padding;
      document.body.style.backgroundColor = originalBodyStyle.backgroundColor;
      document.body.style.height = originalBodyStyle.height;

      document.documentElement.style.scrollBehavior =
        originalHtmlStyle.scrollBehavior;
      document.documentElement.style.scrollbarColor =
        originalHtmlStyle.scrollbarColor;
      (document.documentElement.style as any).scrollbarTrackColor =
        originalHtmlStyle.scrollbarTrackColor;
      document.documentElement.style.height = originalHtmlStyle.height;
    };
  }, []);

  // Ensure scroll to top on page load/reload
  useEffect(() => {
    // Force scroll to top on mount
    if (typeof window !== 'undefined') {
      // Use setTimeout to ensure it runs after any other scroll effects
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 0);

      // Also listen for the window load event as additional safeguard
      const handleLoad = () => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      };

      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
      }
    }
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

      {/* Main sections with scroll animations */}
      <div
        ref={mainPageAnimation.ref}
        className={getAnimationClasses(mainPageAnimation.isVisible, "fadeIn")}
      >
        <MainPage />
      </div>

      <div
        ref={introAnimation.ref}
        className={getAnimationClasses(
          introAnimation.isVisible,
          "fadeInUp",
          200
        )}
      >
        <Intro />
      </div>

      <div
        ref={countdownAnimation.ref}
        className={getAnimationClasses(
          countdownAnimation.isVisible,
          "scaleUp",
          300
        )}
      >
        <Countdown targetDate="2025-11-09T09:00:00.000Z" />
      </div>

      <div
        ref={guestbookAnimation.ref}
        className={getAnimationClasses(
          guestbookAnimation.isVisible,
          "fadeInUp",
          400
        )}
      >
        <Guestbook />
      </div>

      <div
        ref={footerAnimation.ref}
        className={getAnimationClasses(
          footerAnimation.isVisible,
          "fadeIn",
          500
        )}
      >
        <Footer />
      </div>

      {showMenu && <Menu />}
    </div>
  );
}
