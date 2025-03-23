import styles from './project.module.css';
import FYP from '../../public/assets/FYP.png';

export function Project() {
    return (
        <div>
            <h1 className={`header`} id='project'>PROJECT<div></div></h1>
            <div>
                <a href='' target='_blank'>
                    <div style={{ backgroundImage: `url(${FYP.src})` }} className={styles.projectImage}></div>
                </a>
                <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>Sistem Penempahan Bilik APD</h3>
                    <p className={styles.projectDescription}></p>
                </div>
            </div>
        </div>
    );
}