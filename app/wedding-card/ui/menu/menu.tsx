"use client";

import { useState } from "react";
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
  { label: "Money Gift", link: "#money-gift", icon: <BsCashCoin /> },
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

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (index: number) => {
    setClickedIndex(index);
    // Hide tooltip after 2 seconds on click
    setTimeout(() => setClickedIndex(null), 2000);

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
              <div className={styles.tooltip}>{item.label}</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
