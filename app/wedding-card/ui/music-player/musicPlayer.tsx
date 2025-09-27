"use client";

import { IoMusicalNotes, IoMusicalNoteSharp } from "react-icons/io5";
import styles from "./musicPlayer.module.css";
import { useState, useEffect } from "react";

interface MusicPlayerProps {
  isVisible?: boolean;
}

export function MusicPlayer({ isVisible = true }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [needsUserInteraction, setNeedsUserInteraction] = useState(false);

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
      // Initialize audio
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
            setNeedsUserInteraction(false);
            console.log("Autoplay started successfully");
          })
          .catch((error) => {
            console.log("Autoplay blocked, showing user prompt:", error);
            setIsPlaying(false);
            setNeedsUserInteraction(true);
          });
      }
    }
    // else if (!isVisible && audio && isPlaying) {
    //   // Pause when component becomes invisible
    //   audio.pause();
    //   setIsPlaying(false);
    // }
  }, [isVisible, audio]);

  const toggleMusic = () => {
    // Hide the user interaction prompt once user clicks
    if (needsUserInteraction) {
      setNeedsUserInteraction(false);
    }

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
        {needsUserInteraction && (
          <div className={styles.playPrompt}>
            <div className={styles.playIcon}>
              <IoMusicalNotes />
            </div>
            <div className={styles.promptText}>Click to play music</div>
          </div>
        )}
        {!needsUserInteraction && (
          <>
            <div className={styles.musicTitle}>
              A Thousand Years - Christina Perri (Instrumental)
            </div>
            <div className={styles.musicWaves}>
              <div
                className={`${styles.wave} ${
                  isPlaying ? styles.waveActive : ""
                }`}
              ></div>
              <div
                className={`${styles.wave} ${
                  isPlaying ? styles.waveActive : ""
                }`}
              ></div>
              <div
                className={`${styles.wave} ${
                  isPlaying ? styles.waveActive : ""
                }`}
              ></div>
              <div
                className={`${styles.wave} ${
                  isPlaying ? styles.waveActive : ""
                }`}
              ></div>
              <div
                className={`${styles.wave} ${
                  isPlaying ? styles.waveActive : ""
                }`}
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
