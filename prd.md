# Pharmaceutics Mastery Matrix (PMM) — Product Requirements Document (PRD)

## 1. Executive Summary & Problem Statement

### 1.1 The Challenge

Mastering pharmaceutical sciences requires high-order clinical reasoning across calculation-heavy disciplines: biopharmaceutics, pharmacokinetic compartment modeling, structure-activity relationships (SAR), and therapeutic drug monitoring. Students and licensure candidates (NAPLEX, PEBC, FPGEE) frequently rely on passive memorization or disjointed flashcards, leading to rapid decay of retention and clinical deficits.

### 1.2 The Solution

The **Pharmaceutics Mastery Matrix (PMM)** is a scientific education and quiz mastery platform built on a four-stage mastery loop:

1. **Learn:** Targeted, high-yield academic modules.
2. **Practice:** Adaptive multiple-choice questions with compendial rationales.
3. **Analyze:** Sub-discipline telemetry pinpointing exact conceptual deficits.
4. **Master:** Spaced repetition reinforcing retention until reaching verified thresholds (≥85%).

---

## 2. Target User Personas

| Persona | Role | Primary Goal | Key Frustration |
| :--- | :--- | :--- | :--- |
| **Pharmacy Scholar (PharmD/BPharm)** | Undergraduate / Professional Student | Clear course modules and build strong clinical foundation | Overwhelmed by textbook density and formula memorization |
| **Licensure Candidate (NAPLEX/PEBC)** | Post-Graduate Candidate | Pass high-stakes licensing board exams on first attempt | Unclear diagnostic insight into specific weak topic areas |
| **Clinical Fellow / Researcher** | Postgraduate Academic | Refine advanced dosing kinetics and drug interaction nuances | Lack of rigorous, compendially aligned assessment tools |

---

## 3. Product Roadmap by Phase

```text
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     PHASE 1     │     │     PHASE 2     │     │     PHASE 3     │
│ Foundation,     │────▶│ Supabase Cloud, │────▶│ Advanced Quiz   │
│ Design System & │     │ Database Schema │     │ Runner, Adaptive│
│ Mock Dashboard  │     │ & Core Quiz     │     │ Testing Engine  │
│  [COMPLETED]    │     │   [CURRENT]     │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐                             ┌─────────────────┐
│     PHASE 5     │                             │     PHASE 4     │
│ Academic Tiers, │◀────────────────────────────│ Telemetry Radar,│
│ Leaderboard &   │                             │ Spaced          │
│ Faculty Portals │                             │ Repetition      │
└─────────────────┘                             └─────────────────┘
```

### Phase 1: Foundation, Design System & Auth Shell [COMPLETED ✅]

- Design system tokens, typography scales, and 18 core UI components.
- Responsive landing page (`index.html`) with interactive quiz simulation.
- Scholar login (`login.html`) and registration (`register.html`).
- Modular `AuthService` and `DataService` adhering to the Adapter Pattern.
- Protected Scholar Dashboard (`dashboard.html`) with route guards.

### Phase 2: Supabase Integration & Core Quiz Foundation [UPCOMING]

- Supabase cloud configuration (PostgreSQL, GoTrue Auth, Row-Level Security).
- Migration of `MockAuthAdapter` and `MockDataAdapter` to Supabase SDK.
- Relational schema: `profiles`, `subjects`, `topics`, `questions`, `quiz_sessions`.
- Basic question runner shell loading live questions from database.

### Phase 3: Advanced Quiz Engine & Compendial Content

- Timed assessment mode, adaptive difficulty adjustment.
- Compendial rationale cards (USP/Ph. Eur. citations) for every answer option.
- Interactive pharmacokinetics dosage calculators and formula helpers.

### Phase 4: Performance Telemetry & Spaced Repetition

- Detailed radar charts and domain diagnostic tables.
- SuperMemo-2 (SM-2) or Leitner-based spaced repetition scheduling.
- Sub-topic deficit mapping and automated remediation decks.

### Phase 5: Academic Fellowship, Leaderboards & Faculty Portals

- Academic tiers (Scholar, Senior Fellow, Dean's Scholar).
- Anonymized peer leaderboard and accuracy rankings.
- Faculty authoring dashboard for uploading peer-reviewed questions.

---

## 4. Non-Functional Requirements (NFR)

1. **Accessibility (a11y):** Full compliance with **WCAG 2.1 Level AA** standards, visible `:focus-visible` rings on all interactive elements, semantic HTML5 structure, and screen-reader accessible ARIA roles.
2. **Performance:** Sub-1.2s Largest Contentful Paint (LCP), zero layout shifts (CLS < 0.1), and 60fps micro-animations.
3. **Responsive Breakpoints:** Smooth layouts across Mobile (<768px), Tablet (768px - 1024px), Laptop (1024px - 1280px), and Desktop (≥1280px).
4. **Security:** Client-side sanitization, protected route guards, and zero exposure of service secrets in client bundles.
