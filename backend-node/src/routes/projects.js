const express = require('express');
const router = express.Router();
const { pool } = require('../../config/database');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects ORDER BY created_at DESC'
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err);
    // Fallback static data if DB not connected
    res.json({ success: true, data: getStaticProjects() });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

function getStaticProjects() {
  return [
    {
      id: 1,
      title: 'HackerOS Dashboard',
      description: 'Real-time system monitoring dashboard built with React, Node.js, and WebSockets. Features live CPU/memory graphs with hacker-style UI.',
      tech: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
      github: 'https://github.com/mantramakwana',
      live: '#',
      category: 'fullstack',
      status: 'completed'
    },
    {
      id: 2,
      title: 'JavaCrypt Encryption Tool',
      description: 'Advanced encryption/decryption utility built in Java with AES-256, RSA, and custom cipher implementations. CLI + GUI interface.',
      tech: ['Java', 'Spring Boot', 'JavaFX', 'Maven'],
      github: 'https://github.com/mantramakwana',
      live: '#',
      category: 'java',
      status: 'completed'
    },
    {
      id: 3,
      title: 'PyNet Scanner',
      description: 'Network vulnerability scanner written in Python. Performs port scanning, service detection, and generates security reports.',
      tech: ['Python', 'FastAPI', 'Scapy', 'SQLite'],
      github: 'https://github.com/mantramakwana',
      live: '#',
      category: 'python',
      status: 'completed'
    },
    {
      id: 4,
      title: 'CodeMatrix API Gateway',
      description: 'Microservices API gateway with JWT auth, rate limiting, and load balancing. Built with Express.js and PostgreSQL.',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
      github: 'https://github.com/mantramakwana',
      live: '#',
      category: 'backend',
      status: 'in-progress'
    },
    {
      id: 5,
      title: 'DataVault Analytics',
      description: 'Full-stack data analytics platform with Python ML backend, React frontend, and PostgreSQL data warehouse.',
      tech: ['Python', 'React', 'PostgreSQL', 'Pandas', 'Chart.js'],
      github: 'https://github.com/mantramakwana',
      live: '#',
      category: 'fullstack',
      status: 'completed'
    },
    {
      id: 6,
      title: 'TerminalChat App',
      description: 'Real-time chat application with terminal aesthetics. Built with MERN stack, Socket.io, and end-to-end encryption.',
      tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io'],
      github: 'https://github.com/mantramakwana',
      live: '#',
      category: 'mern',
      status: 'completed'
    }
  ];
}

module.exports = router;