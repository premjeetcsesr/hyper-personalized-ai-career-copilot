# AI Career Co-Pilot
*Evidence-Based Career Intelligence Platform*

[![Node.js Version](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-blue.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-slate.svg)](https://expressjs.com/)
[![Core Principle](https://img.shields.io/badge/Principle-Evidence%20Before%20Inference-emerald.svg)](#core-principle-evidence-before-inference)

---

## 🧭 Product Vision & Positioning

**AI Career Co-Pilot** is an evidence-based career intelligence platform for students, beginners, and early-career learners. Rather than acting as a generic AI chatbot, resume keyword matcher, or online course marketplace, it connects:
**Career Requirements → Skill Evidence → Prioritized Gaps → Practical Projects → Interview Feedback**

The central product lifecycle is:
$$\text{Discover} \longrightarrow \text{Verify} \longrightarrow \text{Compare} \longrightarrow \text{Improve} \longrightarrow \text{Demonstrate} \longrightarrow \text{Validate} \longrightarrow \text{Adapt}$$

### Key Questions Answered for Learners
- Which careers could fit my interests and goals?
- What skills do I currently have evidence for?
- Which skills are only self-reported or still uncertain?
- What should I learn next, and why?
- Which practical projects can demonstrate my abilities?
- How can I practise technical interviews and understand my weaknesses?
- How should my roadmap change as I make progress?

---

## 🏛️ Core Principle: Evidence Before Inference

A defining tenet of this system is that **no self-reported skill is ever treated as verified without empirical evidence**. Every skill transitions through a 4-tier evidentiary state machine:

1. **Demonstrated / Verified:** There is relevant practical evidence or a completed project assessment supporting the skill (e.g. verified project deliverable, passing score on assessment).
2. **Probable:** Some evidence exists (e.g. partial coding exercises, interactive scripts), but the ability has not been conclusively demonstrated in a full project.
3. **Claimed:** The learner has stated that they know the skill, but there is not enough supporting evidence.
4. **Unknown:** The skill has not been assessed or there is insufficient information. Crucially, unknown is never penalized as zero ($0\%$)—it defaults to an unassessed baseline ready for calibration.

---

## 🚀 Application Structure & Features

The platform provides 9 interconnected functional areas sharing a single reactive state:

### 1. Dashboard
- Answers the core question: **"What should I do next?"**
- Uses consistent demo learner **Aarav Sharma** (Target: *Full-Stack Developer*, Challenge: *Limited evidence of backend development and database integration*).
- Prioritized Next Action: **"Build a small REST API"** with plain-language reasoning explaining why it matters for backend development evidence.
- Summarizes relevant skill gaps, current roadmap step, active project mission, and recent progress.
- Zero fake streaks or unexplained readiness scores.

### 2. Explore Careers
- Searchable and filterable catalogue across 8 core roles:
  - *Full-Stack Developer*
  - *Frontend Developer*
  - *Backend Developer*
  - *Mobile App Developer*
  - *Data Analyst*
  - *Data Scientist*
  - *Cybersecurity Analyst*
  - *UI/UX Designer*
- Detail view covering responsibilities, core skills, example tasks, prerequisites, suggested projects, common interview topics, and structured learning routes.
- **Select as Target Career:** Dynamically adapts skill-gap benchmarks and roadmap steps across the platform.
- **Compare Careers:** Side-by-side comparison modal analyzing competencies, tasks, and prerequisites.
- Transparent illustrative salary disclaimers.

### 3. Career Profile / Career Twin
- Central verifiable record of learner goals, interests, skills, projects, completed activities, and interview practice history.
- Distinguishes self-reported claims from demonstrated project evidence.
- Editable profile modal updating shared application state.

### 4. My Skills & Evidence
- Granular record of all skills with evidence states (*Demonstrated, Probable, Claimed, Unknown*), evidence source, assessment dates, known limitations, and recommended next actions.
- **Add or Correct Self-Reported Skill:** Allows learners to add skills as *Claimed* entries.
- **Prioritized Skill-Gap Analysis:**
  - Compares selected career requirements with current evidence (e.g., HTML/CSS: Demonstrated, JS: Probable, REST APIs: Claimed, Database: Unknown).
  - 6-factor plain-language explanation for each gap:
    1. What the skill means
    2. Why it matters for target role
    3. What evidence exists
    4. What is missing
    5. The next practical action
    6. How improvement will be assessed

### 5. My Roadmap (Adaptive)
- 8 structured milestones connected to career goals and skill gaps:
  1. Strengthen JavaScript fundamentals (*Completed*)
  2. Build a responsive frontend (*Completed*)
  3. Create a REST API (*In-Progress / Active*)
  4. Connect the API to a database (*Upcoming*)
  5. Add input validation and error handling (*Upcoming*)
  6. Build a complete full-stack project (*Upcoming*)
  7. Review testing and debugging (*Upcoming*)
  8. Practise full-stack interview questions (*Upcoming*)
- Interactive controls: *Start, Pause, Resume, Mark as Completed, Open Practice Task*.
- Rule-based adaptation banner explaining how roadmap evolves.

### 6. Project Lab
- Practical project missions:
  - *Build a responsive personal portfolio* (Completed / Verified)
  - *Create a REST API for a task manager* (Active recommendation)
  - *Connect a web application to a database*
  - *Implement form validation and error handling*
  - *Build a small full-stack application*
- **Guided Mode vs Challenge Mode:** Step-by-step guidance vs independent problem-solving.
- Transparent evaluation rubrics with explicit criteria weights.
- Structured submission form (GitHub repo URL, live demo, architecture notes, reflection).
- Submitting automatically grades work, upgrades the skill to *Demonstrated*, and completes the corresponding roadmap step.

### 7. Interview Arena
- Functional mock-interview workflow:
  - Configurable: Topic/Career, Interview Type (Technical, System Design, Project-based, Behavioral), Difficulty (Junior, Mid, Senior), Length (3 or 5 questions).
  - Displays **ONE question at a time**.
  - Answer textarea, submit for evaluation, continue to next question, exit with confirmation.
- 5 Transparent evaluation criteria:
  - *Relevance*
  - *Technical Correctness*
  - *Explanation Quality*
  - *Structure*
  - *Examples and Practical Reasoning*
- End-of-session comprehensive feedback report with strengths, growth areas, and recommended practice topics.
- Previous interview history list.

### 8. Progress
- Real state derivation:
  - Roadmap milestones completed
  - Projects started and submitted
  - Changes in skill evidence breakdown (*Demonstrated, Probable, Claimed, Unknown*)
  - Interview sessions completed and average evaluation score
  - Chronological activity timeline
  - Recommended next practice

### 9. Settings
- Functional profile editing (name, stage, weekly hours, career goals).
- Target role selection.
- Language preference (English, Hindi UI labels).
- Accessibility & display toggles (*Reduced Motion, High Contrast Mode, Text Sizing*).
- **Reset Demo Data:** Confirmation dialog explaining what will be restored to Aarav Sharma's default state.
- Export Career Twin data as JSON.

---

## 🛠️ Technology Stack

- **Client:** React 18, Vite 6, Tailwind CSS, React Router v6, Lucide React, Canvas Confetti.
- **Server:** Node.js, Express 4, Mongoose (with dual-mode in-memory persistence when MongoDB is not running locally).
- **State Management:** Reactive `CareerDataContext` with automatic `localStorage` synchronization and dual-mode API synchronization.

---

## 🚀 Installation & Running Locally

### Prerequisites
- Node.js v18 or higher (v20+ recommended)
- npm v9+

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone <repo-url>
cd hyper-personalized-ai-career-copilot

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Start the Backend API Server
In terminal 1:
```bash
cd server
npm run dev
# Server starts on http://localhost:5000 (with automatic In-Memory resilience if MongoDB is offline)
```

### 3. Start the Client Dev Server
In terminal 2:
```bash
cd client
npm run dev
# Vite starts on http://localhost:5173
```

Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
cd client
npm run build
# Compiles minified bundle to dist/
```

---

## 🔬 Simulated Features & Prototype Transparency

In accordance with product guidelines, the following behaviors are clearly documented:

1. **Rubric Evaluation:** Project lab feedback and mock interview scores run on deterministic client/server simulation rules rather than untrusted live external agents.
2. **Code Execution:** The application does not execute untrusted user-submitted code on the server. Deliverables are submitted via repository links and architecture summaries.
3. **Illustrative Compensation:** Salary ranges in Explore Careers are illustrative sample figures for role comparison, not live market guarantees.
4. **Roadmap Adaptation:** The roadmap uses deterministic, rule-based adaptation (milestone prerequisites, skill unlocks, and status progression) rather than opaque black-box models.

---

## 📱 Responsive Testing Viewports

The application features mobile-first CSS and was tested across standard screen resolutions:
- Mobile Small: `320 × 568`, `360 × 800`
- Mobile Standard / Large: `375 × 812`, `390 × 844`, `412 × 915`, `430 × 932`
- Tablet: `768 × 1024`, `1024 × 768`
- Laptop / Desktop: `1280 × 720`, `1366 × 768`, `1440 × 900`, `1920 × 1080`

No horizontal scrollbars or touch-target clumping at 320px+.

---

## 📜 License

MIT License. Developed for Evidence-Based Career Intelligence.
