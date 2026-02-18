'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function Navbar({ scrollToSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar background on scroll
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'music', 'concerts', 'gallery', 'about', 'contact'];
      
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    scrollToSection(sectionId);
  };

  const handleLogoClick = () => {
    setActiveSection('home');
    setIsMobileMenuOpen(false);
    scrollToSection('home');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-content">
        {/* LEFT NAVIGATION */}
        <div className="nav-left">
          <button 
            onClick={() => handleNavClick('about')} 
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
          >
            About
          </button>
          <button 
            onClick={() => handleNavClick('concerts')} 
            className={`nav-link ${activeSection === 'concerts' ? 'active' : ''}`}
          >
            Concerts
          </button>
          <button 
            onClick={() => handleNavClick('music')} 
            className={`nav-link ${activeSection === 'music' ? 'active' : ''}`}
          >
            Music
          </button>
          
        </div>

        {/* LOGO */}
        <button 
          onClick={handleLogoClick} 
          className="logo"
          img src= '/images/logo-nobg-resize.png' alt="OfficeGaana Logo"
        >
          <img src="/images/logo-nobg-resize.png" alt="OfficeGaana Logo" />
        </button>

        {/* RIGHT NAVIGATION */}
        <div className="nav-right">
          <button 
            onClick={() => handleNavClick('gallery')} 
            className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
          >
            Gallery
          </button>
          
          <button 
            onClick={() => handleNavClick('about')} 
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
          >
            The Band
          </button>
          
          <button 
            onClick={() => handleNavClick('contact')} 
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
          >
            Contact
          </button>
          
          {/* SOCIAL ICONS */}
           <div className="social-icons">
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
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <button 
            onClick={() => handleNavClick('about')} 
            className="mobile-menu-link"
          >
            About
          </button>
          <button 
            onClick={() => handleNavClick('concerts')} 
            className="mobile-menu-link"
          >
            Concerts
          </button>
          <button 
            onClick={() => handleNavClick('music')} 
            className="mobile-menu-link"
          >
            Music
          </button>
          <button 
            onClick={() => handleNavClick('gallery')} 
            className="mobile-menu-link"
          >
            Gallery
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className="mobile-menu-link"
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  );
}