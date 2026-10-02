# Pharmaceutics Mastery Matrix (PMM) — Component Specification Reference

This document provides markup blueprints, class lists, and accessibility guidelines for all 18 core reusable components in the PMM visual system.

---

## Component Index

1. [Button (`.pmm-btn`)](#1-button)
2. [Card (`.pmm-card`)](#2-card)
3. [Badge (`.pmm-badge`)](#3-badge)
4. [Progress Bar (`.pmm-progress`)](#4-progress-bar)
5. [Progress Ring (`.pmm-progress-ring`)](#5-progress-ring)
6. [Input (`.pmm-input`)](#6-input)
7. [Select (`.pmm-select` / `.pmm-custom-select`)](#7-select)
8. [Modal (`.pmm-modal`)](#8-modal)
9. [Avatar (`.pmm-avatar`)](#9-avatar)
10. [Tooltip (`.pmm-tooltip`)](#10-tooltip)
11. [Navigation (`.pmm-nav`)](#11-navigation)
12. [Sidebar (`.pmm-sidebar`)](#12-sidebar)
13. [Top Navigation (`.pmm-topnav`)](#13-top-navigation)
14. [Stat Card (`.pmm-stat-card`)](#14-stat-card)
15. [Subject Card (`.pmm-subject-card`)](#15-subject-card)
16. [Quiz Card (`.pmm-quiz-card`)](#16-quiz-card)
17. [Achievement Badge (`.pmm-achievement`)](#17-achievement-badge)
18. [Leaderboard Row (`.pmm-leaderboard-row`)](#18-leaderboard-row)

---

### 1. Button

**Classes:**
- Base: `.pmm-btn`
- Variants: `.pmm-btn--primary`, `.pmm-btn--secondary`, `.pmm-btn--outline`, `.pmm-btn--ghost`, `.pmm-btn--danger`, `.pmm-btn--accent`
- Sizes: `.pmm-btn--sm` (32px), Default (40px), `.pmm-btn--lg` (48px), `.pmm-btn--icon`
- Modifiers: `.pmm-btn--loading`

```html
<!-- Primary Button -->
<button type="button" class="pmm-btn pmm-btn--primary">
  <span>Launch Module</span>
</button>

<!-- Secondary with Icon -->
<button type="button" class="pmm-btn pmm-btn--secondary">
  <svg width="16" height="16" fill="currentColor"><!-- SVG --></svg>
  <span>Export Dataset</span>
</button>

<!-- Accent Glow (High Priority Action) -->
<button type="button" class="pmm-btn pmm-btn--accent">
  <span>Start Timed Assessment</span>
</button>
```

---

### 2. Card

**Classes:**
- Base: `.pmm-card`
- Variants: `.pmm-card--elevated`, `.pmm-card--glass`, `.pmm-card--interactive`, `.pmm-card--accent-top`
- Slots: `.pmm-card__header`, `.pmm-card__title`, `.pmm-card__subtitle`, `.pmm-card__body`, `.pmm-card__footer`

```html
<div class="pmm-card pmm-card--interactive">
  <div class="pmm-card__header">
    <div>
      <h3 class="pmm-card__title">Modified Release Systems</h3>
      <p class="pmm-card__subtitle">Module PMM-302 • Pharmacokinetics</p>
    </div>
    <span class="pmm-badge pmm-badge--accent">Active</span>
  </div>
  <div class="pmm-card__body">
    <p class="pmm-body">Controlled release formulations, dissolution rates, and matrix erosion kinetics.</p>
  </div>
  <div class="pmm-card__footer">
    <span class="pmm-micro">18 Sub-topics</span>
    <button class="pmm-btn pmm-btn--sm pmm-btn--primary">Continue</button>
  </div>
</div>
```

---

### 3. Badge

**Classes:**
- Base: `.pmm-badge`
- Variants: `.pmm-badge--primary`, `.pmm-badge--accent`, `.pmm-badge--success`, `.pmm-badge--warning`, `.pmm-badge--error`
- Shapes: Default, `.pmm-badge--pill`, `.pmm-badge--dot`
- Academic Tiers: `.pmm-badge--bronze`, `.pmm-badge--silver`, `.pmm-badge--gold`, `.pmm-badge--platinum`

```html
<span class="pmm-badge pmm-badge--success pmm-badge--dot">Mastered</span>
<span class="pmm-badge pmm-badge--accent pmm-badge--pill">94.2% Accuracy</span>
<span class="pmm-badge pmm-badge--platinum">Research Fellow</span>
```

---

### 4. Progress Bar

**Classes:**
- Base: `.pmm-progress`
- Variants: `.pmm-progress--accent`, `.pmm-progress--success`, `.pmm-progress--warning`
- Structure: `.pmm-progress__header`, `.pmm-progress__label`, `.pmm-progress__value`, `.pmm-progress__track`, `.pmm-progress__bar`
- Multi-segment: `.pmm-progress-segmented`, `.pmm-progress__segment`

```html
<div class="pmm-progress pmm-progress--accent">
  <div class="pmm-progress__header">
    <span class="pmm-progress__label">Biopharmaceutics Mastery</span>
    <span class="pmm-progress__value">78%</span>
  </div>
  <div class="pmm-progress__track">
    <div class="pmm-progress__bar" style="width: 78%;"></div>
  </div>
</div>
```

---

### 5. Progress Ring

**Attributes:**
- `data-pmm-progress-ring="[0-100]"`
- Classes: `.pmm-progress-ring`, `.pmm-progress-ring--sm`, `.pmm-progress-ring--md`, `.pmm-progress-ring--lg`
- Modifiers: `.pmm-progress-ring--primary`, `.pmm-progress-ring--success`

```html
<div class="pmm-progress-ring pmm-progress-ring--md" data-pmm-progress-ring="84">
  <div class="pmm-progress-ring__content">
    <span class="pmm-progress-ring__value">84%</span>
    <span class="pmm-progress-ring__label">Score</span>
  </div>
</div>
```

---

### 6. Input

**Classes:**
- Group: `.pmm-input-group`
- Label: `.pmm-input-label`
- Wrap: `.pmm-input-wrap`, `.pmm-input-wrap--icon-left`, `.pmm-input-wrap--icon-right`
- Input: `.pmm-input`, `.pmm-input--error`
- Messages: `.pmm-input-helper`, `.pmm-input-error-msg`

```html
<div class="pmm-input-group">
  <label for="drug-search" class="pmm-input-label">Formulation Search</label>
  <div class="pmm-input-wrap pmm-input-wrap--icon-left">
    <span class="pmm-input__icon-left">
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </span>
    <input id="drug-search" type="text" class="pmm-input" placeholder="Search by USP title, API, or CAS..." />
  </div>
  <span class="pmm-input-helper">Search across all 12 core pharmaceutical modules.</span>
</div>
```

---

### 7. Select

**Enhanced Native:**
```html
<select class="pmm-select">
  <option value="all">All Formulations</option>
  <option value="solid">Solid Dosage Forms</option>
  <option value="liquid">Parenteral & Liquid Forms</option>
  <option value="aerosol">Pulmonary Aerosols</option>
</select>
```

**Accessible Custom Select:**
```html
<div class="pmm-custom-select" aria-expanded="false">
  <div class="pmm-custom-select__trigger" tabindex="0" role="combobox" aria-haspopup="listbox">
    <span class="pmm-custom-select__value">Solid Dosage Forms</span>
    <span class="pmm-custom-select__arrow">▼</span>
  </div>
  <div class="pmm-custom-select__menu" role="listbox">
    <div class="pmm-custom-select__option" role="option" aria-selected="true" data-value="solid">Solid Dosage Forms</div>
    <div class="pmm-custom-select__option" role="option" aria-selected="false" data-value="liquid">Parenteral & Liquid Forms</div>
    <div class="pmm-custom-select__option" role="option" aria-selected="false" data-value="nano">Nanomedicine Delivery</div>
  </div>
</div>
```

---

### 8. Modal

**Classes:**
- Backdrop: `.pmm-modal-backdrop`
- Dialog: `.pmm-modal__dialog`
- Sections: `.pmm-modal__header`, `.pmm-modal__title`, `.pmm-modal__close`, `.pmm-modal__body`, `.pmm-modal__footer`
- Trigger attribute: `data-pmm-modal-target="[modalId]"`
- Close attribute: `data-pmm-modal-close`

```html
<div id="modal-assessment-launch" class="pmm-modal-backdrop" aria-hidden="true" role="dialog" aria-modal="true">
  <div class="pmm-modal__dialog">
    <div class="pmm-modal__header">
      <h3 class="pmm-modal__title">Begin Timed Assessment</h3>
      <button type="button" class="pmm-modal__close" data-pmm-modal-close aria-label="Close dialog">✕</button>
    </div>
    <div class="pmm-modal__body">
      <p class="pmm-body">You are about to launch the <strong>Pharmacokinetics Clearance Simulation</strong> assessment. 30 questions, 45 minutes.</p>
    </div>
    <div class="pmm-modal__footer">
      <button type="button" class="pmm-btn pmm-btn--outline" data-pmm-modal-close>Cancel</button>
      <button type="button" class="pmm-btn pmm-btn--primary">Start Assessment</button>
    </div>
  </div>
</div>
```

---

### 9. Avatar

**Classes:**
- Base: `.pmm-avatar`
- Sizes: `.pmm-avatar--xs` (24px), `.pmm-avatar--sm` (32px), `.pmm-avatar--md` (40px), `.pmm-avatar--lg` (48px), `.pmm-avatar--xl` (64px)
- Ring: `.pmm-avatar--scientific-ring`
- Status: `.pmm-avatar__status`, `.pmm-avatar__status--away`, `.pmm-avatar__status--offline`

```html
<div class="pmm-avatar pmm-avatar--md pmm-avatar--scientific-ring">
  <span class="pmm-avatar__fallback">DR</span>
  <span class="pmm-avatar__status"></span>
</div>
```

---

### 10. Tooltip

**Attribute:**
- `data-pmm-tooltip="[text]"`
- `data-pmm-tooltip-pos="top|bottom|left|right"`

```html
<button class="pmm-btn pmm-btn--icon pmm-btn--ghost" data-pmm-tooltip="View Molecular Formula" data-pmm-tooltip-pos="top">
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
</button>
```

---

### 11. Navigation

```html
<nav class="pmm-nav" aria-label="Matrix Navigation">
  <a href="#curriculum" class="pmm-nav__link pmm-nav__link--active">
    <svg class="pmm-nav__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    <span class="pmm-nav__label">Core Matrix</span>
    <span class="pmm-badge pmm-badge--accent pmm-nav__badge">12</span>
  </a>
  <a href="#assessments" class="pmm-nav__link">
    <svg class="pmm-nav__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    <span class="pmm-nav__label">Assessments</span>
  </a>
</nav>
```

---

### 12. Sidebar

```html
<aside class="pmm-shell__sidebar pmm-sidebar">
  <div class="pmm-sidebar__header">
    <div class="pmm-sidebar__logo-mark">PMM</div>
    <div class="pmm-sidebar__brand-text">
      <span class="pmm-sidebar__brand-name">Pharmaceutics</span>
      <span class="pmm-sidebar__brand-tag">Mastery Matrix</span>
    </div>
  </div>

  <div class="pmm-sidebar__section">
    <div class="pmm-sidebar__section-title">Academic Curriculum</div>
    <nav class="pmm-nav">
      <a href="#curriculum" class="pmm-nav__link pmm-nav__link--active">
        <span class="pmm-nav__label">Matrix Overview</span>
      </a>
      <a href="#pharmacokinetics" class="pmm-nav__link">
        <span class="pmm-nav__label">Pharmacokinetics</span>
      </a>
    </nav>
  </div>

  <div class="pmm-sidebar__footer">
    <div class="pmm-sidebar__user-card">
      <div class="pmm-avatar pmm-avatar--sm">
        <span class="pmm-avatar__fallback">AK</span>
      </div>
      <div class="pmm-sidebar__user-info">
        <span class="pmm-sidebar__user-name">Dr. Alan Vance</span>
        <span class="pmm-sidebar__user-role">Research Scholar</span>
      </div>
    </div>
  </div>
</aside>
```

---

### 13. Top Navigation

```html
<header class="pmm-topnav">
  <div class="pmm-topnav__left">
    <button class="pmm-btn pmm-btn--icon pmm-btn--ghost pmm-only-mobile" data-pmm-sidebar-toggle aria-label="Toggle menu">
      <svg width="20" height="20" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
    <div class="pmm-topnav__search pmm-hide-mobile">
      <div class="pmm-input-wrap pmm-input-wrap--icon-left">
        <input type="search" class="pmm-input" placeholder="Search matrix concepts..." />
        <span class="pmm-topnav__shortcut-badge">⌘K</span>
      </div>
    </div>
  </div>

  <div class="pmm-topnav__right">
    <div class="pmm-topnav__status-pill">
      <span>🔥 14-Day Streak</span>
    </div>
    <button class="pmm-btn pmm-btn--icon pmm-btn--ghost" data-pmm-theme-toggle aria-label="Toggle dark/light theme">
      <svg width="18" height="18" stroke="currentColor" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
    </button>
    <div class="pmm-avatar pmm-avatar--sm">
      <span class="pmm-avatar__fallback">AV</span>
    </div>
  </div>
</header>
```

---

### 14. Stat Card

```html
<div class="pmm-card pmm-stat-card">
  <div class="pmm-stat-card__header">
    <span class="pmm-stat-card__label">Mastery Index</span>
    <div class="pmm-stat-card__icon pmm-stat-card__icon--accent">
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    </div>
  </div>
  <div class="pmm-stat-card__value">94.8%</div>
  <div class="pmm-stat-card__footer">
    <span class="pmm-stat-card__trend pmm-stat-card__trend--up">↑ +3.2%</span>
    <span class="pmm-stat-card__context">vs target baseline</span>
  </div>
</div>
```

---

### 15. Subject Card

```html
<div class="pmm-card pmm-card--interactive pmm-subject-card">
  <div class="pmm-subject-card__meta-row">
    <span class="pmm-subject-card__code">PMM-401</span>
    <span class="pmm-badge pmm-badge--success pmm-badge--dot">Synthesis Ready</span>
  </div>
  <div>
    <h3 class="pmm-subject-card__title">Biopharmaceutics & Pharmacokinetics</h3>
    <div class="pmm-subject-card__stats">
      <span>18 Topics</span>
      <span>•</span>
      <span>4 Lab Protocols</span>
    </div>
  </div>
  <div class="pmm-progress pmm-progress--accent">
    <div class="pmm-progress__header">
      <span class="pmm-progress__label">Retention Level</span>
      <span class="pmm-progress__value">86%</span>
    </div>
    <div class="pmm-progress__track">
      <div class="pmm-progress__bar" style="width: 86%;"></div>
    </div>
  </div>
  <div class="pmm-subject-card__footer">
    <span class="pmm-micro">Tier IV Milestone</span>
    <button class="pmm-btn pmm-btn--sm pmm-btn--primary">Access Module</button>
  </div>
</div>
```

---

### 16. Quiz Card

```html
<div class="pmm-card pmm-quiz-card">
  <div class="pmm-quiz-card__header">
    <span class="pmm-badge pmm-badge--warning">Advanced Clinical</span>
    <span class="pmm-micro">30 Mins</span>
  </div>
  <h3 class="pmm-quiz-card__title">Dissolution & Permeability Kinetics Assessment</h3>
  <div class="pmm-quiz-card__details">
    <span>25 Questions</span>
    <span>•</span>
    <span>Pass Rate >= 80%</span>
  </div>
  <div class="pmm-quiz-card__score-bar">
    <span class="pmm-quiz-card__score-label">Personal Best:</span>
    <span class="pmm-quiz-card__score-value">92% (Cleared)</span>
  </div>
  <button class="pmm-btn pmm-btn--accent">Launch Assessment</button>
</div>
```

---

### 17. Achievement Badge

```html
<div class="pmm-achievement pmm-achievement--unlocked">
  <div class="pmm-achievement__emblem">⚗️</div>
  <div class="pmm-achievement__info">
    <div class="pmm-achievement__title">Molecular Precision Fellow</div>
    <div class="pmm-achievement__criteria">Maintain >=90% retention score across all Biopharmaceutics exams.</div>
  </div>
  <span class="pmm-badge pmm-badge--platinum">Platinum</span>
</div>
```

---

### 18. Leaderboard Row

```html
<!-- Top Rank 1 (Gold) -->
<div class="pmm-leaderboard-row">
  <div class="pmm-leaderboard-row__rank pmm-leaderboard-row__rank--gold">1</div>
  <div class="pmm-leaderboard-row__user">
    <div class="pmm-avatar pmm-avatar--sm">
      <span class="pmm-avatar__fallback">SC</span>
    </div>
    <div>
      <div class="pmm-leaderboard-row__name">Sarah Chen, PharmD</div>
      <div class="pmm-leaderboard-row__title">Clinical Pharmacokinetics Lead</div>
    </div>
  </div>
  <div class="pmm-leaderboard-row__streak">🔥 28d</div>
  <div class="pmm-leaderboard-row__metric">99.4%</div>
</div>

<!-- Highlighted Active User Row -->
<div class="pmm-leaderboard-row pmm-leaderboard-row--current-user">
  <div class="pmm-leaderboard-row__rank">12</div>
  <div class="pmm-leaderboard-row__user">
    <div class="pmm-avatar pmm-avatar--sm">
      <span class="pmm-avatar__fallback">YOU</span>
    </div>
    <div>
      <div class="pmm-leaderboard-row__name">Alan Vance (You)</div>
      <div class="pmm-leaderboard-row__title">Mastery Level IV</div>
    </div>
  </div>
  <div class="pmm-leaderboard-row__streak">🔥 14d</div>
  <div class="pmm-leaderboard-row__metric">94.8%</div>
</div>
```
