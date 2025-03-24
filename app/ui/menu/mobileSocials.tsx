import styles from "./menu.module.css";
import { socials } from "./menu";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export function MobileSocials() {
  return (
    <div className={`${styles.mobileSocials}`}>
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
  );
}
