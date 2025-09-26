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

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(bankingInfo.accountNumber);
    // You could add a toast notification here
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Money Gift"
      maxWidth="450px"
    >
      <div className={styles.bankingSection}>
        <div className={styles.infoCard}>
          <h3 className={styles.sectionTitle}>Banking Information</h3>

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

      <div className={styles.thankYouMessage}>
        <p>Terima kasih atas sumbangan anda! 🙏</p>
        <p>Thank you for your generous gift! 🙏</p>
      </div>
    </Modal>
  );
}
