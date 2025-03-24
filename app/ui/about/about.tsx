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
  return (
    <div>
      <h1 className={`header`} id="about">
        ABOUT<div></div>
      </h1>
      <div className={`${styles.aboutContainer}`}>
        <div className={`${styles.aboutme}`}>
          <h2 className={`centerSmallHeader`}>About Me</h2>
          <p>
            I am a Software Engineer based in Malaysia with a passion for web
            development. I'm always eager to contribute, learn, and grow through
            new opportunities. If you have an exciting role that aligns with my
            skills and experience, feel free to reach out—I’d love to connect!
          </p>
        </div>
        <div className={`${styles.skills}`}>
          <h2 className={`centerSmallHeader`}>Skills</h2>
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
