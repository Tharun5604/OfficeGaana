'use client';

import { useState, useRef, useEffect } from 'react';

const galleryData = [
  { title: 'Live Performance', img: 'gallery-1.jpg' },
  { title: 'Band Rehearsal', img: 'gallery-2.jpg' },
  { title: 'Studio Session', img: 'gallery-3.jpg' },
  { title: 'Backstage Moments', img: 'gallery-4.jpg' },
  { title: 'Fan Meet & Greet', img: 'gallery-5.jpg' },
  { title: 'On Tour', img: 'gallery-6.jpg' }
];

export default function FlickingGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const isMobile = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect if mobile
    isMobile.current = window.innerWidth <= 768;

    // Mouse events for desktop
    const handleMouseDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX;
      startY.current = e.pageY;
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
      startY.current = e.touches[0].pageY;
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

    // Add event listeners
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

  // Navigation buttons
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < galleryData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
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
            <div className="flick-stack-inner">
              <div className="flick-stack-bg"></div>
              
              <figcaption className="flick-stack-caption">
                {item.title}
              </figcaption>
              
              <div className="flick-stack-separator"></div>
              
              <div className="flick-stack-image">
                <img
                  src={`/images/gallery/${item.img}`}
                  alt={item.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #fea331, #ffd656)';
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
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

      {/* Pagination Dots */}
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

      {/* Card Counter */}
      <div className="flick-counter">
        {currentIndex + 1} / {galleryData.length}
      </div>
    </div>
  );
}