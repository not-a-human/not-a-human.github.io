import styles from './project.module.css';
import FYP from '../../public/assets/FYP.gif';
import { SiDotnet, SiJquery, SiMysql } from 'react-icons/si';
import { FaPhp } from 'react-icons/fa';
import { BsBootstrapFill } from 'react-icons/bs';
import { DiSqllite } from 'react-icons/di';

export function Project() {
    return (
        <div>
            <h1 className={`header`} id='project'>PROJECT<div></div></h1>
            <div className={styles.projectContainer}>
                <a href="#" style={{ backgroundImage: `url(${FYP.src})` }} className={styles.projectImage}>
                    <div className={styles.projectOverlay}>
                        <div>
                            <h3 className={styles.projectTitle}>Sistem Penempahan Bilik APD</h3>
                            <p className={styles.projectDescription}>Final year project, a room booking system for APD.</p>
                        </div>
                    </div>
                    <div className={styles.projectTechnologies}>
                        <SiJquery />
                        <FaPhp />
                        <BsBootstrapFill />
                        <SiMysql />
                    </div>
                </a>
                <a href="#" style={{ backgroundImage: `url()` }} className={styles.projectImage}>
                    <div className={styles.projectOverlay}>
                        <div>
                            <h3 className={styles.projectTitle}>FinPalz</h3>
                            <p className={styles.projectDescription}>
                                A finance management app designed to help users plan allocated funds based on a percentage of their monthly salary.
                            </p>
                        </div>
                    </div>
                    <div className={styles.projectTechnologies}>
                        <SiDotnet />
                        <DiSqllite />
                    </div>
                </a>
            </div>
        </div>
    );
}