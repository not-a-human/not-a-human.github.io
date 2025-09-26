"use client";

import { useState } from "react";
import { TfiGift } from "react-icons/tfi";
import styles from "./menu.module.css";
import { LuUserRoundCheck } from "react-icons/lu";
import { BsCashCoin } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { RxCalendar } from "react-icons/rx";
import { Rsvp } from "../rsvp/rsvp";
import { MoneyGift } from "../money-gift/moneyGift";
import { Wishlist } from "../wishlist/wishlist";
import { Location } from "../location/location";
import { Calendar } from "../calendar/calendar";

const menuItems = [
  { label: "RSVP", link: "#rsvp", icon: <LuUserRoundCheck /> },
  { label: "Money Gift", link: "#money-gift", icon: <BsCashCoin /> },
  { label: "Wishlist", link: "#wishlist", icon: <TfiGift /> },
  { label: "Location", link: "#location", icon: <GrMapLocation /> },
  { label: "Calendar", link: "#calendar", icon: <RxCalendar /> },
];

export function Menu() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [showRsvpPopup, setShowRsvpPopup] = useState(false);
  const [showMoneyGiftPopup, setShowMoneyGiftPopup] = useState(false);
  const [showWishlistPopup, setShowWishlistPopup] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [showCalendarPopup, setShowCalendarPopup] = useState(false);

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

    // Open RSVP popup for the first menu item (RSVP)
    if (index === 0) {
      setShowRsvpPopup(true);
    }

    // Open Money Gift popup for the second menu item (Money Gift)
    if (index === 1) {
      setShowMoneyGiftPopup(true);
    }

    // Open Wishlist popup for the third menu item (Wishlist)
    if (index === 2) {
      setShowWishlistPopup(true);
    }

    // Open Location popup for the fourth menu item (Location)
    if (index === 3) {
      setShowLocationPopup(true);
    }

    // Open Calendar popup for the fifth menu item (Calendar)
    if (index === 4) {
      setShowCalendarPopup(true);
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

      <Rsvp isOpen={showRsvpPopup} onClose={() => setShowRsvpPopup(false)} />
      <MoneyGift
        isOpen={showMoneyGiftPopup}
        onClose={() => setShowMoneyGiftPopup(false)}
      />
      <Wishlist
        isOpen={showWishlistPopup}
        onClose={() => setShowWishlistPopup(false)}
      />
      <Location
        isOpen={showLocationPopup}
        onClose={() => setShowLocationPopup(false)}
      />
      <Calendar
        isOpen={showCalendarPopup}
        onClose={() => setShowCalendarPopup(false)}
      />
    </>
  );
}
