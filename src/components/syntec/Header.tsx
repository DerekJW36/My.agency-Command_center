"use client";
import React, { useEffect, useState } from 'react';
import './Header.css';

const NAV_LINKS = [
  { href: '#solutions', label: 'Solutions' },
  { href: '#proof',     label: 'Proof' },
  { href: '#pricing',   label: 'Pricing' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize back to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-content">
          <a href="/" className="logo">
            ETHERTECSYS<span className="logo-accent"> DCG</span>
          </a>

          {/* Desktop nav */}
          <nav className="nav" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="nav-link">{label}</a>
            ))}
            <a href="#contact" className="nav-cta">Claim Free Audit</a>
          </nav>

          {/* Hamburger button — mobile only */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(prev => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="mobile-nav-link" onClick={closeMenu}>{label}</a>
          ))}
          <a href="#contact" className="mobile-nav-cta" onClick={closeMenu}>Claim Free Audit</a>
        </nav>
      </div>

      {/* Backdrop */}
      {menuOpen && <div className="mobile-backdrop" onClick={closeMenu} aria-hidden="true" />}
    </>
  );
};

export default Header;
