"use client";

import { useState } from "react";
import styles from "./wishlist.module.css";
import { FiExternalLink } from "react-icons/fi";
import { GoCopy } from "react-icons/go";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Modal } from "../modal/modal";
import { LuHeartHandshake } from "react-icons/lu";

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WishlistItem {
  id: number;
  name: string;
  image: string;
  shopeeLink: string;
  price?: string;
  description?: string;
}

// Sample Shopee wishlist items - you can customize these
const wishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: "Wheelstand Racer Vibes 🏎️",
    image: "/assets/shopee-1.webp",
    shopeeLink:
      "https://shopee.com.my/S5-Supra-Racing-Simulator-Wheelstand-for-Moza-Simagic-G29-T300-Logitech-FANATEC-Racing-Wheel-stand-foldable-rig-sim-i.1304970579.26555670119?xptdk=125db1e0-19a8-4d58-8e87-e356dba39354",
    price: "RM 494.00",
    description:
      "Untuk future ‘racer’ dalam rumah 😎 Kasi real sikit vibe bila main game, tak goyang-goyang lagi!",
  },
  {
    id: 2,
    name: "Kabinet TV Chill Time 📺",
    image: "/assets/shopee-2.webp",
    shopeeLink:
      "https://shopee.com.my/ELISA-HOME-Aishah-5ft-Low-TV-Cabinet-Kabinet-TV-Rendah-%E7%94%B5%E8%A7%86%E6%9F%9C-i.277735313.14101823077?xptdk=304e9b9c-7217-4bc8-97c7-40ccae33f5fa",
    price: "RM 169.58",
    description:
      "Nak letak TV elok-elok, baru lawa ruang tamu ✨ Kemas sikit, Netflix & chill style.",
  },
  {
    id: 3,
    name: "TP-Link Archer AX55 AX3000",
    image: "/assets/shopee-3.webp",
    shopeeLink:
      "hhttps://shopee.com.my/TP-Link-Archer-AX55-AX3000-WiFi-6-Mesh-WiFi-Onemesh-Gigabit-AX-Router-OFDMA-Low-Latency-WPA3-OpenVPN-IPV6--i.91478005.15137277563?xptdk=99d3545e-156f-4c70-94a2-5c9fa9d53905",
    price: "RM 349.00",
    description:
      "WiFi laju untuk semua – takde lagi lag masa Netflix, Shopee, atau Mobile Legends 🔥",
  },
  {
    id: 4,
    name: "Bantal Sweet Dream 😴",
    image: "/assets/shopee-4.webp",
    shopeeLink:
      "https://shopee.com.my/Jean-Perry-Hotel-Series-Ultra-Luxe-Pillow-i.20165543.26608230944?xptdk=0b1ed1c2-f03c-4fbd-930a-80c47bbdde51",
    price: "RM 52.50",
    description:
      "Bantal empuk untuk mimpi indah 😴 Kasi tidur pengantin baru lebih selesa hehe.",
  },
  {
    id: 5,
    name: "Tilam Recharge Power 🛏️",
    image: "/assets/shopee-5.webp",
    shopeeLink:
      "https://shopee.com.my/10CM-Latex-Mattress-Single-Queen-King-Tatami-Foldable-Mattress-Thick-Mattress-Topper-i.1229626534.28815389385?xptdk=252ade66-9759-47c2-8c38-d8eb405d93015",
    price: "RM 169.90",
    description:
      "Tilam ngam untuk recharge after penat kerje 🛏️ Sweet dream every night.",
  },
  {
    id: 6,
    name: "Meja Kerja + Gaming 🎮",
    image: "/assets/shopee-6.webp",
    shopeeLink:
      "https://shopee.com.my/YISONG-Z-Type-Gaming-Office-Computer-Study-Table-Meja-Gaming-Split-Top-With-Cable-Management-i.1257732505.44014270515?xptdk=fe620a73-35c5-4ae5-bbf7-4dfe41a8bf3e",
    price: "RM 249.90",
    description:
      "Meja style untuk kerja + gaming. Senang nak grind siang kerja, malam gaming 🎮",
  },
];

// Contact information for delivery
const deliveryInfo = {
  address:
    "B-6-17 PPR Kampung Muhibbah, Batu 6 1/2 Jalan Puchong, 58200 Kuala Lumpur, Petaling, W.P. Kuala Lumpur, W.P. Kuala Lumpur, ",
  phoneNumber: "013-3269220",
  recipientName: "Avie Sinar & Ayuni Muspirah",
};

export function Wishlist({ isOpen, onClose }: WishlistProps) {
  const [loadingItems, setLoadingItems] = useState<number[]>([]);
  const [copyFeedback, setCopyFeedback] = useState<{
    address: string;
    phone: string;
  }>({
    address: "",
    phone: "",
  });

  if (!isOpen) return null;

  const handleItemClick = (item: WishlistItem) => {
    setLoadingItems((prev) => [...prev, item.id]);

    // Open Shopee link in new tab
    window.open(item.shopeeLink, "_blank", "noopener,noreferrer");

    // Remove loading state after a short delay
    setTimeout(() => {
      setLoadingItems((prev) => prev.filter((id) => id !== item.id));
    }, 1000);
  };

  const handleCopyAddress = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(deliveryInfo.address);
        setCopyFeedback((prev) => ({ ...prev, address: "Disalin!" }));
      } else {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = deliveryInfo.address;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
          setCopyFeedback((prev) => ({ ...prev, address: "Disalin!" }));
        } catch (err) {
          setCopyFeedback((prev) => ({ ...prev, address: "Gagal menyalin" }));
        }
        document.body.removeChild(textArea);
      }
    } catch (error) {
      setCopyFeedback((prev) => ({ ...prev, address: "Ralat menyalin" }));
      console.error("Error copying address:", error);
    }

    setTimeout(() => {
      setCopyFeedback((prev) => ({ ...prev, address: "" }));
    }, 2000);
  };

  const handleCopyPhone = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(deliveryInfo.phoneNumber);
        setCopyFeedback((prev) => ({ ...prev, phone: "Disalin!" }));
      } else {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = deliveryInfo.phoneNumber;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
          setCopyFeedback((prev) => ({ ...prev, phone: "Disalin!" }));
        } catch (err) {
          setCopyFeedback((prev) => ({ ...prev, phone: "Gagal menyalin" }));
        }
        document.body.removeChild(textArea);
      }
    } catch (error) {
      setCopyFeedback((prev) => ({ ...prev, phone: "Ralat menyalin" }));
      console.error("Error copying phone:", error);
    }

    setTimeout(() => {
      setCopyFeedback((prev) => ({ ...prev, phone: "" }));
    }, 2000);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback image if the item image fails to load
    const target = e.target as HTMLImageElement;
    target.src =
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f0f0f0"/><text x="100" y="90" text-anchor="middle" fill="%23999" font-size="14">No Image</text><text x="100" y="110" text-anchor="middle" fill="%23999" font-size="12">Available</text></svg>';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Wedding Wishlist"
      maxWidth="600px"
    >
      <div className={styles.wishlistIntro}>
        <p>
          Jom support kami mulakan chapter baru <LuHeartHandshake />
        </p>
        <p>Klik je mana-mana item, terus boleh tengok kat Shopee.</p>
      </div>

      {/* Delivery Information Section */}
      <div className={styles.deliverySection}>
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FaMapMarkerAlt className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Alamat Penghantaran</h3>
          </div>
          <div className={styles.infoContent}>
            <p className={styles.recipientName}>{deliveryInfo.recipientName}</p>
            <p className={styles.address}>{deliveryInfo.address}</p>
            <button
              className={styles.copyButton}
              onClick={handleCopyAddress}
              title="Copy address"
            >
              <GoCopy /> Copy Address
              {copyFeedback.address && (
                <span className={styles.copyFeedback}>
                  {copyFeedback.address}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FaPhone className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Nombor Telefon</h3>
          </div>
          <div className={styles.infoContent}>
            <p className={styles.phoneNumber}>{deliveryInfo.phoneNumber}</p>
            <button
              className={styles.copyButton}
              onClick={handleCopyPhone}
              title="Copy phone number"
            >
              <GoCopy /> Copy Number
              {copyFeedback.phone && (
                <span className={styles.copyFeedback}>
                  {copyFeedback.phone}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.itemsGrid}>
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.itemCard} ${
              loadingItems.includes(item.id) ? styles.loading : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            <div className={styles.imageContainer}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.itemImage}
                onError={handleImageError}
              />
              <div className={styles.linkIcon}>
                <FiExternalLink />
              </div>
            </div>

            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>{item.name}</h3>
              {item.description && (
                <p className={styles.itemDescription}>{item.description}</p>
              )}
              {item.price && (
                <div className={styles.itemPrice}>{item.price}</div>
              )}
            </div>

            {loadingItems.includes(item.id) && (
              <div className={styles.loadingOverlay}>
                <div className={styles.spinner}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* <div className={styles.thankYouMessage}>
        <p>Thank you for helping us build our future together! 🏠💕</p>
        <p>
          Terima kasih kerana membantu kami membina masa depan bersama! 🏠💕
        </p>
      </div> */}
    </Modal>
  );
}
