# Pharmaceutics Mastery Matrix (PMM)

> **"Learn. Practice. Master."**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Phase](https://img.shields.io/badge/Phase-1%20Complete-00D4B2.svg)](#implementation-roadmap)
[![Tech](https://img.shields.io/badge/Stack-Vanilla%20CSS%20%7C%20ES%20Modules%20%7C%20Python%203.14-0A2540.svg)](#technology-stack)
[![Design](https://img.shields.io/badge/Design%20System-Clinical%20Sapphire%20%26%20Bioluminescent%20Cyan-0066CC.svg)](#design-system--tokens)

**Pharmaceutics Mastery Matrix (PMM)** is a premier pharmaceutical education and quiz mastery platform engineered for pharmacy scholars, researchers, and candidates preparing for licensure and competitive entrance examinations (GPAT, NIPER JEE, NAPLEX, PEBC, FPGEE).

PMM bridges rigorous pharmaceutical sciences—including physical pharmaceutics, biopharmaceutics, pharmacokinetics, industrial formulation, and regulatory affairs—with cognitive spaced repetition, real-time formula mastery, and clinical scenario simulations.

---

## Table of Contents

- [Overview](#overview)
- [Key Features (Phase 1)](#key-features-phase-1)
- [Project Architecture](#project-architecture)
- [Directory Structure](#directory-structure)
- [Design System & Tokens](#design-system--tokens)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Server Execution](#local-server-execution)
  - [Python Environment Setup](#python-environment-setup)
- [Demo Scholar Credentials](#demo-scholar-credentials)
- [Implementation Roadmap](#implementation-roadmap)
- [Security & Best Practices](#security--best-practices)
- [License](#license)

---

## Overview

Modern pharmaceutical education demands both encyclopedic recall and deep clinical problem-solving. PMM replaces passive memorization with an active, multi-dimensional matrix:

- **BCS Classification & Biopharmaceutics**: Solubilization techniques, dissolution kinetics, and permeability.
- **Pharmacokinetics & Compartment Models**: Elimination rate constants, volume of distribution, AUC calculations.
- **Modified & Targeted Drug Delivery**: Liposomes, nanoparticles, osmotic pumps, and microspheres.
- **Sterile & Industrial Dosage Forms**: Lyophilization, cleanroom zoning (ISO 14644), validation, and stability testing.
- **Regulatory Affairs & Pharmacopoeias**: USP, Ph. Eur., IP, and ICH guidelines (Q1A-Q14).

---

## Key Features (Phase 1)

* **Design System**: Fully bespoke clinical design system crafted with Vanilla CSS tokens—Clinical Sapphire, Precision Titanium, Bioluminescent Cyan, and clinical semantic feedback states.
* **Responsive Educational Landing Page (`index.html`)**:
  * Precision header with active authentication state reflection.
  * Hero section with glowing matrix grid animation and immediate calls to action.
  * Interactive Subject Matrix covering all core pharmaceutical domains.
  * 4-step pedagogical methodology breakdown (Diagnostic Baseline &rarr; Targeted Drills &rarr; Spaced Retention &rarr; Mastered Readiness).
  * Pharmacopoeia standard compliance showcase and scholar testimonials.
* **Authentication Suite (`login.html` & `register.html`)**:
  * One-click demo credentials autofill for frictionless reviewer evaluation.
  * Live password entropy meter (length, uppercase, lowercase, numbers, symbols).
  * Client-side sanitization and validation.
* **Protected Scholar Dashboard (`dashboard.html`)**:
  * Client-side route guard (`guard.js`) preventing unauthenticated access.
  * Real-time telemetry metrics: Mastery Score (78.4%), Active Streak (14 Days), Retention Index (92.1%), Formula Fluency (85%).
  * Enrolled course progress cards with dynamic progress bars and chapter tallies.
  * Chronological activity feed logging recent quiz sessions and clinical calculations.
  * Interactive sign-out confirmation modal.
* **Modular Storage Adapter**: Designed under the Adapter/Repository pattern so Phase 2's Supabase backend can replace local storage mocks without touching frontend views or component logic.

---

## Project Architecture

```
+--------------------------------------------------------------------------+
|                               Presentation Layer                         |
|   index.html       login.html       register.html       dashboard.html   |
+--------------------------------------------------------------------------+
                                     |
                                     v
+--------------------------------------------------------------------------+
|                             Guard & Utilities                            |
|             js/utils/guard.js           js/utils/validation.js           |
+--------------------------------------------------------------------------+
                                     |
                                     v
+--------------------------------------------------------------------------+
|                             Service Facades                              |
|           js/services/auth-service.js       js/services/data-service.js  |
+--------------------------------------------------------------------------+
                                     |
                                     v
+--------------------------------------------------------------------------+
|                        Pluggable Storage Adapters                        |
|   js/services/mock-auth-adapter.js    js/services/mock-data-adapter.js   |
|   --------------------------------    --------------------------------   |
|   [ Phase 2: supabase-auth-adapter ]  [ Phase 2: supabase-data-adapter ] |
+--------------------------------------------------------------------------+
```

---

## Directory Structure

```text
PMM/
|-- css/
|   |-- pmm-tokens.css         # Clinical color tokens, typography scales, shadows
|   |-- pmm-reset.css          # Modern box-sizing, typography normalization
|   |-- pmm-typography.css     # Plus Jakarta Sans & JetBrains Mono font scales
|   |-- pmm-layout.css         # App shell, responsive grid system, containers
|   |-- pmm-components.css     # 18 reusable clinical UI components
|   `-- pmm-system.css         # Design system bundle
|-- js/
|   |-- pmm-components.js      # Interactive component behaviors & notifications
|   |-- services/
|   |   |-- auth-service.js      # Unified Auth API abstraction
|   |   |-- mock-auth-adapter.js # LocalStorage auth adapter (Supabase-ready)
|   |   |-- data-service.js      # Data facade for subjects & stats
|   |   `-- mock-data-adapter.js # Seed data & local progress repository
|   `-- utils/
|       |-- guard.js           # Client-side route protection & nav auth
|       `-- validation.js      # Password entropy & input sanitization
|-- DOC/                       # Architectural documentation & specifications
|   |-- COMPONENT_SPEC.md
|   |-- DESIGN_SYSTEM.md
|   `-- PHASE_1_ARCHITECTURE.md
|-- index.html                 # PMM Landing Page
|-- login.html                 # Scholar Login view
|-- register.html              # Account Creation view
|-- dashboard.html             # Protected Scholar Dashboard
|-- index.css                  # Core CSS entry point
|-- requirements.txt           # Python backend dependencies
|-- .env.example               # Environment variables template
|-- .gitignore                 # Exclusion rules (.env, .venv, etc.)
`-- README.md                  # Project overview & documentation
```

---

## Design System & Tokens

PMM utilizes a custom-engineered clinical design token architecture:

| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `--pmm-color-primary` | `#0A2540` | Clinical Sapphire (Core branding, headers, dark surfaces) |
| `--pmm-color-secondary` | `#0066CC` | Deep Medical Blue (Action buttons, focused states) |
| `--pmm-color-accent` | `#00D4B2` | Bioluminescent Cyan (Matrix nodes, active badges, highlights) |
| `--pmm-color-surface` | `#FFFFFF` | Sterile white surface cards |
| `--pmm-color-bg` | `#F8FAFC` | Laboratory cool grey-white background |
| `--pmm-color-success` | `#10B981` | Validation passes & correct answers |
| `--pmm-color-warning` | `#F59E0B` | Partial retention & pending reviews |
| `--pmm-color-danger` | `#EF4444` | High-risk clinical errors & formula miscalculations |

---

## Getting Started

### Prerequisites

- Any modern web browser (Chrome, Edge, Firefox, Safari) with ES Modules support.
- Python 3.10+ (for local preview server and upcoming API integrations).

### Local Server Execution

1. Clone or open the repository:
   ```bash
   git clone https://github.com/Gopikrishna7733/PMM.git
   cd PMM
   ```

2. Start a lightweight HTTP server:
   ```bash
   python -m http.server 8000
   ```

3. Open your browser and navigate to:
   ```text
   http://localhost:8000
   ```

### Python Environment Setup

For developing backend tools, test scripts, or upcoming AI question generators:

1. Create and activate a Python virtual environment:
   ```powershell
   # Windows PowerShell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   ```powershell
   Copy-Item .env.example .env
   ```
   Add your API keys (`GEMINI_API_KEY`, etc.) inside `.env`.

---

## Demo Scholar Credentials

For fast review and evaluation of the protected Scholar Dashboard:

| Field | Credentials |
| :--- | :--- |
| **Email** | `scholar@pmm.edu` |
| **Password** | `Mastery2026!` |

*(Click **"Autofill Demo Scholar"** on the [Login page](login.html) to populate these instantly).*

---

## Implementation Roadmap

- [x] **Phase 1: Foundation & Presentation**
  - [x] PMM clinical design system tokens & 18 UI components
  - [x] Educational landing page with dynamic matrix theme
  - [x] Scholar authentication views (Login & Register)
  - [x] Client-side route protection & session guard
  - [x] Protected Scholar Dashboard with telemetry widgets
  - [x] Pluggable LocalStorage adapter layer
- [ ] **Phase 2: Database & Core Quiz Engine**
  - [ ] Supabase schema migration (`profiles`, `subjects`, `topics`, `questions`, `quiz_sessions`)
  - [ ] Supabase Auth & Data adapters integration
  - [ ] Active Quiz Runner interface (`quiz.html`) with timed drills and formula input
- [ ] **Phase 3: AI Rationales & Adaptive Engine**
  - [ ] Gemini 2.5 Flash clinical explanation engine
  - [ ] Adaptive difficulty adjustment based on error taxonomy
- [ ] **Phase 4: Spaced Repetition & Gamification**
  - [ ] SuperMemo-2 / Leitner retention scheduling
  - [ ] Scholar leaderboards, streak multipliers, and achievement badges
- [ ] **Phase 5: Faculty Portal & Advanced Telemetry**
  - [ ] Question authoring studio & batch CSV/JSON ingestion
  - [ ] Pharmacokinetics cohort analytics

---

## Security & Best Practices

- **Zero Plaintext Secrets in Version Control**: `.env` and `.venv/` are strictly tracked in `.gitignore`.
- **Client-Side Input Sanitization**: Form inputs are escaped and validated before dispatch.
- **Safe Session Token Handling**: Auth sessions are scoped to `localStorage` keys with structured expiry metadata.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

Developed with precision for the next generation of pharmaceutical scholars.
