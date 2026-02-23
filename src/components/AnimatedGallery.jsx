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
  const [selectedIndex, setSelectedIndex] = useState(null);

  const close = () => setSelectedIndex(null);

  const next = () =>
    setSelectedIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );

  const prev = () =>
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  // ESC key close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* 🔥 Masonry Grid */}
      <div className="gallery-grid">
        {images.map((img, index) => (
          <motion.div
            key={index}
            layout
            className="gallery-item"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedIndex(index)}
          >
            <img src={img} alt="concert" />
          </motion.div>
        ))}
      </div>

      {/* 🔥 Fullscreen Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fullscreen-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              key={images[selectedIndex]}
              src={images[selectedIndex]}
              className="fullscreen-image"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />

            <button className="nav left" onClick={prev}>
              ⬅
            </button>
            <button className="nav right" onClick={next}>
              ➡
            </button>

            <button className="close-btn" onClick={close}>
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}