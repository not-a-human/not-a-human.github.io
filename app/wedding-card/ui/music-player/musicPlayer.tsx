"use client";

import styles from "./musicPlayer.module.css";
import { useState, useEffect } from "react";

interface MusicPlayerProps {
  isVisible?: boolean;
}

export function MusicPlayer({ isVisible = true }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  // Autoplay when component becomes visible
  useEffect(() => {
    if (isVisible && !audio) {
      // Initialize and autoplay audio
      const newAudio = new Audio("/assets/music.ogg");
      newAudio.loop = true;
      newAudio.volume = 0.3;
      setAudio(newAudio);

      // Attempt autoplay
      const playPromise = newAudio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log("Autoplay started successfully");
          })
          .catch((error) => {
            console.log("Autoplay failed, user interaction required:", error);
            // Audio is loaded but not playing, waiting for user interaction
            setIsPlaying(false);
          });
      }
    } else if (!isVisible && audio && isPlaying) {
      // Pause when component becomes invisible
      audio.pause();
      setIsPlaying(false);
    }
  }, [isVisible, audio]);

  const toggleMusic = () => {
    if (!audio) {
      // Initialize audio if not already done
      const newAudio = new Audio("/assets/music.ogg");
      newAudio.loop = true;
      newAudio.volume = 0.3;
      setAudio(newAudio);

      newAudio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Audio play failed:", error);
        });
    } else {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Audio play failed:", error);
          });
      }
    }
  };

  return (
    <div
      className={`${styles.musicPlayer} ${!isVisible ? styles.hidden : ""}`}
      onClick={toggleMusic}
    >
      <div className={styles.musicContainer}>
        <div className={styles.musicTitle}>
          A Thousand Years - Christina Perri (Instrumental)
        </div>
        <div className={styles.musicWaves}>
          <div
            className={`${styles.wave} ${isPlaying ? styles.waveActive : ""}`}
          ></div>
          <div
            className={`${styles.wave} ${isPlaying ? styles.waveActive : ""}`}
          ></div>
          <div
            className={`${styles.wave} ${isPlaying ? styles.waveActive : ""}`}
          ></div>
          <div
            className={`${styles.wave} ${isPlaying ? styles.waveActive : ""}`}
          ></div>
          <div
            className={`${styles.wave} ${isPlaying ? styles.waveActive : ""}`}
          ></div>
        </div>
      </div>
    </div>
  );
}
