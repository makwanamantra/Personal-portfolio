-- ============================================================
-- Mantra Makwana Portfolio - PostgreSQL Schema
-- ============================================================

-- Create database (run manually if needed)
-- CREATE DATABASE mantra_portfolio;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    tech        TEXT[] NOT NULL DEFAULT '{}',
    github      VARCHAR(500),
    live        VARCHAR(500),
    category    VARCHAR(50) DEFAULT 'fullstack',
    status      VARCHAR(30) DEFAULT 'completed',
    featured    BOOLEAN DEFAULT false,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(200) NOT NULL,
    message    TEXT NOT NULL,
    read       BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(100) NOT NULL,
    level    INTEGER CHECK (level BETWEEN 0 AND 100),
    category VARCHAR(50),
    color    VARCHAR(20) DEFAULT '#00ff41',
    icon     VARCHAR(10)
);

-- Page views analytics
CREATE TABLE IF NOT EXISTS analytics (
    id         SERIAL PRIMARY KEY,
    event      VARCHAR(100),
    page       VARCHAR(200),
    ip_hash    VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics(event);

-- ============================================================
-- Seed Data
-- ============================================================

INSERT INTO projects (title, description, tech, github, live, category, status, featured) VALUES
(
    'HackerOS Dashboard',
    'Real-time system monitoring dashboard built with React, Node.js, and WebSockets. Features live CPU/memory graphs with hacker-style UI.',
    ARRAY['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
    'https://github.com/mantramakwana',
    '#',
    'fullstack',
    'completed',
    true
),
(
    'JavaCrypt Encryption Tool',
    'Advanced encryption/decryption utility built in Java with AES-256, RSA, and custom cipher implementations. CLI + GUI interface.',
    ARRAY['Java', 'Spring Boot', 'JavaFX', 'Maven'],
    'https://github.com/mantramakwana',
    '#',
    'java',
    'completed',
    true
),
(
    'PyNet Scanner',
    'Network vulnerability scanner written in Python. Performs port scanning, service detection, and generates security reports.',
    ARRAY['Python', 'FastAPI', 'Scapy', 'SQLite'],
    'https://github.com/mantramakwana',
    '#',
    'python',
    'completed',
    false
),
(
    'CodeMatrix API Gateway',
    'Microservices API gateway with JWT auth, rate limiting, and load balancing. Built with Express.js and PostgreSQL.',
    ARRAY['Node.js', 'Express', 'PostgreSQL', 'Docker'],
    'https://github.com/mantramakwana',
    '#',
    'backend',
    'in-progress',
    true
),
(
    'DataVault Analytics',
    'Full-stack data analytics platform with Python ML backend, React frontend, and PostgreSQL data warehouse.',
    ARRAY['Python', 'React', 'PostgreSQL', 'Pandas', 'Chart.js'],
    'https://github.com/mantramakwana',
    '#',
    'fullstack',
    'completed',
    false
),
(
    'TerminalChat App',
    'Real-time chat application with terminal aesthetics. Built with MERN stack, Socket.io, and end-to-end encryption.',
    ARRAY['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io'],
    'https://github.com/mantramakwana',
    '#',
    'mern',
    'completed',
    true
)
ON CONFLICT DO NOTHING;

INSERT INTO skills (name, level, category, color, icon) VALUES
('Java', 90, 'language', '#f89820', '☕'),
('Python', 88, 'language', '#3776ab', '🐍'),
('JavaScript', 92, 'language', '#f7df1e', '⚡'),
('TypeScript', 78, 'language', '#3178c6', '📘'),
('SQL', 85, 'language', '#336791', '🗄️'),
('React', 90, 'framework', '#61dafb', '⚛️'),
('Node.js', 88, 'framework', '#339933', '🟢'),
('Spring Boot', 82, 'framework', '#6db33f', '🍃'),
('FastAPI', 85, 'framework', '#009688', '🚀'),
('PostgreSQL', 85, 'database', '#336791', '🐘'),
('MongoDB', 80, 'database', '#47a248', '🍃'),
('Docker', 75, 'devops', '#2496ed', '🐳'),
('Git', 90, 'devops', '#f05032', '📦'),
('Linux', 80, 'devops', '#fcc624', '🐧')
ON CONFLICT DO NOTHING;