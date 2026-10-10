const bcrypt = require('bcryptjs');

async function getDemoSeedData() {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('DemoPass@2026', salt);

  return {
    user: {
      name: 'Premjeet Kumar',
      email: 'student.dev@technovoo.ac.in',
      passwordHash,
      role: 'student',
      isDemoUser: true
    },
    profile: {
      fullName: 'Premjeet Kumar',
      college: 'Institute of Engineering & Technology',
      degree: 'B.Tech',
      branch: 'Computer Science and Engineering',
      graduationYear: 2026,
      currentSemester: 'Semester 7',
      targetRole: 'Full-Stack Developer',
      weeklyLearningHours: 16,
      bio: 'Final year CSE undergraduate passionate about modern full-stack web engineering, cloud-native deployments, and distributed systems.',
      githubUsername: 'premjeetcsesr',
      linkedinUrl: 'https://linkedin.com/in/student-dev',
      portfolioUrl: 'https://student-dev.portfolio.io',
      claimedSkills: [
        'JavaScript',
        'React.js',
        'Node.js',
        'Express',
        'MongoDB',
        'HTML5 & Tailwind CSS',
        'Git & GitHub'
      ],
      projects: [
        {
          title: 'Campus Grievance & Facility Portal',
          description: 'MERN stack web application with JWT auth, role-based admin dashboard, and ticket escalation workflow.',
          technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
          repoUrl: 'https://github.com/premjeetcsesr/campus-grievance-portal',
          liveUrl: 'https://campus-portal.vercel.app'
        },
        {
          title: 'Real-Time Code Collab Sandbox',
          description: 'Collaborative code editor utilizing WebSockets, syntax highlighting, and execution sandbox.',
          technologies: ['React.js', 'Socket.io', 'Node.js', 'Tailwind CSS'],
          repoUrl: 'https://github.com/premjeetcsesr/collab-code-sandbox'
        }
      ],
      certifications: [
        { name: 'Full-Stack Web Development Bootcamp', issuer: 'Coursera / Professional Outreach', year: 2025 }
      ],
      completenessScore: 85
    },
    skillEvidences: [
      {
        skillName: 'JavaScript / TypeScript',
        category: 'Language',
        proficiencyLevel: 82,
        state: 'Verified',
        confidence: 90,
        source: 'github',
        evidenceDetails: {
          repoCount: 6,
          excerpt: 'Verified across 6 public repositories and verified mock interview assessment.'
        }
      },
      {
        skillName: 'React.js',
        category: 'Frontend',
        proficiencyLevel: 80,
        state: 'Verified',
        confidence: 88,
        source: 'github',
        evidenceDetails: {
          excerpt: 'Implemented React Single Page Applications with Context API and custom hooks.'
        }
      },
      {
        skillName: 'Node.js / Express',
        category: 'Backend',
        proficiencyLevel: 78,
        state: 'Probable',
        confidence: 80,
        source: 'resume',
        evidenceDetails: {
          excerpt: 'Built REST APIs handling student auth and MongoDB CRUD in college project.'
        }
      },
      {
        skillName: 'MongoDB / PostgreSQL',
        category: 'Database',
        proficiencyLevel: 74,
        state: 'Probable',
        confidence: 78,
        source: 'resume',
        evidenceDetails: {
          excerpt: 'Mongoose schemas with indexes designed for college portal project.'
        }
      },
      {
        skillName: 'Git & GitHub Collaboration',
        category: 'DevOps',
        proficiencyLevel: 80,
        state: 'Verified',
        confidence: 85,
        source: 'github',
        evidenceDetails: {
          excerpt: 'Active commit cadence and pull request merges observed on public GitHub profile.'
        }
      },
      {
        skillName: 'Web Security & Auth (JWT/OAuth)',
        category: 'Security',
        proficiencyLevel: 70,
        state: 'Probable',
        confidence: 72,
        source: 'resume',
        evidenceDetails: {
          excerpt: 'Implemented bcrypt hashing and JWT token verification.'
        }
      },
      {
        skillName: 'Docker Containerization',
        category: 'DevOps',
        proficiencyLevel: 30,
        state: 'Claimed',
        confidence: 35,
        source: 'self_report',
        evidenceDetails: {
          excerpt: 'Self-reported basic Docker awareness. No Dockerfiles detected in GitHub repositories.'
        }
      },
      {
        skillName: 'Automated Testing (Jest / Supertest)',
        category: 'Testing',
        proficiencyLevel: 25,
        state: 'Unknown',
        confidence: 20,
        source: 'none',
        evidenceDetails: {
          excerpt: 'Zero test suites or test dependencies detected in scanned project repos.'
        }
      },
      {
        skillName: 'System Design & Scalability',
        category: 'Architecture',
        proficiencyLevel: 35,
        state: 'Claimed',
        confidence: 40,
        source: 'self_report',
        evidenceDetails: {
          excerpt: 'Academic course exposure to OS and distributed concepts without production metrics.'
        }
      }
    ]
  };
}

module.exports = {
  getDemoSeedData
};
