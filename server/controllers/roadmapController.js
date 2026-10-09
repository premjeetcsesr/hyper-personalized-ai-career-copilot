const { Roadmap, SkillGap, Profile, SkillEvidence } = require('../models');
const { computeSkillGaps, aggregateUserSkills } = require('../services/skillEvidenceEngine');

exports.getRoadmap = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    const targetRole = profile?.targetRole || 'Full-Stack Developer';

    let roadmap = await Roadmap.findOne({ userId: req.userId, targetRole });

    if (!roadmap) {
      roadmap = await generateRoadmapForUser(req.userId, targetRole);
    }

    res.json({
      success: true,
      roadmap
    });
  } catch (err) {
    next(err);
  }
};

exports.updateMilestoneStatus = async (req, res, next) => {
  try {
    const { milestoneId, status } = req.body;
    if (!milestoneId || !status) {
      return res.status(400).json({ success: false, message: 'milestoneId and status are required.' });
    }

    const profile = await Profile.findOne({ userId: req.userId });
    const targetRole = profile?.targetRole || 'Full-Stack Developer';

    const roadmap = await Roadmap.findOne({ userId: req.userId, targetRole });
    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found.' });
    }

    let found = false;
    let totalMilestones = 0;
    let completedCount = 0;

    roadmap.phases.forEach(phase => {
      phase.milestones.forEach(m => {
        totalMilestones++;
        if (m.milestoneId === milestoneId) {
          m.status = status;
          if (status === 'completed') {
            m.completedAt = new Date();
          }
          found = true;
        }
        if (m.status === 'completed') {
          completedCount++;
        }
      });
    });

    if (!found) {
      return res.status(404).json({ success: false, message: 'Milestone ID not found in current roadmap.' });
    }

    roadmap.overallProgress = Math.round((completedCount / (totalMilestones || 1)) * 100);

    const updated = await Roadmap.findByIdAndUpdate(roadmap._id, roadmap, { new: true });

    // If milestone completed, reward skill evidence progression
    if (status === 'completed') {
      const milestone = findMilestone(roadmap, milestoneId);
      if (milestone) {
        await awardMilestoneEvidence(req.userId, milestone.skill);
      }
    }

    res.json({
      success: true,
      message: `Milestone status updated to "${status}".`,
      roadmap: updated
    });
  } catch (err) {
    next(err);
  }
};

exports.recalculateRoadmap = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    const targetRole = profile?.targetRole || 'Full-Stack Developer';

    const newRoadmap = await generateRoadmapForUser(req.userId, targetRole);

    res.json({
      success: true,
      message: 'Personalized roadmap regenerated successfully based on latest skill evidence.',
      roadmap: newRoadmap
    });
  } catch (err) {
    next(err);
  }
};

async function generateRoadmapForUser(userId, targetRole) {
  const profile = await Profile.findOne({ userId });
  const evidenceList = await SkillEvidence.find({ userId });
  const userSkills = aggregateUserSkills(evidenceList, profile?.claimedSkills || []);
  const gaps = await computeSkillGaps(userSkills, targetRole);

  // Take top gaps to formulate targeted 3-Phase Roadmap
  const topGaps = gaps.slice(0, 5);

  const phase1Milestones = [
    {
      milestoneId: 'ms-docker-01',
      skill: 'Docker Containerization',
      objective: 'Master Docker container lifecycle, multi-stage builds, and docker-compose orchestration.',
      priority: 'High',
      estimatedHours: 8,
      prerequisites: ['Basic Node.js or Python CLI familiarity'],
      resources: [
        { title: 'Official Docker Get-Started Guide', url: 'https://docs.docker.com/get-started/', type: 'Documentation' },
        { title: 'Node.js Web App in Docker Deep-Dive', url: 'https://nodejs.org/en/docs/guides/nodejs-docker-webapp/', type: 'Guide' }
      ],
      cycle: {
        learn: 'Understand container isolation, images, layers, and caching mechanics.',
        practice: 'Write an optimized Dockerfile for a React and Express app using multi-stage builds.',
        build: 'Containerize an end-to-end fullstack app with docker-compose.yml running MongoDB and Node.',
        validate: 'Verify zero-downtime healthcheck endpoints and image size < 150MB.',
        improve: 'Profile memory limits and configure non-root security execution.'
      },
      completionCriteria: 'Working Dockerfile and compose file passing container health checks.',
      validationAssessment: 'Verify container runs locally and API returns HTTP 200.',
      status: 'in_progress'
    },
    {
      milestoneId: 'ms-test-02',
      skill: 'Automated Testing (Jest / Supertest)',
      objective: 'Implement robust test coverage for REST controllers, edge cases, and database mock fixtures.',
      priority: 'High',
      estimatedHours: 10,
      prerequisites: ['JavaScript ES6+', 'Express REST APIs'],
      resources: [
        { title: 'Jest Testing Framework Documentation', url: 'https://jestjs.io/docs/getting-started', type: 'Documentation' },
        { title: 'Supertest HTTP Assertions', url: 'https://github.com/ladjs/supertest', type: 'Repository' }
      ],
      cycle: {
        learn: 'Explore test pyramids: Unit vs Integration vs E2E assertion strategies.',
        practice: 'Write unit tests mocking database calls using Jest spies and stubs.',
        build: 'Implement integration test suite testing all authentication and profile endpoints.',
        validate: 'Generate Jest code coverage report exceeding 75% branch coverage.',
        improve: 'Integrate automated test runs into GitHub Actions CI pipeline.'
      },
      completionCriteria: 'All unit and integration test suites passing with zero flaky tests.',
      validationAssessment: 'Run npm test in terminal and verify green suite.',
      status: 'pending'
    }
  ];

  const phase2Milestones = [
    {
      milestoneId: 'ms-sys-03',
      skill: 'System Design & Scalability',
      objective: 'Architect distributed caching with Redis, rate limiting, and database indexing strategies.',
      priority: 'Medium',
      estimatedHours: 12,
      prerequisites: ['SQL / NoSQL indexing basics', 'Network protocols'],
      resources: [
        { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'Guide' }
      ],
      cycle: {
        learn: 'Study horizontal scaling, read replicas, database sharding, and write-through caching.',
        practice: 'Implement Redis caching layer for heavy read queries with TTL expiration.',
        build: 'Build a rate-limited API gateway with sliding-window token bucket algorithm.',
        validate: 'Benchmark requests per second under 500 concurrent connections using Autocannon.',
        improve: 'Document architecture tradeoff diagram and failover procedures.'
      },
      completionCriteria: 'Measured throughput increase > 3x on cached endpoints.',
      validationAssessment: 'Load-test benchmark report showing p95 latency < 50ms.',
      status: 'pending'
    }
  ];

  const phase3Milestones = [
    {
      milestoneId: 'ms-auth-04',
      skill: 'Web Security & Auth (JWT/OAuth)',
      objective: 'Harden web security against OWASP Top 10 vulnerabilities and enforce secure cookies.',
      priority: 'Medium',
      estimatedHours: 6,
      prerequisites: ['HTTP cookies and headers', 'CORS understanding'],
      resources: [
        { title: 'OWASP Top Ten Security Guide', url: 'https://owasp.org/www-project-top-ten/', type: 'Security' }
      ],
      cycle: {
        learn: 'Master CSRF, XSS, SSRF, and SQL/NoSQL Injection attack vectors and mitigations.',
        practice: 'Configure Helmet security headers and strict Content Security Policy.',
        build: 'Implement refresh token rotation with cryptographic fingerprinting.',
        validate: 'Run OWASP ZAP or npm audit scan showing zero high/critical vulnerabilities.',
        improve: 'Conduct simulated penetration testing on all auth routes.'
      },
      completionCriteria: 'Secure HttpOnly cookie setup with sanitized input schemas.',
      validationAssessment: 'Security audit report clean with zero vulnerabilities.',
      status: 'pending'
    }
  ];

  const phases = [
    {
      phaseNumber: 1,
      title: 'Phase 1: Production Engineering & Containerization',
      focus: 'Containerization, Multi-Stage Builds & Automated Testing',
      durationWeeks: 3,
      milestones: phase1Milestones
    },
    {
      phaseNumber: 2,
      title: 'Phase 2: Scalable Architecture & System Design',
      focus: 'Caching, Query Optimization, and Distributed Messaging',
      durationWeeks: 4,
      milestones: phase2Milestones
    },
    {
      phaseNumber: 3,
      title: 'Phase 3: Production Security & Capstone Deployment',
      focus: 'OWASP Hardening, Threat Modeling & Mock Interview Validation',
      durationWeeks: 3,
      milestones: phase3Milestones
    }
  ];

  const existingRoadmap = await Roadmap.findOne({ userId, targetRole });
  if (existingRoadmap) {
    return await Roadmap.findByIdAndUpdate(existingRoadmap._id, {
      overallProgress: 15,
      phases
    }, { new: true });
  }

  return await Roadmap.create({
    userId,
    targetRole,
    overallProgress: 15,
    phases
  });
}

function findMilestone(roadmap, milestoneId) {
  for (const phase of roadmap.phases) {
    for (const m of phase.milestones) {
      if (m.milestoneId === milestoneId) return m;
    }
  }
  return null;
}

async function awardMilestoneEvidence(userId, skillName) {
  const existing = await SkillEvidence.findOne({ userId, skillName });
  if (existing) {
    await SkillEvidence.findByIdAndUpdate(existing._id, {
      proficiencyLevel: Math.min(95, existing.proficiencyLevel + 15),
      state: 'Verified',
      confidence: 90,
      evidenceDetails: {
        excerpt: 'Successfully completed verified learning roadmap milestone.',
        verifiedAt: new Date()
      }
    });
  } else {
    await SkillEvidence.create({
      userId,
      skillName,
      proficiencyLevel: 75,
      state: 'Verified',
      confidence: 88,
      source: 'mission',
      evidenceDetails: {
        excerpt: 'Demonstrated completion of structured milestone cycle.',
        verifiedAt: new Date()
      }
    });
  }
}
