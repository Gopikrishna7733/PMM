# Pharmaceutics Mastery Matrix (PMM) — Design System Specification

## 1. Brand Identity & Personality

The **Pharmaceutics Mastery Matrix (PMM)** is an academic and scientific platform built for rigorous mastery of pharmaceutical sciences, pharmacokinetics, molecular drug delivery, and regulatory formulation.

### Brand Core Attributes
- **Premium**: Calibrated depths, specular card sheens, refined micro-elevations.
- **Scientific**: Data-dense clarity, standardized molecular units, precision decimal metrics.
- **Academic**: Rigorous typographical hierarchy, distraction-free layouts, high-contrast readability.
- **Modern**: Geometric grotesque typography (`Plus Jakarta Sans`), sleek responsive flex/grid systems.
- **Intelligent**: Contextual feedback, predictable interactions, logical information grouping.
- **Clean & Focused**: Generous breathing room (8pt spatial grid), hairline precision dividers.
- **Slightly Futuristic**: Bioluminescent cyan accents, dark obsidian/sapphire clinical surfaces, ambient status halos.

### What PMM Is NOT:
- **Not Childish**: No cartoonish badges, bouncy 3D stickers, or playful pastel candy tones.
- **Not Overly Gamified**: Achievements and leaderboards reflect clinical honors, peer fellowship, and mastery tiers rather than arcade tokens.
- **Not Cluttered**: Zero visual noise, minimal decorative clutter, deliberate whitespace.
- **Not Generic Bootstrap**: Bespoke tokens, calibrated specular gradients, custom accessible controls.

---

## 2. Color System & Mathematical Palettes

PMM uses a restrained, high-contrast, clinical palette. All color pairs strictly comply with **WCAG 2.1 Level AA (minimum 4.5:1 for normal text, 3:1 for large text)** and most satisfy **Level AAA (7:1)**.

### 2.1 Core Brand Colors

| Role | Color Name | Hex Token | Light Mode Alternative | Semantic Function |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | Clinical Sapphire | `#257bf3` (`primary-500`) | `#145ed7` (`primary-600`) | Primary actions, brand identification, key navigational states |
| **Secondary** | Precision Titanium | `#64748b` (`secondary-500`) | `#475569` (`secondary-600`) | Secondary structure, neutral icons, supplementary controls |
| **Accent** | Bioluminescent Cyan | `#22d3ee` (`accent-400`) | `#0891b2` (`accent-600`) | Focus indicators, active compound tags, mastery highlights |

### 2.2 Clinical Status Spectrum

| Status | Name | Hex Token | Soft Background | Border Token | Application |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Success** | Clinical Emerald | `#10b981` | `rgba(16, 185, 129, 0.12)` | `rgba(16, 185, 129, 0.28)` | Synthesis verified, passing score (>=80%), mastery cleared |
| **Warning** | Diagnostic Amber | `#f59e0b` | `rgba(245, 158, 11, 0.12)` | `rgba(245, 158, 11, 0.30)` | Threshold alert, near deadline, review recommended |
| **Error** | Deficiency Carmine | `#f43f5e` | `rgba(244, 63, 94, 0.12)` | `rgba(244, 63, 94, 0.28)` | Failed reaction, validation error, critical deficit |
| **Info** | Diagnostic Sky | `#0284c7` | `rgba(2, 132, 199, 0.12)` | `rgba(2, 132, 199, 0.28)` | Molecular metadata, formulation note, study tip |

### 2.3 Surface, Background & Border Tokens

```css
/* Dark Theme (Default) */
--pmm-bg-app:              #070a12;  /* Deep clinical obsidian */
--pmm-bg-canvas:           #0a0f1b;  /* Base layout canvas */
--pmm-bg-subtle:           #0f172a;  /* Subtle section alternation */
--pmm-bg-surface:          #131c2e;  /* Standard card/module surface */
--pmm-bg-surface-elevated: #18233a;  /* Elevated menus, popovers, dropdowns */
--pmm-bg-glass:            rgba(19, 28, 46, 0.82); /* Frosted top navigation */

--pmm-border-subtle:       rgba(148, 163, 184, 0.10);
--pmm-border-default:      rgba(148, 163, 184, 0.18);
--pmm-border-strong:       rgba(148, 163, 184, 0.32);
--pmm-border-focus:        #38bdf8;

/* Light Theme (Alternative) */
--pmm-bg-app:              #f8fafc;  /* Clean laboratory white */
--pmm-bg-canvas:           #f1f5f9;  /* Muted cool background */
--pmm-bg-surface:          #ffffff;  /* Card surface */
--pmm-bg-surface-elevated: #ffffff;
--pmm-bg-glass:            rgba(255, 255, 255, 0.90);
```

### 2.4 Text Color Scale

```css
/* Dark Mode */
--pmm-text-primary:   #f8fafc;  /* 98% contrast white */
--pmm-text-secondary: #94a3b8;  /* Clean legible slate */
--pmm-text-muted:     #64748b;  /* Metadata & captions */
--pmm-text-accent:    #38bdf8;  /* Accent callout */
--pmm-text-inverse:   #070a12;  /* Inverted text */
```

---

## 3. Typography Architecture

PMM pairs two typefaces:
1. **Primary Interface Font**: `Plus Jakarta Sans` — A modern, geometric humanist grotesk with clean terminal curves, exceptional legibility at small sizes, and authoritative weight distribution.
2. **Scientific / Data Monospace Font**: `JetBrains Mono` — Engineered for code, molecular formulas, dosage calculations, matrix coordinates, and numerical metrics with tabular figures (`tnum`).

### Scale & Hierarchy Table

| Element | Class | Font Size | Line Height | Letter Spacing | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `.pmm-display` | `2.5rem` (40px) | `1.15` | `-0.03em` | 800 (ExtraBold) | Hero impact, matrix level titles |
| **H1** | `.pmm-h1` | `2.0rem` (32px) | `1.25` | `-0.025em` | 700 (Bold) | Major curriculum views, page headers |
| **H2** | `.pmm-h2` | `1.5rem` (24px) | `1.30` | `-0.02em` | 600 (SemiBold) | Module headers, modal dialog titles |
| **H3** | `.pmm-h3` | `1.25rem` (20px) | `1.35` | `-0.015em` | 600 (SemiBold) | Card titles, section headers |
| **Body Lead** | `.pmm-body-lead`| `1.125rem` (18px) | `1.50` | `0` | 400 (Regular) | Explanatory introductions, abstract leads |
| **Body** | `.pmm-body` | `1.0rem` (16px) | `1.55` | `0` | 400 (Regular) | Standard instructional content, quiz questions |
| **Small Text**| `.pmm-body-sm` | `0.875rem` (14px) | `1.45` | `0` | 400 (Regular) | Secondary descriptions, table rows |
| **Micro** | `.pmm-micro` | `0.75rem` (12px) | `1.40` | `0` | 500 (Medium) | Timestamps, question indices, progress labels |
| **Labels** | `.pmm-label` | `0.6875rem` (11px)| `1.30` | `+0.08em` | 600 (SemiBold) | All-caps field labels, status overlines |
| **Buttons** | `.pmm-btn-text` | `0.875rem` (14px) | `1.0` | `+0.015em`| 600 (SemiBold) | Interactive controls and actions |
| **Monospace**| `.pmm-mono` | Inherit / Variable | — | — | 500 (Medium) | Molecular formulas, accuracy rates, timings |

---

## 4. Spacing, Radii & Depth Scale

### 4.1 Spacing Scale (8pt Grid)
- `--pmm-space-1`: `4px` (Micro gap)
- `--pmm-space-2`: `8px` (Icon/label gap)
- `--pmm-space-3`: `12px` (Internal compact padding)
- `--pmm-space-4`: `16px` (Standard component padding)
- `--pmm-space-5`: `20px` (Card internal padding)
- `--pmm-space-6`: `24px` (Section and container padding)
- `--pmm-space-8`: `32px` (Grid gaps)
- `--pmm-space-12`: `48px` (Major layout divisions)

### 4.2 Radii System
- `--pmm-radius-xs`: `4px` (Micro-tags, shortcut keys)
- `--pmm-radius-sm`: `6px` (Badges, small buttons)
- `--pmm-radius-md`: `10px` (Standard buttons, inputs, dropdown menus)
- `--pmm-radius-lg`: `14px` (Cards, panels, modal dialogs)
- `--pmm-radius-xl`: `20px` (Feature cards, floating sheets)
- `--pmm-radius-full`: `9999px` (Pills, progress tracks, circular avatars)

### 4.3 Elevations & Specular Highlights
- **Hairline Specular Sheen**: Every elevated PMM card features a top `1px` gradient sheen (`linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)`) that mimics the precision glass finish of scientific laboratory instrumentation.
- **Ambient Glow**: Interactive and active states use cyan (`rgba(34, 211, 238, 0.22)`) or sapphire (`rgba(37, 123, 243, 0.35)`) luminescent shadows without comic exaggeration.

---

## 5. Interaction & Motion Principles

1. **Duration**: 75ms (instant feedback) to 220ms (standard transitions) and 320ms (layout shifts).
2. **Easing Curve**: `cubic-bezier(0.16, 1, 0.3, 1)` (Precision spring-damped ease-out).
3. **Button Tactile Feedback**: Subtle `scale(0.98)` on `:active` with smooth background shift.
4. **Card Hover**: `translateY(-2px)` with refined shadow expansion on `.pmm-card--interactive`.
5. **Accessibility Reduced Motion**: Automatic fallback via `@media (prefers-reduced-motion: reduce)` resets all transitions and animations to `0.01ms`.

---

## 6. Accessibility & Responsive Breakpoints

### 6.1 WCAG 2.1 Compliance
- **Focus Rings**: Universal `outline: 2px solid #38bdf8` with `2px` offset on `:focus-visible`.
- **Keyboard Trapping**: Modals trap Tab/Shift+Tab and listen for Escape.
- **Touch Targets**: Minimum `40px` touch targets on buttons, inputs, and interactive nav links.
- **Color Independence**: Status badges incorporate text labels and shape indicators (e.g. dots or icons) in addition to color.

### 6.2 Responsive Breakpoints
- **Mobile** (`< 768px`): 1-column layout, drawer sidebar with backdrop blur, sticky top navigation, full-width inputs and modals.
- **Tablet** (`768px - 1024px`): 2-column card grids, compact 240px sidebar, optimized stat cards.
- **Laptop** (`1024px - 1280px`): 3-column grids, fixed 270px sidebar, expanded top search bar.
- **Desktop** (`>= 1280px`): Full 4-column matrix grid, persistent metrics panel, max-width 1440px page container.
