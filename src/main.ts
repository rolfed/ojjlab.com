// main.ts

import { themeConfiguration } from "./functionality/toggle-theme";
import { createRouter } from "./router/router";
import "./components/navigation";

declare global {
    interface Window { __app_booted__?: boolean }
}


const handleContactRoute = (): void => {
    console.log('Navigated to Contact page');
    document.title = 'Contact - Oregon Jiu Jitsu Lab';

    // Initialize contact form functionality
    import('./functionality/contact-form').then(({ initializeContactForm }) => {
        initializeContactForm();
    });
};

const handleJoinRoute = (): void => {
    console.log('Navigated to Join page');
    document.title = 'Join - Oregon Jiu Jitsu Lab';
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
    document.title = 'Oregon Jiu Jitsu Lab | Jiu Jitsu, Wrestling & Kickboxing in Hillsboro';
};

// One time boot logic
const boot = async (): Promise<void> => {
    themeConfiguration();

    const router = createRouter({ mode: 'hash' });

    router
        .add('/', handleHomeRoute, 'Oregon Jiu Jitsu Lab | Jiu Jitsu, Wrestling & Kickboxing in Hillsboro', '/src/templates/home.html')
        .add('/contact', handleContactRoute, 'Contact - Oregon Jiu Jitsu Lab', '/src/templates/contact.html')
        .add('/join', handleJoinRoute, 'Join - Oregon Jiu Jitsu Lab', '/src/templates/join.html')
        .add('/try-a-class', handleTryAClassRoute, 'Try a Class - Oregon Jiu Jitsu Lab', '/src/templates/try-a-class.html')
        .add('/login', handleLoginRoute, 'Login - Oregon Jiu Jitsu Lab', '/src/templates/login.html');

    // Ensure home template loads on initial page load
    if (router.getCurrentPath() === '/') {
        router.navigate('/');
    }
};

const init = async (): Promise<void> => {
    /* Onload */

    /* Post Load */

    /* Section Animations */

}

if (!window.__app_booted__) {
    window.__app_booted__ = true;
    await boot();
};

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
