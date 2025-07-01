"use client";

import { useEffect, useState } from "react";
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
import { useTranslations } from "../../utils/useTranslations";
import { Language, useLanguage } from "../../context/LanguageContext";

interface Project {
  title_en: string;
  title_my: string;
  title_cn?: string;
  description_en: string;
  description_my: string;
  description_cn?: string;
  longDescription_en?: string;
  longDescription_my?: string;
  longDescription_cn?: string;
  technologies: { icon: any; title: string }[];
  image: string;
  url: { github?: string; website?: string };
}

interface SelectedProject {
  title: string;
  description: string;
  longDescription?: string;
  technologies: { icon: any; title: string }[];
  image: string;
  url: { github?: string; website?: string };
}

const projects = [
  {
    title_en: "APD Booking System",
    title_my: "Sistem Penempahan Bilik APD",
    description_en: "Final year project, a room booking system for APD.",
    description_my:
      "Project Akhir Tahun DVM, sistem untuk menempah Bilik APD di KVSA.",
    longDescription_en: "",
    longDescription_my: "",
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
    title_en: "FinPal",
    title_my: "FinPal",
    description_en:
      "A finance management app designed to help users plan allocated funds based on a percentage of their monthly salary.",
    description_my:
      "Aplikasi pengurusan kewangan yang direka untuk membantu pengguna merancang dana yang diperuntukkan berdasarkan peratusan gaji bulanan.",
    longDescription_my: `
      <div>
        <p>
          FinPal ialah aplikasi pengurusan kewangan yang direka untuk membantu pengguna merancang dana yang diperuntukkan berdasarkan peratusan gaji bulanan mereka. 
          Pengguna boleh mencipta rekod untuk bil dan pinjaman. FinPal juga akan mengingati pengguna apabila sebarang bil atau pinjaman melebihi dana yang diperuntukkan untuk kategori yang ditentukan. 
          Selain itu, pengguna boleh menjejaki gaji bulanan mereka dalam aplikasi ini.
        </p>
        <h4>Ciri-ciri:</h4>
        <ul>
          <li>Rancang dana yang diperuntukkan berdasarkan peratusan gaji pengguna untuk bulan tersebut.</li>
          <li>Buat dan urus rekod bil dan pinjaman.</li>
          <li>Jejaki gaji bulanan daripada apl.</li>
          <li>Beritahu pengguna apabila bil atau pinjaman melebihi dana yang diperuntukkan untuk kategori tertentu.</li>
          <li>Data eksport/import.</li>
          <li>Sokongan Dark/Light mode.</li>
        </ul>
      </div>
    `,
    longDescription_en: `
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
  const t = useTranslations();
  const { language } = useLanguage(); // Get the current language

  const [selectedProject, setSelectedProject] =
    useState<SelectedProject | null>(null);

  const handleCardClick = (project: Project) => {
    setSelectedProject({
      title: project[`title_${language}`] || project.title_en,
      description: project[`description_${language}`] || project.description_en,
      longDescription:
        project[`longDescription_${language}`] || project.longDescription_en,
      technologies: project.technologies,
      image: project.image,
      url: project.url,
    });

    // Add a new history state when the popup is opened
    window.history.pushState({ popupOpen: true }, "");

    document.documentElement.classList.add("no-scroll"); // Disable scrolling
  };

  const closePopup = () => {
    setSelectedProject(null);
    document.documentElement.classList.remove("no-scroll"); // Enable scrolling
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    const handlePopState = () => {
      if (window.history.state?.popupOpen) {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div>
      <h1 className={`header`} id="project">
        {t("project.title")}
        <div></div>
      </h1>
      <div className={styles.projectContainer}>
        {projects.map((project, index) => (
          <AnimatedProjectCard
            project={project}
            key={index}
            onClick={() => handleCardClick(project)}
            language={language}
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
            {selectedProject.longDescription ? (
              <div>
                <h3>{t("project.about")}</h3>
                <div
                  className={`${styles.popupLongDescription}`}
                  dangerouslySetInnerHTML={{
                    __html: selectedProject.longDescription,
                  }}
                />
              </div>
            ) : (
              <div className={`${styles.popupLongDescription}`}></div>
            )}
            <h3>{t("project.technologies")}</h3>
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
                  <FaGlobeAsia /> {t("project.website")}
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
  language,
}: {
  project: Project;
  onClick: () => void;
  language: Language;
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
          <h3 className={styles.projectTitle}>
            {project[`title_${language}`]}
          </h3>
          <p className={styles.projectDescription}>
            {project[`description_${language}`]}
          </p>
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
