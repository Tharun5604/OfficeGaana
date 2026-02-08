'use client';

import { useState, useRef, useEffect } from 'react';

const galleryData = [
  { img: 'gallery-1.jpg' },
  { img: 'gallery-2.jpg' },
  { img: 'gallery-3.jpg' },
  { img: 'gallery-4.jpg' },
  { img: 'gallery-5.jpg' },
  { img: 'gallery-6.jpg' }
];

export default function FlickingGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mouse events for desktop
    const handleMouseDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX;
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const diffX = e.pageX - startX.current;
      
      if (Math.abs(diffX) > 50) {
        if (diffX > 0 && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        } else if (diffX < 0 && currentIndex < galleryData.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
        isDragging.current = false;
        container.style.cursor = 'grab';
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      container.style.cursor = 'grab';
    };

    // Touch events for mobile
    const handleTouchStart = (e) => {
      isDragging.current = true;
      startX.current = e.touches[0].pageX;
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current) return;
      const diffX = e.touches[0].pageX - startX.current;
      
      if (Math.abs(diffX) > 50) {
        if (diffX > 0 && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        } else if (diffX < 0 && currentIndex < galleryData.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
        isDragging.current = false;
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
    
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex]);

  const goToPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goToNext = () => {
    if (currentIndex < galleryData.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="flicking-wrapper">
      <div ref={containerRef} className="flicking-stack-container">
        {galleryData.map((item, i) => (
          <div
            key={i}
            className={`flick-stack-card ${
              currentIndex === i ? 'active' : ''
            } ${i < currentIndex ? 'prev' : ''} ${i > currentIndex ? 'next' : ''}`}
            style={{
              zIndex: galleryData.length - Math.abs(currentIndex - i),
              transform: `
                scale(${1 - Math.abs(currentIndex - i) * 0.05}) 
                translateX(${(i - currentIndex) * 100}%) 
                rotateY(${(i - currentIndex) * 15}deg)
              `
            }}
          >
            <img
              src={`/images/gallery/${item.img}`}
              alt={`Gallery image ${i + 1}`}
              className="flick-stack-image"
              onError={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #fea331, #ffd656)';
              }}
            />
          </div>
        ))}
      </div>

      <button
        className="flick-nav-btn flick-nav-prev"
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        className="flick-nav-btn flick-nav-next"
        onClick={goToNext}
        disabled={currentIndex === galleryData.length - 1}
        aria-label="Next"
      >
        ›
      </button>

      <div className="flick-stack-pagination">
        {galleryData.map((_, i) => (
          <button
            key={i}
            className={`flick-dot ${currentIndex === i ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="flick-counter">
        {currentIndex + 1} / {galleryData.length}
      </div>
    </div>
  );
}