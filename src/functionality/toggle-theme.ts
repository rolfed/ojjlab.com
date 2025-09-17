export const themeConfiguration = () => {
  setFooterYear();
  setTheme();
  setupThemeToggle();
};

const setFooterYear = () => {
  let _year: HTMLElement | null = document.getElementById('year');
  if (_year) {
    _year.textContent = new Date().getFullYear().toString();
  }
};

const setTheme = () => {
  const root = document.documentElement;
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const saved = localStorage.getItem('theme') || 'system';
  const isDark = saved === 'dark' || (saved === 'system' && mql.matches);

  // Support both selectors: `.dark` and `[data-theme="dark"]`
  root.classList.toggle('dark', isDark);
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
};

let isSystemListenerAdded = false;

const setupThemeToggle = () => {
  const root = document.documentElement;
  const homeBtn = document.getElementById('theme-toggle');
  const navBtn = document.getElementById('nav-theme-toggle');
  const mobileBtn = document.getElementById('mobile-theme-toggle');

  const buttons = [homeBtn, navBtn, mobileBtn].filter(Boolean);

  const getCurrentTheme = () => {
    return localStorage.getItem('theme') || 'system';
  };

  const isDarkMode = (theme: string) => {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    // For 'system', check user's preference
    return matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const applyTheme = (theme: string) => {
    const dark = isDarkMode(theme);

    root.classList.toggle('dark', dark);
    root.classList.toggle('light', !dark);
    root.setAttribute('data-theme', dark ? 'dark' : 'light');

    // Update all theme toggle buttons
    buttons.forEach((btn) => {
      if (btn) {
        btn.setAttribute('aria-pressed', String(dark));
        const label = btn.querySelector('[data-theme-label]');
        if (label) {
          label.textContent = theme[0].toUpperCase() + theme.slice(1);
        }
      }
    });
  };

  // Initialize theme
  applyTheme(getCurrentTheme());

  // Listen for system theme changes (only add once)
  if (!isSystemListenerAdded) {
    matchMedia('(prefers-color-scheme: dark)').addEventListener(
      'change',
      function () {
        if (getCurrentTheme() === 'system') {
          applyTheme('system');
        }
      }
    );
    isSystemListenerAdded = true;
  }

  // Add click event listeners to all theme toggle buttons
  buttons.forEach((btn) => {
    if (btn && !btn.hasAttribute('data-theme-listener')) {
      btn.setAttribute('data-theme-listener', 'true');
      btn.addEventListener('click', function () {
        const currentTheme = getCurrentTheme();
        let nextTheme: string;

        // Simple toggle between light and dark
        if (currentTheme === 'light') {
          nextTheme = 'dark';
        } else {
          nextTheme = 'light';
        }

        localStorage.setItem('theme', nextTheme);
        applyTheme(nextTheme);
      });
    }
  });
};
