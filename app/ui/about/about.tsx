"use client";
import { DiMsqlServer, DiSqllite } from "react-icons/di";
import styles from "./about.module.css";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPhp } from "react-icons/fa";
import {
  SiNextdotjs,
  SiPostgresql,
  SiDotnet,
  SiLaravel,
  SiMysql,
  SiJquery,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { BsBootstrapFill } from "react-icons/bs";
import { useTranslations } from "../../utils/useTranslations";

const skills = [
  { icon: FaHtml5, title: "HTML" },
  { icon: FaCss3Alt, title: "CSS" },
  { icon: FaJs, title: "JavaScript" },
  { icon: FaPhp, title: "PHP" },
  { icon: TbBrandCSharp, title: "C#" },
  { icon: FaReact, title: "React" },
  { icon: SiNextdotjs, title: "NextJS" },
  { icon: SiJquery, title: "jQuery" },
  { icon: BsBootstrapFill, title: "Bootstrap" },
  { icon: SiLaravel, title: "Laravel" },
  { icon: SiDotnet, title: ".NET MAUI" },
  { icon: SiPostgresql, title: "PostgreSQL" },
  { icon: SiMysql, title: "MySQL" },
  { icon: DiSqllite, title: "SQLite" },
  { icon: DiMsqlServer, title: "MS SQL" },
];

export function About() {
  const t = useTranslations();
  return (
    <div>
      <h1 className={`header`} id="about">
        {t("about.title")}
        <div></div>
      </h1>
      <div className={`${styles.aboutContainer}`}>
        <div className={`${styles.aboutme}`}>
          <h2 className={`centerSmallHeader`}>{t("about.title-1")}</h2>
          <p>{t("about.description")}</p>
        </div>
        <div className={`${styles.skills}`}>
          <h2 className={`centerSmallHeader`}>{t("about.title-2")}</h2>
          <div className={styles.skillsContainer}>
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div className={styles.skillItem} key={index}>
                  <Icon className={styles.skillIcon} />
                  <span>{skill.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
