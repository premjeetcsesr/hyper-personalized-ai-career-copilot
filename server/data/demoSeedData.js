const bcrypt = require('bcryptjs');

async function getDemoSeedData() {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('DemoPass@2026', salt);

  return {
    user: {
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.edu',
      passwordHash,
      role: 'student',
      isDemoUser: true
    },
    profile: {
      fullName: 'Aarav Sharma',
      college: 'City Engineering College',
      degree: 'B.Tech',
      branch: 'Computer Science',
      graduationYear: 2026,
      currentSemester: 'Semester 6',
      targetRole: 'Full-Stack Developer',
      weeklyLearningHours: 15,
      currentStage: 'Learning and building projects',
      currentChallenge: 'Limited evidence of backend development and database integration',
      existingEvidence: 'A few basic web-development exercises',
      bio: 'Early-career developer aiming for Full-Stack development. Currently focusing on transitioning from static frontends to robust backend APIs and database systems.',
      githubUsername: 'aarav-sharma-dev',
      linkedinUrl: 'https://linkedin.com/in/aarav-sharma',
      portfolioUrl: 'https://aaravsharma.dev',
      claimedSkills: [
        'HTML & CSS',
        'JavaScript',
        'React',
        'REST APIs',
        'Git & Version Control'
      ],
      projects: [
        {
          title: 'Responsive Personal Portfolio',
          description: 'Multi-section responsive portfolio created with HTML5 and CSS Grid/Flexbox demonstrating responsive design principles.',
          technologies: ['HTML5', 'CSS3', 'Responsive Design'],
          repoUrl: 'https://github.com/aarav-sharma-dev/responsive-portfolio',
          liveUrl: 'https://aarav-portfolio-demo.vercel.app',
          status: 'Completed',
          evidenceNotes: 'Verified: Semantic HTML and fluid responsive layout confirmed without horizontal scroll.'
        },
        {
          title: 'Interactive DOM Task Manager',
          description: 'Client-side task tracking widget utilizing JavaScript event listeners, local storage persistence, and dynamic DOM manipulation.',
          technologies: ['JavaScript', 'DOM API', 'CSS'],
          repoUrl: 'https://github.com/aarav-sharma-dev/dom-task-manager',
          status: 'Completed',
          evidenceNotes: 'Probable: Functional JavaScript event logic demonstrated; asynchronous error handling partial.'
        }
      ],
      certifications: [
        { name: 'Responsive Web Design Certification', issuer: 'freeCodeCamp', year: 2025 }
      ],
      completenessScore: 78
    },
    skillEvidences: [
      {
        skillName: 'HTML & CSS',
        category: 'Frontend',
        proficiencyLevel: 85,
        state: 'Verified',
        confidence: 90,
        source: 'exercise',
        evidenceDetails: {
          excerpt: 'Demonstrated through a completed responsive web exercise (Personal Portfolio).',
          date: '2 weeks ago',
          limitations: 'Demonstrated in static frontends; interactive state binding still evolving.',
          nextAction: 'Maintain mastery; apply in full-stack project.'
        }
      },
      {
        skillName: 'JavaScript',
        category: 'Language',
        proficiencyLevel: 68,
        state: 'Probable',
        confidence: 70,
        source: 'exercise',
        evidenceDetails: {
          excerpt: 'Probable based on partial DOM exercises and interactive scripting.',
          date: '1 week ago',
          limitations: 'Basic DOM and async functions shown; complex data transformations and state patterns not yet fully demonstrated.',
          nextAction: 'Strengthen JavaScript closures, event loop, and asynchronous error handling.'
        }
      },
      {
        skillName: 'React',
        category: 'Frontend',
        proficiencyLevel: 45,
        state: 'Claimed',
        confidence: 40,
        source: 'self_report',
        evidenceDetails: {
          excerpt: 'The learner selected React as a self-reported skill. No verified React project is present in profile.',
          date: 'Self-reported',
          limitations: 'No verified code project or assessment demonstrating custom hooks or state management.',
          nextAction: 'Build an interactive UI component consuming dynamic API data.'
        }
      },
      {
        skillName: 'REST APIs',
        category: 'Architecture',
        proficiencyLevel: 40,
        state: 'Claimed',
        confidence: 35,
        source: 'self_report',
        evidenceDetails: {
          excerpt: 'The learner selected REST API development as a skill. No relevant completed API project is present in the demo profile.',
          date: 'Self-reported',
          limitations: 'No relevant completed API project is present in the demo profile.',
          nextAction: 'Build a small REST API with multiple endpoints and basic validation.'
        }
      },
      {
        skillName: 'Database Integration',
        category: 'Database',
        proficiencyLevel: 25,
        state: 'Unknown',
        confidence: 20,
        source: 'none',
        evidenceDetails: {
          excerpt: 'The skill has not been assessed or there is insufficient information. No database models or query code present.',
          date: 'Unassessed',
          limitations: 'No database models or query code detected in demo profile.',
          nextAction: 'Complete mission: Connect a web application to a database.'
        }
      },
      {
        skillName: 'Automated Testing',
        category: 'Testing',
        proficiencyLevel: 20,
        state: 'Unknown',
        confidence: 15,
        source: 'none',
        evidenceDetails: {
          excerpt: 'No test suites or coverage reports recorded in demo profile.',
          date: 'Unassessed',
          limitations: 'Zero test suites or test dependencies detected in scanned project repos.',
          nextAction: 'Write unit tests for API endpoints and validation handlers.'
        }
      },
      {
        skillName: 'Git & Version Control',
        category: 'DevOps',
        proficiencyLevel: 65,
        state: 'Probable',
        confidence: 68,
        source: 'project',
        evidenceDetails: {
          excerpt: 'Basic commit history and repository management observed in portfolio exercises repo.',
          date: '3 weeks ago',
          limitations: 'Commit history contains basic commits without pull request reviews or conflict resolution.',
          nextAction: 'Collaborate via feature branches and structured pull requests.'
        }
      }
    ]
  };
}

module.exports = {
  getDemoSeedData
};
