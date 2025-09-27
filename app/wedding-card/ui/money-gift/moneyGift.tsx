"use client";

import { useState } from "react";
import styles from "./moneyGift.module.css";
import { FiDownload } from "react-icons/fi";
import { GoCopy } from "react-icons/go";
import { Modal } from "../modal/modal";

interface MoneyGiftProps {
  isOpen: boolean;
  onClose: () => void;
}

// Banking information - you can modify these details as needed
const bankingInfo = {
  bankName: "Maybank",
  accountNumber: "164847116413",
  qrCodeUrl: "/assets/bank-qr-code.jpg",
};

export function MoneyGift({ isOpen, onClose }: MoneyGiftProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");

  if (!isOpen) return null;

  const handleSaveQR = async () => {
    setIsDownloading(true);
    try {
      // Create a link element to download the QR code
      const link = document.createElement("a");
      link.href = bankingInfo.qrCodeUrl;
      link.download = "wedding-payment-qr.jpeg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyAccountNumber = async () => {
    try {
      // Check if clipboard API is available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(bankingInfo.accountNumber);
        setCopyFeedback("Disalin!");
      } else {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = bankingInfo.accountNumber;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
          setCopyFeedback("Disalin!");
        } catch (err) {
          setCopyFeedback("Tidak dapat menyalin");
        }
        document.body.removeChild(textArea);
      }
    } catch (error) {
      setCopyFeedback("Ralat menyalin");
      console.error("Error copying to clipboard:", error);
    }

    // Clear feedback after 2 seconds
    setTimeout(() => setCopyFeedback(""), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Angpow" maxWidth="450px">
      <div className={styles.bankingSection}>
        <div className={styles.infoCard}>
          <h3 className={styles.sectionTitle}>Maklumat Perbankan</h3>

          <div className={styles.infoRow}>
            <span className={styles.label}>Nama Bank:</span>
            <span className={styles.value}>{bankingInfo.bankName}</span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.label}>No Akaun:</span>
            <div className={styles.accountWrapper}>
              <span className={styles.value}>{bankingInfo.accountNumber}</span>
              <button
                className={styles.copyButton}
                onClick={handleCopyAccountNumber}
                title="Copy account number"
              >
                <GoCopy />
                {copyFeedback && (
                  <span className={styles.copyFeedback}>{copyFeedback}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.qrSection}>
          <h3 className={styles.sectionTitle}>Kod QR</h3>
          <div className={styles.qrContainer}>
            <img
              src={bankingInfo.qrCodeUrl}
              alt="QR Code for Payment"
              className={styles.qrImage}
              onError={(e) => {
                // Fallback if QR image is not found
                const target = e.target as HTMLImageElement;
                target.src =
                  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f0c97b"/><text x="100" y="100" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="16">QR Code</text></svg>';
              }}
            />
          </div>

          <button
            className={styles.saveButton}
            onClick={handleSaveQR}
            disabled={isDownloading}
          >
            <FiDownload />
            {isDownloading ? "Saving..." : "Simpan"}
          </button>
        </div>
      </div>

      {/* <div className={styles.thankYouMessage}>
        <p>Terima kasih atas sumbangan anda! 🙏</p>
        <p>Thank you for your generous gift! 🙏</p>
      </div> */}
    </Modal>
  );
}
