# Pharmaceutics Mastery Matrix (PMM) — Execution Tasks & Roadmap

## 1. Phase 1: Foundation, Design System & Auth Shell

> **Status:** COMPLETED (Verified 100%) ✅

- [x] **Task 1.1: Project Initialization**
  - [x] Configure workspace directory structure (`css/`, `js/`, `DOC/`).
  - [x] Initialize Python virtual environment (`.venv`) for local tooling.
- [x] **Task 1.2: PMM Design System**
  - [x] Create tokens (`pmm-tokens.css`) with primary, secondary, accent, and semantic palettes.
  - [x] Create CSS reset (`pmm-reset.css`) and typography system (`pmm-typography.css`).
  - [x] Build App Shell & layout engine (`pmm-layout.css`).
  - [x] Build all 18 core reusable UI components (`pmm-components.css`).
  - [x] Implement component controller logic (`pmm-components.js`).
- [x] **Task 1.3: Educational Landing Page**
  - [x] Navigation bar with brand lockup, menu, and theme toggle.
  - [x] Hero section with copy, CTAs, and interactive quiz simulation HUD.
  - [x] 4-step PMM Mastery Concept pipeline (Learn, Practice, Analyze, Master).
  - [x] Preview cards for 6 pharmaceutical subjects.
  - [x] Performance telemetry preview section and domain diagnostic breakdown.
  - [x] Call to Action banner and compendial footer.
- [x] **Task 1.4: Scholar Authentication Views**
  - [x] Create Account page (`register.html`) with real-time password security meter.
  - [x] Scholar Login page (`login.html`) with instant demo auto-fill helper.
- [x] **Task 1.5: Modular Authentication & Data Services**
  - [x] Implement `MockAuthAdapter` with `localStorage` persistence and simulated latency.
  - [x] Implement `AuthService` abstraction layer.
  - [x] Implement `MockDataAdapter` and `DataService` for dashboard metrics.
- [x] **Task 1.6: Route Guards & Protection**
  - [x] Implement `PMM_Guard.requireAuth()` for protected routes.
  - [x] Implement `PMM_Guard.requireGuest()` for authentication routes.
  - [x] Implement `PMM_Guard.updateNavAuth()` for landing page session sync.
- [x] **Task 1.7: Protected Scholar Dashboard**
  - [x] Personalized welcome banner with active session ID.
  - [x] 4 core stat cards (Accuracy, Quizzes, Streak, Tier).
  - [x] Enrolled subjects grid populated from `DataService`.
  - [x] Recent study activity feed with verification badges.
  - [x] Accessible sign-out modal dialog.

---

## 2. Phase 2: Supabase Integration & Core Quiz Engine

> **Status:** READY FOR KICKOFF ⏳

- [ ] **Task 2.1: Supabase Project Setup & Schema**
  - [ ] Define database schema for PostgreSQL (`profiles`, `subjects`, `topics`, `questions`).
  - [ ] Write SQL migration scripts with Row-Level Security (RLS) policies.
  - [ ] Set up Supabase GoTrue Auth configuration.
- [ ] **Task 2.2: Supabase Adapters Implementation**
  - [ ] Implement `SupabaseAuthAdapter` adhering to `AuthService` interface.
  - [ ] Implement `SupabaseDataAdapter` adhering to `DataService` interface.
  - [ ] Configure environment variables / config switch (`USE_SUPABASE = true`).
- [ ] **Task 2.3: Core Quiz Runner Foundation**
  - [ ] Build basic question player shell (`quiz.html`).
  - [ ] Single question navigation with forward/back controls.
  - [ ] Option selection state and client-side score accumulator.
  - [ ] Submission payload generation.

---

## 3. Phase 3: Advanced Quiz Engine & Compendial Rationales

> **Status:** BACKLOG 📋

- [ ] **Task 3.1:** Adaptive difficulty selection (Foundational, Intermediate, Advanced).
- [ ] **Task 3.2:** Timed examination mode with automatic countdown and submission.
- [ ] **Task 3.3:** Rich compendial rationales (USP, Ph. Eur., FDA Guidance references).
- [ ] **Task 3.4:** Interactive calculation scratchpad for pharmacokinetics equations.

---

## 4. Phase 4: Performance Telemetry & Spaced Repetition

> **Status:** BACKLOG 📋

- [ ] **Task 4.1:** Spaced repetition scheduling algorithm (SM-2 / Leitner).
- [ ] **Task 4.2:** Detailed radar chart for domain competency.
- [ ] **Task 4.3:** Weak-area targeted remediation decks.
- [ ] **Task 4.4:** Longitudinal accuracy and velocity reporting.

---

## 5. Phase 5: Academic Fellowship, Leaderboards & Administration

> **Status:** BACKLOG 📋

- [ ] **Task 5.1:** Academic tier progression logic (Scholar, Fellow, Dean's Scholar).
- [ ] **Task 5.2:** Anonymous peer ranking and leaderboard.
- [ ] **Task 5.3:** Faculty authoring portal for uploading validated question sets.
- [ ] **Task 5.4:** Platform compliance audit and WCAG 2.1 AAA certification.
