"use client";

import styles from "./guestbook.module.css";
import { useState, useEffect } from "react";
import { createDatabaseClient, DatabaseRecord } from "../../../../lib/database";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const tableName = "guestbook";

export function Guestbook() {
  const [guestbookEntries, setGuestbookEntries] = useState<DatabaseRecord[]>(
    []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const [newRecord, setNewRecord] = useState({
    name: "",
    desc: "",
  });

  const db = createDatabaseClient();

  // Load data on component mount if no initial data provided
  useEffect(() => {
    if (guestbookEntries.length === 0) {
      loadRecords();
    }
  }, []);

  // Handle body scroll when modal is open/closed
  useEffect(() => {
    if (showForm) {
      // Disable scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "unset";
    }

    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showForm]);

  const loadRecords = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await db.getAll(tableName);
      if (result.error) {
        throw new Error(result.error.message || "Failed to load records");
      }
      setGuestbookEntries(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const createRecord = async () => {
    if (!newRecord.name.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await db.create(tableName, newRecord);
      if (result.error) {
        throw new Error(result.error.message || "Failed to create record");
      }

      if (result.data) {
        setGuestbookEntries((prev) => [...prev, result.data as DatabaseRecord]);
        setNewRecord({ name: "", desc: "" });
        setShowForm(false);
      }
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
              onClick={() => setShowForm(true)}
              className={styles.addMessageButton}
            >
              Tinggalkan Ucapan
            </button>
          </div>
        </div>
      )}

      {/* Popup Form Overlay */}
      {showForm && (
        <div className={styles.popupOverlay} onClick={() => setShowForm(false)}>
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.popupHeader}>
              <h2 className={styles.popupTitle}>Tinggalkan Ucapan</h2>
              <button
                className={styles.closeButton}
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <div className={styles.formContainer}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Nama Anda"
                  value={newRecord.name}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, name: e.target.value })
                  }
                  className={styles.input}
                />
                <textarea
                  placeholder="Ucapan Anda"
                  value={newRecord.desc}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, desc: e.target.value })
                  }
                  className={styles.textarea}
                  rows={4}
                />
              </div>
              <div className={styles.formActions}>
                <button
                  onClick={createRecord}
                  disabled={loading || !newRecord.name.trim()}
                  className={styles.submitButton}
                >
                  {loading ? "Sila Tunggu..." : "Hantar Ucapan"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className={styles.cancelButton}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
