/**
 * Pharmaceutics Mastery Matrix (PMM) - Route Guard & Authentication State Router
 * Protects private application routes and redirects authenticated scholars.
 */

(function (global) {
  'use strict';

  const Guard = {
    /**
     * Protect routes like dashboard.html.
     * Redirects to login.html if session is missing or expired.
     */
    async requireAuth(options = {}) {
      const redirectTo = options.redirectTo || 'login.html';
      const authService = global.PMM_AuthService;

      if (!authService) {
        window.location.href = redirectTo;
        return null;
      }

      const { data } = await authService.getSession();

      if (!data || !data.session) {
        const currentPath = encodeURIComponent(window.location.pathname.split('/').pop() || 'dashboard.html');
        window.location.href = `${redirectTo}?redirect=${currentPath}`;
        return null;
      }

      return data.session.user;
    },

    /**
     * Prevent authenticated users from visiting login/register pages.
     * Redirects to dashboard.html if session already exists.
     */
    async requireGuest(options = {}) {
      const redirectTo = options.redirectTo || 'dashboard.html';
      const authService = global.PMM_AuthService;

      if (!authService) return;

      const { data } = await authService.getSession();
      if (data && data.session) {
        const urlParams = new URLSearchParams(window.location.search);
        const destination = urlParams.get('redirect') || redirectTo;
        window.location.href = destination;
      }
    },

    /**
     * Update navigation on public pages (index.html) based on auth state
     */
    async updateNavAuth() {
      const authService = global.PMM_AuthService;
      if (!authService) return;

      const { data } = await authService.getSession();
      const loginBtn = document.getElementById('nav-login-btn');
      const registerBtn = document.getElementById('nav-register-btn');
      const heroStartBtn = document.getElementById('hero-cta-start');

      if (data && data.session) {
        const user = data.session.user;
        const displayName = (user.user_metadata && user.user_metadata.fullName) || user.email.split('@')[0];

        if (loginBtn) {
          loginBtn.style.display = 'none';
        }

        if (registerBtn) {
          registerBtn.textContent = 'Go to Dashboard';
          registerBtn.href = 'dashboard.html';
          registerBtn.className = 'pmm-btn pmm-btn--accent';
        }

        if (heroStartBtn) {
          heroStartBtn.href = 'dashboard.html';
          heroStartBtn.innerHTML = `<span>Resume Dashboard (${displayName})</span> <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
        }
      }
    },

    /**
     * Logout helper with confirmation
     */
    async logout(redirectTo = 'index.html') {
      const authService = global.PMM_AuthService;
      if (authService) {
        await authService.signOut();
      }
      window.location.href = redirectTo;
    }
  };

  global.PMM_Guard = Guard;
})(typeof window !== 'undefined' ? window : this);
