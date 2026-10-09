# System Architecture & Technical Specifications
## Hyper-Personalized AI Career Co-Pilot
**Team Technova001 | Kanpur Institute of Technology**

---

## 1. High-Level Architectural Pipeline

```
[Student Input / Uploads]
  ├── Resume (PDF / DOCX)
  ├── Public GitHub Profile
  └── Onboarding Self-Report
         │
         ▼
[Backend Ingestion & Sanitization Layer]
  ├── Multer File Security Filter (Max 5MB, strict MIME check)
  ├── pdf-parse & mammoth Text Extractor
  └── GitHub REST API v3 Integration
         │
         ▼
[Evidence Extraction Engine]
  ├── NLP Semantic Pattern Matching / Gemini 1.5 Flash LLM
  └── Sentence-Level Context Citation Extraction
         │
         ▼
[Skill Evidence State Machine]
  └── States: Verified (4) > Probable (3) > Claimed (2) > Unknown (1)
         │
         ▼
[Deterministic Target-Role Benchmark Comparator]
  ├── Curated Competency Standards (6 Roles)
  └── Deficiency Calculation: TargetLevel - CurrentLevel
         │
         ▼
[Priority Scoring & Rationale Synthesizer]
  └── Priority Score = (Deficiency × 0.5) + (RoleWeight × 30) + ((100 - Confidence) × 0.2)
         │
         ▼
[Execution & Action Engines]
  ├── 5-Stage Roadmap Cycle: LEARN → PRACTICE → BUILD → VALIDATE → IMPROVE
  ├── Project Missions: Deliverable submission & automated verification
  └── Adaptive AI Mock Interview: Real-time multi-turn evaluation & difficulty calibration
         │
         ▼
[Multidimensional Career Readiness Model]
  └── 6-Pillar Weighted Scorecard & Radar Telemetry
```

---

## 2. Core Mathematical Formulations

### 2.1 Skill Gap Priority Index
Unlike naive ranking models that only evaluate raw score differences, the Technova001 engine prioritizes gaps based on role criticality, deficiency distance, and evidentiary certainty:

$$\text{Priority Score} = (\Delta \times 0.50) + (W_{\text{role}} \times 30) + ((100 - C_{\text{evid}}) \times 0.20)$$

Where:
- $\Delta = \max(0, \text{TargetLevel} - \text{CurrentLevel})$
- $W_{\text{role}} \in [0.7, 1.0]$ is the curated importance weight for the competency within the target role.
- $C_{\text{evid}} \in [0, 100]$ is the evidentiary confidence score.
- Categorization thresholds:
  - $\text{Priority Score} \ge 60 \implies \mathbf{High}$
  - $35 \le \text{Priority Score} < 60 \implies \mathbf{Medium}$
  - $\text{Priority Score} < 35 \implies \mathbf{Low}$

### 2.2 Composite Career Readiness Index
The overall readiness score is computed deterministically from six independent dimensions:

$$\text{Readiness} = \sum_{i=1}^{6} (w_i \times S_i)$$

| Dimension ($i$) | Weight ($w_i$) | Calculation Source |
| :--- | :---: | :--- |
| **Technical Readiness** | $0.25$ | Proportional density of Verified and Probable skills matching role competencies. |
| **Project Readiness** | $0.20$ | Completed practical missions with code artifacts + verified portfolio depth. |
| **Market Alignment** | $0.15$ | Ratio of target role competencies where deficiency $\Delta \le 20\%$. |
| **Interview Readiness** | $0.20$ | Mean performance score across conducted technical mock interview sessions. |
| **Communication** | $0.10$ | Structured answer flow, reasoning articulation, and documentation quality. |
| **Resume & Profile** | $0.10$ | Completeness score, structure density, and keyword alignment. |

---

## 3. Evidence State Machine

| State | Prerequisites | Confidence Score | Default Baseline |
| :--- | :--- | :---: | :---: |
| **Verified** | Approved mission deliverable, multi-repository GitHub evidence, or passed interview evaluation ($\ge 75\%$). | $85\% - 98\%$ | $75\% - 95\%$ |
| **Probable** | Detected in public code repos, dependencies, or documented project resume quotes. | $65\% - 80\%$ | $60\% - 75\%$ |
| **Claimed** | Self-reported in profile or listed in resume skills without project context. | $35\% - 50\%$ | $40\% - 50\%$ |
| **Unknown** | No signal recorded in profile, code, or interview history. | $15\% - 25\%$ | $25\%$ *(Never $0\%$)* |

---

## 4. Resilience Architecture: Dual-Mode Persistence

To eliminate barriers during hackathon evaluation where jurors may not have MongoDB pre-installed:
- When MongoDB is running, Mongoose models write directly to database collections with full index support.
- If the MongoDB daemon is offline (`ECONNREFUSED`), the system gracefully intercepts connection failures and switches to an in-memory storage adapter that preserves schema validation and data manipulation methods (`find`, `findOne`, `create`, `findByIdAndUpdate`, `deleteMany`).
- When demo data is seeded, all models seamlessly persist in memory, ensuring $100\%$ zero-setup execution.

---

## 5. Security Guardrails

1. **Non-Executable Uploads:** Uploaded document files (PDF/DOCX) are parsed solely via text extraction buffers (`pdf-parse`, `mammoth`). No binary code execution or script evaluation is permitted.
2. **Deterministic Fallback Engine:** If external LLM API rate limits are exceeded or external keys are unavailable, the platform automatically utilizes its rule-based expert engine to guarantee that mock interviews and gap calculations never fail.
3. **Stateless JWT Authorization:** Client requests require valid Bearer token headers verified with `HS256` encryption.
