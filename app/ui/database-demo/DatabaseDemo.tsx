"use client";

import React, { useState, useEffect } from "react";
import {
  createDatabaseClient,
  DatabaseRecord,
  DatabaseProvider,
} from "../../../lib/database";
import styles from "./databaseDemo.module.css";

interface DatabaseDemoProps {
  initialData?: DatabaseRecord[];
  provider?: DatabaseProvider;
  tableName?: string;
}

export default function DatabaseDemo({
  initialData = [],
  provider = "supabase",
  tableName = "todos",
}: DatabaseDemoProps) {
  const [records, setRecords] = useState<DatabaseRecord[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newRecord, setNewRecord] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<DatabaseRecord>>({});

  const db = createDatabaseClient();

  // Load all records
  const loadRecords = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await db.getAll(tableName);
      if (result.error) {
        const errorMessage = typeof result.error === 'object' 
          ? result.error.message || JSON.stringify(result.error) 
          : result.error;
        throw new Error(errorMessage || "Failed to load records");
      }
      setRecords(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Create new record
  const createRecord = async () => {
    if (!newRecord.title.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await db.create(tableName, newRecord);
      if (result.error) {
        const errorMessage = typeof result.error === 'object' 
          ? result.error.message || JSON.stringify(result.error) 
          : result.error;
        throw new Error(errorMessage || "Failed to create record");
      }

      if (result.data) {
        setRecords((prev) => [...prev, result.data as DatabaseRecord]);
        setNewRecord({ title: "", description: "", completed: false });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Update record
  const updateRecord = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await db.update(tableName, id, editData);
      if (result.error) {
        throw new Error(result.error.message || "Failed to update record");
      }

      setRecords((prev) =>
        prev.map((record) =>
          record.id === id ? { ...record, ...editData } : record
        )
      );
      setEditingId(null);
      setEditData({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Delete record
  const deleteRecord = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    setLoading(true);
    setError(null);

    try {
      const result = await db.delete(tableName, id);
      if (result.error) {
        const errorMessage = typeof result.error === 'object' 
          ? result.error.message || JSON.stringify(result.error) 
          : result.error;
        throw new Error(errorMessage || "Failed to delete record");
      }

      setRecords((prev) => prev.filter((record) => record.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>🗃️ Database CRUD Demo</h2>
        <p className={styles.provider}>
          Using:{" "}
          <strong>
            {provider.charAt(0).toUpperCase() + provider.slice(1)}
          </strong>
        </p>
        <button
          onClick={loadRecords}
          disabled={loading}
          className={styles.refreshButton}
        >
          {loading ? "Loading..." : "Refresh Data"}
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Create Form */}
      <div className={styles.createForm}>
        <h3>➕ Add New Record</h3>
        <div className={styles.formRow}>
          <input
            type="text"
            placeholder="Title"
            value={newRecord.title}
            onChange={(e) =>
              setNewRecord((prev) => ({ ...prev, title: e.target.value }))
            }
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Description"
            value={newRecord.description}
            onChange={(e) =>
              setNewRecord((prev) => ({ ...prev, description: e.target.value }))
            }
            className={styles.input}
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={newRecord.completed}
              onChange={(e) =>
                setNewRecord((prev) => ({
                  ...prev,
                  completed: e.target.checked,
                }))
              }
            />
            Completed
          </label>
          <button
            onClick={createRecord}
            disabled={loading || !newRecord.title.trim()}
            className={styles.createButton}
          >
            Create
          </button>
        </div>
      </div>

      {/* Records List */}
      <div className={styles.recordsList}>
        <h3>📋 Records ({records.length})</h3>

        {records.length === 0 ? (
          <div className={styles.noRecords}>
            No records found. Add some records to see them here!
          </div>
        ) : (
          <div className={styles.records}>
            {records.map((record) => (
              <div key={record.id} className={styles.record}>
                {editingId === record.id ? (
                  // Edit mode
                  <div className={styles.editForm}>
                    <input
                      type="text"
                      value={editData.title || record.title || ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className={styles.input}
                    />
                    <input
                      type="text"
                      value={editData.description || record.description || ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className={styles.input}
                    />
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={
                          editData.completed !== undefined
                            ? editData.completed
                            : record.completed
                        }
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            completed: e.target.checked,
                          }))
                        }
                      />
                      Completed
                    </label>
                    <div className={styles.editButtons}>
                      <button
                        onClick={() => updateRecord(record.id as string)}
                        disabled={loading}
                        className={styles.saveButton}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditData({});
                        }}
                        className={styles.cancelButton}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className={styles.recordContent}>
                    <div className={styles.recordInfo}>
                      <h4 className={record.completed ? styles.completed : ""}>
                        {record.title}
                      </h4>
                      <p>{record.description}</p>
                      <small>ID: {record.id}</small>
                      {record.createdTime && (
                        <small>
                          {" "}
                          • Created:{" "}
                          {new Date(record.createdTime).toLocaleDateString()}
                        </small>
                      )}
                    </div>
                    <div className={styles.recordActions}>
                      <button
                        onClick={() => {
                          setEditingId(record.id as string);
                          setEditData({
                            title: record.title,
                            description: record.description,
                            completed: record.completed,
                          });
                        }}
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRecord(record.id as string)}
                        disabled={loading}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
