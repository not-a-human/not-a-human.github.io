"use client";

import { useEffect, useRef, useState } from "react";
import animationStyles from "../animations.module.css";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -100px 0px",
    triggerOnce = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

// Animation variants
export type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "scaleUp"
  | "slideUp"
  | "slideDown";

export const getAnimationClasses = (
  isVisible: boolean,
  animationType: AnimationType = "fadeIn",
  delay: number = 0
): string => {
  const animationClass =
    animationStyles[animationType] || animationStyles.fadeIn;
  const visibleClass = isVisible ? animationStyles.visible : "";
  const delayClass = delay > 0 ? animationStyles[`delay-${delay}`] || "" : "";

  return `${animationClass} ${visibleClass} ${delayClass}`.trim();
};
