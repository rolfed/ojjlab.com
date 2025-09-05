// main.ts
import { toggleCalendarView } from "./functionality/calendar";
import { heroTitleAnimation } from "./animations/title";
import { navAnimation } from "./animations/nav";
import { loaderAnimation } from "./animations/load-animation"; // play(): Promise<void>
import { copyPhone } from "./functionality/copy";

declare global {
    interface Window { __app_booted__?: boolean }
}

// One time boot logic
const boot = async () => {
    const loadAnimation = loaderAnimation(document);
    loadAnimation.play();
};

const init = async () => {
  toggleCalendarView(document);
  navAnimation(document);
  heroTitleAnimation();
  copyPhone(document);
}

if (!window.__app_booted__) {
    console.log('huh');
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
