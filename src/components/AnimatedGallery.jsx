"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AnimatedGallery.module.css";

const images = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/4.jpg",
  "/images/gallery/5.jpg",
  "/images/gallery/6.jpg",
  "/images/gallery/7.jpg",
  "/images/gallery/8.jpg",
  "/images/gallery/9.jpg",
  "/images/gallery/10.jpg",
  "/images/gallery/11.jpg",
  "/images/gallery/12.jpg",
];

const soundFiles = [
  "/sounds/swipe1.mp3",
  "/sounds/swipe2.mp3",
//   "/sounds/swipe3.mp3",
];

export default function AnimatedGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const audioRef = useRef(null);
  const dragStartX = useRef(0);

  const playRandomSound = () => {
    if (!audioRef.current) return;
    const random = soundFiles[Math.floor(Math.random() * soundFiles.length)];
    audioRef.current.src = random;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const close = () => setSelectedIndex(null);

  const next = () => {
    playRandomSound();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    playRandomSound();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedIndex]);

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="none" />

      {/* ── MASONRY GRID ── */}
      <div className={styles.masonryGrid}>
        {images.map((src, i) => (
          <motion.div
            key={i}
            className={styles.masonryItem}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.22 }}
            onClick={() => setSelectedIndex(i)}
          >
            <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
            <div className={styles.hoverOverlay}>
              <span className={styles.viewIcon}>⊕</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── FULLSCREEN MODAL ── */}
      <AnimatePresence>
        {selectedIndex !== null && (
          /* Outer backdrop — clicking it closes */
          <motion.div
            className={styles.modalRoot}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            {/* Stage lights */}
            <div className={styles.stageLights} />

            {/* Inner card — stops click from closing */}
            <motion.div
              className={styles.modalCard}
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{    scale: 0.82, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={images[selectedIndex]}
                alt=""
                className={styles.fullscreenImg}
                draggable={false}
              />

              {/* Counter */}
              <div className={styles.counter}>
                {selectedIndex + 1} / {images.length}
              </div>
            </motion.div>

            {/* ← → Arrows — hidden on mobile via CSS */}
            <button
              className={`${styles.navBtn} ${styles.navLeft}`}
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              className={`${styles.navBtn} ${styles.navRight}`}
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              ›
            </button>

            {/* Close */}
            <button
              className={styles.closeBtn}
              onClick={(e) => { e.stopPropagation(); close(); }}
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}