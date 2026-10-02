/**
 * Pharmaceutics Mastery Matrix (PMM) - Component Foundation Controller
 * Vanilla JavaScript implementation of accessible, interactive PMM components.
 * 
 * Features:
 * - PMMTheme: Dark/Light system synchronization & persistent preference
 * - PMMModal: Accessible dialog with focus trapping and ARIA control
 * - PMMTooltip: Dynamic accessible floating tooltips
 * - PMMSelect: Fully accessible custom select with full keyboard navigation
 * - PMMProgressRing: SVG circular progress generator and animated updater
 * - PMMSidebar: Responsive sidebar collapse and mobile drawer controller
 */

(function (global) {
  'use strict';

  const PMM = {
    version: '1.0.0',
  };

  /* ==========================================================================
     1. THEME CONTROLLER (Dark / Light Theme Engine)
     ========================================================================== */
  const ThemeController = {
    STORAGE_KEY: 'pmm-theme-preference',

    init() {
      const savedTheme = localStorage.getItem(this.STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        this.setTheme(savedTheme);
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark ? 'dark' : 'dark'); // Default to clinical dark mode
      }

      // Bind toggle triggers
      document.querySelectorAll('[data-pmm-theme-toggle]').forEach((btn) => {
        btn.addEventListener('click', () => this.toggle());
      });
    },

    getTheme() {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    },

    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      try {
        localStorage.setItem(this.STORAGE_KEY, theme);
      } catch (e) {
        // LocalStorage fallback for sandboxed environments
      }
      document.dispatchEvent(new CustomEvent('pmm:theme-change', { detail: { theme } }));
    },

    toggle() {
      const next = this.getTheme() === 'dark' ? 'light' : 'dark';
      this.setTheme(next);
      return next;
    },
  };

  /* ==========================================================================
     2. MODAL CONTROLLER (Accessible Dialog & Focus Trap)
     ========================================================================== */
  const ModalController = {
    activeModal: null,
    triggerElement: null,

    init() {
      // Data-attribute trigger bindings
      document.addEventListener('click', (event) => {
        const openTrigger = event.target.closest('[data-pmm-modal-target]');
        if (openTrigger) {
          event.preventDefault();
          const targetId = openTrigger.getAttribute('data-pmm-modal-target');
          this.open(targetId, openTrigger);
          return;
        }

        const closeTrigger = event.target.closest('[data-pmm-modal-close]');
        if (closeTrigger) {
          event.preventDefault();
          this.close();
          return;
        }

        // Close on backdrop click if clicked directly on .pmm-modal-backdrop
        if (event.target.classList.contains('pmm-modal-backdrop') && event.target.classList.contains('is-open')) {
          this.close();
        }
      });

      // Escape key listener
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && this.activeModal) {
          this.close();
        }
        if (event.key === 'Tab' && this.activeModal) {
          this.trapFocus(event);
        }
      });
    },

    open(modalIdOrElement, trigger = null) {
      const modal = typeof modalIdOrElement === 'string'
        ? document.getElementById(modalIdOrElement)
        : modalIdOrElement;

      if (!modal) return;

      this.triggerElement = trigger || document.activeElement;
      this.activeModal = modal;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      modal.setAttribute('aria-modal', 'true');
      document.body.style.overflow = 'hidden';

      // Focus first focusable element
      const focusable = this.getFocusableElements(modal);
      if (focusable.length > 0) {
        focusable[0].focus();
      }

      modal.dispatchEvent(new CustomEvent('pmm:modal-open'));
    },

    close() {
      if (!this.activeModal) return;

      const modal = this.activeModal;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (this.triggerElement && typeof this.triggerElement.focus === 'function') {
        this.triggerElement.focus();
      }

      modal.dispatchEvent(new CustomEvent('pmm:modal-close'));
      this.activeModal = null;
      this.triggerElement = null;
    },

    getFocusableElements(container) {
      return Array.from(
        container.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    },

    trapFocus(event) {
      const focusable = this.getFocusableElements(this.activeModal);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        last.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    },
  };

  /* ==========================================================================
     3. TOOLTIP CONTROLLER (Accessible Dynamic Tooltips)
     ========================================================================== */
  const TooltipController = {
    tooltipEl: null,

    init() {
      this.tooltipEl = document.createElement('div');
      this.tooltipEl.className = 'pmm-tooltip';
      this.tooltipEl.setAttribute('role', 'tooltip');
      this.tooltipEl.id = 'pmm-dynamic-tooltip';
      document.body.appendChild(this.tooltipEl);

      // Event delegation for tooltip triggers
      document.addEventListener('mouseenter', (e) => this.handleTrigger(e), true);
      document.addEventListener('focusin', (e) => this.handleTrigger(e), true);

      document.addEventListener('mouseleave', (e) => this.hideTrigger(e), true);
      document.addEventListener('focusout', (e) => this.hideTrigger(e), true);
    },

    handleTrigger(event) {
      const trigger = event.target.closest('[data-pmm-tooltip]');
      if (!trigger) return;

      const text = trigger.getAttribute('data-pmm-tooltip');
      const position = trigger.getAttribute('data-pmm-tooltip-pos') || 'top';
      if (!text) return;

      this.show(trigger, text, position);
    },

    hideTrigger(event) {
      const trigger = event.target.closest('[data-pmm-tooltip]');
      if (!trigger) return;
      this.hide();
    },

    show(trigger, text, position) {
      this.tooltipEl.textContent = text;
      this.tooltipEl.className = `pmm-tooltip pmm-tooltip--${position} is-visible`;

      const rect = trigger.getBoundingClientRect();
      const tipRect = this.tooltipEl.getBoundingClientRect();
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;

      let top = 0;
      let left = 0;

      switch (position) {
        case 'bottom':
          top = rect.bottom + scrollY + 8;
          left = rect.left + scrollX + (rect.width - tipRect.width) / 2;
          break;
        case 'left':
          top = rect.top + scrollY + (rect.height - tipRect.height) / 2;
          left = rect.left + scrollX - tipRect.width - 8;
          break;
        case 'right':
          top = rect.top + scrollY + (rect.height - tipRect.height) / 2;
          left = rect.right + scrollX + 8;
          break;
        case 'top':
        default:
          top = rect.top + scrollY - tipRect.height - 8;
          left = rect.left + scrollX + (rect.width - tipRect.width) / 2;
          break;
      }

      this.tooltipEl.style.top = `${Math.max(4, top)}px`;
      this.tooltipEl.style.left = `${Math.max(4, left)}px`;
    },

    hide() {
      if (this.tooltipEl) {
        this.tooltipEl.classList.remove('is-visible');
      }
    },
  };

  /* ==========================================================================
     4. ACCESSIBLE CUSTOM SELECT CONTROLLER
     ========================================================================== */
  const SelectController = {
    init() {
      document.querySelectorAll('.pmm-custom-select').forEach((el) => this.bind(el));
    },

    bind(container) {
      const trigger = container.querySelector('.pmm-custom-select__trigger');
      const menu = container.querySelector('.pmm-custom-select__menu');
      const options = Array.from(container.querySelectorAll('.pmm-custom-select__option'));
      const valueSpan = container.querySelector('.pmm-custom-select__value');
      let focusedIndex = options.findIndex((opt) => opt.getAttribute('aria-selected') === 'true');

      if (!trigger || !menu) return;

      const openMenu = () => {
        container.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
        if (focusedIndex >= 0 && options[focusedIndex]) {
          options[focusedIndex].classList.add('is-focused');
          options[focusedIndex].scrollIntoView({ block: 'nearest' });
        }
      };

      const closeMenu = () => {
        container.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        options.forEach((opt) => opt.classList.remove('is-focused'));
      };

      const selectOption = (option) => {
        options.forEach((opt) => {
          opt.setAttribute('aria-selected', 'false');
          opt.classList.remove('is-focused');
        });
        option.setAttribute('aria-selected', 'true');
        if (valueSpan) {
          valueSpan.textContent = option.textContent.trim();
        }
        closeMenu();
        trigger.focus();
        container.dispatchEvent(new CustomEvent('change', {
          detail: { value: option.getAttribute('data-value') || option.textContent.trim() }
        }));
      };

      trigger.addEventListener('click', () => {
        const isOpen = container.getAttribute('aria-expanded') === 'true';
        if (isOpen) closeMenu();
        else openMenu();
      });

      options.forEach((option, idx) => {
        option.addEventListener('click', () => selectOption(option));
        option.addEventListener('mouseenter', () => {
          options.forEach((opt) => opt.classList.remove('is-focused'));
          option.classList.add('is-focused');
          focusedIndex = idx;
        });
      });

      // Keyboard Accessibility
      container.addEventListener('keydown', (e) => {
        const isOpen = container.getAttribute('aria-expanded') === 'true';

        switch (e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (!isOpen) {
              openMenu();
            } else if (focusedIndex >= 0 && options[focusedIndex]) {
              selectOption(options[focusedIndex]);
            }
            break;

          case 'Escape':
            if (isOpen) {
              e.preventDefault();
              closeMenu();
              trigger.focus();
            }
            break;

          case 'ArrowDown':
            e.preventDefault();
            if (!isOpen) {
              openMenu();
            } else {
              options.forEach((opt) => opt.classList.remove('is-focused'));
              focusedIndex = (focusedIndex + 1) % options.length;
              options[focusedIndex].classList.add('is-focused');
              options[focusedIndex].scrollIntoView({ block: 'nearest' });
            }
            break;

          case 'ArrowUp':
            e.preventDefault();
            if (!isOpen) {
              openMenu();
            } else {
              options.forEach((opt) => opt.classList.remove('is-focused'));
              focusedIndex = (focusedIndex - 1 + options.length) % options.length;
              options[focusedIndex].classList.add('is-focused');
              options[focusedIndex].scrollIntoView({ block: 'nearest' });
            }
            break;
        }
      });

      // Click outside to close
      document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
          closeMenu();
        }
      });
    },
  };

  /* ==========================================================================
     5. PROGRESS RING CONTROLLER (SVG Dynamic Circle)
     ========================================================================== */
  const ProgressRing = {
    init() {
      document.querySelectorAll('[data-pmm-progress-ring]').forEach((el) => {
        const percent = parseFloat(el.getAttribute('data-pmm-progress-ring') || '0');
        const size = el.classList.contains('pmm-progress-ring--sm') ? 52 :
                     el.classList.contains('pmm-progress-ring--lg') ? 112 : 80;
        const stroke = el.classList.contains('pmm-progress-ring--sm') ? 4 :
                       el.classList.contains('pmm-progress-ring--lg') ? 8 : 6;
        this.render(el, percent, size, stroke);
      });
    },

    render(container, percent, size = 80, stroke = 6) {
      const radius = (size - stroke) / 2;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100) * circumference;

      const svg = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
          <circle 
            class="pmm-progress-ring__track" 
            cx="${size / 2}" 
            cy="${size / 2}" 
            r="${radius}" 
            stroke-width="${stroke}" 
          />
          <circle 
            class="pmm-progress-ring__indicator" 
            cx="${size / 2}" 
            cy="${size / 2}" 
            r="${radius}" 
            stroke-width="${stroke}" 
            stroke-dasharray="${circumference}" 
            stroke-dashoffset="${offset}" 
          />
        </svg>
      `;

      // Keep content slot if present
      const content = container.querySelector('.pmm-progress-ring__content');
      container.innerHTML = svg;
      if (content) {
        container.appendChild(content);
      }

      container.setAttribute('role', 'progressbar');
      container.setAttribute('aria-valuenow', percent);
      container.setAttribute('aria-valuemin', '0');
      container.setAttribute('aria-valuemax', '100');
    },

    setProgress(container, percent) {
      const indicator = container.querySelector('.pmm-progress-ring__indicator');
      if (!indicator) return;

      const circle = container.querySelector('circle.pmm-progress-ring__track');
      if (!circle) return;

      const radius = parseFloat(circle.getAttribute('r'));
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100) * circumference;

      indicator.style.strokeDashoffset = offset;
      container.setAttribute('aria-valuenow', percent);

      const valueEl = container.querySelector('.pmm-progress-ring__value');
      if (valueEl) {
        valueEl.textContent = `${Math.round(percent)}%`;
      }
    },
  };

  /* ==========================================================================
     6. SIDEBAR CONTROLLER (Collapsible & Mobile Drawer)
     ========================================================================== */
  const SidebarController = {
    init() {
      const sidebar = document.querySelector('.pmm-shell__sidebar, .pmm-sidebar');
      const backdrop = document.querySelector('.pmm-sidebar-backdrop');
      const toggles = document.querySelectorAll('[data-pmm-sidebar-toggle]');
      const collapseToggles = document.querySelectorAll('[data-pmm-sidebar-collapse]');

      if (!sidebar) return;

      // Mobile drawer toggle
      toggles.forEach((btn) => {
        btn.addEventListener('click', () => {
          const isOpen = sidebar.classList.toggle('is-open');
          if (backdrop) backdrop.classList.toggle('is-active', isOpen);
          btn.setAttribute('aria-expanded', String(isOpen));
        });
      });

      // Desktop collapse toggle
      collapseToggles.forEach((btn) => {
        btn.addEventListener('click', () => {
          const isCollapsed = sidebar.classList.toggle('pmm-shell__sidebar--collapsed');
          btn.setAttribute('aria-expanded', String(!isCollapsed));
          document.dispatchEvent(new CustomEvent('pmm:sidebar-collapse', { detail: { isCollapsed } }));
        });
      });

      // Close on backdrop tap
      if (backdrop) {
        backdrop.addEventListener('click', () => {
          sidebar.classList.remove('is-open');
          backdrop.classList.remove('is-active');
        });
      }

      // Close on ESC key on mobile
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
          sidebar.classList.remove('is-open');
          if (backdrop) backdrop.classList.remove('is-active');
        }
      });
    },
  };

  /* ==========================================================================
     7. INITIALIZATION CONTROLLER
     ========================================================================== */
  PMM.Theme = ThemeController;
  PMM.Modal = ModalController;
  PMM.Tooltip = TooltipController;
  PMM.Select = SelectController;
  PMM.ProgressRing = ProgressRing;
  PMM.Sidebar = SidebarController;

  PMM.init = function () {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => PMM.init());
      return;
    }
    ThemeController.init();
    ModalController.init();
    TooltipController.init();
    SelectController.init();
    ProgressRing.init();
    SidebarController.init();
  };

  // Expose to window / module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PMM;
  } else {
    global.PMM = PMM;
  }

  // Auto-initialize if running in browser
  if (typeof window !== 'undefined') {
    PMM.init();
  }
})(typeof window !== 'undefined' ? window : this);
