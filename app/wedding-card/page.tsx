"use client";

import styles from "./page.module.css";
import { Menu } from "./ui/menu/menu";
import { MainPage } from "./ui/main-page/mainPage";
import { Intro } from "./ui/intro/intro";
import { useState, useEffect, useRef } from "react";
import { Countdown } from "./ui/countdown/countdown";
import { Guestbook } from "./ui/guesbook/guestbook";
import { GuestbookForm } from "./ui/guesbook/guestbookForm";
import { Footer } from "./ui/footer/footer";
import { MusicPlayer } from "./ui/music-player/musicPlayer";
import { Modal } from "./ui/modal/modal";
import { Rsvp } from "./ui/rsvp/rsvp";
import { Location } from "./ui/location/location";
import { Calendar } from "./ui/calendar/calendar";
import { MoneyGift } from "./ui/money-gift/moneyGift";
import { Wishlist } from "./ui/wishlist/wishlist";
import { DatabaseRecord } from "../../lib/database";
import {
  useScrollAnimation,
  getAnimationClasses,
} from "./hooks/useScrollAnimation";

export default function WeddingCardPage() {
  const [isClient, setIsClient] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mouse position for floating hearts
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingHearts, setFloatingHearts] = useState<
    Array<{ id: number; x: number; y: number; delay: number; size: number }>
  >([]);

  // Modal state management
  const [guestbookModalOpen, setGuestbookModalOpen] = useState(false);
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);
  const [moneyGiftModalOpen, setMoneyGiftModalOpen] = useState(false);

  // Guestbook entries state (shared between guestbook component and form)
  const [guestbookEntries, setGuestbookEntries] = useState<DatabaseRecord[]>(
    []
  );

  // Scroll animation hooks for each section
  const mainPageAnimation = useScrollAnimation({ threshold: 0.2 });
  const introAnimation = useScrollAnimation({ threshold: 0.3 });
  const countdownAnimation = useScrollAnimation({ threshold: 0.3 });
  const guestbookAnimation = useScrollAnimation({ threshold: 0.3 });
  const footerAnimation = useScrollAnimation({ threshold: 0.3 });

  useEffect(() => {
    setIsClient(true);

    // Initialize dark mode from localStorage - default to dark mode
    const savedDarkMode = localStorage.getItem('wedding-dark-mode');
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    } else {
      // Default to dark mode
      setIsDarkMode(true);
    }

    // Prevent browser scroll restoration and scroll to top
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Scroll to top when page loads/reloads
    window.scrollTo({ top: 0, behavior: "instant" });

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
    document.body.style.overflow = "hidden";

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
    if (typeof window !== "undefined") {
      // Use setTimeout to ensure it runs after any other scroll effects
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 0);

      // Also listen for the window load event as additional safeguard
      const handleLoad = () => {
        window.scrollTo({ top: 0, behavior: "instant" });
      };

      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, []);

  // Dark mode effect
  useEffect(() => {
    if (!isClient) return;

    // Apply dark mode class to body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Save to localStorage
    localStorage.setItem('wedding-dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode, isClient]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollTop = contentRef.current.scrollTop;
      setScrollY(scrollTop); // Update scroll position for parallax

      // Show menu when scrolled past the MainPage (approximately 100vh)
      const scrollThreshold = window.innerHeight * 0.8; // 80% of viewport height
      const shouldShowMenu = scrollTop > scrollThreshold;
      setShowMenu(shouldShowMenu);

      // Track if user has scrolled for scroll hint
      if (scrollTop > 100 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      // Add throttled scroll listener for better performance
      contentElement.addEventListener("scroll", throttledScroll);

      // Check initial scroll position
      handleScroll();

      // Cleanup
      return () => {
        contentElement.removeEventListener("scroll", throttledScroll);
      };
    }
  }, [isClient, hasScrolled]);

  // Mouse movement tracking for floating hearts
  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      // Initialize floating hearts when mouse enters
      const hearts = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: i * 0.2,
        size: 0.8 + Math.random() * 0.6,
      }));
      setFloatingHearts(hearts);
    };

    const handleMouseLeave = () => {
      // Clear floating hearts when mouse leaves
      setFloatingHearts([]);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initialize hearts on mount
    handleMouseEnter();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isClient]);

  // Update floating hearts positions with smooth animation
  useEffect(() => {
    if (!isClient || floatingHearts.length === 0) return;

    const updateHearts = () => {
      setFloatingHearts((prevHearts) =>
        prevHearts.map((heart) => {
          const targetX =
            mousePosition.x + Math.sin(Date.now() * 0.001 + heart.delay) * 100;
          const targetY =
            mousePosition.y + Math.cos(Date.now() * 0.001 + heart.delay) * 80;

          // Smooth interpolation towards target position
          const lerpFactor = 0.02;
          return {
            ...heart,
            x: heart.x + (targetX - heart.x) * lerpFactor,
            y: heart.y + (targetY - heart.y) * lerpFactor,
          };
        })
      );
    };

    const animationFrame = setInterval(updateHearts, 16); // ~60fps
    return () => clearInterval(animationFrame);
  }, [isClient, mousePosition, floatingHearts.length]);

  return (
    <div className={styles.container}>
      {/* Enhanced Shimmer Overlay for more visibility */}
      {isClient && <div className={styles.shimmerOverlay}></div>}

      {/* Interactive Floating Hearts */}
      {isClient &&
        floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className={styles.floatingHeart}
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              transform: `scale(${heart.size})`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            💖
          </div>
        ))}

      {/* Animated Background Elements with Parallax */}
      <div className={styles.backgroundAnimation}>
        {/* Additional Parallax Layers */}
        {isClient && (
          <>
            {/* Far background layer - slowest movement */}
            <div
              className={styles.parallaxLayer}
              style={{
                transform: `translateY(${scrollY * 0.05}px) scale(${
                  1 + scrollY * 0.00005
                })`,
                background: `radial-gradient(circle at ${
                  20 + scrollY * 0.01
                }% ${
                  30 + scrollY * 0.01
                }%, rgba(240, 201, 123, 0.02) 0%, transparent 50%)`,
              }}
            ></div>

            {/* Mid background layer */}
            <div
              className={styles.parallaxLayer}
              style={{
                transform: `translateY(${scrollY * 0.08}px) rotate(${
                  scrollY * 0.01
                }deg)`,
                background: `conic-gradient(from ${
                  scrollY * 0.1
                }deg at 70% 70%, transparent 0deg, rgba(190, 130, 43, 0.015) 90deg, transparent 180deg)`,
              }}
            ></div>
          </>
        )}

        {isClient && (
          <div className={styles.floatingParticles}>
            {/* Reduced floating hearts from 8 to 4 with parallax */}
            {[...Array(4)].map((_, i) => (
              <div
                key={`heart-${i}`}
                className={`${styles.particle} ${styles.heart}`}
                style={
                  {
                    "--delay": `${i * 3}s`,
                    "--duration": `${20 + i * 3}s`,
                    "--start-x": `${25 + i * 25}%`,
                    "--end-x": `${30 + i * 25}%`,
                    transform: `translateY(${scrollY * (0.1 + i * 0.05)}px)`,
                  } as React.CSSProperties
                }
              >
                ♥
              </div>
            ))}
            {/* Reduced floating sparkles from 12 to 6 with parallax */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className={`${styles.particle} ${styles.sparkle}`}
                style={
                  {
                    "--delay": `${i * 2}s`,
                    "--duration": `${15 + i * 2}s`,
                    "--start-x": `${20 + i * 15}%`,
                    "--end-x": `${25 + i * 15}%`,
                    transform: `translateY(${scrollY * (0.15 + i * 0.03)}px)`,
                  } as React.CSSProperties
                }
              >
                ✨
              </div>
            ))}
          </div>
        )}

        {/* Gradient overlays with parallax */}
        <div
          className={styles.gradientOverlay1}
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        ></div>
        <div
          className={styles.gradientOverlay2}
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        ></div>

        {/* Subtle pattern with parallax */}
        <div
          className={styles.patternOverlay}
          style={{
            transform: `translateY(${scrollY * 0.1}px) scale(${
              1 + scrollY * 0.0001
            })`,
          }}
        ></div>
      </div>

      <div ref={contentRef} className={styles.content}>
        {/* Main sections with scroll animations */}
        <div
          ref={mainPageAnimation.ref}
          className={getAnimationClasses(mainPageAnimation.isVisible, "fadeIn")}
        >
          <MainPage hasScrolled={hasScrolled} />
        </div>

        {/* Wrapper div with position relative for sticky music player */}
        <div style={{ position: "relative" }}>
          <MusicPlayer isVisible={showMenu} />

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
            <Guestbook
              onOpenModal={() => setGuestbookModalOpen(true)}
              entries={guestbookEntries}
              onEntriesUpdate={setGuestbookEntries}
            />
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
        </div>
      </div>

      {showMenu && (
        <Menu
          onOpenRsvp={() => setRsvpModalOpen(true)}
          onOpenMoneyGift={() => setMoneyGiftModalOpen(true)}
          onOpenWishlist={() => setWishlistModalOpen(true)}
          onOpenLocation={() => setLocationModalOpen(true)}
          onOpenCalendar={() => setCalendarModalOpen(true)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}

      {/* Centralized Modal Management */}
      {guestbookModalOpen && (
        <Modal
          isOpen={guestbookModalOpen}
          onClose={() => setGuestbookModalOpen(false)}
          title="Tinggalkan Ucapan"
          maxWidth="400px"
        >
          <GuestbookForm
            onSuccess={() => setGuestbookModalOpen(false)}
            onCancel={() => setGuestbookModalOpen(false)}
            onEntriesUpdate={setGuestbookEntries}
          />
        </Modal>
      )}

      {rsvpModalOpen && (
        <Rsvp isOpen={rsvpModalOpen} onClose={() => setRsvpModalOpen(false)} />
      )}

      {locationModalOpen && (
        <Location
          isOpen={locationModalOpen}
          onClose={() => setLocationModalOpen(false)}
        />
      )}

      {calendarModalOpen && (
        <Calendar
          isOpen={calendarModalOpen}
          onClose={() => setCalendarModalOpen(false)}
        />
      )}

      {wishlistModalOpen && (
        <Wishlist
          isOpen={wishlistModalOpen}
          onClose={() => setWishlistModalOpen(false)}
        />
      )}

      {moneyGiftModalOpen && (
        <MoneyGift
          isOpen={moneyGiftModalOpen}
          onClose={() => setMoneyGiftModalOpen(false)}
        />
      )}
    </div>
  );
}
