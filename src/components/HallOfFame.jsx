// components/HallOfFame.jsx
'use client';
import { useState } from 'react';
import ScrollFloat from '@/components/ScrollFloat';

const LEGENDS = [
  { id: 1, name: 'collab one',   img: '/images/gallery/AR.jpg',       cell: 'tl' },
  { id: 2, name: 'collab two',   img: '/images/gallery/AR.jpg',       cell: 'tr' },
  { id: 3, name: 'instafam',     img: '/images/gallery/instafam.png', cell: 'cc' },
  { id: 4, name: 'collab three', img: '/images/gallery/yuan.jpg',     cell: 'bl' },
  { id: 5, name: 'collab four',  img: '/images/gallery/yuan.jpg',     cell: 'br' },
];

export default function HallOfFame({ sectionRef }) {
  const [activeId, setActiveId] = useState(null);
  const [modalImg, setModalImg] = useState(null);

  const handleCardClick = (legend) => {
    // On mobile: first tap = expand in place, second tap = open modal
    if (activeId === legend.id) {
      setModalImg(legend);
    } else {
      setActiveId(legend.id);
    }
  };

  const closeModal = () => {
    setModalImg(null);
    setActiveId(null);
  };

  return (
    <section ref={sectionRef} id="hall-of-fame" className="hof-section">
      <div className="hof-ring hof-ring--1" />
      <div className="hof-ring hof-ring--2" />

      <div className="hof-header">
       <ScrollFloat textClassName="hof-float-text">Hall of Fame</ScrollFloat>
        {/* <p className="hof-sub">ssjjj</p> */}
      </div>

      <div className="hof-grid-wrapper">
        <svg className="hof-svg" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <line x1="250" y1="250" x2="83"  y2="83"  stroke="#fea331" strokeWidth="1.5" strokeDasharray="6 5" opacity="0.45"/>
          <line x1="250" y1="250" x2="417" y2="83"  stroke="#fea331" strokeWidth="1.5" strokeDasharray="6 5" opacity="0.45"/>
          <line x1="250" y1="250" x2="83"  y2="417" stroke="#fea331" strokeWidth="1.5" strokeDasharray="6 5" opacity="0.45"/>
          <line x1="250" y1="250" x2="417" y2="417" stroke="#fea331" strokeWidth="1.5" strokeDasharray="6 5" opacity="0.45"/>

          {[
            { dur: "2.8s", delay: "0s"   },
            { dur: "3.2s", delay: "0.7s" },
            { dur: "3.0s", delay: "1.4s" },
            { dur: "2.6s", delay: "2.1s" },
          ].map((item, i) => (
            <circle key={i} r="4" fill="#ffd656">
              <animateMotion dur={item.dur} repeatCount="indefinite" begin={item.delay}>
                <mpath href={`#hof-path-${i}`} />
              </animateMotion>
            </circle>
          ))}
          <path id="hof-path-0" d="M250,250 L83,83"   fill="none"/>
          <path id="hof-path-1" d="M250,250 L417,83"  fill="none"/>
          <path id="hof-path-2" d="M250,250 L83,417"  fill="none"/>
          <path id="hof-path-3" d="M250,250 L417,417" fill="none"/>
        </svg>

        <div className="hof-grid">
          {LEGENDS.map((legend) => (
            <div
              key={legend.id}
              className={`hof-card hof-card--${legend.cell} ${activeId === legend.id ? 'hof-card--tapped' : ''}`}
              onClick={() => handleCardClick(legend)}
            >
              <div className="hof-card__frame">
                <img src={legend.img} alt={legend.name} />
                <div className="hof-card__shine" />
                {/* Tap hint — shows only on mobile */}
                <div className="hof-tap-hint">
                  {activeId === legend.id ? '👆 Tap again to expand' : '👆 Tap to preview'}
                </div>
              </div>
              <div className="hof-card__info">
                <span className="hof-card__name">{legend.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      {modalImg && (
        <div className="hof-modal" onClick={closeModal}>
          <div className="hof-modal__backdrop" />
          <div className="hof-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="hof-modal__close" onClick={closeModal}>✕</button>
            <img src={modalImg.img} alt={modalImg.name} className="hof-modal__img" />
            <p className="hof-modal__name">{modalImg.name}</p>
          </div>
        </div>
      )}
    </section>
  );
}