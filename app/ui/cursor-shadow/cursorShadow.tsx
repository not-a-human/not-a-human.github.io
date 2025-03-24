"use client";

import { useEffect, useState } from "react";
import styles from "./cursor-shadow.module.css";

export function CursorShadow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Get the viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Get the scroll offsets
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      // Calculate the constrained position
      const x = Math.min(
        Math.max(event.pageX - scrollX, 25),
        viewportWidth - 25
      ); // 25 is half the shadow's width
      const y = Math.min(
        Math.max(event.pageY - scrollY, 25),
        viewportHeight - 25
      ); // 25 is half the shadow's height

      setPosition({ x: event.pageX, y: event.pageY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      id="cursor-shadow"
      className={styles.cursorShadow}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
}
