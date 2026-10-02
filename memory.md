# Pharmaceutics Mastery Matrix (PMM) — Project Memory & State

## 1. Project Context

- **Platform Name:** Pharmaceutics Mastery Matrix (PMM)
- **Tagline:** *"Learn. Practice. Master."*
- **Primary Domain:** Pharmacy education, licensure preparation (NAPLEX, PEBC, FPGEE), and academic quiz mastery.
- **Current Development Phase:** **Phase 1 Complete**. Preparing for Phase 2.

---

## 2. Environment & Tooling Context

- **OS / Shell:** Windows (PowerShell)
- **Python Runtime:** Python 3.14.8 with active local virtual environment in [`.venv`](file:///c:/Users/Dell/OneDrive/Desktop/PMM%203/.venv).
- **Node.js / NPM Status:** Node/NPM are not in the system PATH. The project is designed with native ES Modules, Vanilla CSS, and HTML5 to run without bundler overhead.
- **Local Dev Server:** Can be launched with `python -m http.server 8080 --directory "c:\Users\Dell\OneDrive\Desktop\PMM 3"`.

---

## 3. Seeded Test Credentials

For rapid verification of login and dashboard flows:

- **Email:** `scholar@pmm.edu`
- **Password:** `Mastery2026!`
- **Scholar Name:** Dr. Sarah Chen, PharmD
- **Academic Title:** Clinical Pharmacokinetics Fellow
- **Institution:** Department of Pharmaceutical Sciences
- **Starting Metrics:** 94.6% Accuracy, 142 Quizzes Completed, 18-Day Active Streak, Tier IV Fellow

---

## 4. Key Architectural Decisions (Preserved Context)

1. **Adapter / Repository Pattern for Supabase:**
   - All client pages communicate with `PMM_AuthService` and `PMM_DataService`.
   - In Phase 1, `MockAuthAdapter` and `MockDataAdapter` handle persistence in `localStorage`.
   - In Phase 2, `SupabaseAuthAdapter` and `SupabaseDataAdapter` will replace the mock adapters without modifying the UI layer.

2. **Styling Philosophy:**
   - Pure Vanilla CSS utilizing CSS Custom Properties (Tokens).
   - Bespoke components (`.pmm-*`) instead of generic Bootstrap or Tailwind.
   - Dual-mode capability with clinical dark mode as default.

3. **Route Protection:**
   - `dashboard.html` executes `PMM_Guard.requireAuth({ redirectTo: 'login.html' })` on load.
   - `login.html` and `register.html` execute `PMM_Guard.requireGuest({ redirectTo: 'dashboard.html' })`.
   - `index.html` runs `PMM_Guard.updateNavAuth()` to display dynamic dashboard links if logged in.

---

## 5. Current Deliverables Status

| Component / Artifact | Status | Location |
| :--- | :--- | :--- |
| PMM Tokens & Reset | Completed | `css/pmm-tokens.css`, `css/pmm-reset.css` |
| PMM Typography & Layout | Completed | `css/pmm-typography.css`, `css/pmm-layout.css` |
| PMM 18-Component Visual System | Completed | `css/pmm-components.css` |
| Interactive Component Engine | Completed | `js/pmm-components.js` |
| Landing Page | Completed | `index.html`, `css/pmm-landing.css`, `js/pmm-landing.js` |
| Scholar Login Interface | Completed | `login.html`, `css/pmm-auth.css` |
| Create Account Interface | Completed | `register.html`, `css/pmm-auth.css` |
| Mock Auth Service & Adapter | Completed | `js/services/auth-service.js`, `mock-auth-adapter.js` |
| Mock Data Service & Adapter | Completed | `js/services/data-service.js`, `mock-data-adapter.js` |
| Route Guard & Validation | Completed | `js/utils/guard.js`, `js/utils/validation.js` |
| Protected Scholar Dashboard | Completed | `dashboard.html`, `css/pmm-dashboard.css` |
| Python Virtual Environment | Completed | `.venv/` |
