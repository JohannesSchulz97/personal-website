"use client";

import { useEffect, useState } from "react";

export default function CursorSpotlight() {
  const [isOverHero, setIsOverHero] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);

      // Check if cursor is over hero section
      const target = e.target as HTMLElement;
      const heroSection = target.closest('#hero-section');
      setIsOverHero(!!heroSection);
    };

    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-30 transition duration-300 ${isOverHero ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background: `radial-gradient(600px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    />
  );
}
