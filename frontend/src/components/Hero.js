import React, { useRef, useEffect, useState } from 'react';
import './Hero.css';

// Matrix rain canvas
function MatrixRain({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?ジャバパイソンリアクト';
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 12, 2, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = i % 5 === 0 ? '#00ff41' : 'rgba(0,255,65,0.3)';
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 50);
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { clearInterval(interval); window.removeEventListener('resize', onResize); };
  }, [canvasRef]);

  return null;
}

// Rotating 3D cube (pure CSS + JS)
function Cube3D() {
  return (
    <div className="cube-scene">
      <div className="cube">
        <div className="cube-face front">  <span>JS</span>  </div>
        <div className="cube-face back">   <span>PY</span>  </div>
        <div className="cube-face right">  <span>☕</span>  </div>
        <div className="cube-face left">   <span>⚛️</span>  </div>
        <div className="cube-face top">    <span>🐘</span>  </div>
        <div className="cube-face bottom"> <span>🐳</span>  </div>
      </div>
    </div>
  );
}

// Terminal typewriter
const LINES = [
  { text: '> whoami', delay: 0 },
  { text: 'mantra_makwana', delay: 600, green: true },
  { text: '> cat role.txt', delay: 1200 },
  { text: 'Full-Stack Developer & IT Specialist', delay: 1800, green: true },
  { text: '> ls skills/', delay: 2600 },
  { text: 'java/  python/  react/  node/  postgres/', delay: 3200, green: true },
  { text: '> ./run_portfolio.sh', delay: 4000 },
  { text: 'Launching... ✓', delay: 4600, green: true },
];

function Terminal() {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    LINES.forEach(({ text, delay, green }) => {
      setTimeout(() => {
        setVisible(prev => [...prev, { text, green }]);
      }, delay);
    });
  }, []);

  return (
    <div className="terminal-box">
      <div className="terminal-header">
        <span className="t-dot red" />
        <span className="t-dot yellow" />
        <span className="t-dot green" />
        <span className="t-title">mantra@portfolio:~</span>
      </div>
      <div className="terminal-body">
        {visible.map((line, i) => (
          <div key={i} className={`t-line ${line.green ? 'green' : 'dim'}`}>
            {line.text}
            {i === visible.length - 1 && <span className="t-cursor">▋</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const canvasRef = useRef(null);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <canvas ref={canvasRef} className="matrix-canvas" />
      <MatrixRain canvasRef={canvasRef} />

      <div className="hero-inner container">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for opportunities
          </div>

          <h1 className="hero-title">
            <span className="hero-greeting">Hello, I'm</span>
            <span className="hero-name glitch" data-text="Mantra Makwana">
              Mantra Makwana
            </span>
            <span className="hero-role">
              <span className="role-prefix">$ </span>
              Full-Stack Developer
            </span>
          </h1>

          <p className="hero-desc">
            Building systems that don't just work —{' '}
            <span className="neon-text">they dominate.</span>
            <br />
            Java · Python · MERN · PostgreSQL · DevOps
          </p>

          <div className="hero-stats">
            {[
              { val: '3+', label: 'Years Coding' },
              { val: '15+', label: 'Projects Built' },
              { val: '5', label: 'Tech Stacks' },
            ].map(({ val, label }) => (
              <div key={label} className="stat">
                <span className="stat-val">{val}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Projects
            </button>
            <button className="btn btn-ghost" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact Me
            </button>
          </div>
        </div>

        <div className="hero-right">
          <Cube3D />
          <Terminal />
        </div>
      </div>

      <button className="scroll-hint" onClick={scrollToAbout} aria-label="Scroll down">
        <span className="scroll-arrow">↓</span>
        <span className="scroll-text">scroll</span>
      </button>
    </section>
  );
}