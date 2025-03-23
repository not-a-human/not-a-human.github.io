import styles from "./menu.module.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export function Menu() {
  return (
    <div className={styles.menu}>
      <div className={styles.leftSection}>
        <div className={styles.menuItem}><FaGithub /></div>
        <div className={styles.menuItem}><FaLinkedin /></div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.menuItem}>About</div>
        <div className={styles.menuItem}>Projects</div>
        <div className={styles.menuItem}>Contact</div>
      </div>
    </div>
  );
}