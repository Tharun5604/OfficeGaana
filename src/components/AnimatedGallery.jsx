"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AnimatedGallery.module.css";

const images = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/4.jpg",
  "/images/gallery/5.jpg",
  "/images/gallery/6.jpg",
  "/images/gallery/7.jpg",
  "/images/gallery/8.jpg",
];

export default function AnimatedGallery() {
  const [selected, setSelected] = useState(null);
  const [direction, setDirection] = useState(0);

  // 🎵 Preload swipe sounds
  const soundsRef = useRef([]);

  useEffect(() => {
    soundsRef.current = [
      new Audio("/sounds/swipe1.mp3"),
      new Audio("/sounds/swipe2.mp3"),
    //   new Audio("/sounds/swipe3.mp3"),
    ];

    soundsRef.current.forEach((audio) => {
      audio.volume = 0.4;
    });
  }, []);

  const playSwipeSound = () => {
    const sounds = soundsRef.current;
    if (!sounds.length) return;

    const random =
      sounds[Math.floor(Math.random() * sounds.length)];

    random.currentTime = 0;
    random.play().catch(() => {});
  };

  // Navigation functions
  const nextImage = useCallback(() => {
    if (selected === null) return;
    playSwipeSound();
    setDirection(1);
    setSelected((prev) => (prev + 1) % images.length);
  }, [selected]);

  const prevImage = useCallback(() => {
    if (selected === null) return;
    playSwipeSound();
    setDirection(-1);
    setSelected((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }, [selected]);

  // ⌨️ ESC + Arrow Keys
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextImage, prevImage]);

  return (
    <div className={styles.container}>
      {/* GRID */}
      <div className={styles.grid}>
        {images.map((src, index) => (
          <motion.div
            key={index}
            layoutId={`image-${index}`}
            className={styles.galleryItem}
            onClick={() => setSelected(index)}
            whileHover={{ scale: 1.05 }}
          >
            <img src={src} alt="" />
          </motion.div>
        ))}
      </div>

      {/* FULLSCREEN */}
      <AnimatePresence mode="wait">
        {selected !== null && (
          <>
            {/* 🎇 Overlay */}
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />

            {/* ⬅️➡️ Navigation */}
            <button
              className={`${styles.nav} ${styles.left}`}
              onClick={prevImage}
            >
              ←
            </button>

            <button
              className={`${styles.nav} ${styles.right}`}
              onClick={nextImage}
            >
              →
            </button>

            {/* Swipe Image */}
            <motion.img
              key={selected}
              src={images[selected]}
              className={styles.fullscreenImage}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) nextImage();
                if (info.offset.x > 100) prevImage();
              }}
              initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}