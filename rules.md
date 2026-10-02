# Pharmaceutics Mastery Matrix (PMM) — Engineering Rules & Guidelines

## 1. Core Engineering Principles

These rules are non-negotiable guidelines for developing, expanding, and maintaining the PMM codebase.

---

### Rule 1: Strict Incremental Execution

- **Never implement multiple phases at once.**
- Work sequentially through defined phases (Phase 1 ➔ Phase 2 ➔ Phase 3 ➔ Phase 4 ➔ Phase 5).
- Do not build the quiz runner, leaderboard, achievements, or admin systems until their designated phase is explicitly approved.

---

### Rule 2: Modular Decoupling (Adapter Pattern)

- **UI layers must never call storage APIs directly.**
- All authentication operations must route through `PMM_AuthService`.
- All data retrieval must route through `PMM_DataService`.
- Any storage change (e.g., migrating from `localStorage` to Supabase PostgreSQL) must be confined entirely to the adapter layer (`js/services/*-adapter.js`).
- Public interface contracts must remain stable so UI views (`login.html`, `register.html`, `dashboard.html`) require zero modifications during migrations.

---

### Rule 3: Design System Fidelity

- **Strictly adhere to PMM tokens and BEM component classes.**
- All colors, elevations, radii, and transitions must reference `var(--pmm-*)` tokens defined in [pmm-tokens.css](file:///c:/Users/Dell/OneDrive/Desktop/PMM%203/css/pmm-tokens.css).
- Use established component classes (`.pmm-btn`, `.pmm-card`, `.pmm-badge`, `.pmm-progress`, etc.) from [pmm-components.css](file:///c:/Users/Dell/OneDrive/Desktop/PMM%203/css/pmm-components.css).
- Do not introduce Tailwind, Bootstrap, or ad-hoc inline styling unless explicitly requested.

---

### Rule 4: Mandatory Verification Loop

After completing each milestone:

1. **Run/Serve:** Execute the local server (`python -m http.server 8080`) or test files.
2. **Check Errors:** Verify that all HTML, CSS, and JS files have zero syntax errors and clean tag/bracket balance.
3. **Fix Immediately:** Resolve any console errors or broken links before proceeding.
4. **Visual & Responsive Verification:** Check page rendering across desktop, tablet, and mobile breakpoints.
5. **Proceed:** Move to the next task only after the current part is confirmed functional.

---

### Rule 5: Accessibility Standards (WCAG 2.1 AA/AAA)

- Every interactive element (`<button>`, `<a>`, `<input>`, `<select>`) must feature visible focus rings via `:focus-visible` (`outline: 2px solid #38bdf8; outline-offset: 2px`).
- Minimum touch target height for mobile controls is **40px**.
- Contrast ratios must meet or exceed **4.5:1** for body text and **3.0:1** for large headings.
- Animations and transitions must respect `@media (prefers-reduced-motion: reduce)`.

---

### Rule 6: Authentic Scientific Content

- Use real pharmaceutical terminology, verified drug names, molecular formulas, and compendial standards (USP, Ph. Eur., BCS classification).
- Never use generic lorem ipsum or silly placeholder text.
- Maintain an academic, professional, and serious clinical tone across all copy.
