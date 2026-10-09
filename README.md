# Hyper-Personalized AI Career Co-Pilot
### Team Technova001 | Kanpur Institute of Technology (KIT)
*College Hackathon 2026 Showcase Project*

[![Node.js Version](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-blue.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8.svg)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%2B%20Mongoose-emerald.svg)](https://www.mongodb.com/)
[![Principle](https://img.shields.io/badge/Core%20Principle-Evidence%20Before%20Inference-amber.svg)](#core-principle-evidence-before-inference)

---

## 🧭 Executive Summary

Students frequently struggle to understand their true technical strengths, gauge their real-world readiness for target careers, prioritize what to learn next, and practice role-specific technical interviews. Standard learning roadmaps are generic, static, and disconnected from demonstrated project experience.

**Hyper-Personalized AI Career Co-Pilot** is an end-to-end career intelligence and validation platform built by **Team Technova001 from Kanpur Institute of Technology**. It ingests student resumes, public GitHub repositories, and academic project histories, extracts concrete code evidence, benchmarks abilities against curated industry competencies, prioritizes skill gaps deterministically, generates an actionable 5-stage personalized roadmap, and runs adaptive technical mock interviews with instant feedback.

---

## 🏛️ Core Principle: Evidence Before Inference

A defining tenet of this system is that **no self-reported skill is ever treated as verified without empirical evidence**. Every skill transitions through a 4-tier evidentiary state machine:

1. **Verified:** Validated through completed practical missions with code artifacts, multi-repository GitHub evidence, or passing an adaptive mock interview assessment (Score $\ge 75\%$).
2. **Probable:** Observed in public code repositories, dependency manifests (`package.json`, `requirements.txt`), or verifiable resume project context.
3. **Claimed:** Self-reported in student profile or listed in a resume skills section without project or execution context.
4. **Unknown:** Not yet assessed. *Crucially, unknown is never penalized as zero ability ($0\%$)—it defaults to an unassessed potential baseline (~$25\%$) ready for calibration.*

---

## 🚀 Key Features

1. **Personalized SaaS Dashboard:**
   - Real-time profile completeness meter.
   - Skill counts by evidentiary state (Verified, Probable, Claimed, Unknown).
   - Top 5 prioritized skill gaps with deficiency metrics.
   - Active practical mission progress.
   - Multidimensional Career Readiness Index with radar visualization.
   - AI recommended next action.

2. **Resume & Project Analyzer:**
   - Upload PDF and DOCX documents with text sanitization and size validation.
   - Extracts candidate education, projects, tech stacks, and sentence-level evidence quotes.
   - Discloses missing competency signals and targeted resume improvement suggestions.
   - Human-in-the-loop: lets candidate review and confirm extractions before committing.

3. **GitHub Code Intelligence:**
   - Ingests public repositories via GitHub REST API.
   - Scans for technology frequency, automated testing suites, Docker manifests, CI/CD pipelines, and architecture signals.
   - Never infers skill from raw commit counts alone; focuses on verifiable code indicators.

4. **Deterministic Skill Gap Engine:**
   - Evaluates candidate against 6 curated roles:
     - *Frontend Developer*
     - *Backend Developer*
     - *Full-Stack Developer*
     - *Software Engineer*
     - *Data Analyst*
     - *AI/ML Engineer*
   - Computes gap priority:
     $$\text{Priority Score} = (\text{Deficiency} \times 0.5) + (\text{Role Weight} \times 30) + ((100 - \text{Confidence}) \times 0.2)$$
   - Interactive Recharts bar chart comparing demonstrated level vs. role target.
   - Transparent rationale explaining why each deficiency matters in production environments.

5. **Personalized Learning Roadmap (5-Stage Cycle):**
   - Implements the cycle: **LEARN → PRACTICE → BUILD → VALIDATE → IMPROVE**.
   - Structured in 3 progressive phases with objectives, prerequisites, curated resources, and validation assessments.
   - Marking milestones as completed updates skill evidence ratings.

6. **Project Mission Engine:**
   - Converts theoretical gaps into practical engineering tasks (e.g., *Containerize Node.js API with Docker*, *Implement Automated Unit & Integration Testing*).
   - Step-by-step guides, objectives, and acceptance criteria.
   - Candidate submits GitHub repository link + reflection notes to verify deliverables and earn skill upgrades.

7. **Adaptive AI Mock Interview:**
   - Interactive multi-turn technical interview simulator.
   - Modes: Technical, System Design, Project-based, Behavioral.
   - Adaptive difficulty (Junior, Mid, Senior) adjusting dynamically to candidate answer quality.
   - Grades on 5 dimensions: Correctness, Reasoning, Architecture, Project Depth, and Communication.
   - Generates comprehensive final report with strengths, growth opportunities, and optimal answer structures.

8. **Career Readiness Engine:**
   - Multidimensional radar score across 6 pillars:
     $$\text{Readiness} = (25\% \times \text{Tech}) + (20\% \times \text{Project}) + (15\% \times \text{Market}) + (20\% \times \text{Interview}) + (10\% \times \text{Comm}) + (10\% \times \text{Resume})$$
   - Transparent mathematical documentation and educational disclaimer.

9. **One-Click Hackathon Demo Scenario:**
   - Pinned top banner with one-click **"Reset Demo Scenario"** button.
   - Seeds realistic Kanpur Institute of Technology student data (Aarav Sharma, B.Tech CSE) with sample resume, GitHub repositories, Docker gaps, and mock interview reports for seamless evaluation.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 6, Tailwind CSS, React Router v6, Recharts, Lucide React, Canvas Confetti |
| **Backend** | Node.js (v20+), Express.js 4.21, CORS, Express Rate Limit, Multer |
| **Database** | MongoDB with Mongoose ODM + Dual-Mode In-Memory Resilience Adapter |
| **AI Integration** | Google Gemini 1.5 Flash API / OpenAI GPT-4o-mini with deterministic rule-based fallback |
| **Document Parsing**| `pdf-parse` (PDF text extraction), `mammoth` (DOCX extraction) |
| **Code Intelligence**| GitHub REST API v3 (Public repository metadata, language breakdown) |
| **Security** | JWT Authentication, Bcrypt password hashing, rate limiting, input sanitization |

---

## 📂 Project Structure

```
Technova001/
├── server/
│   ├── config/
│   │   ├── db.js                 # Resilient dual-mode MongoDB / in-memory store
│   │   └── roles.js              # Curated competency profiles for 6 target roles
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, session
│   │   ├── profileController.js  # Profile CRUD and onboarding wizard
│   │   ├── resumeController.js   # PDF/DOCX parsing and evidence extraction
│   │   ├── githubController.js   # GitHub repository intelligence
│   │   ├── skillGapController.js # Gap analysis and evidence updates
│   │   ├── roadmapController.js  # 5-stage learning roadmap
│   │   ├── missionController.js  # Practical engineering missions
│   │   ├── interviewController.js# Adaptive multi-turn mock interviews
│   │   ├── readinessController.js# 6-dimension readiness engine
│   │   └── demoController.js     # One-click hackathon demo seed & reset
│   ├── data/
│   │   └── demoSeedData.js       # Pre-seeded KIT student demo dataset
│   ├── middleware/
│   │   ├── auth.js               # JWT bearer token verification
│   │   ├── upload.js             # Multer with file type & size security
│   │   └── errorHandler.js       # Centralized error handler
│   ├── models/
│   │   ├── index.js              # Mongoose schemas with dual-mode storage
│   │   └── storage.js            # Seamless in-memory fallback adapter
│   ├── routes/                   # Modular REST API routes
│   ├── services/
│   │   ├── aiService.js          # Gemini/OpenAI + deterministic fallback engine
│   │   ├── resumeParserService.js# PDF and DOCX text extractor
│   │   ├── githubService.js      # Public repository signals analyzer
│   │   ├── skillEvidenceEngine.js# Evidence aggregation & gap priorities
│   │   └── readinessEngine.js    # Multidimensional mathematical formula
│   ├── server.js                 # Express server & static SPA host
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # Badge, Card, Button, ProgressBar, DemoBanner
│   │   │   ├── layout/           # Sidebar (10 sections), Navbar, AppLayout
│   │   │   └── charts/           # SkillComparisonChart, ReadinessRadarChart
│   │   ├── context/              # AuthContext with demo loader
│   │   ├── pages/                # 14 complete functional application pages
│   │   ├── services/api.js       # Axios client
│   │   ├── App.jsx               # Protected client router
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── package.json                  # Root orchestration package
├── ARCHITECTURE.md               # Technical specification document
└── README.md
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js** v18+ or v20+ (`node -v`)
- **npm** v9+ (`npm -v`)
- *(Optional)* **MongoDB** instance running locally (`mongodb://127.0.0.1:27017`).
  > **Note for Evaluators:** If a local MongoDB daemon is not running, the application **automatically initializes its built-in In-Memory Resilient Persistence Engine**, ensuring zero friction during testing!

### 1. Clone & Setup
```bash
cd "Technova001"
```

### 2. Configure Environment (Optional)
The server works out-of-the-box in Hackathon Safe Mode without any required API keys. To connect live LLM providers, edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/technova_career_copilot
JWT_SECRET=technova001_super_secure_jwt_secret_key_kit_hackathon_2026
GEMINI_API_KEY=your_gemini_api_key_here
GITHUB_TOKEN=your_optional_github_personal_token
```

### 3. Run the Full Application

**Option A — Combined Production / Single-Port Mode (Recommended for Judges):**
```bash
# Terminal 1: Start the server (serves both API and built React frontend on port 5000)
cd server
npm start
```
Visit: **`http://localhost:5000`**

**Option B — Independent Development Mode:**
```bash
# Terminal 1 (Backend)
cd server
npm run dev

# Terminal 2 (Frontend with Vite Hot Module Reloading)
cd client
npm run dev
```
Visit: **`http://localhost:5173`**

---

## 🎬 Hackathon Live Demo Walkthrough

Follow this step-by-step workflow during the evaluation:

1. **Launch the Application:** Open `http://localhost:5000` (or `http://localhost:5173`).
2. **Access Demo Profile:** Click **"Launch Live Hackathon Demo"** on the landing page (or click **"Sign In as Demo Student"** on the login page).
3. **Overview Dashboard:**
   - Observe candidate **Aarav Sharma** (Kanpur Institute of Technology, B.Tech CSE).
   - Review Target Role: **Full-Stack Developer**.
   - Note the verified vs. claimed skills and top 5 prioritized skill gaps (Docker, Automated Testing, System Design).
4. **Resume Analyzer (`/app/resume`):**
   - Click **"Load Sample KIT Resume"** to simulate document parsing.
   - Inspect extracted sentence-level evidence quotes and resume critique.
   - Click **"Confirm & Save Extracted Evidence"**.
5. **GitHub Intelligence (`/app/github`):**
   - View public repositories scanned for `aarav-kit-dev`.
   - Inspect observed code signals (testing presence, Docker flags, language frequencies).
   - Click **"Sync Skills to Career Profile"**.
6. **Skill Gap Analysis (`/app/skills`):**
   - Inspect the Recharts bar chart comparing demonstrated proficiency vs. curated target benchmark.
   - Click on the **Docker Containerization** gap to view why it matters in production.
   - Click **"Submit Evidence"** to see how students can submit supplementary verifiable proof.
7. **Personalized Roadmap (`/app/roadmap`):**
   - Walk through the 3-phase curriculum structured around **LEARN → PRACTICE → BUILD → VALIDATE → IMPROVE**.
   - Toggle milestone statuses between *Pending*, *In Progress*, and *Completed*.
8. **Project Missions (`/app/missions`):**
   - Open the **"Containerize a Node.js API with Docker"** mission.
   - Click **"Submit Deliverable for Verification"** and submit.
   - Experience the celebratory confetti burst and observe Docker upgrade to **Verified** state!
9. **AI Mock Interview (`/app/interview`):**
   - Select **Technical Interview** mode and click **"Begin Adaptive Mock Interview"**.
   - Review the generated architectural question.
   - Click **"Auto-fill Demo Response"** and submit.
   - View real-time feedback across correctness, reasoning, architecture, and communication.
10. **Career Readiness (`/app/readiness`):**
    - Review the updated 6-dimensional radar chart.
    - Inspect the transparent mathematical formula and high-impact next action recommendation.

---

## 🔒 Security & Privacy

- **Password Hashing:** Passwords are hashed with Bcrypt (10 salt rounds).
- **Session Protection:** Stateless JWT authentication tokens with 7-day expiration.
- **Untrusted Document Handling:** Uploaded resumes (PDF/DOCX) are parsed solely in memory or temporary disk storage without executing binaries or arbitrary code.
- **Rate Limiting:** IP-based sliding window rate limiter protects endpoints from brute force and denial of service.
- **Zero Secret Exposure:** Frontend does not store API keys or backend credentials.

---

## 👥 Team Identity & Acknowledgments

- **Team Name:** Technova001
- **Institution:** Kanpur Institute of Technology (KIT), Rooma, Kanpur, Uttar Pradesh, India
- **Hackathon:** College Hackathon 2026
- **Contact:** technova001@kit.ac.in
