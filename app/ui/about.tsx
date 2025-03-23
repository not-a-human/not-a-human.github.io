import styles from './about.module.css';

export function About() {
    return (
        <div>
        <h1 className='text-center' id='about'>About</h1>
        <div className={`${styles.aboutContainer}`}>
            <div className={`${styles.aboutme}`}>
               <p>
                    I am a Software Engineer based in Malaysia. I have a passion for web development.
                </p> 
                <p>
                I am open to job opportunities where I can contribute, learn and grow. If you have a good opportunity that matches my skills and experience then do not hesitate to contact me.
                </p>
            </div>
            <div className={`${styles.skills}`}></div>
        </div>
        
        </div>
    );
}