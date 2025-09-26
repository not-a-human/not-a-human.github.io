"use client";

import { useState } from "react";
import styles from "./calendar.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { FaCalendarAlt, FaApple } from "react-icons/fa";
import { SiGooglecalendar } from "react-icons/si";

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Wedding event details
const weddingEvent = {
  title: "Avie & Ayuni Wedding",
  date: new Date(2025, 10, 9), // November 9, 2025 (months are 0-indexed)
  startTime: new Date(2025, 10, 9, 17, 0), // 5:00 PM
  endTime: new Date(2025, 10, 9, 18, 30), // 6:30 PM
  location:
    "No 23, Rumah Mara Kampung Baru Parit Tinggi, Kuala Pilah, 72000, Negeri Sembilan",
  description: "Akad Nikah & High Tea - Avie Sinar & Ayuni Muspirah",
};

// Malay day names (short form)
const malayDays = ["Ahd", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab"];
const malayMonths = [
  "Januari",
  "Februari",
  "Mac",
  "April",
  "Mei",
  "Jun",
  "Julai",
  "Ogos",
  "September",
  "Oktober",
  "November",
  "Disember",
];

export function Calendar({ isOpen, onClose }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // November 2025
  const [loadingCalendar, setLoadingCalendar] = useState<string | null>(null);

  if (!isOpen) return null;

  // Get calendar data for the current month
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Start from Sunday (0) to Saturday (6)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  // Check if a date is the wedding date
  const isWeddingDate = (date: Date) => {
    return (
      date.getDate() === weddingEvent.date.getDate() &&
      date.getMonth() === weddingEvent.date.getMonth() &&
      date.getFullYear() === weddingEvent.date.getFullYear()
    );
  };

  // Check if a date is in the current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Navigate to previous/next month
  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Format date for calendar URLs
  const formatDateForCalendar = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const handleGoogleCalendar = () => {
    setLoadingCalendar("google");

    const startTime = formatDateForCalendar(weddingEvent.startTime);
    const endTime = formatDateForCalendar(weddingEvent.endTime);

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      weddingEvent.title
    )}&dates=${startTime}/${endTime}&location=${encodeURIComponent(
      weddingEvent.location
    )}&details=${encodeURIComponent(weddingEvent.description)}`;

    window.open(googleCalendarUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setLoadingCalendar(null);
    }, 1000);
  };

  const handleAppleCalendar = () => {
    setLoadingCalendar("apple");

    // Create .ics file content
    const startTime = formatDateForCalendar(weddingEvent.startTime);
    const endTime = formatDateForCalendar(weddingEvent.endTime);
    const now = formatDateForCalendar(new Date());

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//Wedding Event//EN
BEGIN:VEVENT
UID:${now}@wedding.com
DTSTAMP:${now}
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:${weddingEvent.title}
DESCRIPTION:${weddingEvent.description}
LOCATION:${weddingEvent.location}
END:VEVENT
END:VCALENDAR`;

    // Create blob and download
    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "avie-ayuni-wedding.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setTimeout(() => {
      setLoadingCalendar(null);
    }, 1000);
  };

  const calendarDays = getCalendarDays();

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h2 className={styles.popupTitle}>Calendar</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <IoCloseOutline />
          </button>
        </div>

        <div className={styles.popupBody}>
          {/* Wedding Event Info */}
          <div className={styles.eventInfo}>
            <div className={styles.eventHeader}>
              <FaCalendarAlt className={styles.eventIcon} />
              <div>
                <h3 className={styles.eventTitle}>{weddingEvent.title}</h3>
                <p className={styles.eventDate}>
                  Ahad, 9 November 2025 • 5:00 PM - 6:30 PM
                </p>
              </div>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className={styles.calendarHeader}>
            <button
              className={styles.navButton}
              onClick={() => navigateMonth("prev")}
            >
              ‹
            </button>
            <h3 className={styles.monthYear}>
              {malayMonths[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button
              className={styles.navButton}
              onClick={() => navigateMonth("next")}
            >
              ›
            </button>
          </div>

          {/* Calendar Grid */}
          <div className={styles.calendar}>
            {/* Day headers */}
            <div className={styles.dayHeaders}>
              {malayDays.map((day) => (
                <div key={day} className={styles.dayHeader}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className={styles.daysGrid}>
              {calendarDays.map((date, index) => (
                <div
                  key={index}
                  className={`${styles.dayCell} ${
                    !isCurrentMonth(date) ? styles.otherMonth : ""
                  } ${isToday(date) ? styles.today : ""} ${
                    isWeddingDate(date) ? styles.weddingDate : ""
                  }`}
                >
                  <span className={styles.dayNumber}>{date.getDate()}</span>
                  {isWeddingDate(date) && (
                    <div className={styles.weddingDot}>💒</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Action Buttons */}
          <div className={styles.calendarActions}>
            <h4 className={styles.actionsTitle}>Add to Calendar</h4>

            <div className={styles.actionButtons}>
              <button
                className={`${styles.actionButton} ${styles.googleButton}`}
                onClick={handleGoogleCalendar}
                disabled={loadingCalendar === "google"}
              >
                <SiGooglecalendar className={styles.actionButtonIcon} />
                <span>Google Calendar</span>
                {loadingCalendar === "google" && (
                  <div className={styles.buttonSpinner}></div>
                )}
              </button>

              <button
                className={`${styles.actionButton} ${styles.appleButton}`}
                onClick={handleAppleCalendar}
                disabled={loadingCalendar === "apple"}
              >
                <FaApple className={styles.actionButtonIcon} />
                <span>Apple Calendar</span>
                {loadingCalendar === "apple" && (
                  <div className={styles.buttonSpinner}></div>
                )}
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className={styles.additionalInfo}>
            <div className={styles.infoText}>
              <p>📅 Save the date and never miss our special moment!</p>
              <p>
                The event will be added to your calendar with all the details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
