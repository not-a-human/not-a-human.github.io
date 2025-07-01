"use client";

import styles from "./menu.module.css";
import { MenuWithLink } from "./menu";
import { FaGithub, FaLinkedin, FaSteam } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export function MobileSocials() {
  return (
    <div className={`${styles.mobileSocials}`}>
      <MenuWithLink
        url={process.env.NEXT_PUBLIC_URL_GITHUB || "#"}
        icon={<FaGithub />}
      />
      <MenuWithLink
        url={process.env.NEXT_PUBLIC_URL_LINKEDIN || "#"}
        icon={<FaLinkedin />}
      />
      <MenuWithLink
        url={process.env.NEXT_PUBLIC_URL_STEAM || "#"}
        icon={<FaSteam />}
      />
      <MenuWithLink
        url={process.env.NEXT_PUBLIC_URL_EMAIL || "#"}
        icon={<IoMail />}
      />
    </div>
  );
}
