/**
 * Pharmaceutics Mastery Matrix (PMM) - Mock Authentication Adapter
 * Simulates a cloud backend/Supabase Auth service using localStorage.
 * 
 * Future Migration:
 * When connecting Supabase in Phase 2, this adapter will be replaced with
 * the official @supabase/supabase-js client using the exact same interface.
 */

(function (global) {
  'use strict';

  const STORAGE_USERS_KEY = 'pmm_mock_users_db';
  const STORAGE_SESSION_KEY = 'pmm_mock_session_state';
  const NETWORK_LATENCY_MS = 250;

  // Initial Seed Accounts
  const DEFAULT_SEED_USERS = [
    {
      id: 'usr_pmm_scholar_001',
      email: 'scholar@pmm.edu',
      password: 'Mastery2026!',
      fullName: 'Dr. Sarah Chen, PharmD',
      title: 'Clinical Pharmacokinetics Fellow',
      institution: 'Department of Pharmaceutical Sciences',
      role: 'fellow',
      streak: 18,
      accuracy: 94.6,
      quizzesCompleted: 142,
      createdAt: new Date('2026-01-15T00:00:00Z').toISOString()
    }
  ];

  class MockAuthAdapter {
    constructor() {
      this._subscribers = new Set();
      this._initStorage();
    }

    _initStorage() {
      if (!localStorage.getItem(STORAGE_USERS_KEY)) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_SEED_USERS));
      }
    }

    _delay(ms = NETWORK_LATENCY_MS) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    _getUsers() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_USERS_KEY)) || DEFAULT_SEED_USERS;
      } catch (e) {
        return DEFAULT_SEED_USERS;
      }
    }

    _saveUsers(users) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    }

    _notify(event, session) {
      this._subscribers.forEach((callback) => {
        try {
          callback(event, session);
        } catch (err) {
          console.error('[PMM Auth Listener Error]', err);
        }
      });
    }

    /**
     * Sign up a new user (Supabase-compatible signature)
     */
    async signUp({ email, password, fullName, institution = 'Independent Pharmacy Scholar', role = 'student' }) {
      await this._delay();

      const normalizedEmail = (email || '').trim().toLowerCase();
      if (!normalizedEmail || !password) {
        return { data: null, error: { message: 'Email and password are required.' } };
      }

      if (password.length < 8) {
        return { data: null, error: { message: 'Password must be at least 8 characters long.' } };
      }

      const users = this._getUsers();
      const existingUser = users.find((u) => u.email === normalizedEmail);

      if (existingUser) {
        return { data: null, error: { message: 'An account with this email address already exists.' } };
      }

      const newUser = {
        id: 'usr_pmm_' + Math.random().toString(36).substr(2, 9),
        email: normalizedEmail,
        password: password, // Note: In Supabase, this is hashed remotely
        fullName: fullName || normalizedEmail.split('@')[0],
        title: 'Mastery Scholar',
        institution: institution,
        role: role,
        streak: 1,
        accuracy: 100.0,
        quizzesCompleted: 0,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      this._saveUsers(users);

      const session = {
        access_token: 'mock_jwt_' + Math.random().toString(36).substr(2, 16),
        user: {
          id: newUser.id,
          email: newUser.email,
          user_metadata: {
            fullName: newUser.fullName,
            title: newUser.title,
            institution: newUser.institution,
            role: newUser.role
          }
        },
        expires_at: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
      };

      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
      this._notify('SIGNED_IN', session);

      return { data: { user: session.user, session }, error: null };
    }

    /**
     * Sign in with email and password (Supabase-compatible signature)
     */
    async signInWithPassword({ email, password }) {
      await this._delay();

      const normalizedEmail = (email || '').trim().toLowerCase();
      const users = this._getUsers();
      const user = users.find((u) => u.email === normalizedEmail);

      if (!user || user.password !== password) {
        return { data: null, error: { message: 'Invalid scientific credentials. Please verify your email and password.' } };
      }

      const session = {
        access_token: 'mock_jwt_' + Math.random().toString(36).substr(2, 16),
        user: {
          id: user.id,
          email: user.email,
          user_metadata: {
            fullName: user.fullName,
            title: user.title,
            institution: user.institution,
            role: user.role,
            streak: user.streak,
            accuracy: user.accuracy,
            quizzesCompleted: user.quizzesCompleted
          }
        },
        expires_at: Date.now() + 1000 * 60 * 60 * 24 * 7
      };

      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
      this._notify('SIGNED_IN', session);

      return { data: { user: session.user, session }, error: null };
    }

    /**
     * Sign out current session
     */
    async signOut() {
      await this._delay(100);
      localStorage.removeItem(STORAGE_SESSION_KEY);
      this._notify('SIGNED_OUT', null);
      return { error: null };
    }

    /**
     * Retrieve active session synchronously or asynchronously
     */
    async getSession() {
      try {
        const raw = localStorage.getItem(STORAGE_SESSION_KEY);
        if (!raw) return { data: { session: null }, error: null };

        const session = JSON.parse(raw);
        if (session.expires_at && session.expires_at < Date.now()) {
          localStorage.removeItem(STORAGE_SESSION_KEY);
          return { data: { session: null }, error: null };
        }

        return { data: { session }, error: null };
      } catch (e) {
        return { data: { session: null }, error: null };
      }
    }

    /**
     * Retrieve active user
     */
    async getUser() {
      const { data } = await this.getSession();
      return { data: { user: data.session ? data.session.user : null }, error: null };
    }

    /**
     * Subscribe to authentication state changes
     */
    onAuthStateChange(callback) {
      this._subscribers.add(callback);
      // Immediately fire current state
      this.getSession().then(({ data }) => {
        callback(data.session ? 'INITIAL_SESSION' : 'NO_SESSION', data.session);
      });

      return {
        data: {
          subscription: {
            unsubscribe: () => {
              this._subscribers.delete(callback);
            }
          }
        }
      };
    }
  }

  // Export
  global.PMM_MockAuthAdapter = new MockAuthAdapter();
})(typeof window !== 'undefined' ? window : this);
