// components/AnimatedGallery.jsx
'use client';
import DomeGallery from './DomeGallery';

export default function AnimatedGallery() {
  return (
    <div style={{ width: '100%', height: '70vh', minHeight: '500px' }}>
      <DomeGallery
        fit={0.8}
        minRadius={1000}
        maxVerticalRotationDeg={0}
        segments={34}
        dragDampening={2}
        grayscale={false}
        overlayBlurColor="transparent"
      />
    </div>
  );
}