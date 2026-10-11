/**
 * Role Competency Profiles & Market Benchmark Definitions
 * Source: Industry Standard Competency Benchmark (Team Technovoo1)
 * Disclaimer: All benchmarks are decision-support estimates and curated references, not speculative live market claims.
 */

const ROLE_PROFILES = {
  'Full-Stack Developer': {
    id: 'fullstack-dev',
    title: 'Full-Stack Developer',
    description: 'Designs, develops, and deploys both client-facing interfaces and scalable backend microservices/APIs.',
    profileType: 'Curated Industry Benchmark',
    competencies: [
      { skill: 'JavaScript / TypeScript', category: 'Language', targetLevel: 85, weight: 1.0, required: true },
      { skill: 'React.js', category: 'Frontend', targetLevel: 80, weight: 0.95, required: true },
      { skill: 'Node.js / Express', category: 'Backend', targetLevel: 80, weight: 0.95, required: true },
      { skill: 'REST APIs & GraphQL', category: 'Architecture', targetLevel: 75, weight: 0.9, required: true },
      { skill: 'MongoDB / PostgreSQL', category: 'Database', targetLevel: 75, weight: 0.85, required: true },
      { skill: 'Git & GitHub Collaboration', category: 'DevOps', targetLevel: 80, weight: 0.8, required: true },
      { skill: 'Docker Containerization', category: 'DevOps', targetLevel: 70, weight: 0.75, required: false },
      { skill: 'Automated Testing (Jest / Supertest)', category: 'Testing', targetLevel: 70, weight: 0.75, required: false },
      { skill: 'Web Security & Auth (JWT/OAuth)', category: 'Security', targetLevel: 75, weight: 0.8, required: true },
      { skill: 'System Design & Scalability', category: 'Architecture', targetLevel: 65, weight: 0.7, required: false }
    ],
    interviewCompetencies: [
      'Full-Stack System Architecture',
      'API Design & Data Modeling',
      'Frontend State & Performance',
      'Authentication & Security Protocols',
      'Debugging & Root Cause Analysis'
    ]
  },
  'Frontend Developer': {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    description: 'Specializes in user interface development, responsive design, browser performance, and state management.',
    profileType: 'Curated Industry Benchmark',
    competencies: [
      { skill: 'JavaScript / TypeScript', category: 'Language', targetLevel: 90, weight: 1.0, required: true },
      { skill: 'React.js / Next.js', category: 'Frontend', targetLevel: 85, weight: 0.95, required: true },
      { skill: 'HTML5 & Modern CSS / Tailwind', category: 'Frontend', targetLevel: 90, weight: 0.9, required: true },
      { skill: 'Frontend State Management', category: 'Frontend', targetLevel: 80, weight: 0.85, required: true },
      { skill: 'Web Performance & Accessibility (a11y)', category: 'Frontend', targetLevel: 75, weight: 0.8, required: true },
      { skill: 'Component Testing (Jest / Vitest)', category: 'Testing', targetLevel: 70, weight: 0.75, required: false },
      { skill: 'Git & Version Control', category: 'DevOps', targetLevel: 80, weight: 0.75, required: true },
      { skill: 'REST & GraphQL Consumption', category: 'Architecture', targetLevel: 75, weight: 0.8, required: true },
      { skill: 'Build Tools (Vite / Webpack)', category: 'DevOps', targetLevel: 70, weight: 0.7, required: false }
    ],
    interviewCompetencies: [
      'DOM Manipulation & Virtual DOM',
      'React Lifecycle & Hooks',
      'State Management Architecture',
      'Web Core Vitals & Performance',
      'Responsive UI & Cross-Browser Compatibility'
    ]
  },
  'Backend Developer': {
    id: 'backend-dev',
    title: 'Backend Developer',
    description: 'Constructs robust server-side logic, data schemas, API gateways, and distributed microservices.',
    profileType: 'Curated Industry Benchmark',
    competencies: [
      { skill: 'Node.js / Python / Go', category: 'Language', targetLevel: 85, weight: 1.0, required: true },
      { skill: 'RESTful API & RPC Design', category: 'Backend', targetLevel: 85, weight: 0.95, required: true },
      { skill: 'Relational SQL (PostgreSQL / MySQL)', category: 'Database', targetLevel: 80, weight: 0.9, required: true },
      { skill: 'NoSQL (MongoDB / Redis)', category: 'Database', targetLevel: 75, weight: 0.85, required: true },
      { skill: 'Authentication & OWASP Security', category: 'Security', targetLevel: 80, weight: 0.85, required: true },
      { skill: 'Docker & Container Lifecycle', category: 'DevOps', targetLevel: 75, weight: 0.8, required: true },
      { skill: 'Unit & Integration Testing', category: 'Testing', targetLevel: 75, weight: 0.8, required: true },
      { skill: 'System Design & High Availability', category: 'Architecture', targetLevel: 75, weight: 0.85, required: true },
      { skill: 'CI/CD Pipelines', category: 'DevOps', targetLevel: 65, weight: 0.7, required: false }
    ],
    interviewCompetencies: [
      'Concurrency & Async Execution',
      'Database Indexing & Query Optimization',
      'Distributed Systems & Caching',
      'Security Mitigations & Rate Limiting',
      'Microservices vs Monolith Tradeoffs'
    ]
  },
  'Software Engineer': {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Applies general computer science principles, algorithms, clean code patterns, and systems engineering.',
    profileType: 'Curated Industry Benchmark',
    competencies: [
      { skill: 'Data Structures & Algorithms', category: 'Computer Science', targetLevel: 85, weight: 1.0, required: true },
      { skill: 'Object-Oriented & Functional Design', category: 'Architecture', targetLevel: 80, weight: 0.9, required: true },
      { skill: 'Core Language (Java / C++ / Python / JS)', category: 'Language', targetLevel: 85, weight: 0.95, required: true },
      { skill: 'Databases & Query Optimization', category: 'Database', targetLevel: 75, weight: 0.85, required: true },
      { skill: 'Unit Testing & TDD', category: 'Testing', targetLevel: 75, weight: 0.8, required: true },
      { skill: 'Git & Collaborative Code Review', category: 'DevOps', targetLevel: 80, weight: 0.75, required: true },
      { skill: 'Operating Systems & Networking Basics', category: 'Computer Science', targetLevel: 70, weight: 0.75, required: true },
      { skill: 'CI/CD & Cloud Basics', category: 'DevOps', targetLevel: 65, weight: 0.7, required: false }
    ],
    interviewCompetencies: [
      'Algorithmic Complexity & Optimization',
      'Clean Code & Refactoring',
      'Concurrency & Thread Safety',
      'Software Design Patterns',
      'Behavioral & Engineering Ownership'
    ]
  },
  'Data Analyst': {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Extracts actionable insights from structured/unstructured datasets, builds visualizations, and interprets trends.',
    profileType: 'Curated Industry Benchmark',
    competencies: [
      { skill: 'Advanced SQL & Data Modeling', category: 'Database', targetLevel: 85, weight: 1.0, required: true },
      { skill: 'Python (Pandas / NumPy)', category: 'Language', targetLevel: 80, weight: 0.95, required: true },
      { skill: 'Data Visualization (PowerBI / Tableau / Seaborn)', category: 'Visualization', targetLevel: 80, weight: 0.9, required: true },
      { skill: 'Statistical Analysis & Hypothesis Testing', category: 'Mathematics', targetLevel: 75, weight: 0.85, required: true },
      { skill: 'Data Cleaning & Transformation (ETL)', category: 'Backend', targetLevel: 80, weight: 0.85, required: true },
      { skill: 'Excel & Spreadsheet Modeling', category: 'Tools', targetLevel: 75, weight: 0.7, required: false },
      { skill: 'Business Metrics & KPI Interpretation', category: 'Domain', targetLevel: 70, weight: 0.75, required: true }
    ],
    interviewCompetencies: [
      'Complex SQL Aggregations & Window Functions',
      'Data Cleansing & Anomaly Detection',
      'A/B Testing & Statistical Inference',
      'Storytelling with Visualizations',
      'Translating Ambiguous Business Questions'
    ]
  },
  'AI/ML Engineer': {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    description: 'Builds, fine-tunes, evaluates, and serves Machine Learning models and Generative AI pipelines.',
    profileType: 'Curated Industry Benchmark',
    competencies: [
      { skill: 'Python for Machine Learning', category: 'Language', targetLevel: 90, weight: 1.0, required: true },
      { skill: 'PyTorch / TensorFlow', category: 'AI/ML', targetLevel: 80, weight: 0.95, required: true },
      { skill: 'Scikit-Learn & Classical ML', category: 'AI/ML', targetLevel: 80, weight: 0.9, required: true },
      { skill: 'LLMs, Prompt Engineering & RAG', category: 'AI/ML', targetLevel: 80, weight: 0.9, required: true },
      { skill: 'Vector Databases & Embeddings', category: 'Database', targetLevel: 75, weight: 0.8, required: true },
      { skill: 'Model Evaluation & Experiment Tracking', category: 'AI/ML', targetLevel: 75, weight: 0.8, required: true },
      { skill: 'Model Serving & FastAPI / Docker', category: 'DevOps', targetLevel: 70, weight: 0.75, required: true },
      { skill: 'Mathematics (Linear Algebra, Calculus, Prob)', category: 'Mathematics', targetLevel: 75, weight: 0.8, required: true }
    ],
    interviewCompetencies: [
      'Model Architecture & Optimization Tradeoffs',
      'RAG Pipelines & Chunking Strategies',
      'Handling Overfitting, Underfitting & Data Leakage',
      'Deployment Latency & Inference Serving',
      'AI Ethics, Hallucination Mitigation & Guardrails'
    ]
  },
  'Mobile App Developer': {
    id: 'mobile-dev',
    title: 'Mobile App Developer',
    description: 'Builds native or cross-platform mobile applications for iOS and Android with intuitive touch UX and offline support.',
    profileType: 'Curated Industry Benchmark',
    competencies: [
      { skill: 'React Native / Flutter / Swift / Kotlin', category: 'Language', targetLevel: 85, weight: 1.0, required: true },
      { skill: 'Mobile UI & Gestures', category: 'Frontend', targetLevel: 85, weight: 0.95, required: true },
      { skill: 'State Management & Offline Storage', category: 'Architecture', targetLevel: 80, weight: 0.9, required: true },
      { skill: 'REST API & GraphQL Integration', category: 'Backend', targetLevel: 80, weight: 0.85, required: true },
      { skill: 'App Store & Play Store Deployment', category: 'DevOps', targetLevel: 75, weight: 0.8, required: true },
      { skill: 'Mobile Testing & Device Emulation', category: 'Testing', targetLevel: 70, weight: 0.75, required: false },
      { skill: 'Push Notifications & Background Tasks', category: 'Mobile', targetLevel: 75, weight: 0.75, required: false }
    ],
    interviewCompetencies: [
      'Mobile Lifecycle & Navigation',
      'Offline Data Sync & Persistence',
      'Memory Management & Battery Optimization',
      'App Store Review & Release Management',
      'Cross-Platform vs Native Architecture'
    ]
  },
  'Data Scientist': {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Designs predictive models, runs statistical experiments, extracts insights from complex datasets, and communicates data narratives.',
    profileType: 'Curated Industry Benchmark',
    competencies: [
      { skill: 'Python (Pandas, NumPy, SciPy)', category: 'Language', targetLevel: 90, weight: 1.0, required: true },
      { skill: 'Machine Learning Algorithms (Scikit-Learn)', category: 'AI/ML', targetLevel: 85, weight: 0.95, required: true },
      { skill: 'Statistical Modeling & Hypothesis Testing', category: 'Mathematics', targetLevel: 85, weight: 0.95, required: true },
      { skill: 'SQL & Data Extraction', category: 'Database', targetLevel: 80, weight: 0.85, required: true },
      { skill: 'Data Visualization & Communication', category: 'Visualization', targetLevel: 80, weight: 0.8, required: true },
      { skill: 'Feature Engineering & Data Preprocessing', category: 'AI/ML', targetLevel: 85, weight: 0.85, required: true },
      { skill: 'Deep Learning & Neural Networks Basics', category: 'AI/ML', targetLevel: 70, weight: 0.7, required: false }
    ],
    interviewCompetencies: [
      'Hypothesis Formulation & A/B Testing Design',
      'Bias-Variance Tradeoff & Model Validation',
      'Feature Selection & Regularization',
      'Metric Selection (Precision, Recall, ROC-AUC)',
      'Explaining Statistical Findings to Stakeholders'
    ]
  },
  'Cybersecurity Analyst': {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    description: 'Protects networks, applications, and data from unauthorized access, conducts threat monitoring, and enforces security compliance.',
    profileType: 'Curated Industry Benchmark',
    competencies: [
      { skill: 'Network Security & Protocols (TCP/IP, DNS, SSL)', category: 'Security', targetLevel: 85, weight: 1.0, required: true },
      { skill: 'Threat Analysis & Incident Response', category: 'Security', targetLevel: 85, weight: 0.95, required: true },
      { skill: 'Web Application Security & OWASP Top 10', category: 'Security', targetLevel: 85, weight: 0.95, required: true },
      { skill: 'Security Information & Event Management (SIEM)', category: 'Tools', targetLevel: 75, weight: 0.8, required: true },
      { skill: 'Vulnerability Scanning & Penetration Testing', category: 'Security', targetLevel: 75, weight: 0.8, required: true },
      { skill: 'Linux & Scripting (Bash / Python)', category: 'Language', targetLevel: 75, weight: 0.8, required: true },
      { skill: 'Identity & Access Management (IAM)', category: 'Security', targetLevel: 70, weight: 0.75, required: false }
    ],
    interviewCompetencies: [
      'OWASP Top 10 Vulnerabilities & Mitigations',
      'Incident Response Triage & Containment',
      'Network Packet Inspection & Traffic Anomalies',
      'Zero-Trust Architecture & Principle of Least Privilege',
      'Cryptographic Principles & Public Key Infrastructure'
    ]
  },
  'UI/UX Designer': {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    description: 'Creates human-centered digital experiences, user journeys, wireframes, prototypes, and accessible design systems.',
    profileType: 'Curated Industry Benchmark',
    competencies: [
      { skill: 'User Research & Persona Development', category: 'Design', targetLevel: 85, weight: 0.95, required: true },
      { skill: 'Wireframing & Interactive Prototyping (Figma)', category: 'Design', targetLevel: 90, weight: 1.0, required: true },
      { skill: 'Design Systems & Component Architecture', category: 'Design', targetLevel: 85, weight: 0.9, required: true },
      { skill: 'Visual Design, Typography & Color Theory', category: 'Design', targetLevel: 85, weight: 0.9, required: true },
      { skill: 'Usability Testing & Heuristic Evaluation', category: 'Design', targetLevel: 80, weight: 0.85, required: true },
      { skill: 'Accessibility Standards (WCAG 2.2 AA)', category: 'Design', targetLevel: 80, weight: 0.85, required: true },
      { skill: 'HTML & CSS Foundations for Designers', category: 'Frontend', targetLevel: 65, weight: 0.65, required: false }
    ],
    interviewCompetencies: [
      'Design Process Walkthrough & Problem Framing',
      'Handling Conflicting Feedback & Design Iteration',
      'Accessibility & Inclusive Design Implementation',
      'Design System Governance & Tokenization',
      'Measuring User Experience Impact & Usability Metrics'
    ]
  }
};

module.exports = {
  ROLE_PROFILES,
  getRoleProfile: (roleName) => ROLE_PROFILES[roleName] || ROLE_PROFILES['Full-Stack Developer'],
  getAvailableRoles: () => Object.keys(ROLE_PROFILES)
};

