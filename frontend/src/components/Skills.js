import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';

const SKILL_GROUPS = [
  {
    category: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Java', level: 90, tag: 'Spring Boot · JPA · Maven' },
      { name: 'Python', level: 85, tag: 'FastAPI · Django · Pandas' },
      { name: 'Node.js', level: 80, tag: 'Express · REST · JWT' },
    ],
  },
  {
    category: 'Frontend',
    icon: '🖥️',
    skills: [
      { name: 'React', level: 85, tag: 'Hooks · Context · Router' },
      { name: 'JavaScript', level: 88, tag: 'ES2023 · TypeScript · DOM' },
      { name: 'CSS / HTML', level: 82, tag: 'Flexbox · Grid · Animations' },
    ],
  },
  {
    category: 'Database & DevOps',
    icon: '🗄️',
    skills: [
      { name: 'PostgreSQL', level: 83, tag: 'Schema · Queries · Indexing' },
      { name: 'MongoDB', level: 75, tag: 'Aggregation · Atlas · Mongoose' },
      { name: 'Docker', level: 78, tag: 'Compose · Images · CI/CD' },
    ],
  },
];

const TECH_BADGES = [
  'Java', 'Spring Boot', 'Python', 'FastAPI', 'React', 'Node.js',
  'Express', 'PostgreSQL', 'MongoDB', 'Docker', 'Git', 'Linux',
  'REST API', 'JWT', 'Maven', 'Gradle', 'TypeScript', 'Redis',
];

function SkillBar({ name, level, tag, animate }) {
  return (
    <div className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: animate ? `${level}%` : '0%' }}
        />
      </div>
      <div className="skill-tag">{tag}</div>
    </div>
  );
}

export default function Skills() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills section" id="skills" ref={ref}>
      <div className="container">
        <div className="section-header centered">
          <p className="section-label">expertise</p>
          <h2 className="section-title">
            My <span className="accent">Tech Arsenal</span>
          </h2>
          <p className="section-sub">
            Full-stack capabilities across multiple languages, frameworks, and platforms.
          </p>
        </div>

        <div className="skills-grid">
          {SKILL_GROUPS.map(({ category, icon, skills }) => (
            <div key={category} className="skill-group">
              <div className="skill-group-header">
                <span className="skill-group-icon">{icon}</span>
                <span className="skill-group-title">{category}</span>
              </div>
              <div className="skill-bars">
                {skills.map(s => (
                  <SkillBar key={s.name} {...s} animate={animate} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech badge cloud */}
        <div className="tech-cloud">
          <p className="tech-cloud-label">// also familiar with</p>
          <div className="tech-badges">
            {TECH_BADGES.map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}