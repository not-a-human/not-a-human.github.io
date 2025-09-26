"use client";

import styles from "./countdown.module.css";
import { useEffect, useState } from "react";

export function Countdown({ targetDate }: { targetDate: string }) {
  const [isClient, setIsClient] = useState(false);

  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  // Initialize with zero values to match SSR
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set client flag and initialize countdown
    setIsClient(true);
    setTimeLeft(calculateTimeLeft());
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient, targetDate]);

  return (
    <div className={styles.countdownContainer}>
      <h2 className={styles.countdownTitle}>Menanti Hari</h2>
      <div className={styles.countdown}>
        <div className={styles.timeUnit}>
          <div className={styles.timeNumber}>{timeLeft.days}</div>
          <div className={styles.timeLabel}>Hari</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <div className={styles.timeNumber}>{timeLeft.hours}</div>
          <div className={styles.timeLabel}>Jam</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <div className={styles.timeNumber}>{timeLeft.minutes}</div>
          <div className={styles.timeLabel}>Minit</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <div className={styles.timeNumber}>{timeLeft.seconds}</div>
          <div className={styles.timeLabel}>Saat</div>
        </div>
      </div>
      <p className={styles.eventDate}>November 9, 2025 • 5:00 PM</p>
    </div>
  );
}
