"use client";

import styles from "./guestbook.module.css";
import { useState, useEffect } from "react";
import { createDatabaseClient, DatabaseRecord } from "../../../../lib/database";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const tableName = "guestbook";

// Utility function to shuffle array using Fisher-Yates algorithm
const shuffleArray = (array: DatabaseRecord[]): DatabaseRecord[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

interface GuestbookProps {
  onOpenModal?: () => void;
  entries?: DatabaseRecord[];
  onEntriesUpdate?: (entries: DatabaseRecord[]) => void;
}

export function Guestbook({
  onOpenModal,
  entries = [],
  onEntriesUpdate,
}: GuestbookProps) {
  const [guestbookEntries, setGuestbookEntries] =
    useState<DatabaseRecord[]>(entries);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const db = createDatabaseClient();

  // Load data on component mount if no initial data provided
  useEffect(() => {
    if (guestbookEntries.length === 0 && entries.length === 0) {
      loadRecords();
    }
  }, []);

  // Update local state when entries prop changes
  useEffect(() => {
    if (entries.length > 0) {
      // Shuffle entries from props as well
      const shuffledEntries = shuffleArray(entries);
      setGuestbookEntries(shuffledEntries);
    }
  }, [entries]);

  const loadRecords = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await db.getAll(tableName);
      if (result.error) {
        throw new Error(result.error.message || "Failed to load records");
      }
      // Shuffle the data before setting state
      const shuffledEntries = shuffleArray(result.data);
      setGuestbookEntries(shuffledEntries);
      onEntriesUpdate?.(shuffledEntries);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const nextEntry = () => {
    if (currentIndex < guestbookEntries.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevEntry = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentEntry = guestbookEntries[currentIndex];
  return (
    <>
      <div className={styles.guestbookContainer}>
        <h1 className={styles.title}>
          Guestbook
          <div></div>
        </h1>

        {loading && (
          <div className={styles.loadingContainer}>
            <p>Loading messages...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <p>Error: {error}</p>
            <button onClick={loadRecords} className={styles.retryButton}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className={styles.galleryContainer}>
            {guestbookEntries.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No messages yet. Be the first to leave a message!</p>
              </div>
            ) : (
              <>
                {/* Gallery Display */}
                <div className={styles.entryCard}>
                  <div className={styles.entryHeader}>
                    <h3 className={styles.entryName}>{currentEntry?.name}</h3>
                    <span className={styles.entryNumber}>
                      {currentIndex + 1} of {guestbookEntries.length}
                    </span>
                  </div>
                  <div className={styles.entryMessage}>
                    <p>{currentEntry?.desc || currentEntry?.message}</p>
                  </div>
                  <div className={styles.entryMeta}>
                    {currentEntry?.created_at && (
                      <span className={styles.entryDate}>
                        {new Date(currentEntry.created_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className={styles.navigationControls}>
                  <button
                    onClick={prevEntry}
                    disabled={currentIndex === 0}
                    className={styles.navButton}
                  >
                    <GrLinkPrevious />
                  </button>

                  <div className={styles.pagination}>
                    {guestbookEntries.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`${styles.paginationDot} ${
                          index === currentIndex ? styles.active : ""
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextEntry}
                    disabled={currentIndex === guestbookEntries.length - 1}
                    className={styles.navButton}
                  >
                    <GrLinkNext />
                  </button>
                </div>
              </>
            )}

            {/* Add Message Button */}
            <div className={styles.actionContainer}>
              <button
                onClick={() => onOpenModal?.()}
                className={styles.addMessageButton}
              >
                Tinggalkan Ucapan
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
