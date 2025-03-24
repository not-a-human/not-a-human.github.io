"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./project.module.css";
import FYP from "../../../public/assets/FYP.gif";
import FinPal from "../../../public/assets/FinPal.png";
import { SiDotnet, SiJquery, SiMysql } from "react-icons/si";
import {
  FaCss3Alt,
  FaGithub,
  FaGlobeAsia,
  FaHtml5,
  FaPhp,
} from "react-icons/fa";
import { BsBootstrapFill } from "react-icons/bs";
import { DiSqllite } from "react-icons/di";
import { Key } from "react";
import { IoChevronBackCircle } from "react-icons/io5";

interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: { icon: any; title: string }[];
  image: string;
  url: { github?: string; website?: string };
}

const projects = [
  {
    title: "Sistem Penempahan Bilik APD",
    description: "Final year project, a room booking system for APD.",
    longDescription: "",
    technologies: [
      { icon: SiJquery, title: "jQuery" },
      { icon: FaPhp, title: "PHP" },
      { icon: BsBootstrapFill, title: "Bootstrap" },
      { icon: SiMysql, title: "MySQL" },
    ],
    image: FYP.src,
    url: { github: "https://github.com/not-a-human/APD" },
  },
  {
    title: "FinPal",
    description:
      "A finance management app designed to help users plan allocated funds based on a percentage of their monthly salary.",
    longDescription: `
            <div>
              <p>
                FinPal is a finance management app designed to help users plan allocated
                funds based on a percentage of their monthly salary. Users can create
                records for bills and loans, and the app notifies them when any bill or
                loan exceeds the allocated fund for the specified category. Additionally,
                users can track their monthly salary within the app.
              </p>
              <h4>Features:</h4>
              <ul>
                <li>Plan allocated funds based on a percentage of the user's salary for the month.</li>
                <li>Create and manage bill and loan records.</li>
                <li>Track monthly salary from the app.</li>
                <li>Notify the user when bills or loans exceed allocated funds for specified categories.</li>
                <li>Export/import data.</li>
                <li>Light/Dark mode support.</li>
              </ul>
            </div>
          `,
    technologies: [
      { icon: SiDotnet, title: ".NET MAUI" },
      { icon: DiSqllite, title: "SQLite" },
      { icon: FaHtml5, title: "HTML5" },
      { icon: FaCss3Alt, title: "CSS3" },
    ],
    image: FinPal.src,
    url: {
      github: "https://github.com/not-a-human/FinPal",
      website:
        "https://play.google.com/store/apps/details?id=com.companyname.FinPal",
    },
  },
];

export function Project() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    document.documentElement.classList.add("no-scroll"); // Disable scrolling
  };

  const closePopup = () => {
    setSelectedProject(null);
    document.documentElement.classList.remove("no-scroll"); // Enable scrolling
  };

  return (
    <div>
      <h1 className={`header`} id="project">
        PROJECT<div></div>
      </h1>
      <div className={styles.projectContainer}>
        {projects.map((project, index) => (
          <AnimatedProjectCard
            project={project}
            key={index}
            onClick={() => handleCardClick(project)}
          />
        ))}
      </div>

      {selectedProject && (
        <div className={styles.popupOverlay} onClick={closePopup}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closePopup}>
              <IoChevronBackCircle />
            </button>
            <hr className={`${styles.hr}`} />
            <h2>{selectedProject.title}</h2>
            <p className={`${styles.description}`}>
              {selectedProject.description}
            </p>
            <img
              className={`${styles.popupMainImage}`}
              src={selectedProject.image}
              alt={selectedProject.title}
            />
            <h3>About</h3>
            <div
              className={`${styles.popupLongDescription}`}
              dangerouslySetInnerHTML={{
                __html: selectedProject.longDescription,
              }}
            />
            <h3>Technologies</h3>
            <div className={styles.popupTechnologies}>
              {selectedProject.technologies.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <span key={index}>
                    <Icon title={tech.title} />
                    {tech.title}
                  </span>
                );
              })}
            </div>
            {selectedProject.url.website && (
              <span>
                <h3>
                  <FaGlobeAsia /> Website
                </h3>
                <a
                  href={selectedProject.url.website}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.popupButton}
                >
                  {selectedProject.url.website}
                </a>
              </span>
            )}
            {selectedProject.url.github && (
              <span>
                <h3>
                  <FaGithub /> GitHub
                </h3>
                <a
                  href={selectedProject.url.github}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.popupButton}
                >
                  {selectedProject.url.github}
                </a>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AnimatedProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Trigger when 20% of the element is visible
  });

  return (
    <a
      ref={ref}
      onClick={onClick}
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
