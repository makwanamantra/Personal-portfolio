import React, { useState, useEffect } from 'react';
import './Navbar.css';

const links = [
  { label: 'about', href: '#about' },
  { label: 'skills', href: '#skills' },
  { label: 'projects', href: '#projects' },
  { label: 'contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="nav-logo" href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="logo-bracket">[</span>
          <span className="logo-name">MM</span>
          <span className="logo-bracket">]</span>
          <span className="logo-cursor">_</span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(({ label, href }) => (
            <li key={href}>
              <button
                className={`nav-link ${active === href ? 'active' : ''}`}
                onClick={() => handleNav(href)}
              >
                <span className="nav-num">{String(links.indexOf({ label, href }) + 1).padStart(2, '0')}.</span>
                {label}
              </button>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/mantramakwana"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta btn btn-primary"
            >
              GitHub
            </a>
          </li>
        </ul>

        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}