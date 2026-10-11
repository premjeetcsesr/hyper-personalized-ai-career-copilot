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

    // 6. Create Default Missions (matching prompt missions: portfolio, rest api, database, validation, full-stack)
    const mission1 = await ProjectMission.create({
      userId,
      title: 'Build a Responsive Personal Portfolio',
      skillTargeted: 'HTML & CSS',
      difficulty: 'Beginner',
      estimatedHours: 6,
      category: 'Frontend',
      mode: 'guided',
      description: 'Create an accessible, multi-section responsive personal portfolio using semantic HTML5 and modern CSS Grid/Flexbox.',
      objectives: [
        'Build semantic layout with nav, main, sections, and footer',
        'Implement fluid responsive design across mobile, tablet, and desktop viewports',
        'Verify accessibility contrast and keyboard navigation'
      ],
      stepByStepGuide: [
        'Draft wireframe and semantic HTML5 skeleton',
        'Apply mobile-first CSS Flexbox and Grid styles',
        'Add project showcase cards and contact form elements',
        'Test across 320px to 1920px viewports'
      ],
      acceptanceCriteria: [
        'Zero horizontal scrollbar at 320px, 375px, 768px, and 1280px widths',
        'All links and controls focusable with visible focus rings'
      ],
      verificationPrompt: 'Provide the GitHub repo URL and live demo URL for your personal portfolio.',
      status: 'verified',
      submission: {
        repoUrl: 'https://github.com/aarav-sharma-dev/responsive-portfolio',
        demoUrl: 'https://aarav-portfolio-demo.vercel.app',
        notes: 'Built with mobile-first CSS, custom CSS properties for theme tokens, and semantic HTML5.'
      },
      evaluation: {
        score: 88,
        status: 'Approved',
        feedback: 'Clean semantic structure, fluid responsive breakpoints, and excellent typography contrast.',
        evidenceBonus: 'HTML & CSS marked as Demonstrated / Verified'
      },
      reward: { skillGain: 25, evidenceBonus: 'Upgrades HTML & CSS to Demonstrated' }
    });

    const mission2 = await ProjectMission.create({
      userId,
      title: 'Create a REST API for a Task Manager',
      skillTargeted: 'REST APIs',
      difficulty: 'Intermediate',
      estimatedHours: 8,
      category: 'Backend',
      mode: 'guided',
      description: 'Build a modular REST API with Express.js supporting full CRUD operations for tasks with filtering, priority sorting, and structured JSON responses.',
      objectives: [
        'Implement endpoints: GET /tasks, GET /tasks/:id, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id',
        'Use appropriate HTTP status codes (200, 201, 400, 404, 500)',
        'Structure payload error envelopes for consistent client communication'
      ],
      stepByStepGuide: [
        'Initialize Express app with JSON body parser middleware',
        'Create modular router for /api/tasks',
        'Implement controllers for CRUD actions with in-memory array/store',
        'Add validation middleware checking required title and status fields'
      ],
      acceptanceCriteria: [
        'All 5 CRUD routes return JSON with appropriate status codes',
        'Invalid POST request returns HTTP 400 with descriptive error message',
        'Non-existent task ID returns HTTP 404'
      ],
      verificationPrompt: 'Submit your GitHub repo or endpoint implementation code for review.',
      status: 'in_progress',
      reward: { skillGain: 30, evidenceBonus: 'Upgrades REST APIs from Claimed to Demonstrated' }
    });

    const mission3 = await ProjectMission.create({
      userId,
      title: 'Connect a Web Application to a Database',
      skillTargeted: 'Database Integration',
      difficulty: 'Intermediate',
      estimatedHours: 8,
      category: 'Database',
      mode: 'guided',
      description: 'Connect your backend server to a database (MongoDB/Mongoose or PostgreSQL), define strict schemas with timestamps, and replace in-memory arrays.',
      objectives: [
        'Configure database connection pool with resilient error handling',
        'Define schema with type validation, required constraints, and indexes',
        'Perform create, read, update, and delete queries'
      ],
      stepByStepGuide: [
        'Set up database client connection with environment variables',
        'Create Task schema with title, status, priority, and timestamps',
        'Refactor controllers to execute database queries'
      ],
      acceptanceCriteria: [
        'Tasks persist across server restarts',
        'Connection failure logs clear diagnostics without crashing application'
      ],
      verificationPrompt: 'Submit database schema file and controller query implementation.',
      status: 'available',
      reward: { skillGain: 30, evidenceBonus: 'Upgrades Database Integration from Unknown to Demonstrated' }
    });

    const mission4 = await ProjectMission.create({
      userId,
      title: 'Implement Form Validation and Error Handling',
      skillTargeted: 'Testing & Security',
      difficulty: 'Intermediate',
      estimatedHours: 6,
      category: 'Security',
      mode: 'challenge',
      description: 'Implement dual-layer client and server validation with user-friendly error messages and edge-case protection.',
      objectives: [
        'Build schema validation middleware (Joi/Zod) for all mutation routes',
        'Implement centralized Express error handling middleware',
        'Prevent stack trace leakage in non-development environments'
      ],
      stepByStepGuide: [
        'Define validation schemas for task inputs',
        'Create middleware interceptor for validation errors',
        'Wire global error handler as the final Express middleware'
      ],
      acceptanceCriteria: [
        'Missing fields trigger 400 Bad Request with field-specific errors',
        'Internal errors return 500 without leaking stack traces'
      ],
      verificationPrompt: 'Submit validation middleware code and sample response logs.',
      status: 'available',
      reward: { skillGain: 25, evidenceBonus: 'Strengthens Backend Error Handling' }
    });

    const mission5 = await ProjectMission.create({
      userId,
      title: 'Build a Small Full-Stack Application',
      skillTargeted: 'Full-Stack Integration',
      difficulty: 'Advanced',
      estimatedHours: 14,
      category: 'Full-Stack',
      mode: 'challenge',
      description: 'Connect a React frontend to your validated REST API and database, supporting create, read, update, and delete actions with optimistic UI and loading states.',
      objectives: [
        'Connect React components to backend REST endpoints via fetch/axios',
        'Display loading indicators, empty states, and descriptive error messages',
        'Provide responsive layout with keyboard accessibility'
      ],
      stepByStepGuide: [
        'Scaffold React application with clean component tree',
        'Implement API service layer handling responses and errors',
        'Create task list, create form, and edit modal with responsive styling'
      ],
      acceptanceCriteria: [
        'Full CRUD workflow operable from frontend interface',
        'Proper error and loading states rendered during network delays'
      ],
      verificationPrompt: 'Submit full-stack repository link and deployment URL.',
      status: 'available',
      reward: { skillGain: 40, evidenceBonus: 'Validates End-to-End Full-Stack Capability' }
    });

    // 7. Seed Roadmap (8 steps from prompt)
    const roadmap = await Roadmap.create({
      userId,
      targetRole: profile.targetRole,
      overallProgress: 25,
      phases: [
        {
          phaseNumber: 1,
          title: 'Foundations & Frontend Practice',
          focus: 'Core Language Fundamentals & Responsive Web UI',
          durationWeeks: 4,
          milestones: [
            {
              milestoneId: 'step-1',
              title: 'Strengthen JavaScript Fundamentals',
              skill: 'JavaScript',
              objective: 'Master ES6+, scope, closures, promises, and async/await for predictable execution.',
              priority: 'High',
              estimatedHours: 6,
              whyItMatters: 'JavaScript is the runtime engine for both client-side React and server-side Node.js.',
              prerequisites: ['Basic programming syntax'],
              cycle: {
                learn: 'Review event loop, asynchronous execution, and array higher-order methods.',
                practice: 'Implement array transformation and asynchronous fetch algorithms.',
                build: 'Build interactive DOM widget with event delegation.',
                validate: 'Demonstrate clean promise handling and error catching.',
                improve: 'Refactor code to use modern async/await patterns.'
              },
              completionCriteria: 'Complete async scripting challenges with clean error handling.',
              validationAssessment: 'Async DOM Task Manager exercise.',
              status: 'completed'
            },
            {
              milestoneId: 'step-2',
              title: 'Build a Responsive Frontend',
              skill: 'HTML & CSS',
              objective: 'Create accessible, responsive interfaces using modern CSS Flexbox, Grid, and mobile-first principles.',
              priority: 'High',
              estimatedHours: 8,
              whyItMatters: 'Production full-stack software must render flawlessly across all mobile, tablet, and desktop viewports.',
              prerequisites: ['HTML, CSS basics'],
              cycle: {
                learn: 'Understand CSS layout algorithms, viewport units, and media queries.',
                practice: 'Build flexible grid layouts without fixed-width pixel overflows.',
                build: 'Construct personal portfolio showcasing projects.',
                validate: 'Test across mobile (320px) to desktop (1920px) screens.',
                improve: 'Add accessible focus indicators and semantic landmark tags.'
              },
              completionCriteria: 'Responsive portfolio passing viewport validation without horizontal scroll.',
              validationAssessment: 'Responsive Portfolio verified in demo profile.',
              status: 'completed'
            }
          ]
        },
        {
          phaseNumber: 2,
          title: 'Backend API & Database Development',
          focus: 'RESTful API Architecture, Data Persistence & Validation',
          durationWeeks: 5,
          milestones: [
            {
              milestoneId: 'step-3',
              title: 'Create a REST API',
              skill: 'REST APIs',
              objective: 'Implement structured HTTP endpoints, routing, query parameters, and JSON responses using Express.js.',
              priority: 'High',
              estimatedHours: 10,
              whyItMatters: 'Aarav\'s target role involves backend development, but current profile lacks API design evidence.',
              prerequisites: ['JavaScript fundamentals', 'Node.js basics'],
              cycle: {
                learn: 'Study REST conventions, HTTP methods, and status code taxonomy.',
                practice: 'Build endpoint handlers for GET, POST, PUT, DELETE.',
                build: 'Build Project Lab Mission: Create a REST API for a task manager.',
                validate: 'Verify endpoint contracts return appropriate status codes (200, 201, 400, 404).',
                improve: 'Modularize routes and controllers cleanly.'
              },
              completionCriteria: 'Working CRUD API returning formatted JSON with appropriate status codes.',
              validationAssessment: 'Project Lab Mission: REST API for task manager.',
              status: 'in_progress'
            },
            {
              milestoneId: 'step-4',
              title: 'Connect the API to a Database',
              skill: 'Database Integration',
              objective: 'Design database schemas, establish connection pooling, and perform CRUD queries with Mongoose or PostgreSQL.',
              priority: 'High',
              estimatedHours: 10,
              whyItMatters: 'Moves application data from transient in-memory storage to persistent durable storage.',
              prerequisites: ['Step 3: Create a REST API'],
              cycle: {
                learn: 'Understand relational vs document data models, schemas, and indexing.',
                practice: 'Design schema with typed fields and required constraints.',
                build: 'Project Lab Mission: Connect a web application to a database.',
                validate: 'Confirm records persist across server restarts.',
                improve: 'Optimize queries and handle database connection dropouts.'
              },
              completionCriteria: 'Persistent database storage with validated schema constraints.',
              validationAssessment: 'Project Lab Mission: Database integration.',
              status: 'pending'
            },
            {
              milestoneId: 'step-5',
              title: 'Add Input Validation and Error Handling',
              skill: 'Input Validation & Security',
              objective: 'Protect endpoints with request payload validation and centralized error middleware.',
              priority: 'Medium',
              estimatedHours: 6,
              whyItMatters: 'Critical for production reliability and security against malformed requests.',
              prerequisites: ['Step 3 and 4'],
              cycle: {
                learn: 'Study request sanitization, schema validators (Joi/Zod), and OWASP input security.',
                practice: 'Write validation schemas for POST/PUT payloads.',
                build: 'Project Lab Mission: Implement form validation and error handling.',
                validate: 'Ensure bad requests receive 400 Bad Request with field-level guidance.',
                improve: 'Centralize error middleware so no uncaught exceptions escape.'
              },
              completionCriteria: 'Standardized error payloads returned for invalid requests.',
              validationAssessment: 'Validation middleware evaluation.',
              status: 'pending'
            }
          ]
        },
        {
          phaseNumber: 3,
          title: 'Full-Stack Integration, Testing & Interview Readiness',
          focus: 'End-to-End Delivery, Automated Testing & Technical Interview Mastery',
          durationWeeks: 4,
          milestones: [
            {
              milestoneId: 'step-6',
              title: 'Build a Complete Full-Stack Project',
              skill: 'Full-Stack Integration',
              objective: 'Integrate a responsive React frontend with the secure REST API and database backend into one coherent application.',
              priority: 'High',
              estimatedHours: 18,
              whyItMatters: 'Provides undeniable end-to-end evidence of full-stack engineering competency.',
              prerequisites: ['Steps 1 through 5'],
              cycle: {
                learn: 'Architect client-server data flow, CORS, and deployment topology.',
                practice: 'Connect React state to backend API endpoints.',
                build: 'Project Lab Mission: Build a small full-stack application.',
                validate: 'Perform end-to-end user workflows from browser to database.',
                improve: 'Add optimistic UI updates and responsive feedback.'
              },
              completionCriteria: 'Live deployed full-stack application with connected client and server.',
              validationAssessment: 'Full-stack application submission.',
              status: 'pending'
            },
            {
              milestoneId: 'step-7',
              title: 'Review Testing and Debugging',
              skill: 'Automated Testing',
              objective: 'Write automated tests using Jest and Supertest to verify endpoint contracts and UI components.',
              priority: 'Medium',
              estimatedHours: 8,
              whyItMatters: 'Demonstrates engineering maturity and safeguards against regressions.',
              prerequisites: ['Step 6'],
              cycle: {
                learn: 'Understand test suites, assertions, and test runners.',
                practice: 'Write unit tests for utility functions and route handlers.',
                build: 'Build automated test suite covering primary happy and error paths.',
                validate: 'Run npm test with passing assertions.',
                improve: 'Aim for 70%+ branch coverage on critical business logic.'
              },
              completionCriteria: 'Passing automated test suite with clean assertions.',
              validationAssessment: 'Automated test suite report.',
              status: 'pending'
            },
            {
              milestoneId: 'step-8',
              title: 'Practise Full-Stack Interview Questions',
              skill: 'Interview & Communication',
              objective: 'Articulate technical decisions, architectural tradeoffs, and debugging logic under interview conditions.',
              priority: 'High',
              estimatedHours: 6,
              whyItMatters: 'Validates verbal communication and technical depth needed for technical hiring rounds.',
              prerequisites: ['Steps 1 through 7'],
              cycle: {
                learn: 'Review common full-stack interview rubrics: correctness, reasoning, structure.',
                practice: 'Answer questions one at a time with structured problem breakdown.',
                build: 'Complete 3 mock interview sessions in Interview Arena.',
                validate: 'Attain score >= 75% on technical interview evaluation.',
                improve: 'Review transparent rubric feedback and strengthen identified weak spots.'
              },
              completionCriteria: 'Pass full-stack technical interview session with score >= 75%.',
              validationAssessment: 'Interview Arena Session Report.',
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
