/**
 * Pharmaceutics Mastery Matrix (PMM) - Form Validation Utilities
 * Validates scientific user inputs, emails, password security, and required fields.
 */

(function (global) {
  'use strict';

  const Validation = {
    isValidEmail(email) {
      if (!email || typeof email !== 'string') return false;
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(email.trim());
    },

    isValidPassword(password) {
      if (!password || typeof password !== 'string') return false;
      return password.length >= 8;
    },

    evaluatePasswordStrength(password) {
      if (!password) return { score: 0, label: 'Empty', color: 'muted' };
      let score = 0;
      if (password.length >= 8) score++;
      if (password.length >= 12) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;

      if (score <= 2) return { score: 1, label: 'Weak', color: 'error' };
      if (score <= 4) return { score: 2, label: 'Moderate', color: 'warning' };
      return { score: 3, label: 'Strong (Clinical Grade)', color: 'success' };
    }
  };

  global.PMM_Validation = Validation;
})(typeof window !== 'undefined' ? window : this);
