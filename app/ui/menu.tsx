import styles from "./menu.module.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export function Menu() {
  return (
    <div className={styles.menu}>
      <div className={styles.leftSection}>
        <div className={styles.menuItem}><a href="https://github.com/not-a-human" target="_blank"><FaGithub /></a></div>
        <div className={styles.menuItem}><a href="https://www.linkedin.com/in/avie-sinar/" target="_blank"><FaLinkedin /></a></div>
        <div className={styles.menuItem}><a href="mailto:avie.phuah@gmail.com" target="_blank"><IoMail /></a></div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.menuItem}><a href="#about">About</a></div>
        <div className={styles.menuItem}><a href="#project">Projects</a></div>
        <div className={styles.menuItem}><a href="#contact">Contact</a></div>
      </div>
    </div>
  );
}