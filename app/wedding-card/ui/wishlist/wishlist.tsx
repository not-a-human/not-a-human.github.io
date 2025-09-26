"use client";

import { useState } from "react";
import styles from "./wishlist.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";

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
    name: "Kitchen Appliance Set",
    image: "/assets/sample-item1.svg",
    shopeeLink: "https://shopee.com.my/product/123456789/987654321",
    price: "RM 299.00",
    description: "Complete kitchen starter set",
  },
  {
    id: 2,
    name: "Home Decor Bundle",
    image: "/assets/sample-item2.svg",
    shopeeLink: "https://shopee.com.my/product/123456789/987654322",
    price: "RM 149.00",
    description: "Beautiful home decoration items",
  },
  {
    id: 3,
    name: "Bedding Set",
    image: "/assets/sample-item3.svg",
    shopeeLink: "https://shopee.com.my/product/123456789/987654323",
    price: "RM 189.00",
    description: "Premium quality bedding set",
  },
  {
    id: 4,
    name: "Electronics Bundle",
    image: "/assets/sample-item4.svg",
    shopeeLink: "https://shopee.com.my/product/123456789/987654324",
    price: "RM 599.00",
    description: "Essential electronics for new home",
  },
  {
    id: 5,
    name: "Furniture Set",
    image: "/assets/sample-item5.svg",
    shopeeLink: "https://shopee.com.my/product/123456789/987654325",
    price: "RM 899.00",
    description: "Modern furniture collection",
  },
  {
    id: 6,
    name: "Bathroom Essentials",
    image: "/assets/sample-item6.svg",
    shopeeLink: "https://shopee.com.my/product/123456789/987654326",
    price: "RM 129.00",
    description: "Complete bathroom essentials kit",
  },
];

export function Wishlist({ isOpen, onClose }: WishlistProps) {
  const [loadingItems, setLoadingItems] = useState<number[]>([]);

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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback image if the item image fails to load
    const target = e.target as HTMLImageElement;
    target.src =
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f0f0f0"/><text x="100" y="90" text-anchor="middle" fill="%23999" font-size="14">No Image</text><text x="100" y="110" text-anchor="middle" fill="%23999" font-size="12">Available</text></svg>';
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h2 className={styles.popupTitle}>Wedding Wishlist</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <IoCloseOutline />
          </button>
        </div>

        <div className={styles.popupBody}>
          <div className={styles.wishlistIntro}>
            <p>Help us start our new journey together! 💝</p>
            <p>Click on any item to view it on Shopee.</p>
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

          <div className={styles.thankYouMessage}>
            <p>Thank you for helping us build our future together! 🏠💕</p>
            <p>
              Terima kasih kerana membantu kami membina masa depan bersama! 🏠💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
