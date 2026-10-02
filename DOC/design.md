# Pharmaceutics Mastery Matrix (PMM) — Design System & Visual Specification

## 1. Brand Identity & Personality

PMM is a pharmacy education and quiz mastery platform built for rigorous academic learning.

### Brand Core Attributes

- **Premium:** Subtle specular card highlights, refined shadows, clean glassmorphic elevation.
- **Scientific:** Data-dense clarity, molecular notation, standardized compendial metrics.
- **Academic:** Uncluttered reading experience, authoritative typography, high contrast.
- **Modern:** Geometric grotesque curves (`Plus Jakarta Sans`), balanced grid spacing.
- **Intelligent:** Meaningful feedback, predictable focus rings, logical grouping.
- **Clean & Focused:** Minimal visual noise, hairline borders, no decorative clutter.
- **Slightly Futuristic:** Bioluminescent cyan highlights, dark clinical obsidian surfaces.

### Forbidden Aesthetics

- Childish or cartoonish illustrations.
- Overly gamified arcade animations or candy pastels.
- Cluttered, unstructured interfaces.
- Generic uncustomized Bootstrap styling.

---

## 2. Color Palette & Mathematical Tokens

All color combinations satisfy **WCAG 2.1 Level AA (≥4.5:1 for normal text, ≥3:1 for large text)** and most satisfy **Level AAA (≥7:1)**.

### 2.1 Primary, Secondary & Accent Tokens

| Role | Name | Dark Mode Value | Light Mode Value | Application |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | Clinical Sapphire | `#257bf3` (`primary-500`) | `#145ed7` (`primary-600`) | Primary actions, key indicators, branding |
| **Secondary** | Precision Titanium | `#64748b` (`secondary-500`) | `#475569` (`secondary-600`) | Supporting text, neutral icons, borders |
| **Accent** | Bioluminescent Cyan | `#22d3ee` (`accent-400`) | `#0891b2` (`accent-600`) | Active tags, focus halos, telemetry highlights |

### 2.2 Semantic Status Spectrum

| Status | Name | Hex Token | Soft Background | Semantic Role |
| :--- | :--- | :--- | :--- | :--- |
| **Success** | Clinical Emerald | `#10b981` | `rgba(16, 185, 129, 0.12)` | Passing grade (≥80%), verified reaction, mastery unlocked |
| **Warning** | Diagnostic Amber | `#f59e0b` | `rgba(245, 158, 11, 0.12)` | Near deadline, review needed, marginal accuracy |
| **Error** | Deficiency Carmine | `#f43f5e` | `rgba(244, 63, 94, 0.12)` | Failed test, validation error, critical deficit |
| **Info** | Diagnostic Sky | `#0284c7` | `rgba(2, 132, 199, 0.12)` | Compendial reference, scientific note, hint |

### 2.3 Surface & Canvas Tokens

```css
/* Clinical Dark Mode (Default) */
--pmm-bg-app:              #070a12;  /* Deep obsidian void */
--pmm-bg-canvas:           #0a0f1b;  /* Base background */
--pmm-bg-surface:          #131c2e;  /* Standard card surface */
--pmm-bg-surface-elevated: #18233a;  /* Floating menus, dropdowns */
--pmm-bg-glass:            rgba(19, 28, 46, 0.82); /* Frosted header */
--pmm-border-subtle:       rgba(148, 163, 184, 0.10);
--pmm-border-default:      rgba(148, 163, 184, 0.18);
--pmm-border-strong:       rgba(148, 163, 184, 0.32);
--pmm-card-sheen:          linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, transparent 100%);
```

---

## 3. Typography Architecture

PMM uses two distinct fonts:

1. **Primary Interface:** `Plus Jakarta Sans` — Geometric humanist grotesque with clean curves and high legibility.
2. **Scientific Data & Code:** `JetBrains Mono` — Tabular figures for drug dosages, half-lives, formulas, and percentages.

| Scale Element | Class | Size | Line Height | Tracking | Weight |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Heading** | `.pmm-display` | `2.5rem` (40px) | `1.15` | `-0.03em` | 800 (ExtraBold) |
| **H1** | `.pmm-h1` | `2.0rem` (32px) | `1.25` | `-0.025em` | 700 (Bold) |
| **H2** | `.pmm-h2` | `1.5rem` (24px) | `1.30` | `-0.02em` | 600 (SemiBold) |
| **H3** | `.pmm-h3` | `1.25rem` (20px) | `1.35` | `-0.015em` | 600 (SemiBold) |
| **Body Lead** | `.pmm-body-lead` | `1.125rem` (18px) | `1.50` | `0` | 400 (Regular) |
| **Body** | `.pmm-body` | `1.0rem` (16px) | `1.55` | `0` | 400 (Regular) |
| **Small Text** | `.pmm-body-sm` | `0.875rem` (14px) | `1.45` | `0` | 400 (Regular) |
| **Micro** | `.pmm-micro` | `0.75rem` (12px) | `1.40` | `0` | 500 (Medium) |
| **Labels** | `.pmm-label` | `0.6875rem` (11px) | `1.30` | `+0.08em` | 600 (SemiBold) |
| **Buttons** | `.pmm-btn-text` | `0.875rem` (14px) | `1.0` | `+0.015em` | 600 (SemiBold) |
| **Monospace** | `.pmm-mono` | Inherit | — | — | 500 (Medium) |

---

## 4. Component Inventory (18 Core Components)

1. **Button (`.pmm-btn`):** Primary, Secondary, Outline, Ghost, Danger, Accent, Icon; sizes `sm`, default, `lg`.
2. **Card (`.pmm-card`):** Base, elevated, glassmorphic, interactive (hover lift `-2px`), and accent-top cards.
3. **Badge (`.pmm-badge`):** Status pills, dot indicators, and Academic Tier badges (Bronze, Silver, Gold, Platinum).
4. **Progress Bar (`.pmm-progress`):** Smooth progress track with glowing tip and multi-segment support.
5. **Progress Ring (`.pmm-progress-ring`):** SVG circular meter with dynamic percent updates and centered metrics.
6. **Input (`.pmm-input`):** Clean text/search fields with prefix/suffix icon slots and focus glow.
7. **Select (`.pmm-select` & `.pmm-custom-select`):** Enhanced native and accessible keyboard-driven custom dropdowns.
8. **Modal (`.pmm-modal`):** Blur backdrop dialog with focus trap, Escape key dismiss, and smooth entrance.
9. **Avatar (`.pmm-avatar`):** XS to XL scales, image/initials fallbacks, status dots, and scientific accent rings.
10. **Tooltip (`.pmm-tooltip`):** Directional floating tooltips with micro-arrows.
11. **Navigation (`.pmm-nav`):** Clean links with active indicator bar and pill badges.
12. **Sidebar (`.pmm-sidebar`):** Monogram brand mark, category headers, collapsible state, and user card.
13. **Top Navigation (`.pmm-topnav`):** Sticky header with search bar, streak pill, theme toggle, and profile avatar.
14. **Stat Card (`.pmm-stat-card`):** Large tabular metrics, trend indicators (`+4.2%`), and soft icon containers.
15. **Subject Card (`.pmm-subject-card`):** Academic code badges (`PMM-401`), topic counters, and retention meters.
16. **Quiz Card (`.pmm-quiz-card`):** Assessment difficulty badges, timing indicators, and high score records.
17. **Achievement Badge (`.pmm-achievement`):** Milestone emblems, unlocked ambient glow, and academic tiers.
18. **Leaderboard Row (`.pmm-leaderboard-row`):** Gold/Silver/Bronze medals, user metadata, and active-user highlights.

---

## 5. Interaction Principles & Accessibility

- **Durations:** 75ms (tactile active press) to 220ms (standard transitions) and 320ms (layout shifts).
- **Tactile Feedback:** Subtle `scale(0.98)` on button `:active`.
- **Focus Rings:** `outline: 2px solid #38bdf8` with `2px` offset on `:focus-visible`.
- **Reduced Motion:** Graceful fallback via `@media (prefers-reduced-motion: reduce)`.
- **Breakpoints:** Mobile (`< 768px`), Tablet (`768px - 1024px`), Laptop (`1024px - 1280px`), Desktop (`≥ 1280px`).
