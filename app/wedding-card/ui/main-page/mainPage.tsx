"use client";

import styles from "./mainPage.module.css";
import { FaHeart } from "react-icons/fa";
import { GiFlowerPot } from "react-icons/gi";
import { MdOutlineLocationOn } from "react-icons/md";
import { useState, useEffect } from "react";

export function MainPage() {
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    let hintTimer: NodeJS.Timeout;
    let hasScrolled = false;

    // Show hint after 4 seconds if user hasn't scrolled
    const startHintTimer = () => {
      hintTimer = setTimeout(() => {
        if (!hasScrolled) {
          setShowScrollHint(true);
        }
      }, 4000);
    };

    // Check if user has scrolled
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // User scrolled more than 100px
        hasScrolled = true;
        setShowScrollHint(false);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Start the timer and add scroll listener
    startHintTimer();
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      if (hintTimer) {
        clearTimeout(hintTimer);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={styles.flexCenter}>
      <div className={styles.mainContainer}>
        {/* Decorative Elements */}
        <div className={styles.decorativeTop}>
          <div className={styles.ornament}>
            <GiFlowerPot className={styles.ornamentIcon} />
          </div>
        </div>

        {/* Event Type */}
        <div className={styles.eventType}>
          <span className={styles.eventLabel}>Hi-Tea</span>
          <div className={styles.dividerLine}></div>
        </div>

        {/* Couple Names */}
        <div className={styles.coupleNames}>
          <h1 className={styles.brideName}>Avie</h1>
          <div className={styles.ampersand}>
            <FaHeart className={styles.heartIcon} />
          </div>
          <h1 className={styles.groomName}>Ayuni</h1>
        </div>

        {/* Wedding Details */}
        <div className={styles.weddingDetails}>
          <div className={styles.dateContainer}>
            <h4 className={styles.dayLabel}>AHAD</h4>
            <div className={styles.dateMain}>
              <span className={styles.day}>9</span>
              <div className={styles.monthYear}>
                <span className={styles.month}>NOVEMBER</span>
                <span className={styles.year}>2025</span>
              </div>
            </div>
          </div>

          <div className={styles.locationContainer}>
            <div className={styles.locationIcon}>
              <MdOutlineLocationOn />
            </div>
            <div className={styles.locationText}>
              <h4 className={styles.locationMain}>Kampung Baru</h4>
              <h4 className={styles.locationSub}>Parit Tinggi, Kuala Pilah</h4>
            </div>
          </div>
        </div>

        {/* Decorative Bottom */}
        <div className={styles.decorativeBottom}>
          <div className={styles.ornament}>
            <GiFlowerPot className={styles.ornamentIcon} />
          </div>
        </div>

        {/* Floating Hearts Animation */}
        <div className={styles.floatingElements}>
          <div className={`${styles.floatingHeart} ${styles.heart1}`}>💕</div>
          <div className={`${styles.floatingHeart} ${styles.heart2}`}>💖</div>
          <div className={`${styles.floatingHeart} ${styles.heart3}`}>💝</div>
        </div>

        {/* Scroll Hint Animation */}
        {showScrollHint && (
          <div className={styles.scrollHint}>
            <div className={styles.scrollIcon}>
              <div className={styles.chevronDown}></div>
              <div className={styles.chevronDown}></div>
            </div>
            <div className={styles.scrollText}>Scroll to explore</div>
            <div className={styles.decorativeDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
