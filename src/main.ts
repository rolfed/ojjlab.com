// main.ts

import { themeConfiguration } from './functionality/toggle-theme';
import { createRouter } from './router/router';
import './components/navigation';
import './components/mobile-navigation';
import './components/loader';
import './components/footer';
import './components/page';
import './components/section-title';
import './components/section';
import './components/coach';

declare global {
  interface Window {
    __app_booted__?: boolean;
    router?: import('./router/router').Router;
  }
}

const handleContactRoute = (): void => {
  console.log('Navigated to Contact page');
  document.title = 'Contact - Oregon Jiu Jitsu Lab';
};

const handleJoinRoute = (): void => {
  console.log('Navigated to Join page');
  document.title = 'Join';
};

const handleTryAClassRoute = (): void => {
  console.log('Navigated to Try a Class page');
  document.title = 'Try a Class - Oregon Jiu Jitsu Lab';
};

const handleLoginRoute = (): void => {
  console.log('Navigated to Login page');
  document.title = 'Login - Oregon Jiu Jitsu Lab';
};

const handleHomeRoute = (): void => {
  console.log('Navigated to Home page');
  document.title =
    'Oregon Jiu Jitsu Lab | Jiu Jitsu, Wrestling & Kickboxing in Hillsboro';

  // Initialize scroll navigation for hero section
  import('./functionality/scroll-nav').then(({ initScrollNavigation }) => {
    initScrollNavigation();
  });

  // Initialize hero web component
  import('./components/hero');

  // Initialize gallery web component
  import('./components/gallery');

  // Initialize location web component
  import('./components/location');
};

// One time boot logic
const boot = async (): Promise<void> => {
  themeConfiguration();

  const router = createRouter({ mode: 'hash' });
  window.router = router;

  router
    .add(
      '/',
      handleHomeRoute,
      'Oregon Jiu Jitsu Lab | Jiu Jitsu, Wrestling & Kickboxing in Hillsboro',
      '/src/templates/home.html'
    )
    .add(
      '/contact',
      handleContactRoute,
      'Contact - Oregon Jiu Jitsu Lab',
      '/src/templates/contact.html'
    )
    .add(
      '/join',
      handleJoinRoute,
      'Join - Oregon Jiu Jitsu Lab',
      '/src/templates/join.html'
    )
    .add(
      '/try-a-class',
      handleTryAClassRoute,
      'Try a Class - Oregon Jiu Jitsu Lab',
      '/src/templates/try-a-class.html'
    )
    .add(
      '/login',
      handleLoginRoute,
      'Login - Oregon Jiu Jitsu Lab',
      '/src/templates/login.html'
    )
    .add(
      '/jiu-jitsu',
      () => {
        console.log('Navigated to Jiu Jitsu page');
        document.title = 'Jiu Jitsu - Oregon Jiu Jitsu Lab';
      },
      'Jiu Jitsu - Oregon Jiu Jitsu Lab',
      '/src/templates/jiu-jitsu.html'
    )
    .add(
      '/wrestling',
      () => {
        console.log('Navigated to Wrestling page');
        document.title = 'Wrestling - Oregon Jiu Jitsu Lab';
      },
      'Wrestling - Oregon Jiu Jitsu Lab',
      '/src/templates/wrestling.html'
    )
    .add(
      '/kickboxing',
      () => {
        console.log('Navigated to Kickboxing page');
        document.title = 'Kickboxing - Oregon Jiu Jitsu Lab';
      },
      'Kickboxing - Oregon Jiu Jitsu Lab',
      '/src/templates/kickboxing.html'
    )
    .add(
      '/competition-team',
      () => {
        console.log('Navigated to Competition Team page');
        document.title = 'Competition Team - Oregon Jiu Jitsu Lab';
      },
      'Competition Team - Oregon Jiu Jitsu Lab',
      '/src/templates/competition-team.html'
    )
    .add(
      '/schedule',
      () => {
        console.log('Navigated to Schedule page');
        document.title = 'Schedule - Oregon Jiu Jitsu Lab';
      },
      'Schedule - Oregon Jiu Jitsu Lab',
      '/src/templates/schedule.html'
    );

  // Ensure home template loads on initial page load
  if (router.getCurrentPath() === '/') {
    router.navigate('/');
  }
};

const init = async (): Promise<void> => {
  /* Onload */
  /* Post Load */
  /* Section Animations */
};

if (!window.__app_booted__) {
  window.__app_booted__ = true;
  await boot();
}

await init();

/**
 * HMR cleanup (development only).
 *
 * When using a dev server with Hot Module Replacement (Vite, etc.), `import.meta.hot`
 * is defined. The `dispose` callback runs right BEFORE this module is replaced,
 * giving us a chance to undo side-effects from the previous version.
 *
 * We delete the global boot guard (`window.__app_booted__`) so that when the updated
 * module is re-evaluated, the app can run its init logic again EXACTLY ONCE instead
 * of being skipped due to the stale flag.
 *
 * In production builds `import.meta.hot` is undefined, so this block never runs.
 *
 * Tip: also remove event listeners, cancel intervals/timeouts, and kill GSAP timelines here.
 */
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    delete window.__app_booted__;
  });
}
