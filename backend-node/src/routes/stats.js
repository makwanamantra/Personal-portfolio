const express = require('express');
const router = express.Router();

// GET developer stats
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Mantra Makwana',
      title: 'Full-Stack Developer & IT Specialist',
      status: 'available_for_hire',
      experience_years: 3,
      languages: [
        { name: 'Java', level: 90, color: '#f89820' },
        { name: 'Python', level: 88, color: '#3776ab' },
        { name: 'JavaScript', level: 92, color: '#f7df1e' },
        { name: 'TypeScript', level: 78, color: '#3178c6' },
        { name: 'SQL', level: 85, color: '#336791' },
        { name: 'Bash', level: 72, color: '#4eaa25' }
      ],
      frameworks: [
        { name: 'React', level: 90 },
        { name: 'Node.js', level: 88 },
        { name: 'Express', level: 87 },
        { name: 'Spring Boot', level: 82 },
        { name: 'FastAPI', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'Docker', level: 75 }
      ],
      stats: {
        projects_completed: 24,
        github_repos: 38,
        commits_this_year: 847,
        coffee_consumed: 9999,
        bugs_squashed: 1337,
        lines_of_code: 150000
      },
      social: {
        github: 'https://github.com/mantramakwana',
        linkedin: 'https://linkedin.com/in/mantramakwana',
        email: 'mantra.makwana@email.com'
      }
    }
  });
});

module.exports = router;