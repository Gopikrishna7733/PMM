/**
 * Pharmaceutics Mastery Matrix (PMM) - Unified Data Service
 * Provides access to subjects, metrics, and activity logs.
 * 
 * Modular Adapter Architecture:
 * - Phase 1: Delegates to PMM_MockDataAdapter.
 * - Phase 2: Will delegate to Supabase Client (supabase.from('subjects').select(...)).
 */

(function (global) {
  'use strict';

  class DataService {
    constructor() {
      this._adapter = global.PMM_MockDataAdapter;
    }

    get adapter() {
      if (!this._adapter && global.PMM_MockDataAdapter) {
        this._adapter = global.PMM_MockDataAdapter;
      }
      return this._adapter;
    }

    setAdapter(adapter) {
      this._adapter = adapter;
    }

    async getDashboardMetrics(userId) {
      return this.adapter.getDashboardMetrics(userId);
    }

    async getEnrolledSubjects(userId) {
      return this.adapter.getEnrolledSubjects(userId);
    }

    async getRecentActivity(userId) {
      return this.adapter.getRecentActivity(userId);
    }
  }

  global.PMM_DataService = new DataService();
})(typeof window !== 'undefined' ? window : this);
