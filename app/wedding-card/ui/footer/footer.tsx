"use client";

import { FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <div className={styles.footerContainer}>
      {/* Decorative divider */}
      <div className={styles.divider}>
        <div className={styles.dividerLine}></div>
        <FaHeart className={styles.dividerIcon} />
        <div className={styles.dividerLine}></div>
      </div>

      {/* Main footer content */}
      <div className={styles.footerContent}>
        {/* Creator section */}
        <div className={styles.creatorSection}>
          <h4 className={styles.sectionTitle}>Made with Love</h4>
          <p className={styles.creatorName}>Avie Sinar</p>
          <p className={styles.creatorDescription}>
            With lots of sayang, crafted for our big day
          </p>
        </div>

        {/* Social links section */}
        <div className={styles.socialSection}>
          <h4 className={styles.sectionTitle}>Connect</h4>
          <div className={styles.socialLinks}>
            <a
              href="https://www.instagram.com/aviesinar/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <FaInstagram />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/in/avie-sinar/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Wedding info section */}
        <div className={styles.weddingSection}>
          <h4 className={styles.sectionTitle}>Our Day</h4>
          <p className={styles.weddingDate}>November 9, 2025</p>
          <p className={styles.weddingMessage}>
            Thanks sebab join our journey geng
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <p>© 2025 Avie & Ayuni. All rights reserved.</p>
        <p className={styles.loveMessage}>
          Forever and always <FaHeart className={styles.inlineHeart} />
        </p>
      </div>
    </div>
  );
}
