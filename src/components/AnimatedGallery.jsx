"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AnimatedGallery.module.css";

const images = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/6.jpg",
  "/images/gallery/7.jpg",
  "/images/gallery/9.jpg",
  "/images/gallery/10.jpg",
  "/images/gallery/11.jpg",
  "/images/gallery/12.jpg",
  "/images/gallery/8.jpg",
  "/images/gallery/4.jpg",
  "/images/gallery/5.jpg",
];

const soundFiles = [
  "/sounds/swipe1.mp3",
  "/sounds/swipe2.mp3",
//   "/sounds/swipe3.mp3",
];

export default function AnimatedGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const audioRef = useRef(null);

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

  // Lock scroll when fullscreen open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedIndex]);

  return (
    <>
      <audio ref={audioRef} preload="none" />

      {/* ── MASONRY GRID ── */}
      <div className={styles.masonryGrid}>
        {images.map((src, i) => (
          <motion.div
            key={i}
            className={styles.masonryItem}
            whileHover={{ scale: 1.03, zIndex: 2 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedIndex(i)}
          >
            <img src={src} alt={`Gallery photo ${i + 1}`} />
            <div className={styles.hoverOverlay}>
              <span className={styles.viewIcon}>⊕</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── FULLSCREEN MODAL ── */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />

            {/* Stage lights effect */}
            <div className={styles.stageLights}>
              <div className={styles.light1} />
              <div className={styles.light2} />
              <div className={styles.light3} />
            </div>

            {/* Image */}
            <motion.div
              className={styles.fullscreenWrapper}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) next();
                if (info.offset.x > 80) prev();
              }}
            >
              <img
                src={images[selectedIndex]}
                alt=""
                className={styles.fullscreenImg}
              />
              {/* Counter */}
              <div className={styles.counter}>
                {selectedIndex + 1} / {images.length}
              </div>
            </motion.div>

            {/* Arrows */}
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
              onClick={close}
              aria-label="Close"
            >
              ✕
            </button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}