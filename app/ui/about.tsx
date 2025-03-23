import { DiMsqlServer, DiSqllite } from 'react-icons/di';
import styles from './about.module.css';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPhp } from "react-icons/fa";
import { SiNextdotjs, SiPostgresql, SiDotnet, SiLaravel, SiMysql } from "react-icons/si";
import { TbBrandCSharp } from 'react-icons/tb';
import { BsBootstrapFill } from 'react-icons/bs';

export function About() {
    return (
        <div>
        <h1 className={`header`} id='about'>ABOUT<div></div></h1>
        <div className={`${styles.aboutContainer}`}>
            <div className={`${styles.aboutme}`}>
                <h2 className={`centerSmallHeader`}>About Me</h2>
               <p>
                    I am a Software Engineer based in Malaysia. I have a passion for web development.
                </p> 
                <p>
                    I am open to job opportunities where I can contribute, learn and grow. If you have a good opportunity that matches my skills and experience then do not hesitate to contact me.
                </p>
            </div>
            <div className={`${styles.skills}`}>
                <h2 className={`centerSmallHeader`}>Skills</h2>
                <div className={styles.skillsContainer}>
                        <div className={styles.skillItem}>
                            <FaHtml5 className={styles.skillIcon} />
                            <span>HTML</span>
                        </div>
                        <div className={styles.skillItem}>
                            <FaCss3Alt className={styles.skillIcon} />
                            <span>CSS</span>
                        </div>
                        <div className={styles.skillItem}>
                            <FaJs className={styles.skillIcon} />
                            <span>JavaScript</span>
                        </div>
                        <div className={styles.skillItem}>
                            <FaPhp className={styles.skillIcon} />
                            <span>PHP</span>
                        </div>
                        <div className={styles.skillItem}>
                            <TbBrandCSharp className={styles.skillIcon} />
                            <span>C#</span>
                        </div>
                        <div className={styles.skillItem}>
                            <FaReact className={styles.skillIcon} />
                            <span>React</span>
                        </div>
                        <div className={styles.skillItem}>
                            <SiNextdotjs className={styles.skillIcon} />
                            <span>NextJS</span>
                        </div>
                        <div className={styles.skillItem}>
                            <BsBootstrapFill className={styles.skillIcon} />
                            <span>Bootstrap</span>
                        </div>
                        <div className={styles.skillItem}>
                            <SiLaravel className={styles.skillIcon} />
                            <span>Laravel</span>
                        </div>
                        <div className={styles.skillItem}>
                            <SiDotnet className={styles.skillIcon} />
                            <span>.NET MAUI</span>
                        </div>
                        <div className={styles.skillItem}>
                            <SiPostgresql className={styles.skillIcon} />
                            <span>PostgreSQL</span>
                        </div>
                        <div className={styles.skillItem}>
                            <SiMysql className={styles.skillIcon} />
                            <span>MySQL</span>
                        </div>
                        <div className={styles.skillItem}>
                            <DiSqllite className={styles.skillIcon} />
                            <span>SQLite</span>
                        </div>
                        <div className={styles.skillItem}>
                            <DiMsqlServer className={styles.skillIcon} />
                            <span>MS SQL</span>
                        </div>
                    </div>
            </div>
        </div>
        
        </div>
    );
}