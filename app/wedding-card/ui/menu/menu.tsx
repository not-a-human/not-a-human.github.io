"use client";

import { useState, useRef } from "react";
import { TfiGift } from "react-icons/tfi";
import styles from "./menu.module.css";
import { LuUserRoundCheck } from "react-icons/lu";
import { BsCashCoin } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { RxCalendar } from "react-icons/rx";

interface MenuProps {
  onOpenRsvp?: () => void;
  onOpenMoneyGift?: () => void;
  onOpenWishlist?: () => void;
  onOpenLocation?: () => void;
  onOpenCalendar?: () => void;
}

const menuItems = [
  { label: "RSVP", link: "#rsvp", icon: <LuUserRoundCheck /> },
  { label: "Angpow", link: "#money-gift", icon: <BsCashCoin /> },
  { label: "Wishlist", link: "#wishlist", icon: <TfiGift /> },
  { label: "Location", link: "#location", icon: <GrMapLocation /> },
  { label: "Calendar", link: "#calendar", icon: <RxCalendar /> },
];

export function Menu({
  onOpenRsvp,
  onOpenMoneyGift,
  onOpenWishlist,
  onOpenLocation,
  onOpenCalendar,
}: MenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [firstClickIndex, setFirstClickIndex] = useState<number | null>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (index: number) => {
    // If this is the first click on this item
    if (firstClickIndex !== index) {
      // Show tooltip for first click
      setClickedIndex(index);
      setFirstClickIndex(index);

      // Clear any existing timeout
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }

      // Reset first click state after 3 seconds
      clickTimeoutRef.current = setTimeout(() => {
        setFirstClickIndex(null);
        setClickedIndex(null);
      }, 3000);

      return; // Don't open modal on first click
    }

    // This is the second click - open modal
    setClickedIndex(null);
    setFirstClickIndex(null);

    // Clear timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // Open appropriate modal using callback props
    if (index === 0) {
      onOpenRsvp?.();
    }
    if (index === 1) {
      onOpenMoneyGift?.();
    }
    if (index === 2) {
      onOpenWishlist?.();
    }
    if (index === 3) {
      onOpenLocation?.();
    }
    if (index === 4) {
      onOpenCalendar?.();
    }
  };

  return (
    <>
      <div className={styles.container}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={styles.menuItem}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          >
            <div className={styles.icon}>{item.icon}</div>
            {(hoveredIndex === index || clickedIndex === index) && (
              <div className={styles.tooltip}>
                {firstClickIndex === index ? (
                  <>
                    {item.label}
                    <br />
                    <span className={styles.clickAgain}>
                      Click again to open
                    </span>
                  </>
                ) : (
                  item.label
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
