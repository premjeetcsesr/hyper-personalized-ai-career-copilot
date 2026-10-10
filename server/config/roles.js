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
  }
};

module.exports = {
  ROLE_PROFILES,
  getRoleProfile: (roleName) => ROLE_PROFILES[roleName] || ROLE_PROFILES['Full-Stack Developer'],
  getAvailableRoles: () => Object.keys(ROLE_PROFILES)
};
