import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lines = [
      'Initializing system...',
      'Loading modules...',
      'Connecting to matrix...',
      'Decrypting portfolio...',
      'Access granted.',
    ];
    let i = 0;
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 20, 100));
      i++;
      if (i >= lines.length) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="boot-screen">
        <div className="boot-content">
          <div className="boot-logo">
            <span className="boot-bracket">[</span>
            <span className="boot-name">MANTRA.SYS</span>
            <span className="boot-bracket">]</span>
          </div>
          <div className="boot-bar-wrap">
            <div className="boot-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="boot-status">
            {progress < 100 ? `Loading... ${progress}%` : 'ACCESS GRANTED'}
          </div>
          <div className="boot-blink">▋</div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;