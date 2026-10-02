# Phase 1 Architecture & Modular Design

## 1. Overview & Scope

Phase 1 establishes the foundational application shell for the **Pharmaceutics Mastery Matrix (PMM)**:

- Reusable PMM Design System (Tokens, Reset, Typography, Components)
- Landing Page (`index.html`)
- Account Registration (`register.html`)
- Scholar Login (`login.html`)
- Modular Authentication Service (Adapter Pattern)
- Protected Route Guard (`guard.js`)
- Scholar Dashboard (`dashboard.html`)

---

## 2. Modular Architecture & Supabase Preparedness

To satisfy the strict requirement:
> *"Keep the code modular so that the later Supabase/database implementation can replace the mock storage without requiring a complete rewrite."*

The architecture isolates authentication and data access behind contract interfaces:

```text
┌────────────────────────────────────────────────────────┐
│                   UI Layer                             │
│ (index.html, login.html, register.html, dashboard.html)│
└──────────────────────────┬─────────────────────────────┘
                           │ Calls abstract API methods
                           ▼
┌────────────────────────────────────────────────────────┐
│                   Service Layer                        │
│          (AuthService, DataService)                    │
└──────────────────────────┬─────────────────────────────┘
                           │ Delegates to active adapter
                           ▼
┌────────────────────────────────────────────────────────┐
│                   Adapter Layer                        │
│  [Phase 1: MockAuthAdapter]  --->  [Future: Supabase]  │
│  - localStorage persistence        - Supabase JS SDK   │
│  - simulated latency (250ms)       - Real Postgres DB  │
│  - seeded demo users               - Real JWT tokens   │
└────────────────────────────────────────────────────────┘
```

### AuthService Contract (Supabase-compatible)

```typescript
interface AuthService {
  signUp(params: { email, password, fullName, institution? }): Promise<{ data: { user, session } | null, error: { message } | null }>;
  signIn(params: { email, password }): Promise<{ data: { user, session } | null, error: { message } | null }>;
  signOut(): Promise<{ error: null }>;
  getUser(): Promise<{ data: { user } | null, error: null }>;
  getSession(): Promise<{ data: { session } | null, error: null }>;
  onAuthStateChange(callback: (event: string, session: any) => void): { data: { subscription: { unsubscribe: Function } } };
}
```

---

## 3. Seeded Test Account for Quick Evaluation

For instantaneous testing without manual sign-up:

- **Email:** `scholar@pmm.edu`
- **Password:** `Mastery2026!`
- **Role:** Pharmacy Research Fellow
- **Name:** Dr. Sarah Chen, PharmD
- **Institution:** Department of Pharmaceutical Sciences
