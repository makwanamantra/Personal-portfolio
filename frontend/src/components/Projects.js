import React, { useState } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    id: 1,
    title: 'HackerOS Dashboard',
    desc: 'Real-time system monitoring dashboard with live CPU/memory graphs, WebSocket updates, and a full hacker-style UI built on the MERN stack.',
    tech: ['React', 'Node.js', 'WebSocket', 'PostgreSQL', 'Chart.js'],
    category: 'fullstack',
    status: 'completed',
    featured: true,
    github: 'https://github.com/mantramakwana',
    live: '#',
    icon: '🖥️',
  },
  {
    id: 2,
    title: 'JavaCrypt Encryption Tool',
    desc: 'Advanced encryption/decryption utility in Java with AES-256, RSA, and custom cipher implementations. Dual CLI + JavaFX GUI interface.',
    tech: ['Java', 'Spring Boot', 'JavaFX', 'Maven', 'AES-256'],
    category: 'java',
    status: 'completed',
    featured: true,
    github: 'https://github.com/mantramakwana',
    live: '#',
    icon: '🔐',
  },
  {
    id: 3,
    title: 'PyNet Scanner',
    desc: 'Network vulnerability scanner in Python. Performs port scanning, service fingerprinting, and generates detailed security audit reports.',
    tech: ['Python', 'FastAPI', 'Scapy', 'SQLite', 'Click'],
    category: 'python',
    status: 'completed',
    featured: false,
    github: 'https://github.com/mantramakwana',
    live: '#',
    icon: '🔍',
  },
  {
    id: 4,
    title: 'CodeMatrix API Gateway',
    desc: 'Microservices API gateway with JWT authentication, rate limiting, load balancing, and request routing. Built with Express.js and PostgreSQL.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'JWT'],
    category: 'backend',
    status: 'in-progress',
    featured: true,
    github: 'https://github.com/mantramakwana',
    live: '#',
    icon: '⚡',
  },
  {
    id: 5,
    title: 'DataVault Analytics',
    desc: 'Full-stack analytics platform with Python ML backend, React dashboard, and PostgreSQL data warehouse. Supports CSV import and chart export.',
    tech: ['Python', 'React', 'PostgreSQL', 'Pandas', 'Chart.js'],
    category: 'fullstack',
    status: 'completed',
    featured: false,
    github: 'https://github.com/mantramakwana',
    live: '#',
    icon: '📊',
  },
  {
    id: 6,
    title: 'TerminalChat App',
    desc: 'Real-time chat application with terminal aesthetics, Socket.io messaging, end-to-end encryption, and room-based conversations.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io'],
    category: 'mern',
    status: 'completed',
    featured: true,
    github: 'https://github.com/mantramakwana',
    live: '#',
    icon: '💬',
  },
];

const FILTERS = ['all', 'fullstack', 'java', 'python', 'backend', 'mern'];

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div className="section-header centered">
          <p className="section-label">portfolio</p>
          <h2 className="section-title">
            Featured <span className="accent">Projects</span>
          </h2>
          <p className="section-sub">
            Systems built with purpose. Every project solves a real problem.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="project-filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? '[ all ]' : f}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="projects-grid">
          {filtered.map((project) => (
            <div key={project.id} className={`project-card ${project.featured ? 'featured' : ''}`}>
              {project.featured && (
                <span className="project-featured-badge">★ featured</span>
              )}
              {project.status === 'in-progress' && (
                <span className="project-status-badge">⚡ in progress</span>
              )}

              <div className="project-icon">{project.icon}</div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>

              <div className="project-tech">
                {project.tech.map(t => (
                  <span key={t} className="project-tech-tag">{t}</span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <span>⌥</span> GitHub
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <span>↗</span> Live
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-footer">
          <a
            href="https://github.com/mantramakwana"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            View All on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}