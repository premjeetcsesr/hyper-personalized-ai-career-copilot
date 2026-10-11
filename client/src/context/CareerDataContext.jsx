import React, { createContext, useContext, useState, useEffect } from 'react';

// Central Career Data Context for AI Career Co-Pilot
// Implements Evidence-Based Career Intelligence with shared state across all screens.
const CareerDataContext = createContext(null);

const STORAGE_KEY = 'ai_career_copilot_state_v2';

export const CAREER_CATALOGUE = [
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Developer',
    category: 'Engineering',
    level: 'Entry to Mid',
    overview: 'Designs, develops, and deploys both client-facing responsive interfaces and scalable backend server APIs and databases.',
    typicalResponsibilities: [
      'Build reusable UI components and client applications with React or modern frameworks',
      'Design and document RESTful endpoints, request handlers, and middleware in Node.js',
      'Create data schemas, establish database connections, and perform efficient CRUD queries',
      'Implement authentication, payload validation, and secure error envelopes',
      'Collaborate through Git feature branching, testing, and CI/CD pipelines'
    ],
    coreSkills: [
      { name: 'HTML & CSS', targetProficiency: 85, required: true },
      { name: 'JavaScript', targetProficiency: 80, required: true },
      { name: 'React', targetProficiency: 75, required: true },
      { name: 'REST APIs', targetProficiency: 80, required: true },
      { name: 'Database Integration', targetProficiency: 75, required: true },
      { name: 'Testing & Debugging', targetProficiency: 70, required: false },
      { name: 'Git & Version Control', targetProficiency: 80, required: true }
    ],
    exampleTasks: [
      'Implement an authenticated REST API for task management with input validation',
      'Design a normalized relational schema or MongoDB collection for user orders',
      'Connect a responsive React frontend to paginated backend endpoints with optimistic loading'
    ],
    prerequisites: ['Proficiency in JavaScript fundamentals', 'Understanding of client-server HTTP cycle', 'Basic command line familiarity'],
    suggestedProjects: [
      'Task Manager REST API with Express and PostgreSQL/MongoDB',
      'Full-Stack E-commerce or Grievance Portal with JWT Authentication',
      'Collaborative Kanban Board with optimistic UI updates'
    ],
    commonInterviewTopics: [
      'Client-server architecture and HTTP request/response lifecycles',
      'State management tradeoffs and asynchronous error handling',
      'Database indexing, relations, and query performance',
      'Security defenses: CORS, XSS, CSRF, and token management'
    ],
    learningRoutes: [
      'Stage 1: Frontend fundamentals (Semantic HTML, modern CSS, JavaScript ES6+)',
      'Stage 2: Backend foundations (Node.js, Express routing, REST conventions)',
      'Stage 3: Data persistence (Mongoose/PostgreSQL, transactions, connection pools)',
      'Stage 4: End-to-end integration, automated testing, and cloud deployment'
    ],
    sampleSalaryRange: '$75,000 - $115,000 / yr (Sample data for illustrative comparison)'
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    category: 'Engineering',
    level: 'Entry to Mid',
    overview: 'Specializes in user interface development, responsive cross-device layouts, browser performance, accessibility, and client-side state.',
    typicalResponsibilities: [
      'Translate design wireframes and component libraries into clean, accessible code',
      'Optimize Web Core Vitals, asset loading, and client rendering speed',
      'Manage client application state using React Hooks, Context, or state libraries',
      'Ensure WCAG 2.2 AA accessibility standards across viewports and screen readers'
    ],
    coreSkills: [
      { name: 'HTML & CSS', targetProficiency: 90, required: true },
      { name: 'JavaScript', targetProficiency: 85, required: true },
      { name: 'React', targetProficiency: 85, required: true },
      { name: 'Web Performance & Accessibility', targetProficiency: 80, required: true },
      { name: 'Git & Version Control', targetProficiency: 80, required: true },
      { name: 'Testing & Debugging', targetProficiency: 70, required: false }
    ],
    exampleTasks: [
      'Refactor layout to eliminate Cumulative Layout Shift (CLS)',
      'Build an accessible modal dialog system with keyboard focus trapping',
      'Integrate third-party REST API with pagination and infinite scroll'
    ],
    prerequisites: ['HTML5 semantic markup', 'CSS Grid & Flexbox mastery', 'Modern JavaScript'],
    suggestedProjects: [
      'Accessible Component Library with Storybook documentation',
      'High-performance Movie Explorer consuming public REST endpoints',
      'Interactive Dashboard with responsive charts and dark/light modes'
    ],
    commonInterviewTopics: [
      'Virtual DOM and reconciliation algorithms',
      'CSS specificity, stacking contexts, and layout containment',
      'Event bubbling, capturing, and delegation',
      'Web accessibility guidelines and ARIA attributes'
    ],
    learningRoutes: [
      'Stage 1: Semantic HTML, modern CSS layout, and DOM APIs',
      'Stage 2: Modern JavaScript deep dive (Closures, Promises, Event Loop)',
      'Stage 3: React component architecture, custom hooks, and state management',
      'Stage 4: Performance optimization, a11y compliance, and end-to-end testing'
    ],
    sampleSalaryRange: '$70,000 - $105,000 / yr (Sample data for illustrative comparison)'
  },
  {
    id: 'backend-dev',
    title: 'Backend Developer',
    category: 'Engineering',
    level: 'Entry to Mid',
    overview: 'Architects robust server-side business logic, database queries, API contracts, caching layers, and cloud microservices.',
    typicalResponsibilities: [
      'Develop scalable REST and GraphQL APIs with structured routing and middleware',
      'Design, migrate, and optimize relational SQL and NoSQL database schemas',
      'Implement authentication, role-based authorization, and encryption',
      'Manage server logging, rate limiting, and infrastructure reliability'
    ],
    coreSkills: [
      { name: 'JavaScript / Node.js', targetProficiency: 85, required: true },
      { name: 'REST APIs', targetProficiency: 90, required: true },
      { name: 'Database Integration', targetProficiency: 85, required: true },
      { name: 'Testing & Debugging', targetProficiency: 80, required: true },
      { name: 'Git & Version Control', targetProficiency: 80, required: true },
      { name: 'Docker & Microservices', targetProficiency: 70, required: false }
    ],
    exampleTasks: [
      'Design an idempotent payment webhook processor with retry logic',
      'Optimize database queries with indexing, reducing response time by 80%',
      'Add token bucket rate limiting to prevent denial-of-service abuse'
    ],
    prerequisites: ['Server runtimes (Node.js/Python)', 'HTTP protocols', 'Basic relational database concepts'],
    suggestedProjects: [
      'Modular REST API with JWT Auth, Role Permissions, and Swagger docs',
      'Real-Time Chat or Event Stream using WebSockets and Redis Pub/Sub',
      'Microservice File Processing Worker with asynchronous job queues'
    ],
    commonInterviewTopics: [
      'Database indexing, ACID properties, and N+1 query troubleshooting',
      'Horizontal vs vertical scaling and caching strategies',
      'Idempotency, distributed transactions, and eventual consistency',
      'Security best practices: SQL injection, sanitization, hashing salts'
    ],
    learningRoutes: [
      'Stage 1: Server runtimes, event loop, and asynchronous streams',
      'Stage 2: API architecture, routing, middleware, and request validation',
      'Stage 3: Advanced databases, migrations, and query tuning',
      'Stage 4: Caching, message queues, containerization, and monitoring'
    ],
    sampleSalaryRange: '$75,000 - $115,000 / yr (Sample data for illustrative comparison)'
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Developer',
    category: 'Engineering',
    level: 'Entry to Mid',
    overview: 'Builds native or cross-platform mobile experiences for iOS and Android with intuitive touch UX and offline storage.',
    typicalResponsibilities: [
      'Develop native or cross-platform mobile apps using React Native, Flutter, Swift, or Kotlin',
      'Handle local device storage, offline synchronization, and background workers',
      'Integrate device capabilities including camera, GPS, push notifications, and biometrics',
      'Optimize rendering frame rates, memory usage, and battery consumption'
    ],
    coreSkills: [
      { name: 'React Native / Flutter', targetProficiency: 85, required: true },
      { name: 'Mobile UI & Gestures', targetProficiency: 85, required: true },
      { name: 'REST APIs', targetProficiency: 80, required: true },
      { name: 'Offline Storage & State', targetProficiency: 80, required: true },
      { name: 'Git & Version Control', targetProficiency: 75, required: true }
    ],
    exampleTasks: [
      'Implement offline caching queue that syncs pending actions when connectivity returns',
      'Build custom gesture animation with smooth 60fps frame rate',
      'Configure automated app store build pipeline for iOS and Android'
    ],
    prerequisites: ['JavaScript or Dart fundamentals', 'Mobile lifecycle principles', 'UI layout concepts'],
    suggestedProjects: [
      'Fitness Tracking Mobile App with local SQLite persistence and health graphs',
      'Cross-Platform Delivery Tracker with live map updates and push alerts',
      'Offline-First Note Taking App with biometric authentication'
    ],
    commonInterviewTopics: [
      'Mobile app lifecycles (foreground, background, suspended)',
      'Offline state synchronization and conflict resolution',
      'Memory leaks and bundle optimization for mobile constraints',
      'Native bridges vs compiled cross-platform architectures'
    ],
    learningRoutes: [
      'Stage 1: Core cross-platform framework setup and component paradigms',
      'Stage 2: Navigation hierarchies, gesture responders, and touch styling',
      'Stage 3: Device APIs, camera/push notifications, and local databases',
      'Stage 4: Release signing, app store testing, and performance profiling'
    ],
    sampleSalaryRange: '$72,000 - $110,000 / yr (Sample data for illustrative comparison)'
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data',
    level: 'Entry to Mid',
    overview: 'Extracts actionable business insights from structured datasets, creates interactive dashboards, and interprets key trends.',
    typicalResponsibilities: [
      'Write complex SQL queries, aggregations, window functions, and joins',
      'Clean, normalize, and validate messy datasets using Python (Pandas) or SQL',
      'Design clear, communicative visual dashboards in PowerBI, Tableau, or modern web tools',
      'Translate raw metrics into actionable business recommendations for stakeholders'
    ],
    coreSkills: [
      { name: 'SQL & Database Queries', targetProficiency: 85, required: true },
      { name: 'Python (Pandas / NumPy)', targetProficiency: 80, required: true },
      { name: 'Data Visualization', targetProficiency: 85, required: true },
      { name: 'Statistical Analysis', targetProficiency: 75, required: true },
      { name: 'Business Metrics & Reporting', targetProficiency: 75, required: true }
    ],
    exampleTasks: [
      'Write SQL window queries calculating 30-day rolling customer retention rates',
      'Clean and join multi-source CSV files using Python Pandas scripts',
      'Build an executive dashboard showcasing sales anomalies and quarterly forecast'
    ],
    prerequisites: ['Relational database concepts', 'Basic statistics and probability', 'Spreadsheet tools'],
    suggestedProjects: [
      'E-commerce Customer Cohort Retention Analysis with SQL & Python',
      'Healthcare Operational Efficiency Dashboard with interactive filters',
      'Financial Market Trends Visualizer and automated summary report'
    ],
    commonInterviewTopics: [
      'SQL subqueries vs CTEs, window functions (ROW_NUMBER, RANK, DENSE_RANK)',
      'Data cleaning methodologies: handling nulls, outliers, and duplicates',
      'A/B test design, p-values, and statistical significance interpretation',
      'Designing dashboards that communicate effectively to non-technical executives'
    ],
    learningRoutes: [
      'Stage 1: Relational databases and intermediate to advanced SQL',
      'Stage 2: Python data stack (Pandas, NumPy, Matplotlib/Seaborn)',
      'Stage 3: Business analytics, KPIs, and visualization dashboards',
      'Stage 4: Statistical inference, hypothesis testing, and stakeholder presentation'
    ],
    sampleSalaryRange: '$65,000 - $95,000 / yr (Sample data for illustrative comparison)'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data',
    level: 'Entry to Mid',
    overview: 'Builds predictive models, conducts rigorous statistical experiments, and extracts deep predictive intelligence from complex data.',
    typicalResponsibilities: [
      'Perform exploratory data analysis and feature engineering on high-dimensional data',
      'Train, evaluate, and tune supervised and unsupervised machine learning algorithms',
      'Design hypothesis tests, causal inference studies, and A/B experiments',
      'Collaborate with software engineers to deploy model scoring endpoints into production'
    ],
    coreSkills: [
      { name: 'Python (Pandas, SciPy, Scikit-Learn)', targetProficiency: 90, required: true },
      { name: 'Machine Learning Algorithms', targetProficiency: 85, required: true },
      { name: 'Statistical Modeling & Hypothesis Testing', targetProficiency: 85, required: true },
      { name: 'SQL & Data Extraction', targetProficiency: 80, required: true },
      { name: 'Data Visualization & Communication', targetProficiency: 80, required: true }
    ],
    exampleTasks: [
      'Develop a customer churn prediction classifier with calibrated probabilities',
      'Conduct feature importance analysis to explain model predictions to auditors',
      'Formulate power calculations and sample size requirements for product experiments'
    ],
    prerequisites: ['Linear algebra, multivariate calculus, probability', 'Python programming', 'Data manipulation'],
    suggestedProjects: [
      'Predictive Customer Churn Classifier with Scikit-Learn and SHAP explainability',
      'Housing Price Regression Model with comprehensive feature engineering pipeline',
      'NLP Sentiment Analysis on product reviews with TF-IDF and classification metrics'
    ],
    commonInterviewTopics: [
      'Bias-variance tradeoff, overfitting mitigation, and cross-validation techniques',
      'Evaluation metrics tradeoffs: Precision, Recall, F1, ROC-AUC under imbalanced data',
      'Linear regression assumptions and regularization (L1 Lasso, L2 Ridge)',
      'Feature leakage identification and experimental design hygiene'
    ],
    learningRoutes: [
      'Stage 1: Mathematical foundations (Linear algebra, multivariate calculus, stats)',
      'Stage 2: Python scientific computing and exploratory data analysis',
      'Stage 3: Classical machine learning algorithms and hyperparameter optimization',
      'Stage 4: Model validation, explainability (SHAP/LIME), and basic deployment'
    ],
    sampleSalaryRange: '$85,000 - $130,000 / yr (Sample data for illustrative comparison)'
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Security',
    level: 'Entry to Mid',
    overview: 'Protects networks, endpoints, and applications from threats, monitors security alerts, and enforces security compliance.',
    typicalResponsibilities: [
      'Monitor SIEM logs, firewall alerts, and intrusion detection systems for security incidents',
      'Perform vulnerability assessments, network port scans, and patch management reviews',
      'Analyze malware behavior, phishing vectors, and unauthorized network traffic',
      'Author incident response reports and enforce least-privilege security policies'
    ],
    coreSkills: [
      { name: 'Network Security & Protocols (TCP/IP, DNS, SSL)', targetProficiency: 85, required: true },
      { name: 'Threat Analysis & Incident Response', targetProficiency: 85, required: true },
      { name: 'Web Security & OWASP Top 10', targetProficiency: 85, required: true },
      { name: 'Linux & Scripting (Bash / Python)', targetProficiency: 75, required: true },
      { name: 'Identity & Access Management (IAM)', targetProficiency: 70, required: false }
    ],
    exampleTasks: [
      'Triage an alert flagging abnormal outbound DNS tunneling traffic',
      'Audit web application against OWASP Top 10 vulnerabilities (XSS, SQLi, CSRF)',
      'Draft an incident response timeline following a simulated credential compromise'
    ],
    prerequisites: ['Networking fundamentals (OSI model, TCP/IP)', 'Operating system security basics', 'Command line comfort'],
    suggestedProjects: [
      'Home Lab SIEM (Wazuh/Splunk) Monitoring and alert triage simulation',
      'Web Application Vulnerability Assessment report on test application',
      'Automated Network Port & Vulnerability Scanner written in Python'
    ],
    commonInterviewTopics: [
      'OWASP Top 10 vulnerabilities, root causes, and developer remediation advice',
      'Incident response phases: Preparation, Detection, Containment, Eradication, Recovery',
      'Symmetric vs asymmetric encryption, certificates, and TLS handshakes',
      'Zero trust architecture and defense-in-depth principles'
    ],
    learningRoutes: [
      'Stage 1: Networking protocols, packet analysis (Wireshark), and Linux administration',
      'Stage 2: Security fundamentals, cryptography, and access controls',
      'Stage 3: Web security, vulnerability scanning, and threat intelligence',
      'Stage 4: SIEM monitoring, log correlation, incident triage, and forensic basics'
    ],
    sampleSalaryRange: '$75,000 - $115,000 / yr (Sample data for illustrative comparison)'
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Design',
    level: 'Entry to Mid',
    overview: 'Designs human-centered user experiences, user flows, wireframes, prototypes, and accessible design system components.',
    typicalResponsibilities: [
      'Conduct user interviews, usability tests, and translate user feedback into wireframes',
      'Design high-fidelity user interfaces, design tokens, and components in Figma',
      'Ensure designs satisfy WCAG 2.2 AA accessibility guidelines and color contrast rules',
      'Create interactive prototypes to validate workflows with users and engineers'
    ],
    coreSkills: [
      { name: 'User Research & Personas', targetProficiency: 85, required: true },
      { name: 'Wireframing & Prototyping (Figma)', targetProficiency: 90, required: true },
      { name: 'Design Systems & Component Architecture', targetProficiency: 85, required: true },
      { name: 'Visual Design, Typography & Colors', targetProficiency: 85, required: true },
      { name: 'Accessibility Standards (WCAG 2.2 AA)', targetProficiency: 80, required: true }
    ],
    exampleTasks: [
      'Audit existing application workflow and redesign onboarding to reduce drop-off',
      'Create accessible design token system for dark and light color modes in Figma',
      'Build interactive prototype validating mobile navigation drawer usability'
    ],
    prerequisites: ['Visual hierarchy and typography fundamentals', 'Empathy for user friction', 'Figma or design tool basics'],
    suggestedProjects: [
      'End-to-End Mobile App Case Study: Problem discovery, user testing, and final UI',
      'Accessible Design System with component variants, tokens, and documentation',
      'Desktop Web App Redesign addressing usability bottlenecks and responsive states'
    ],
    commonInterviewTopics: [
      'Walking through your design process from ambiguity to tested prototype',
      'How you incorporate user research and resolve conflicting stakeholder requests',
      'Designing for accessibility: Contrast ratios, touch targets, and assistive tech',
      'How you collaborate with frontend engineers and specify handoff documentation'
    ],
    learningRoutes: [
      'Stage 1: Design fundamentals (Visual hierarchy, typography, color theory, layout)',
      'Stage 2: UX research methodologies (Interviews, personas, journey maps)',
      'Stage 3: High-fidelity UI design in Figma, auto-layout, and reusable components',
      'Stage 4: Accessibility compliance, prototyping, usability testing, and developer handoff'
    ],
    sampleSalaryRange: '$68,000 - $105,000 / yr (Sample data for illustrative comparison)'
  }
];

// Initial canonical demo data featuring Aarav Sharma
const INITIAL_STATE = {
  profile: {
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@example.edu',
    college: 'City Engineering College',
    degree: 'B.Tech Computer Science',
    currentStage: 'Learning and building projects',
    targetRole: 'Full-Stack Developer',
    existingEvidence: 'A few basic web-development exercises',
    currentChallenge: 'Limited evidence of backend development and database integration',
    weeklyLearningHours: 15,
    bio: 'Early-career developer aiming for Full-Stack development. Currently focusing on transitioning from static frontends to robust backend APIs and database systems.',
    interests: ['Web Development', 'Backend & APIs', 'Databases', 'Cloud & DevOps'],
    goals: 'Become a confident Full-Stack Developer by building demonstrated backend APIs and database systems, validating skills through projects, and preparing for technical interviews.',
    learningPreferences: {
      style: 'Hands-on practical projects',
      pacing: 'Self-paced structured',
      feedback: 'Detailed rubrics with transparent criteria'
    }
  },
  skills: [
    {
      id: 'skill-html-css',
      name: 'HTML & CSS',
      category: 'Frontend',
      state: 'Demonstrated', // Verified
      source: 'Completed project exercise',
      relatedProject: 'Personal Portfolio & Responsive Component Lab',
      date: '2 weeks ago',
      description: 'Structuring semantic web pages, responsive layouts with Flexbox/Grid, and modern styling.',
      limitations: 'Demonstrated in static frontends; interactive state binding still evolving.',
      nextAction: 'Maintain mastery; apply in full-stack project.',
      proficiency: 85,
      confidence: 90
    },
    {
      id: 'skill-js',
      name: 'JavaScript',
      category: 'Language',
      state: 'Probable',
      source: 'Partial coding exercises & interactive scripts',
      relatedProject: 'DOM task manager & async fetch practice',
      date: '1 week ago',
      description: 'Core language fundamentals, asynchronous programming, DOM manipulation, ES6+ syntax.',
      limitations: 'Basic DOM and async functions shown; complex data transformations and state patterns not yet fully demonstrated.',
      nextAction: 'Strengthen JavaScript closures, event loop, and asynchronous error handling.',
      proficiency: 68,
      confidence: 70
    },
    {
      id: 'skill-react',
      name: 'React',
      category: 'Frontend',
      state: 'Claimed',
      source: 'Self-reported profile selection',
      relatedProject: 'None verified yet',
      date: 'Self-reported',
      description: 'Component-based UI development, props, state hooks, and virtual DOM concepts.',
      limitations: 'No verified code project or assessment demonstrating custom hooks or state management.',
      nextAction: 'Build an interactive UI component consuming dynamic API data.',
      proficiency: 45,
      confidence: 40
    },
    {
      id: 'skill-rest-apis',
      name: 'REST APIs',
      category: 'Architecture',
      state: 'Claimed',
      source: 'Self-reported profile selection',
      relatedProject: 'None verified yet',
      date: 'Self-reported',
      description: 'HTTP methods, route handlers, status codes, request/response cycle, and JSON payloads.',
      limitations: 'No relevant completed API project is present in the demo profile.',
      nextAction: 'Build a small REST API with multiple endpoints and basic validation.',
      proficiency: 40,
      confidence: 35
    },
    {
      id: 'skill-database',
      name: 'Database Integration',
      category: 'Database',
      state: 'Unknown',
      source: 'Not yet assessed',
      relatedProject: 'None',
      date: 'Unassessed',
      description: 'Data modeling, relational or document schemas, CRUD operations, connection management, queries.',
      limitations: 'No database models or query code detected in demo profile.',
      nextAction: 'Complete mission: Connect a web application to a database.',
      proficiency: 25,
      confidence: 20
    },
    {
      id: 'skill-testing',
      name: 'Testing & Debugging',
      category: 'Testing',
      state: 'Unknown',
      source: 'Not yet assessed',
      relatedProject: 'None',
      date: 'Unassessed',
      description: 'Writing automated unit and integration tests (e.g., Jest/Supertest), edge cases, and test assertions.',
      limitations: 'No test suites or coverage reports recorded.',
      nextAction: 'Write unit tests for API endpoints and validation handlers.',
      proficiency: 20,
      confidence: 15
    },
    {
      id: 'skill-git',
      name: 'Git & Version Control',
      category: 'DevOps',
      state: 'Probable',
      source: 'Basic repository commits',
      relatedProject: 'Portfolio exercises repo',
      date: '3 weeks ago',
      description: 'Branching, committing, pull requests, and multi-file code versioning.',
      limitations: 'Commit history contains basic commits without pull request reviews or conflict resolution.',
      nextAction: 'Collaborate via feature branches and structured pull requests.',
      proficiency: 65,
      confidence: 68
    }
  ],
  roadmap: [
    {
      id: 'step-1',
      title: 'Strengthen JavaScript Fundamentals',
      learningObjective: 'Master ES6+, scope, closures, promises, and async/await for predictable execution.',
      whyItMatters: 'JavaScript is the runtime engine for both client-side React and server-side Node.js.',
      prerequisites: 'Basic programming syntax',
      estimatedEffort: '6 hours',
      instructions: 'Review execution context, microtask queue, Promise.all, and modern destructuring syntax.',
      practiceActivity: 'Solve asynchronous data fetching and array transformation challenges.',
      evidenceTask: 'Async DOM Task Manager exercise with error handling.',
      completionCriteria: 'Complete async scripting challenges with clean error handling.',
      status: 'completed',
      relatedRole: 'Full-Stack Developer'
    },
    {
      id: 'step-2',
      title: 'Build a Responsive Frontend',
      learningObjective: 'Create accessible, responsive interfaces using modern CSS Flexbox, Grid, and mobile-first principles.',
      whyItMatters: 'Production full-stack software must render flawlessly across all mobile, tablet, and desktop viewports.',
      prerequisites: 'HTML, CSS basics',
      estimatedEffort: '8 hours',
      instructions: 'Apply mobile-first breakpoints, accessible button touch sizes (min 44x44px), and fluid typography.',
      practiceActivity: 'Develop a mobile-first personal portfolio page with responsive navigation.',
      evidenceTask: 'Responsive portfolio verified in demo profile.',
      completionCriteria: 'Responsive portfolio passing viewport validation without horizontal scroll.',
      status: 'completed',
      relatedRole: 'Full-Stack Developer'
    },
    {
      id: 'step-3',
      title: 'Create a REST API',
      learningObjective: 'Implement structured HTTP endpoints, routing, query parameters, and JSON responses using Express.js.',
      whyItMatters: 'Aarav\'s target role involves backend development, but current profile lacks API design evidence.',
      prerequisites: 'JavaScript fundamentals, Node.js basics',
      estimatedEffort: '10 hours',
      instructions: 'Configure Express router, define GET/POST/PUT/DELETE routes, parse JSON bodies, and use HTTP 200, 201, 400, 404 codes.',
      practiceActivity: 'Build Project Lab Mission: Create a REST API for a task manager.',
      evidenceTask: 'Project Lab Mission: REST API for task manager.',
      completionCriteria: 'Working CRUD API returning formatted JSON with appropriate status codes.',
      status: 'in-progress', // Active next action
      relatedRole: 'Full-Stack Developer'
    },
    {
      id: 'step-4',
      title: 'Connect the API to a Database',
      learningObjective: 'Design database schemas, establish connection pooling, and perform CRUD queries with Mongoose or PostgreSQL.',
      whyItMatters: 'Moves application data from transient in-memory storage to persistent durable storage.',
      prerequisites: 'Step 3: Create a REST API',
      estimatedEffort: '10 hours',
      instructions: 'Establish connection string with retry handling, define schema with typed constraints, and run indexed queries.',
      practiceActivity: 'Project Lab Mission: Connect a web application to a database.',
      evidenceTask: 'Database schema and query implementation.',
      completionCriteria: 'Persistent database storage with validated schema constraints.',
      status: 'not-started',
      relatedRole: 'Full-Stack Developer'
    },
    {
      id: 'step-5',
      title: 'Add Input Validation and Error Handling',
      learningObjective: 'Protect endpoints with request payload validation and centralized error middleware.',
      whyItMatters: 'Critical for production reliability and security against malformed requests and unhandled exceptions.',
      prerequisites: 'Step 3 and 4',
      estimatedEffort: '6 hours',
      instructions: 'Write validation schemas checking data types and length constraints. Return standard 400 envelopes.',
      practiceActivity: 'Project Lab Mission: Implement form validation and error handling.',
      evidenceTask: 'Validation middleware evaluation.',
      completionCriteria: 'Standardized error payloads returned for invalid requests.',
      status: 'not-started',
      relatedRole: 'Full-Stack Developer'
    },
    {
      id: 'step-6',
      title: 'Build a Complete Full-Stack Project',
      learningObjective: 'Integrate a responsive React frontend with the secure REST API and database backend into one coherent application.',
      whyItMatters: 'Provides undeniable end-to-end evidence of full-stack engineering competency.',
      prerequisites: 'Steps 1 through 5',
      estimatedEffort: '18 hours',
      instructions: 'Connect React state to backend API endpoints, render loading skeletons, optimistic updates, and clean errors.',
      practiceActivity: 'Project Lab Mission: Build a small full-stack application.',
      evidenceTask: 'Full-stack repository and live deployment.',
      completionCriteria: 'Live deployed full-stack application with connected client and server.',
      status: 'not-started',
      relatedRole: 'Full-Stack Developer'
    },
    {
      id: 'step-7',
      title: 'Review Testing and Debugging',
      learningObjective: 'Write automated tests using Jest and Supertest to verify endpoint contracts and UI components.',
      whyItMatters: 'Demonstrates engineering maturity and safeguards against regressions.',
      prerequisites: 'Step 6',
      estimatedEffort: '8 hours',
      instructions: 'Configure test runner, write unit tests for controllers and integration tests for route contracts.',
      practiceActivity: 'Write unit tests for API endpoints and mock database interactions.',
      evidenceTask: 'Automated test suite run.',
      completionCriteria: 'Passing automated test suite with clean assertions.',
      status: 'not-started',
      relatedRole: 'Full-Stack Developer'
    },
    {
      id: 'step-8',
      title: 'Practise Full-Stack Interview Questions',
      learningObjective: 'Articulate technical decisions, architectural tradeoffs, and debugging logic under interview conditions.',
      whyItMatters: 'Validates verbal communication and technical depth needed for technical hiring rounds.',
      prerequisites: 'Steps 1 through 7',
      estimatedEffort: '6 hours',
      instructions: 'Complete mock interviews in Interview Arena, focusing on relevance, correctness, and clear structure.',
      practiceActivity: 'Complete 3 mock interview sessions in the Interview Arena.',
      evidenceTask: 'Interview Arena Session Report with score >= 75%.',
      completionCriteria: 'Pass full-stack technical interview session with score >= 75%.',
      status: 'not-started',
      relatedRole: 'Full-Stack Developer'
    }
  ],
  projects: [
    {
      id: 'mission-portfolio',
      title: 'Build a Responsive Personal Portfolio',
      intendedSkills: ['HTML & CSS', 'Responsive Layout', 'Git'],
      projectObjective: 'Create an accessible, multi-section responsive personal portfolio using semantic HTML5 and modern CSS Grid/Flexbox.',
      requirements: [
        'Semantic landmarks (header, nav, main, section, footer)',
        'Mobile-first responsive styling without fixed-width overflows',
        'Visible keyboard focus indicators and contrast >= 4.5:1',
        'Projects showcase grid with working external links'
      ],
      milestones: [
        'Milestone 1: Semantic HTML structure and responsive viewport meta tag',
        'Milestone 2: CSS Grid and Flexbox responsive styling',
        'Milestone 3: Accessibility review and mobile viewport testing'
      ],
      deliverables: 'GitHub repository URL and live deployed URL',
      evaluationRubric: [
        { criterion: 'Semantic HTML & Layout', weight: '30%', target: 'Proper landmark tags and clean document outline' },
        { criterion: 'Responsive Design', weight: '35%', target: 'Zero horizontal scroll at 320px, 375px, 768px, 1280px' },
        { criterion: 'Accessibility', weight: '20%', target: 'Visible focus indicators and readable color contrast' },
        { criterion: 'Code Quality', weight: '15%', target: 'Clean CSS naming and modular styles' }
      ],
      mode: 'guided',
      status: 'completed',
      submission: {
        repoUrl: 'https://github.com/aarav-sharma-dev/responsive-portfolio',
        demoUrl: 'https://aarav-portfolio-demo.vercel.app',
        submittedAt: '2 weeks ago',
        notes: 'Constructed with mobile-first CSS media queries, custom properties for design tokens, and semantic HTML5.'
      },
      feedback: {
        status: 'Approved',
        score: 88,
        summary: 'Excellent responsive structure. Tested clean across small mobile viewports with no horizontal clipping.',
        criteriaScores: [
          { criterion: 'Semantic HTML & Layout', score: 90, comment: 'Clean landmarks and heading hierarchy.' },
          { criterion: 'Responsive Design', score: 92, comment: 'Fluid grid adapts smoothly across screen sizes.' },
          { criterion: 'Accessibility', score: 85, comment: 'Focus states are visible; high contrast verified.' },
          { criterion: 'Code Quality', score: 85, comment: 'Organized CSS custom properties.' }
        ],
        evidenceImpact: 'HTML & CSS status verified as Demonstrated in learner profile.'
      }
    },
    {
      id: 'mission-rest-api',
      title: 'Create a REST API for a Task Manager',
      intendedSkills: ['REST APIs', 'Node.js / Express', 'HTTP Status Codes', 'Routing'],
      projectObjective: 'Build a modular REST API with Express.js supporting full CRUD operations for tasks with filtering, priority sorting, and structured JSON responses.',
      requirements: [
        'Endpoints: GET /api/tasks, GET /api/tasks/:id, POST /api/tasks, PUT /api/tasks/:id, DELETE /api/tasks/:id',
        'Appropriate HTTP status codes (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error)',
        'Payload validation rejecting empty titles or invalid status values',
        'Structured JSON response format: { success: boolean, data?: any, error?: string }'
      ],
      milestones: [
        'Milestone 1: Express server setup and modular router configuration',
        'Milestone 2: CRUD endpoint controller handlers with query filtering',
        'Milestone 3: Input validation middleware and error envelope response'
      ],
      deliverables: 'GitHub repository or endpoint code implementation with testing notes',
      evaluationRubric: [
        { criterion: 'REST Conventions & Routing', weight: '30%', target: 'Proper HTTP verbs and resource-based endpoints' },
        { criterion: 'Status Code Accuracy', weight: '25%', target: 'Correct use of 200, 201, 400, 404, 500' },
        { criterion: 'Input Validation & Errors', weight: '25%', target: 'Rejection of invalid payloads with descriptive errors' },
        { criterion: 'Code Organization', weight: '20%', target: 'Separation of routes, controllers, and middleware' }
      ],
      mode: 'guided',
      status: 'in-progress',
      submission: null,
      feedback: null
    },
    {
      id: 'mission-database',
      title: 'Connect a Web Application to a Database',
      intendedSkills: ['Database Integration', 'Mongoose / PostgreSQL', 'Schema Modeling', 'CRUD Queries'],
      projectObjective: 'Connect your backend server to a database (MongoDB/Mongoose or PostgreSQL), define strict schemas with timestamps, and replace in-memory arrays.',
      requirements: [
        'Configure database connection pool with resilient error handling and reconnection',
        'Define Task schema with typed title, description, status, priority, and timestamps',
        'Refactor controllers to execute database queries with proper async/await error catching'
      ],
      milestones: [
        'Milestone 1: Database connection establishment with environment secrets',
        'Milestone 2: Schema definition and model compilation',
        'Milestone 3: Controller refactoring from memory array to database operations'
      ],
      deliverables: 'Database schema file, connection handler, and refactored controller code',
      evaluationRubric: [
        { criterion: 'Schema Design', weight: '30%', target: 'Typed constraints and indexing for frequent queries' },
        { criterion: 'Query Implementation', weight: '35%', target: 'Clean async CRUD operations with error catching' },
        { criterion: 'Resilience', weight: '20%', target: 'Graceful handling of database connection timeouts' },
        { criterion: 'Security', weight: '15%', target: 'Credentials managed via environment variables' }
      ],
      mode: 'guided',
      status: 'not-started',
      submission: null,
      feedback: null
    },
    {
      id: 'mission-validation',
      title: 'Implement Form Validation and Error Handling',
      intendedSkills: ['Input Validation', 'Security', 'Error Middleware', 'User Feedback'],
      projectObjective: 'Implement dual-layer client and server validation with user-friendly error messages and edge-case protection.',
      requirements: [
        'Create validation middleware (Joi/Zod or custom) verifying incoming POST/PUT payloads',
        'Implement centralized Express error handling middleware preventing uncaught crashes',
        'Ensure server never leaks internal stack traces to clients in production mode'
      ],
      milestones: [
        'Milestone 1: Schema validation rules definition',
        'Milestone 2: Validation middleware implementation returning field-specific errors',
        'Milestone 3: Centralized error handling middleware with environment-aware logging'
      ],
      deliverables: 'Validation middleware files, test payload examples, and error responses',
      evaluationRubric: [
        { criterion: 'Validation Coverage', weight: '35%', target: 'All required fields, types, and boundary lengths validated' },
        { criterion: 'Error Envelope Clarity', weight: '30%', target: 'Descriptive guidance returned to client' },
        { criterion: 'Security Hygiene', weight: '20%', target: 'No sensitive trace or server information disclosed' },
        { criterion: 'Middleware Pipeline', weight: '15%', target: 'Proper Express next(err) error delegation' }
      ],
      mode: 'challenge',
      status: 'not-started',
      submission: null,
      feedback: null
    },
    {
      id: 'mission-fullstack',
      title: 'Build a Small Full-Stack Application',
      intendedSkills: ['Full-Stack Integration', 'React', 'Node.js', 'Database Integration'],
      projectObjective: 'Connect a React frontend to your validated REST API and database, supporting create, read, update, and delete actions with optimistic UI and loading states.',
      requirements: [
        'React frontend communicating with backend REST endpoints via fetch/axios',
        'Clean loading indicators, empty states, and dismissible error alerts',
        'Responsive layout operable via keyboard and mobile touch'
      ],
      milestones: [
        'Milestone 1: Client API service layer communicating with backend routes',
        'Milestone 2: Task listing, filter controls, and create/edit modal views',
        'Milestone 3: End-to-end testing of full create-read-update-delete cycle'
      ],
      deliverables: 'Full-stack repository link, live demo deployment, and architecture overview',
      evaluationRubric: [
        { criterion: 'End-to-End Integration', weight: '40%', target: 'Seamless client-server data synchronization' },
        { criterion: 'User Experience & States', weight: '30%', target: 'Clear loading, empty, and error recovery states' },
        { criterion: 'Responsiveness & a11y', weight: '15%', target: 'Zero horizontal scroll and keyboard operable' },
        { criterion: 'Code Architecture', weight: '15%', target: 'Modular component hierarchy and clean service layer' }
      ],
      mode: 'challenge',
      status: 'not-started',
      submission: null,
      feedback: null
    }
  ],
  interviewSessions: [
    {
      id: 'session-demo-01',
      date: 'Yesterday',
      topic: 'Full-Stack Developer (API Design & Architecture)',
      difficulty: 'Junior to Mid',
      overallScore: 84,
      questionsAnswered: 3,
      dimensionScores: {
        relevance: 85,
        technicalCorrectness: 86,
        explanationQuality: 82,
        structure: 80,
        examplesAndReasoning: 86
      },
      strengths: [
        'Accurately explained HTTP method semantics (GET vs POST vs PUT)',
        'Highlighted the security need for validating request payloads before saving to databases',
        'Demonstrated good grasp of responsive layout concepts'
      ],
      growthAreas: [
        'Could provide deeper explanation of database indexing tradeoffs',
        'Remember to mention optimistic UI rollbacks in real-time interfaces'
      ],
      recommendedPracticeTopics: [
        'REST API status codes (400 vs 422 vs 500)',
        'Database connection pool management',
        'JWT token placement (HttpOnly cookies vs memory)'
      ]
    }
  ],
  activityLogs: [
    { id: 'act-1', timestamp: '2 weeks ago', title: 'Demonstrated HTML & CSS', detail: 'Completed Responsive Personal Portfolio mission with verified responsive layout.' },
    { id: 'act-2', timestamp: '1 week ago', title: 'Probable JavaScript Recorded', detail: 'DOM event logic and async scripting exercises verified.' },
    { id: 'act-3', timestamp: 'Yesterday', title: 'Interview Arena Session Completed', detail: 'Scored 84% on Full-Stack API Design & Architecture mock session.' },
    { id: 'act-4', timestamp: 'Today', title: 'Active Next Action: Create a REST API', detail: 'Currently working on REST API for Task Manager mission to strengthen backend evidence.' }
  ],
  settings: {
    language: 'en',
    reducedMotion: false,
    highContrast: false,
    textSize: 'normal'
  }
};

export function CareerDataProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure state shape compatibility
        if (parsed?.profile && parsed?.skills && parsed?.roadmap && parsed?.projects) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('[CareerDataContext] Failed to load saved state from localStorage, falling back to initial data.', e);
    }
    return INITIAL_STATE;
  });

  // Sync to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('[CareerDataContext] Failed to persist state to localStorage.', e);
    }
  }, [state]);

  // Dynamically compute skill gaps comparing current targetRole requirements with user evidence
  const computeGaps = () => {
    const roleProfile = CAREER_CATALOGUE.find(c => c.title === state.profile.targetRole) || CAREER_CATALOGUE[0];
    const userSkillsMap = new Map();
    state.skills.forEach(s => userSkillsMap.set(s.name.toLowerCase().trim(), s));

    return roleProfile.coreSkills.map((req, index) => {
      // Find matching user skill
      let matched = null;
      for (const [key, userSkill] of userSkillsMap.entries()) {
        if (key.includes(req.name.toLowerCase()) || req.name.toLowerCase().includes(key)) {
          matched = userSkill;
          break;
        }
      }

      const currentState = matched?.state || 'Unknown';
      const currentProficiency = matched?.proficiency || (currentState === 'Claimed' ? 40 : currentState === 'Probable' ? 65 : currentState === 'Demonstrated' ? 85 : 20);
      const deficiency = Math.max(0, req.targetProficiency - currentProficiency);

      // Plain language explanation of the gap
      let explanationWhat = `The ability to design, build, and maintain ${req.name} solutions.`;
      let explanationWhy = `${req.name} is a required competency for ${roleProfile.title} with a benchmark target of ${req.targetProficiency}%.`;
      let explanationEvidence = matched ? `Status: ${matched.state}. Source: ${matched.source}.` : 'No evidence currently recorded for this skill in your demo profile.';
      let explanationMissing = '';
      let nextAction = '';
      let assessmentMethod = `Complete practical project mission and verify through automated rubric evaluation.`;

      if (currentState === 'Demonstrated') {
        explanationMissing = 'No major gap detected. Current evidence demonstrates verified ability.';
        nextAction = 'Maintain mastery; apply in advanced integrated projects.';
      } else if (currentState === 'Probable') {
        explanationMissing = 'Foundational exercises detected, but lack a complete end-to-end project or test suite.';
        nextAction = `Build a complete practical project implementing ${req.name} to upgrade to Demonstrated.`;
      } else if (currentState === 'Claimed') {
        explanationMissing = 'Skill was self-reported without verified code artifacts or assessment.';
        nextAction = `Complete practical mission: ${req.name} to demonstrate code competence.`;
      } else {
        explanationMissing = 'Zero signal detected in current profile. This skill has not yet been demonstrated.';
        nextAction = `Begin foundational roadmap steps and project exercises for ${req.name}.`;
      }

      // Priority calculation: required + deficiency + state
      let priority = 'Medium';
      if (req.required && (currentState === 'Unknown' || currentState === 'Claimed' || deficiency >= 35)) {
        priority = 'High';
      } else if (!req.required && deficiency < 20) {
        priority = 'Low';
      }

      return {
        id: `gap-${index}`,
        skillName: req.name,
        targetLevel: req.targetProficiency,
        currentLevel: currentProficiency,
        deficiency,
        state: currentState,
        priority,
        required: req.required,
        whatItMeans: explanationWhat,
        whyItMatters: explanationWhy,
        existingEvidence: explanationEvidence,
        whatIsMissing: explanationMissing,
        nextAction,
        howAssessed: assessmentMethod
      };
    }).sort((a, b) => {
      const pOrder = { High: 1, Medium: 2, Low: 3 };
      return (pOrder[a.priority] || 2) - (pOrder[b.priority] || 2);
    });
  };

  const skillGaps = computeGaps();

  // Set Target Career
  const setTargetRole = (newRoleTitle) => {
    setState(prev => {
      const updatedProfile = { ...prev.profile, targetRole: newRoleTitle };
      const newLog = {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        title: `Target Career Updated to ${newRoleTitle}`,
        detail: `Career roadmap and skill-gap benchmarks recalibrated for ${newRoleTitle}.`
      };

      return {
        ...prev,
        profile: updatedProfile,
        activityLogs: [newLog, ...prev.activityLogs]
      };
    });
  };

  // Add or Correct Self-Reported Skill
  const addSelfReportedSkill = (skillData) => {
    setState(prev => {
      const existingIdx = prev.skills.findIndex(s => s.name.toLowerCase() === skillData.name.toLowerCase());
      let updatedSkills = [...prev.skills];

      const newSkillRecord = {
        id: `skill-${Date.now()}`,
        name: skillData.name,
        category: skillData.category || 'General',
        state: skillData.state || 'Claimed',
        source: 'Self-reported profile selection',
        relatedProject: skillData.relatedProject || 'Self-reported',
        date: 'Today',
        description: skillData.description || `Self-reported competence in ${skillData.name}.`,
        limitations: 'Self-reported claim. Pending practical project evidence or assessment.',
        nextAction: `Complete practical project mission targeting ${skillData.name}.`,
        proficiency: skillData.state === 'Demonstrated' ? 80 : skillData.state === 'Probable' ? 65 : 45,
        confidence: skillData.state === 'Demonstrated' ? 85 : skillData.state === 'Probable' ? 65 : 40
      };

      if (existingIdx >= 0) {
        updatedSkills[existingIdx] = { ...updatedSkills[existingIdx], ...newSkillRecord };
      } else {
        updatedSkills.push(newSkillRecord);
      }

      const newLog = {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        title: `Updated Skill: ${skillData.name}`,
        detail: `Skill status set to ${newSkillRecord.state} (Source: ${newSkillRecord.source}).`
      };

      return {
        ...prev,
        skills: updatedSkills,
        activityLogs: [newLog, ...prev.activityLogs]
      };
    });
  };

  // Update Roadmap Step Status
  const updateRoadmapStepStatus = (stepId, newStatus) => {
    setState(prev => {
      const updatedRoadmap = prev.roadmap.map(step => {
        if (step.id === stepId) {
          return { ...step, status: newStatus };
        }
        return step;
      });

      let updatedSkills = [...prev.skills];
      let skillUpgradeMessage = '';

      // If Step 3 completed -> upgrades REST APIs to Demonstrated!
      if (stepId === 'step-3' && newStatus === 'completed') {
        const restIdx = updatedSkills.findIndex(s => s.name.toLowerCase().includes('rest api'));
        if (restIdx >= 0) {
          updatedSkills[restIdx] = {
            ...updatedSkills[restIdx],
            state: 'Demonstrated',
            source: 'Completed Roadmap Step: Create a REST API',
            relatedProject: 'Task Manager REST API',
            date: 'Today',
            proficiency: 82,
            confidence: 88,
            limitations: 'Demonstrated CRUD routes and status code returns.',
            nextAction: 'Integrate API with database persistence (Step 4).'
          };
          skillUpgradeMessage = ' Upgraded REST APIs to Demonstrated.';
        }
      }

      // If Step 4 completed -> upgrades Database Integration
      if (stepId === 'step-4' && newStatus === 'completed') {
        const dbIdx = updatedSkills.findIndex(s => s.name.toLowerCase().includes('database'));
        if (dbIdx >= 0) {
          updatedSkills[dbIdx] = {
            ...updatedSkills[dbIdx],
            state: 'Demonstrated',
            source: 'Completed Roadmap Step: Connect API to Database',
            relatedProject: 'Database Integration Lab',
            date: 'Today',
            proficiency: 80,
            confidence: 85,
            limitations: 'Demonstrated schema definitions and CRUD queries.',
            nextAction: 'Add input validation and error handling (Step 5).'
          };
          skillUpgradeMessage = ' Upgraded Database Integration to Demonstrated.';
        }
      }

      const targetStep = prev.roadmap.find(s => s.id === stepId);
      const newLog = {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        title: `Roadmap Step Updated: ${targetStep?.title || stepId}`,
        detail: `Status changed to ${newStatus}.${skillUpgradeMessage}`
      };

      return {
        ...prev,
        roadmap: updatedRoadmap,
        skills: updatedSkills,
        activityLogs: [newLog, ...prev.activityLogs]
      };
    });
  };

  // Submit Project Mission
  const submitProjectMission = (missionId, submissionData) => {
    setState(prev => {
      const missionIdx = prev.projects.findIndex(p => p.id === missionId);
      if (missionIdx === -1) return prev;

      const mission = prev.projects[missionIdx];

      // Simulated deterministic evaluation
      const evaluatedFeedback = {
        status: 'Approved',
        score: 86,
        summary: `Submission successfully met acceptance criteria for ${mission.title}. Code structure, status code conventions, and edge handling verified.`,
        criteriaScores: mission.evaluationRubric.map(item => ({
          criterion: item.criterion,
          score: 85,
          comment: `Meets rubric benchmark for ${item.criterion}.`
        })),
        evidenceImpact: `Skill "${mission.intendedSkills[0]}" verified and upgraded in Career Profile.`
      };

      const updatedProject = {
        ...mission,
        status: 'completed',
        submission: {
          ...submissionData,
          submittedAt: 'Just now'
        },
        feedback: evaluatedFeedback
      };

      const updatedProjects = [...prev.projects];
      updatedProjects[missionIdx] = updatedProject;

      // Automatically upgrade corresponding skill
      let updatedSkills = [...prev.skills];
      const primarySkillName = mission.intendedSkills[0];
      const skillIdx = updatedSkills.findIndex(s => s.name.toLowerCase().includes(primarySkillName.toLowerCase()) || primarySkillName.toLowerCase().includes(s.name.toLowerCase()));

      if (skillIdx >= 0) {
        updatedSkills[skillIdx] = {
          ...updatedSkills[skillIdx],
          state: 'Demonstrated',
          source: `Verified Project Lab Mission: ${mission.title}`,
          relatedProject: mission.title,
          date: 'Just now',
          proficiency: Math.min(95, Math.max(80, updatedSkills[skillIdx].proficiency + 25)),
          confidence: 90,
          limitations: 'Practical project deliverable verified via evaluation rubric.',
          nextAction: 'Maintain mastery and prepare interview responses.'
        };
      }

      // Automatically mark corresponding roadmap step complete if matches
      let updatedRoadmap = [...prev.roadmap];
      if (missionId === 'mission-rest-api') {
        const step3Idx = updatedRoadmap.findIndex(s => s.id === 'step-3');
        if (step3Idx >= 0) updatedRoadmap[step3Idx].status = 'completed';
      } else if (missionId === 'mission-database') {
        const step4Idx = updatedRoadmap.findIndex(s => s.id === 'step-4');
        if (step4Idx >= 0) updatedRoadmap[step4Idx].status = 'completed';
      }

      const newLog = {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        title: `Project Lab Mission Submitted: ${mission.title}`,
        detail: `Evaluated with score ${evaluatedFeedback.score}%. Upgraded ${primarySkillName} to Demonstrated.`
      };

      return {
        ...prev,
        projects: updatedProjects,
        skills: updatedSkills,
        roadmap: updatedRoadmap,
        activityLogs: [newLog, ...prev.activityLogs]
      };
    });
  };

  // Save Interview Session
  const saveInterviewSession = (sessionData) => {
    setState(prev => {
      const newSession = {
        id: `session-${Date.now()}`,
        date: 'Today',
        ...sessionData
      };

      const newLog = {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        title: `Interview Arena Completed: ${sessionData.topic}`,
        detail: `Finished session with overall score ${sessionData.overallScore}%. Transparent rubric report generated.`
      };

      return {
        ...prev,
        interviewSessions: [newSession, ...prev.interviewSessions],
        activityLogs: [newLog, ...prev.activityLogs]
      };
    });
  };

  // Update Profile
  const updateProfile = (profileFields) => {
    setState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...profileFields
      },
      activityLogs: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Career Profile Updated',
          detail: 'Updated learner profile details and preferences.'
        },
        ...prev.activityLogs
      ]
    }));
  };

  // Update Settings
  const updateSettings = (newSettings) => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings
      }
    }));
  };

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(INITIAL_STATE);
  };

  return (
    <CareerDataContext.Provider
      value={{
        profile: state.profile,
        skills: state.skills,
        roadmap: state.roadmap,
        projects: state.projects,
        interviewSessions: state.interviewSessions,
        activityLogs: state.activityLogs,
        settings: state.settings,
        careerCatalogue: CAREER_CATALOGUE,
        skillGaps,
        setTargetRole,
        addSelfReportedSkill,
        updateRoadmapStepStatus,
        submitProjectMission,
        saveInterviewSession,
        updateProfile,
        updateSettings,
        resetDemoData
      }}
    >
      {children}
    </CareerDataContext.Provider>
  );
}

export function useCareerData() {
  const context = useContext(CareerDataContext);
  if (!context) {
    throw new Error('useCareerData must be used within a CareerDataProvider');
  }
  return context;
}
