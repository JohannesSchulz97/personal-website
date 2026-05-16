"use client";

import { useEffect, useState, useRef } from "react";

export default function CursorSpotlight() {
  const [isOverHero, setIsOverHero] = useState(false);
  const [hasMovedMouse, setHasMovedMouse] = useState(false);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkHeroPosition = (clientX: number, clientY: number) => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const isOver = clientX >= rect.left && clientX <= rect.right &&
                       clientY >= rect.top && clientY <= rect.bottom;
        setIsOverHero(isOver);
      }
    };

    const updateCursorPosition = (e: MouseEvent) => {
      setHasMovedMouse(true);
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      checkHeroPosition(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      checkHeroPosition(mousePosRef.current.x, mousePosRef.current.y);
    };

    window.addEventListener("mousemove", updateCursorPosition);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-30 transition duration-300 ${!hasMovedMouse || isOverHero ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background: `radial-gradient(600px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    />
  );
}
