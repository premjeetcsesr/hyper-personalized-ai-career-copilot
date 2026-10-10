const { User, Profile, SkillEvidence, SkillGap, Roadmap, ProjectMission, InterviewSession, ReadinessSnapshot } = require('../models');
const { getDemoSeedData } = require('../data/demoSeedData');
const { generateToken } = require('../middleware/auth');
const { computeSkillGaps } = require('../services/skillEvidenceEngine');
const { calculateReadiness } = require('../services/readinessEngine');

exports.loadDemoData = async (req, res, next) => {
  try {
    const seed = await getDemoSeedData();

    // 1. Find or create demo user
    let user = await User.findOne({ email: seed.user.email });
    if (!user) {
      user = await User.create(seed.user);
    }

    const userId = user._id;

    // 2. Clear previous demo records for this user to ensure pristine state
    await Profile.deleteMany({ userId });
    await SkillEvidence.deleteMany({ userId });
    await SkillGap.deleteMany({ userId });
    await Roadmap.deleteMany({ userId });
    await ProjectMission.deleteMany({ userId });
    await InterviewSession.deleteMany({ userId });
    await ReadinessSnapshot.deleteMany({ userId });

    // 3. Create Profile
    const profile = await Profile.create({
      userId,
      ...seed.profile
    });

    // 4. Create Skill Evidences
    for (const skill of seed.skillEvidences) {
      await SkillEvidence.create({
        userId,
        ...skill
      });
    }

    // 5. Compute Gaps
    const gaps = await computeSkillGaps(seed.skillEvidences, profile.targetRole);
    for (const gap of gaps) {
      await SkillGap.create({
        userId,
        targetRole: profile.targetRole,
        ...gap
      });
    }

    // 6. Create Default Missions (with one mission already verified and another in progress)
    const mission1 = await ProjectMission.create({
      userId,
      title: 'Containerize a Node.js API with Docker & Multi-Stage Builds',
      skillTargeted: 'Docker Containerization',
      difficulty: 'Intermediate',
      estimatedHours: 4,
      category: 'DevOps',
      description: 'Package an existing Express.js application into a production-hardened Docker container with non-root security context.',
      objectives: [
        'Author an optimized multi-stage Dockerfile keeping image size under 150MB',
        'Configure docker-compose.yml with MongoDB and environment secrets'
      ],
      stepByStepGuide: [
        'Create .dockerignore excluding node_modules',
        'Write multi-stage Dockerfile',
        'Verify local container orchestration'
      ],
      acceptanceCriteria: [
        'Multi-stage build completes under 150MB',
        'Clean container startup with zero permissions issues'
      ],
      verificationPrompt: 'Provide the GitHub repo URL containing the Dockerfile and docker-compose.yml.',
      status: 'available',
      reward: { skillGain: 25, evidenceBonus: 'Upgrades Docker from Claimed to Verified' }
    });

    const mission2 = await ProjectMission.create({
      userId,
      title: 'Implement Automated Unit & Integration Testing Suite',
      skillTargeted: 'Automated Testing (Jest / Supertest)',
      difficulty: 'Intermediate',
      estimatedHours: 5,
      category: 'Testing',
      description: 'Build a comprehensive Jest and Supertest suite verifying authentication edge cases, payload validation, and database operations.',
      objectives: [
        'Configure Jest test environment with custom setup and teardown hooks',
        'Write unit tests mocking database methods with 80%+ branch coverage'
      ],
      stepByStepGuide: [
        'Install jest and supertest',
        'Write test files under tests/controllers/',
        'Run npm test to verify code coverage'
      ],
      acceptanceCriteria: [
        'Minimum 5 passing integration test assertions for API routes',
        'Zero leaked asynchronous timers'
      ],
      verificationPrompt: 'Submit repository link or terminal coverage output snippet.',
      status: 'in_progress',
      reward: { skillGain: 20, evidenceBonus: 'Upgrades Testing to Verified' }
    });

    const mission3 = await ProjectMission.create({
      userId,
      title: 'Architect Rate Limiting & High-Concurrency Caching Gateway',
      skillTargeted: 'System Design & Scalability',
      difficulty: 'Advanced',
      estimatedHours: 6,
      category: 'Architecture',
      description: 'Introduce sliding-window rate limiting and memory/Redis caching to protect backend endpoints from traffic spikes.',
      objectives: [
        'Implement token bucket rate limiter on sensitive endpoints',
        'Set up response caching for read-heavy catalog endpoints'
      ],
      stepByStepGuide: ['Configure express-rate-limit', 'Cache expensive queries'],
      acceptanceCriteria: ['HTTP 429 Too Many Requests returned on threshold'],
      status: 'available',
      reward: { skillGain: 25, evidenceBonus: 'Upgrades System Design to Verified' }
    });

    // 7. Seed Roadmap
    const roadmap = await Roadmap.create({
      userId,
      targetRole: profile.targetRole,
      overallProgress: 35,
      phases: [
        {
          phaseNumber: 1,
          title: 'Phase 1: Production Engineering & Containerization',
          focus: 'Containerization, Multi-Stage Builds & Automated Testing',
          durationWeeks: 3,
          milestones: [
            {
              milestoneId: 'ms-docker-01',
              skill: 'Docker Containerization',
              objective: 'Master Docker container lifecycle and multi-stage builds.',
              priority: 'High',
              estimatedHours: 8,
              prerequisites: ['Basic CLI familiarity'],
              resources: [
                { title: 'Docker Official Documentation', url: 'https://docs.docker.com', type: 'Documentation' }
              ],
              cycle: {
                learn: 'Understand container isolation and image layering.',
                practice: 'Write an optimized Dockerfile for a React & Node app.',
                build: 'Containerize full-stack app with docker-compose.',
                validate: 'Verify container boots cleanly and API returns HTTP 200.',
                improve: 'Profile image size and enforce non-root user execution.'
              },
              completionCriteria: 'Working Dockerfile passing health check probe.',
              validationAssessment: 'Verify containerized app responds on localhost.',
              status: 'in_progress'
            },
            {
              milestoneId: 'ms-test-02',
              skill: 'Automated Testing (Jest / Supertest)',
              objective: 'Implement robust test coverage for REST controllers and database fixtures.',
              priority: 'High',
              estimatedHours: 10,
              prerequisites: ['JavaScript ES6+', 'Express REST APIs'],
              resources: [
                { title: 'Jest Testing Framework', url: 'https://jestjs.io', type: 'Documentation' }
              ],
              cycle: {
                learn: 'Master test pyramids: Unit vs Integration tests.',
                practice: 'Write unit tests mocking database collections.',
                build: 'Implement integration test suite for auth endpoints.',
                validate: 'Generate code coverage report > 75%.',
                improve: 'Add CI test workflow on GitHub Actions.'
              },
              completionCriteria: 'All test suites passing with zero failures.',
              validationAssessment: 'Run test suite locally.',
              status: 'pending'
            }
          ]
        },
        {
          phaseNumber: 2,
          title: 'Phase 2: Scalable Architecture & System Design',
          focus: 'Caching, Query Optimization, and Distributed Messaging',
          durationWeeks: 4,
          milestones: [
            {
              milestoneId: 'ms-sys-03',
              skill: 'System Design & Scalability',
              objective: 'Architect distributed caching with Redis and database indexing.',
              priority: 'Medium',
              estimatedHours: 12,
              prerequisites: ['Database basics'],
              resources: [
                { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'Guide' }
              ],
              cycle: {
                learn: 'Study horizontal scaling and caching patterns.',
                practice: 'Implement Redis caching with TTL.',
                build: 'Build rate-limited API gateway.',
                validate: 'Benchmark requests per second under concurrency.',
                improve: 'Document architecture tradeoff diagram.'
              },
              completionCriteria: 'Measured throughput increase > 3x.',
              validationAssessment: 'Benchmarking report under simulated load.',
              status: 'pending'
            }
          ]
        }
      ]
    });

    // 8. Seed Completed Interview Session for demo review
    const interviewSession = await InterviewSession.create({
      userId,
      targetRole: profile.targetRole,
      mode: 'technical',
      difficulty: 'Mid',
      status: 'completed',
      questions: [
        {
          questionIndex: 1,
          competency: 'Full-Stack System Architecture',
          questionText: 'How would you architect a real-time collaborative document editing feature in a full-stack React and Node.js application, considering network latency and state divergence?',
          userAnswer: 'I would establish a persistent WebSocket connection between client and server. For handling conflicts without server locks, I would use Conflict-Free Replicated Data Types (CRDTs) or Operational Transformation. State changes would be broadcast via Redis Pub/Sub to scale horizontally across multiple Node.js instances.',
          evaluation: {
            score: 85,
            correctnessScore: 88,
            reasoningScore: 85,
            projectUnderstandingScore: 82,
            systemDesignScore: 85,
            communicationScore: 85,
            strengths: ['Accurately recommended CRDTs/OT for conflict resolution', 'Included Redis Pub/Sub for horizontal scalability'],
            weaknesses: ['Could specify optimistic UI rendering rollback strategies'],
            feedback: 'Excellent answer displaying senior architectural understanding.',
            suggestedAnswerStructure: '1. Transport layer (WebSockets) -> 2. Conflict model (CRDT) -> 3. Distributed scale (Redis pub/sub).'
          },
          answeredAt: new Date(Date.now() - 3600000 * 2)
        },
        {
          questionIndex: 2,
          competency: 'Authentication & Security Protocols',
          questionText: 'Walk me through your strategy for handling secure user authentication with JWTs: where do you store the tokens on the client, and how do you protect against XSS and CSRF attacks?',
          userAnswer: 'I store the refresh token in an HttpOnly, Secure, SameSite=Strict cookie so JavaScript cannot access it directly, mitigating XSS. Short-lived access tokens (15 min) are kept in memory. To mitigate CSRF, SameSite cookies and CSRF double-submit tokens are enforced.',
          evaluation: {
            score: 90,
            correctnessScore: 92,
            reasoningScore: 90,
            projectUnderstandingScore: 88,
            systemDesignScore: 88,
            communicationScore: 90,
            strengths: ['Clear differentiation of HttpOnly cookies vs localStorage', 'Addressed both XSS and CSRF threat models'],
            weaknesses: ['Mention refresh token reuse detection and rotation'],
            feedback: 'Superb explanation of production security standards.',
            suggestedAnswerStructure: '1. Token placement -> 2. XSS defenses -> 3. CSRF defenses -> 4. Revocation strategies.'
          },
          answeredAt: new Date(Date.now() - 3600000)
        }
      ],
      finalReport: {
        overallScore: 88,
        dimensionScores: {
          technical: 90,
          reasoning: 88,
          systemDesign: 86,
          communication: 90
        },
        executiveSummary: 'Candidate demonstrated exemplary full-stack architectural intuition, security awareness, and clear communication. Ready for senior-level project challenges.',
        topStrengths: [
          'High security acumen regarding token storage and OWASP vectors',
          'Scalable system design incorporating distributed messaging (Redis)'
        ],
        criticalGaps: [
          'Practical Docker containerization and test coverage evidence needed to corroborate theory'
        ],
        recommendedPracticeMissions: [
          'Containerize a Node.js API with Docker & Multi-Stage Builds',
          'Implement Automated Unit & Integration Testing Suite'
        ],
        skillsVerified: ['JavaScript / TypeScript', 'React.js', 'Web Security & Auth (JWT/OAuth)']
      }
    });

    // 9. Compute initial readiness
    const readiness = calculateReadiness({
      profile,
      skills: seed.skillEvidences,
      gaps,
      interviews: [interviewSession],
      missions: [mission1, mission2, mission3]
    });

    await ReadinessSnapshot.create({
      userId,
      targetRole: profile.targetRole,
      overallReadiness: readiness.overallReadiness,
      dimensions: readiness.dimensions,
      dimensionRationale: readiness.dimensionRationale,
      nextActionRecommendation: readiness.nextActionRecommendation,
      isIllustrative: true
    });

    const token = generateToken(userId);

    res.json({
      success: true,
      message: 'Demo profile for Team Technovoo1 loaded successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isDemoUser: true
      },
      profile,
      demoMode: true,
      disclaimer: 'Loaded illustrative demo student dataset for hackathon presentation.'
    });
  } catch (err) {
    next(err);
  }
};
