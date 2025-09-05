import { getAnimationSelector } from "../animations/data-animation"
import gsap from 'gsap';

type LoaderControls = {
    play: () => Promise<any>;
    set: (percent: number) => void;
    done: () => void;
    kill: () => void;
    onComplete: () => Promise<void>;
}

type Timeline = gsap.core.Timeline;

export const loaderAnimation = (doc: Document): LoaderControls => {
    const loaderContainerSelector = getAnimationSelector('loader-container');
    const countSelector = getAnimationSelector('loader-count');
    const barSelector = getAnimationSelector('loader-bar');

    const loaderContainerElement = doc.querySelector(loaderContainerSelector);
    const countElement = doc.querySelector(countSelector);
    const barElement = doc.querySelector(barSelector);

    if (barElement) {
        gsap.set(barElement, { width: "0%" });
    }


    if (!loaderContainerElement || !countElement) {
        const resolved = Promise.resolve();
        // fail-safe no-ops so app won't crash if markup isn't present
        return { 
            play: () => resolved, 
            set: () => {}, 
            done: () => {}, 
            kill: () => {}, 
            onComplete: () => resolved 
        };
    }

    // Lock scrolling while loader is visible
    // Index html is set to overflow-hidden
    const html = doc.documentElement;
    const unlockScroll = () => html.classList.remove("overflow-hidden");

    // Respect reduced motion
    const prefersReduce = 
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches 
            ?? false;

    const counter = { value: 0 };

    const render = () => {
        const val = Math.round(counter.value);
        countElement.textContent = `${val}%`

        if (barElement) {
            gsap.set(barElement, { width: `${val}%`});
        }
    }

    gsap.set(countElement, { yPercent: 0, autoAlpha: 0, willChange: "transform"});
    gsap.set(barElement, { yPercent: 0, autoAlpha: 0, willChange: "transform"});

    gsap.to(countElement, { yPercent: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out"})
    gsap.to(barElement, { yPercent: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out"})

    if (barElement) {
        gsap.set(barElement, {
            yPercent: 40,
            autoAlpha: 0,
            willChange: "transform"
        });
    }

    let resolveDone: () => void;
    let finished = new Promise<void>((res) => (resolveDone = res));
    const resetFinished = () => {
        finished = new Promise<void>((res) => (resolveDone = res));
    };
    const entrance: Timeline = gsap.timeline({});

    const setTiming = prefersReduce ? 0.2 : 1.2;

    entrance
        .to(counter, {
            value: 100,
            duration: setTiming,
            ease: "power2.out",
            onUpdate: render
        })
        .to(barElement, {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.4,
            ease: "power2.out"
        }, "<0.05");

    const timeline: Timeline = gsap.timeline({ paused: true, defaults: { ease: "power2.out"} });

    timeline.to(loaderContainerElement, {
        yPercent: 0,
        autoAlpha: 0,
        ease: "power2.out",
        onComplete: () => {
            loaderContainerElement.remove();
            unlockScroll();
            resolveDone();
        }
    }, "+=0.1");


    const onComplete = async () => finished;

    const play = async (): Promise<void> => {
        resetFinished();
        counter.value = 0;
        render();

        // when entrance (0-100) finishes, start the fade out
        entrance.eventCallback("onComplete", () => timeline.restart());
        entrance.restart();

        return finished;
    };

    const set = (percent: number) => {
        const clamped = Math.max(0, Math.min(100, percent));
        gsap.to(countElement,{
            value: clamped,
            duration: 0.2,
            ease: "power2.out",
            onUpdate: render
        });
    };

    const done = () => {
        resetFinished();

        // Stop the auto-timeline to avoid dueling tweens
        entrance.pause();
        timeline.pause();

        gsap.to(counter, {
            value: 100,
            duration: prefersReduce ? 0.05 : 0.2,
            ease: "power2.out",
            onUpdate: render,
            onComplete: () => {
                gsap.to(loaderContainerElement, {
                    yPercent: 0,
                    autoAlpha: 0,
                    duration: prefersReduce ? 0 : -2,
                    ease: "power2.out",
                    onComplete: () => {
                        loaderContainerElement.remove();
                        unlockScroll();
                        resolveDone();
                    },
                });
            },
        });

    };

    // Hard stop + cleanup (resolve any awaiters)
    const kill = () => {
        try {
            timeline.kill();
            entrance.kill();
        } catch {
            console.error("Loader Animation: unable to kill timeline");
        }

        unlockScroll();

        try {
            resolveDone();
        } catch {
            console.log("Loader Animation: unable to resolve");
        }
    };

    return {
        play,
        set,
        done,
        kill,
        onComplete
    };

}
