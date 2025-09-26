"use client";

import styles from "./guestbook.module.css";
import { useState } from "react";
import { createDatabaseClient, DatabaseRecord } from "../../../../lib/database";

const tableName = "guestbook";

interface GuestbookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  onEntriesUpdate: (entries: DatabaseRecord[]) => void;
}

export function GuestbookForm({
  onSuccess,
  onCancel,
  onEntriesUpdate,
}: GuestbookFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newRecord, setNewRecord] = useState({
    name: "",
    desc: "",
  });

  const db = createDatabaseClient();

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
        // Update parent component's entries
        const allResult = await db.getAll(tableName);
        if (allResult.data && !allResult.error) {
          onEntriesUpdate(allResult.data);
        }

        setNewRecord({ name: "", desc: "" });
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
        </div>
      )}

      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Nama Anda"
          value={newRecord.name}
          onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
          className={styles.input}
        />
        <textarea
          placeholder="Ucapan Anda"
          value={newRecord.desc}
          onChange={(e) => setNewRecord({ ...newRecord, desc: e.target.value })}
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
        <button onClick={onCancel} className={styles.cancelButton}>
          Batal
        </button>
      </div>
    </div>
  );
}
