import React, { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <a href="/" className="logo">
          DCG SYNTEC<span className="logo-accent"> AI</span>
        </a>
        <nav className="nav">
          <a href="#solutions" className="nav-link">Solutions</a>
          <a href="#proof" className="nav-link">Proof</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#contact" className="nav-cta">Claim Free Audit</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
