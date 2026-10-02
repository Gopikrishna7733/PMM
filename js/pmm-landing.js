/**
 * Pharmaceutics Mastery Matrix (PMM) - Landing Page Interactive Script
 * Provides smooth interactions, simulated quiz preview state, and mobile navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('pmm-mobile-menu-btn');
  const mobileMenu = document.getElementById('pmm-mobile-drawer');
  const mobileBackdrop = document.getElementById('pmm-mobile-backdrop');
  const mobileClose = document.getElementById('pmm-mobile-close-btn');

  function openMobileMenu() {
    if (mobileMenu && mobileBackdrop) {
      mobileMenu.classList.add('is-open');
      mobileBackdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileMenu && mobileBackdrop) {
      mobileMenu.classList.remove('is-open');
      mobileBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

  // Close mobile menu when clicking internal nav links
  document.querySelectorAll('.pmm-mobile-drawer a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 2. Interactive Hero Quiz Option Selector
  const quizOptions = document.querySelectorAll('.pmm-quiz-option-item');
  const quizTelemetryFeedback = document.getElementById('pmm-quiz-feedback');

  quizOptions.forEach((option) => {
    option.addEventListener('click', () => {
      quizOptions.forEach((opt) => opt.classList.remove('pmm-quiz-option-item--selected'));
      option.classList.add('pmm-quiz-option-item--selected');

      const isCorrect = option.getAttribute('data-correct') === 'true';
      if (quizTelemetryFeedback) {
        if (isCorrect) {
          quizTelemetryFeedback.innerHTML = `
            <span class="pmm-badge pmm-badge--success pmm-badge--dot">Verified Clinical Correct</span>
            <span class="pmm-micro pmm-mono">+15 Mastery XP • Ka 0.84 hr⁻¹</span>
          `;
        } else {
          quizTelemetryFeedback.innerHTML = `
            <span class="pmm-badge pmm-badge--warning pmm-badge--dot">Review Clearance Rate</span>
            <span class="pmm-micro pmm-mono">Hint: Elimination constant Kel is intrinsic</span>
          `;
        }
      }
    });
  });

  // 3. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
