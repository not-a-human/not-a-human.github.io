import styles from "./menu.module.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export const socials = {
  GitHub: "https://github.com/not-a-human",
  LinkedIn: "https://www.linkedin.com/in/avie-sinar/",
  Email: "mailto:avie.phuah@gmail.com",
};

export function Menu() {
  return (
    <div className={styles.menu}>
      <div className={styles.leftSection}>
        <div className={styles.menuItem}>
          <a href={socials.GitHub} target="_blank">
            <FaGithub />
            <div></div>
          </a>
        </div>
        <div className={styles.menuItem}>
          <a href={socials.LinkedIn} target="_blank">
            <FaLinkedin />
          </a>
          <div></div>
        </div>
        <div className={styles.menuItem}>
          <a href={socials.Email} target="_blank">
            <IoMail />
          </a>
          <div></div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.menuItem}>
          <a href="#about">About</a>
          <div></div>
        </div>
        <div className={styles.menuItem}>
          <a href="#project">Projects</a>
          <div></div>
        </div>
        <div className={styles.menuItem}>
          <a href="#contact">Contact</a>
          <div></div>
        </div>
      </div>
    </div>
  );
}
