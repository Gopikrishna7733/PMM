/**
 * Pharmaceutics Mastery Matrix (PMM) - Unified Authentication Service
 * Gateway for all authentication operations across the platform.
 * 
 * Modular Adapter Architecture:
 * - Phase 1: Delegates to PMM_MockAuthAdapter (localStorage + simulated latency).
 * - Phase 2: Will seamlessly delegate to Supabase Client (supabase.auth) with
 *   zero breaking changes to the consumer code.
 */

(function (global) {
  'use strict';

  class AuthService {
    constructor() {
      // Configurable adapter: Defaults to MockAuthAdapter
      this._adapter = global.PMM_MockAuthAdapter;
    }

    /**
     * Set a custom adapter (e.g. SupabaseAuthAdapter in Phase 2)
     */
    setAdapter(adapter) {
      this._adapter = adapter;
    }

    get adapter() {
      if (!this._adapter && global.PMM_MockAuthAdapter) {
        this._adapter = global.PMM_MockAuthAdapter;
      }
      return this._adapter;
    }

    /**
     * Create a new scholar account
     */
    async signUp({ email, password, fullName, institution, role }) {
      return this.adapter.signUp({ email, password, fullName, institution, role });
    }

    /**
     * Sign in with existing credentials
     */
    async signIn({ email, password }) {
      return this.adapter.signInWithPassword({ email, password });
    }

    /**
     * Sign out active session
     */
    async signOut() {
      return this.adapter.signOut();
    }

    /**
     * Get active session
     */
    async getSession() {
      return this.adapter.getSession();
    }

    /**
     * Get current authenticated user
     */
    async getUser() {
      return this.adapter.getUser();
    }

    /**
     * Listen to authentication state changes (SIGN_IN, SIGN_OUT, etc.)
     */
    onAuthStateChange(callback) {
      return this.adapter.onAuthStateChange(callback);
    }
  }

  // Export Singleton
  global.PMM_AuthService = new AuthService();
})(typeof window !== 'undefined' ? window : this);
