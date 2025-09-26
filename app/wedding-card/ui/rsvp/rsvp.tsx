"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./rsvp.module.css";
import { createDatabaseClient, DatabaseRecord } from "../../../../lib/database";
import { Modal } from "../modal/modal";
import { FaCheck, FaTimes } from "react-icons/fa";

interface RsvpProps {
  isOpen: boolean;
  onClose: () => void;
}

const tableName = "rsvp";

export function Rsvp({ isOpen, onClose }: RsvpProps) {
  const db = createDatabaseClient();
  const selectRef = useRef<HTMLDivElement>(null);
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    tel: "",
    attendance: "",
    numberOfGuests: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({
    tel: "",
    numberOfGuests: "",
  });
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Show snackbar notification
  const showSnackbar = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setSnackbar({ show: true, message, type });
    setTimeout(() => {
      setSnackbar({ show: false, message: "", type: "success" });
    }, 4000);
  };

  // Telephone validation function
  const validateTelephone = (tel: string): string => {
    // Remove all non-digit characters for validation
    const cleanTel = tel.replace(/\D/g, "");

    // Check if it's empty
    if (!cleanTel) {
      return "Nombor telefon diperlukan";
    }

    // Check Malaysian phone number patterns
    // Mobile: 01X-XXXXXXX (10-11 digits total)
    // Landline: 0X-XXXXXXX (9-10 digits total)
    if (cleanTel.length < 9 || cleanTel.length > 11) {
      return "Nombor telefon tidak sah (9-11 digit)";
    }

    // Must start with 0
    if (!cleanTel.startsWith("0")) {
      return "Nombor telefon mesti bermula dengan 0";
    }

    // Malaysian mobile numbers start with 01
    // Malaysian landlines start with 03, 04, 05, 06, 07, 08, 09
    const prefix = cleanTel.substring(0, 2);
    const validPrefixes = ["01", "03", "04", "05", "06", "07", "08", "09"];

    if (!validPrefixes.includes(prefix)) {
      return "Format nombor telefon tidak sah";
    }

    return ""; // No error
  };

  // Number of guests validation function
  const validateNumberOfGuests = (
    numberOfGuests: number,
    attendance: string
  ): string => {
    if (attendance === "yes") {
      if (numberOfGuests <= 0) {
        return "Sila nyatakan jumlah tetamu (minimum 1)";
      }
      if (numberOfGuests > 10) {
        return "Jumlah tetamu maksimum adalah 10";
      }
    }
    return ""; // No error
  };

  // Format telephone number for display
  const formatTelephone = (tel: string): string => {
    const cleanTel = tel.replace(/\D/g, "");

    if (cleanTel.length >= 3) {
      if (cleanTel.startsWith("01")) {
        // Mobile format: 01X-XXXXXXX
        if (cleanTel.length <= 3) {
          return cleanTel;
        } else if (cleanTel.length <= 7) {
          return `${cleanTel.substring(0, 3)}-${cleanTel.substring(3)}`;
        } else {
          return `${cleanTel.substring(0, 3)}-${cleanTel.substring(3, 7)}${
            cleanTel.length > 7 ? cleanTel.substring(7, 11) : ""
          }`;
        }
      } else {
        // Landline format: 0X-XXXXXXX
        if (cleanTel.length <= 2) {
          return cleanTel;
        } else {
          return `${cleanTel.substring(0, 2)}-${cleanTel.substring(2, 9)}`;
        }
      }
    }

    return cleanTel;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate telephone before submission
    const telError = validateTelephone(rsvpForm.tel);
    const guestsError = validateNumberOfGuests(
      rsvpForm.numberOfGuests,
      rsvpForm.attendance
    );

    if (telError || guestsError) {
      setErrors((prev) => ({
        ...prev,
        tel: telError,
        numberOfGuests: guestsError,
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await db.create(tableName, rsvpForm);

      if (result.error) {
        throw new Error(result.error.message || "Failed to create record");
      }

      showSnackbar("RSVP berjaya dihantar!", "success");
      // Close after a short delay to let user see the success message
      setTimeout(() => {
        // Reset form and close modal
        setRsvpForm({
          name: "",
          tel: "",
          attendance: "",
          numberOfGuests: 0,
        });
        setErrors({
          tel: "",
          numberOfGuests: "",
        });
        onClose();
      }, 1500);
    } catch (error) {
      showSnackbar("Ralat menghantar RSVP. Sila cuba lagi.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom select handlers
  const handleSelectOption = (value: string) => {
    const newAttendance = value;
    const currentGuests = rsvpForm.numberOfGuests;

    // Validate numberOfGuests based on new attendance value
    const guestsError = validateNumberOfGuests(currentGuests, newAttendance);

    setRsvpForm((prev) => ({ ...prev, attendance: value }));
    setErrors((prev) => ({ ...prev, numberOfGuests: guestsError }));
    setIsDropdownOpen(false);
  };

  const getDisplayText = (value: string) => {
    switch (value) {
      case "yes":
        return "Ya, saya akan hadir";
      case "no":
        return "Tidak, saya tidak dapat hadir";
      default:
        return "Sila Pilih";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "tel") {
      // Format the telephone number
      const formattedTel = formatTelephone(value);

      // Validate the telephone number
      const telError = validateTelephone(value);

      setRsvpForm((prev) => ({ ...prev, [name]: formattedTel }));
      setErrors((prev) => ({ ...prev, tel: telError }));
    } else if (name === "attendance") {
      const newAttendance = value;
      const currentGuests = rsvpForm.numberOfGuests;

      // Validate numberOfGuests based on new attendance value
      const guestsError = validateNumberOfGuests(currentGuests, newAttendance);

      setRsvpForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, numberOfGuests: guestsError }));
    } else if (name === "numberOfGuests") {
      const guestsValue = parseInt(value) || 0;
      const guestsError = validateNumberOfGuests(
        guestsValue,
        rsvpForm.attendance
      );

      setRsvpForm((prev) => ({ ...prev, [name]: guestsValue }));
      setErrors((prev) => ({ ...prev, numberOfGuests: guestsError }));
    } else {
      setRsvpForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="RSVP" maxWidth="500px">
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Nama Anda *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={rsvpForm.name}
              onChange={handleInputChange}
              className={styles.input}
              placeholder=""
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tel" className={styles.label}>
              Nombor Telefon *
            </label>
            <input
              type="tel"
              id="telephone"
              name="tel"
              value={rsvpForm.tel}
              onChange={handleInputChange}
              className={`${styles.input} ${
                errors.tel ? styles.inputError : ""
              }`}
              placeholder="contoh: 012-3456789"
              required
            />
            {errors.tel && (
              <div className={styles.errorMessage}>{errors.tel}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="attendance" className={styles.label}>
              Adakah anda akan hadir? *
            </label>
            <div className={styles.customSelect} ref={selectRef}>
              <div
                className={`${styles.selectTrigger} ${
                  isDropdownOpen ? styles.selectTriggerOpen : ""
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span
                  className={`${styles.selectText} ${
                    !rsvpForm.attendance ? styles.selectPlaceholder : ""
                  }`}
                >
                  {getDisplayText(rsvpForm.attendance)}
                </span>
                <div
                  className={`${styles.selectArrow} ${
                    isDropdownOpen ? styles.selectArrowOpen : ""
                  }`}
                >
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {isDropdownOpen && (
                <div className={styles.selectOptions}>
                  <div
                    className={`${styles.selectOption} ${
                      rsvpForm.attendance === "yes"
                        ? styles.selectOptionSelected
                        : ""
                    }`}
                    onClick={() => handleSelectOption("yes")}
                  >
                    <div className={styles.optionContent}>
                      <div className={styles.optionEmoji}>
                        <FaCheck />
                      </div>
                      <div className={styles.optionText}>
                        <div className={styles.optionTitle}>
                          Ya, saya akan hadir
                        </div>
                        <div className={styles.optionSubtitle}>
                          Saya akan meraikan bersama anda
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles.selectOption} ${
                      rsvpForm.attendance === "no"
                        ? styles.selectOptionSelected
                        : ""
                    }`}
                    onClick={() => handleSelectOption("no")}
                  >
                    <div className={styles.optionContent}>
                      <div className={styles.optionEmoji}>
                        <FaTimes />
                      </div>
                      <div className={styles.optionText}>
                        <div className={styles.optionTitle}>
                          Tidak, saya tidak dapat hadir
                        </div>
                        <div className={styles.optionSubtitle}>
                          Tetapi saya mengucapkan tahniah
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="numberOfGuests" className={styles.label}>
              Jumlah Tetamu {rsvpForm.attendance === "yes" ? "*" : ""}
            </label>
            <input
              type="number"
              id="numberOfGuests"
              name="numberOfGuests"
              value={rsvpForm.numberOfGuests}
              onChange={handleInputChange}
              className={`${styles.input} ${
                errors.numberOfGuests ? styles.inputError : ""
              }`}
              placeholder={
                rsvpForm.attendance === "yes" ? "Masukkan jumlah tetamu" : ""
              }
              min={0}
              max={10}
              required={rsvpForm.attendance === "yes"}
            />
            {errors.numberOfGuests && (
              <div className={styles.errorMessage}>{errors.numberOfGuests}</div>
            )}
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !rsvpForm.name ||
                !rsvpForm.tel ||
                !rsvpForm.attendance ||
                errors.tel !== "" ||
                errors.numberOfGuests !== "" ||
                (rsvpForm.attendance === "yes" && rsvpForm.numberOfGuests <= 0)
              }
              className={styles.submitButton}
            >
              {isSubmitting ? "Sila Tunggu..." : "Hantar"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Snackbar Notification */}
      {snackbar.show && (
        <div
          className={`${styles.snackbar} ${
            styles[
              `snackbar${
                snackbar.type.charAt(0).toUpperCase() + snackbar.type.slice(1)
              }`
            ]
          }`}
        >
          <div className={styles.snackbarContent}>
            <span className={styles.snackbarIcon}>
              {snackbar.type === "success" ? "✓" : "✕"}
            </span>
            <span className={styles.snackbarMessage}>{snackbar.message}</span>
          </div>
        </div>
      )}
    </>
  );
}
