// main.ts
import { toggleCalendarView } from "./functionality/calendar";
import { heroTitleAnimation } from "./animations/title";
import { navAnimation } from "./animations/nav";
import { loaderAnimation } from "./animations/load-animation"; // play(): Promise<void>
import { copyPhone } from "./functionality/copy";
import { heroAnimation } from "./animations/hero";

declare global {
    interface Window { __app_booted__?: boolean }
}

const loadAnimation = loaderAnimation(document);

// One time boot logic
const boot = async () => {
    loadAnimation.play();
};

const init = async () => {
    /* Onload */

    /* Post Load */
    await loadAnimation.onComplete().then(() => {
        heroAnimation(document);
    });

    toggleCalendarView(document);
    navAnimation(document);
    heroTitleAnimation();
    copyPhone(document);
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
