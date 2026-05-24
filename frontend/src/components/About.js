import React from 'react';
import './About.css';

const traits = [
  { icon: '☕', label: 'Java Expert', desc: 'Spring Boot, OOP, Design Patterns' },
  { icon: '🐍', label: 'Python Dev', desc: 'FastAPI, Automation, Data Science' },
  { icon: '⚛️', label: 'MERN Stack', desc: 'React, Node.js, MongoDB, Express' },
  { icon: '🐘', label: 'PostgreSQL', desc: 'Schema Design, Optimization, JPA' },
  { icon: '🐳', label: 'DevOps', desc: 'Docker, Linux, CI/CD, Git' },
  { icon: '🔒', label: 'IT Security', desc: 'Networks, Encryption, Protocols' },
];

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left: text */}
          <div className="about-text">
            <div className="section-header">
              <p className="section-label">about me</p>
              <h2 className="section-title">
                The Dev Behind<br />
                <span className="accent">The Matrix</span>
              </h2>
            </div>

            <div className="about-bio">
              <p>
                I'm <span className="neon-text">Mantra Makwana</span>, a full-stack developer
                and IT specialist who lives at the intersection of elegant code and raw performance.
              </p>
              <p>
                I build end-to-end systems — from{' '}
                <span className="highlight">Java microservices</span> and{' '}
                <span className="highlight">Python automation</span> to{' '}
                <span className="highlight">React frontends</span> and{' '}
                <span className="highlight">PostgreSQL databases</span>.
                Every layer, every stack, every system.
              </p>
              <p>
                When I'm not coding, I'm reverse-engineering how things work,
                exploring IT infrastructure, or contributing to open-source projects.
              </p>
            </div>

            <div className="about-code-block">
              <div className="code-header">
                <span className="code-lang">javascript</span>
              </div>
              <pre className="code-body">
{`const mantra = {
  name: "Mantra Makwana",
  role: "Full-Stack Developer",
  stacks: ["Java", "Python", "MERN"],
  database: "PostgreSQL",
  available: true,
  motto: "Build systems that dominate."
};`}
              </pre>
            </div>
          </div>

          {/* Right: trait cards */}
          <div className="about-traits">
            {traits.map(({ icon, label, desc }) => (
              <div key={label} className="trait-card">
                <span className="trait-icon">{icon}</span>
                <div>
                  <div className="trait-label">{label}</div>
                  <div className="trait-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}