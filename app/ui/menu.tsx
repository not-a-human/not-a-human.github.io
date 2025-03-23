import styles from "./menu.module.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export function Menu() {
  return (
    <div className={styles.menu}>
      <div className={styles.leftSection}>
        <div className={styles.menuItem}><a href="https://github.com/not-a-human" target="_blank"><FaGithub /></a></div>
        <div className={styles.menuItem}><a href="https://www.linkedin.com/in/avie-sinar/" target="_blank"><FaLinkedin /></a></div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.menuItem}><a href="#about">About</a></div>
        <div className={styles.menuItem}>Projects</div>
        <div className={styles.menuItem}>Contact</div>
      </div>
    </div>
  );
}