"use client";

import { useInView } from "react-intersection-observer";
import styles from "./project.module.css";
import FYP from "../../public/assets/FYP.gif";
import FinPal from "../../public/assets/FinPal.png";
import { SiDotnet, SiJquery, SiMysql } from "react-icons/si";
import { FaCss3Alt, FaHtml5, FaPhp } from "react-icons/fa";
import { BsBootstrapFill } from "react-icons/bs";
import { DiSqllite } from "react-icons/di";
import { Key } from "react";

interface Project {
  title: string;
  description: string;
  technologies: { icon: any; title: string }[];
  image: string;
}

const projects = [
  {
    title: "Sistem Penempahan Bilik APD",
    description: "Final year project, a room booking system for APD.",
    technologies: [
      { icon: SiJquery, title: "jQuery" },
      { icon: FaPhp, title: "PHP" },
      { icon: BsBootstrapFill, title: "Bootstrap" },
      { icon: SiMysql, title: "MySQL" },
    ],
    image: FYP.src,
  },
  {
    title: "FinPal",
    description:
      "A finance management app designed to help users plan allocated funds based on a percentage of their monthly salary.",
    technologies: [
      { icon: SiDotnet, title: ".NET MAUI" },
      { icon: DiSqllite, title: "SQLite" },
      { icon: FaHtml5, title: "HTML5" },
      { icon: FaCss3Alt, title: "CSS3" },
    ],
    image: FinPal.src,
  },
];

export function Project() {
  return (
    <div>
      <h1 className={`header`} id="project">
        PROJECT<div></div>
      </h1>
      <div className={styles.projectContainer}>
        {projects.map((project, index) => (
          <AnimatedProjectCard project={project} key={index} />
        ))}
      </div>
    </div>
  );
}

function AnimatedProjectCard({ project }: { project: Project }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Trigger when 20% of the element is visible
  });

  return (
    <a
      ref={ref}
      href="#"
      style={{ backgroundImage: `url(${project.image})` }}
      className={`${styles.projectImage} ${
        inView ? styles.fadeIn : styles.hidden
      }`}
    >
      <div className={styles.projectOverlay}>
        <div>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectDescription}>{project.description}</p>
        </div>
      </div>
      <div className={styles.projectTechnologies}>
        {project.technologies.map(
          (tech: { icon: any; title: any }, index: Key | null | undefined) => {
            const Icon = tech.icon;
            return <Icon title={tech.title} key={index} />;
          }
        )}
      </div>
    </a>
  );
}
