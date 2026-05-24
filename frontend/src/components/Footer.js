import React from 'react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-logo">
              <span className="logo-bracket">[</span>
              <span className="logo-name">MM</span>
              <span className="logo-bracket">]</span>
            </div>
            <p className="footer-tagline">
              Building systems that don't just work — they dominate.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <span className="footer-col-title">// navigate</span>
              {['about', 'skills', 'projects', 'contact'].map(s => (
                <button
                  key={s}
                  className="footer-link"
                  onClick={() => document.querySelector(`#${s}`)?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="footer-col">
              <span className="footer-col-title">// connect</span>
              <a href="https://github.com/mantramakwana" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
              <a href="https://linkedin.com/in/mantramakwana" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
              <a href="mailto:mantra@example.com" className="footer-link">Email</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">// stack</span>
              <span className="footer-stack-item">Java · Spring Boot</span>
              <span className="footer-stack-item">Python · FastAPI</span>
              <span className="footer-stack-item">React · Node.js</span>
              <span className="footer-stack-item">PostgreSQL · Docker</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            © {year} Mantra Makwana. Built with React, Node.js, Python & Java.
          </span>
          <span className="footer-status">
            <span className="status-dot" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}