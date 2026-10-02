# Pharmaceutics Mastery Matrix (PMM) — System Architecture

## 1. Architectural Philosophy

The **Pharmaceutics Mastery Matrix (PMM)** is an advanced pharmaceutical science education and quiz mastery platform engineered for high academic rigor, scientific precision, and long-term clinical retention.

### Key Architectural Tenets

1. **Separation of Concerns:** Distinct isolation between UI presentation, service business logic, and backend data adapters.
2. **Adapter / Repository Pattern:** The UI layer never communicates directly with storage or vendor SDKs. It consumes abstract service contracts (`AuthService`, `DataService`), allowing seamless migration from Phase 1 mock storage to Phase 2 Supabase PostgreSQL without UI modifications.
3. **Vanilla Web Foundation:** Pure HTML5, CSS custom properties (Tokens), and native JavaScript (ES Modules). Zero unnecessary framework bloat, fast load times, and high accessibility.
4. **Offline & Edge Capability:** Local state caching and resilient session handling.

---

## 2. Multi-Tier Architecture Diagram

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                                 UI LAYER                                    │
│   ┌──────────────┐   ┌──────────────┐   ┌───────────────┐   ┌───────────┐   │
│   │  index.html  │   │  login.html  │   │ register.html │   │ dashboard │   │
│   └──────────────┘   └──────────────┘   └───────────────┘   └───────────┘   │
│         ▲                    ▲                  ▲                 ▲         │
│         │                    │                  │                 │         │
│         └────────────────────┴─────────┬────────┴─────────────────┘         │
│                                        │ Consumes Abstract APIs             │
│                                        ▼                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                              SERVICE LAYER                                  │
│   ┌────────────────────────────────┐   ┌────────────────────────────────┐   │
│   │          AuthService           │   │          DataService           │   │
│   │ (signUp, signIn, getUser, etc.)│   │ (getMetrics, getSubjects, etc.)│   │
│   └────────────────────────────────┘   └────────────────────────────────┘   │
│                   ▲                                     ▲                   │
│                   │ Delegates via Config                │ Delegates         │
│                   ▼                                     ▼                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                              ADAPTER LAYER                                  │
│   ┌────────────────────────────────┐   ┌────────────────────────────────┐   │
│   │       MockAuthAdapter          │   │       MockDataAdapter          │   │
│   │ (localStorage + 250ms latency) │   │ (In-memory mock subject data)  │   │
│   └────────────────────────────────┘   └────────────────────────────────┘   │
│                   │                                     │                   │
│                   ▼ Phase 2 Seamless Replacement        ▼ Phase 2           │
│   ┌────────────────────────────────┐   ┌────────────────────────────────┐   │
│   │      SupabaseAuthAdapter       │   │      SupabaseDataAdapter       │   │
│   │     (@supabase/supabase-js)    │   │   (PostgREST REST & Realtime)  │   │
│   └────────────────────────────────┘   └────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────────┤
│                             PERSISTENCE LAYER                               │
│   [Phase 1] Browser localStorage (pmm_mock_users, pmm_mock_session)        │
│   [Phase 2] Supabase Cloud (PostgreSQL 15+, Auth GoTrue, Row-Level Security)│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Data Flow & Security Model

### 3.1 Authentication Workflow

1. **User Action:** Scholar submits login credentials via `login.html`.
2. **Validation:** Client-side sanitization and format verification (`validation.js`).
3. **Service Dispatch:** `AuthService.signIn({ email, password })`.
4. **Adapter Execution:**
   - *Phase 1:* `MockAuthAdapter` validates against stored user records with simulated 250ms network latency.
   - *Phase 2:* `SupabaseAuthAdapter` calls `supabase.auth.signInWithPassword()` returning signed JWT tokens.
5. **Session Persistence:** Session token cached in `localStorage` under `pmm_mock_session_state`.
6. **Route Guard:** `PMM_Guard.requireGuest()` prevents authenticated users from re-entering login/register pages; `PMM_Guard.requireAuth()` gates protected views (`dashboard.html`).

### 3.2 Authorization & Row-Level Security (RLS) Strategy

- In Phase 2, all database access is governed by Supabase Row-Level Security policies:
  - `profiles`: Selectable by all authenticated scholars; updatable only by the account owner (`auth.uid() = id`).
  - `user_progress`: Insertable/updatable only by `auth.uid() = user_id`.
  - `questions` & `subjects`: Publicly readable by authenticated scholars; write-restricted to admin role.

---

## 4. Module & Directory Structure

```text
PMM 3/
├── .venv/                      # Python virtual environment
├── DOC/                        # Specification & Architecture Documentation
│   ├── architecture.md         # This document
│   ├── design.md               # Design system & visual specification
│   ├── memory.md               # Project memory & state tracking
│   ├── prd.md                  # Product Requirements Document
│   ├── rules.md                # Development standards & rules
│   └── tasks.md                # Execution roadmap & task list
├── css/
│   ├── pmm-tokens.css          # Color, typography, and spacing tokens
│   ├── pmm-reset.css           # Cross-browser base resets
│   ├── pmm-typography.css      # Plus Jakarta Sans & JetBrains Mono scales
│   ├── pmm-layout.css          # App Shell, grid, flex, and breakpoints
│   ├── pmm-components.css      # 18 reusable component classes
│   ├── pmm-system.css          # Master stylesheet bundle
│   ├── pmm-landing.css         # Landing page styles
│   ├── pmm-auth.css            # Login & registration styles
│   └── pmm-dashboard.css       # Scholar dashboard styles
├── js/
│   ├── pmm-components.js       # Component controllers (Modal, Theme, Select, Ring)
│   ├── pmm-landing.js          # Interactive landing page logic
│   ├── pmm.js                  # Master ES module entry point
│   ├── services/
│   │   ├── auth-service.js     # Unified AuthService interface
│   │   ├── mock-auth-adapter.js# Phase 1 mock auth implementation
│   │   ├── data-service.js     # Unified DataService interface
│   │   └── mock-data-adapter.js# Phase 1 mock telemetry & subject data
│   └── utils/
│       ├── guard.js            # Route Guard (requireAuth, requireGuest)
│       └── validation.js       # Form validation & security rules
├── index.html                  # Landing page
├── login.html                  # Scholar login
├── register.html               # Account creation
└── dashboard.html              # Protected scholar dashboard
```
