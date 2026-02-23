'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import AnimatedGallery from "@/components/AnimatedGallery/AnimatedGallery";

const currentYear = new Date().getFullYear();

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionRefs = {
    home: useRef(null),
    music: useRef(null),
    concerts: useRef(null),
    gallery: useRef(null),
    about: useRef(null),
    videos: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const ref = sectionRefs[sectionId];
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <main className="single-page-app">
      {/* NAVBAR COMPONENT */}
      <Navbar scrollToSection={scrollToSection} />

      {/* HOME SECTION */}
      <section ref={sectionRefs.home} id="home" className="hero">
        <div className="hero::before"></div>
        <div className="hero-content">
          <h1>Officegaana</h1>
          <p className="hashtag">#blah blah blah</p>
          <p className="release-text"></p>
        </div>
      </section>

      {/* CONCERTS SECTION */}
      <section ref={sectionRefs.concerts} id="concerts" className="concerts">
        <h2>Upcoming Concerts</h2>
        <div className="subtitle">Tour Dates 2025</div>
        <p className="cities">Multiple Cities</p>
        <p>Join us for an unforgettable experience across major cities.</p>
        <div className="email-signup">
          <input type="email" placeholder="Enter your email for tour updates" />
          <button>Notify Me</button>
        </div>
      </section>

     {/* GALLERY SECTION */}
        <section
          ref={sectionRefs.gallery}
          id="gallery"
          className="section"
        >
          <h2 className="sectionTitle">Gallery</h2>
          <AnimatedGallery />
       </section>

        {/* MUSIC SECTION */}
      <MusicSection sectionRef={sectionRefs.music} />

      {/* ABOUT SECTION */}
      <section ref={sectionRefs.about} id="about" className="about">
        <div className="about-content">
          <div className="about-icon">🎤</div>
          <h2>About Office Gaana</h2>
          <p>
           Initially gaining traction through Instagram Reels, the office
           gaana guys are a bunch of friends who "seriously chill" and have
           fun😉at an office.
          </p>
          <p>
            After our runaway hit on Instagram, Office Gaana is now a live
            band featuring over 15 talented musicians on stage. We offer an
            immersive concert experience, blending elements of office
            drama and electrifying gaana that captivates the audience and
            sets a new standard in the world of music entertainment.
          </p>
          <p>
            KELU KELU KELUUU - "Office Gaana" is all about revolutionising
            the music scene by infusing sounds of Madras into multilingual
            tunes with a corporate flair. The new Hit Machine “Office Gaana''
            not only entertains but also bridges diverse musical genres
            making it a must-experience phenomenon.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section ref={sectionRefs.contact} id="contact" className="page">
        <h1>Get In Touch</h1>
        <p>Have a question or want to collaborate? We'd love to hear from you!</p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="6" required></textarea>
          <button type="submit" className="primary">Send Message</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo"> <img src="/images/logo-nobg-resize.png" alt="OfficeGaana Logo" /></div>
        <p>© All rights reserved · OfficeGaana {currentYear}</p>
        <div className="footer-social">
          <a 
            href="https://www.instagram.com/officegaana" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
            className="social-link"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a 
            href="https://www.youtube.com/@TheOfficeGaanaGuys" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="social-link"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
        <div className="developer-info">
          <p>Developed by <a href="https://www.linkedin.com/in/tharun-kubendiran-594004286/" 
                             target="_blank" 
                             rel="noopener noreferrer"
                            >Tharun K</a></p>
        </div>
      </footer>
    </main>
  );
}

// MUSIC SECTION COMPONENT
function MusicSection({ sectionRef }) {
  const [videos, setVideos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const videoData = [
      {
        url: 'https://youtu.be/nvb6HdHACjE?si=sA1AYBqtxN_OUCJi',
        title: 'Sound Check | Office Gaana - Opening for Thenisai'
      },
      {
        url: 'https://youtu.be/C8XPal1z4YA?si=03TzUM7YLh7bEib3',
        title: '🎉 One Year of Office Gaana – The Journey & Celebration! 🎶'
      },
      {
        url: 'https://youtu.be/wzL1gYQAWF0?si=rUxLAt94Mu0sHLP6',
        title: 'Office Gaana - Dheema Dheema | Gaana Version'
      },
      {
        url: 'https://youtu.be/qXqXYkEoDuI?si=w_DnFLNbVlSy3D3V',
        title: 'Kanmani | Office Gaana | Live Concert | Made Of Chennai'
      }
    ];

    const processedVideos = videoData.map((video) => {
      let videoId = '';
      if (video.url.includes('youtu.be/')) {
        videoId = video.url.split('youtu.be/')[1].split('?')[0];
      } else if (video.url.includes('youtube.com/watch?v=')) {
        videoId = video.url.split('v=')[1].split('&')[0];
      } else if (video.url.includes('youtube.com/embed/')) {
        videoId = video.url.split('embed/')[1];
      }

      return { id: videoId, title: video.title, url: video.url };
    });

    setVideos(processedVideos);
    setLoading(false);
  }, []);

  const selectedVideo = videos[selectedIndex];

  return (
    <section ref={sectionRef} id="music" className="music">
      <h2>Featured Videos</h2>
      
      {loading ? (
        <div className="loading-container">
          <p className="loading-text">Loading videos...</p>
        </div>
      ) : videos.length > 0 ? (
        <div className="videos-showcase">
          {/* CENTER VIDEO */}
          <div className="center-video-section">
            {selectedVideo && (
              <>
                <div className="center-video-container">
                  <iframe
                    key={selectedVideo.id}
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=0`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="center-video-info">
                  <h3>{selectedVideo.title}</h3>
                </div>
              </>
            )}
          </div>

          {/* CAROUSEL */}
          <div className="right-carousel-section">
            <div className="carousel-track">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className={`carousel-video-card ${selectedIndex === index ? 'active' : ''}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <img 
                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                    className="carousel-thumbnail"
                  />
                  <p className="carousel-title">{video.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}