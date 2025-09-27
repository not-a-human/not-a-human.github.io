"use client";

import styles from "./intro.module.css";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import { IoTime } from "react-icons/io5";

export function Intro() {
  return (
    <div className={styles.container}>
      {/* Opening greeting */}
      <div className={styles.greetingSection}>
        <h2 className={styles.greeting}>
          ASSALAMUALAIKUM WBT & SALAM SEJAHTERA
        </h2>
        <div className={styles.decorativeLine}>
          <div className={styles.line}></div>
          <FaHeart className={styles.heartIcon} />
          <div className={styles.line}></div>
        </div>
      </div>

      {/* Parents section */}
      <div className={styles.parentsSection}>
        <div className={styles.parentsNames}>
          <h3 className={styles.parentName}>Ruslin Bin Aran</h3>
          <span className={styles.ampersand}>&</span>
          <h3 className={styles.parentName}>Maznah Binti Ibrahim</h3>
        </div>
      </div>

      {/* Invitation message */}
      <div className={styles.invitationSection}>
        <div className={styles.invitationText}>
          <p>Dengan penuh kesyukuran kehadrat Illahi,</p>
          <p>kami mempersilakan</p>
          <p>
            <strong>Dato'/Datin/Dr/Tuan/Puan/Encik/Cik</strong> ke
          </p>
          <p>walimatulurus anakanda kesayangan kami</p>
        </div>
      </div>

      {/* Couple names */}
      <div className={styles.coupleSection}>
        <div className={styles.coupleNames}>
          <h1 className={styles.coupleName}>Avie Sinar</h1>
          <h1 className={styles.coupleSubName}>PHUAH YONG CHERN</h1>
          <div className={styles.coupleConnector}>
            <div className={styles.connectorLine}></div>
            <span className={styles.ampersandLarge}>&</span>
            <div className={styles.connectorLine}></div>
          </div>
          <h1 className={styles.coupleName}>Ayuni Muspirah</h1>
          <h1 className={styles.coupleSubName}>BINTI RUSLIN</h1>
        </div>
      </div>

      {/* Event details */}
      <div className={styles.eventDetails}>
        {/* Date */}
        <div className={styles.detailItem}>
          <div className={styles.detailIcon}>
            <FaCalendarAlt />
          </div>
          <div className={styles.detailContent}>
            <h4 className={styles.detailLabel}>Tarikh</h4>
            <p className={styles.detailText}>Ahad, 9 November 2025</p>
          </div>
        </div>
        {/* Time */}
        <div className={styles.detailItem}>
          <div className={styles.detailIcon}>
            <FaClock />
          </div>
          <div className={styles.detailContent}>
            <h4 className={styles.detailLabel}>Masa</h4>
            <p className={styles.detailText}>5:00 Petang - 6:30 Malam</p>
          </div>
        </div>
        {/* Location */}
        <div className={styles.detailItem}>
          <div className={styles.detailIcon}>
            <FaMapMarkerAlt />
          </div>
          <div className={styles.detailContent}>
            <h4 className={styles.detailLabel}>Tempat</h4>
            <p className={styles.detailText}>
              No 23, Rumah Mara Kampung Baru Parit Tinggi
              <br />
              Kuala Pilah, 72000
              <br />
              Kuala Pilah, Negeri Sembilan
            </p>
          </div>
        </div>
        {/* Schedule timeline */}
        <div className={styles.detailItem}>
          <div className={styles.detailIcon}>
            <IoTime />
          </div>
          <div className={styles.detailContent}>
            <h4 className={styles.detailLabel}>Aturcara</h4>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineTime}>5:00 PM</div>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineEvent}>Akad Nikah</div>
              </div>
              <div className={styles.timelineConnector}></div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineTime}>5:30 PM</div>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineEvent}>High Tea</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
