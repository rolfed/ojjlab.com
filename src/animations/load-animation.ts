import { getAnimationSelector } from "../animations/data-animation"
import gsap from 'gsap';
import { loader } from "../functionality/loader";

type LoaderControls = {
    play: () => Promise<any>;
    set: (percent: number) => void;
    done: () => void;
    kill: () => void;
    onComplete: () => Promise<void>;
}

type Timeline = gsap.core.Timeline;

export const loaderAnimation = (doc: Document): LoaderControls => {
    // TODO disabl scrolling
    
    const loaderContainerSelector = getAnimationSelector('loader-container');
    const loaderContainerElement = doc.querySelector(loaderContainerSelector);

    const countSelector = getAnimationSelector('loader-count');
    const countElement = doc.querySelector(countSelector);

    const barSelector = getAnimationSelector('loader-bar');
    const barElement = doc.querySelector(barSelector);

    const timeline: Timeline = gsap.timeline({});


    if (!loaderContainerElement || !countElement) {
        const resolved = Promise.resolve();
        // fail-safe no-ops so app won't crash if markup isn't present
        return { play(){}, set(){}, done(){}, kill(){}, onComplete: () => resolved };
    }

    // Respect reduced motion
    const prefersReduce = 
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches 
            ?? false;

    const counter = { value: 0 };

    const render = () => {
        const val = Math.round(counter.value);
        countElement.textContent = `${val}%`

        if (barElement) {
            timeline.set(barElement, { width: `${val}%`});
        }
    }

    timeline.set(countElement, { yPercent: 40, autoAlpha: 0, willChange: "transform"});
    timeline.set(barElement, { yPercent: 40, autoAlpha: 0, willChange: "transform"});

    timeline.to(countElement, { yPercent: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out"})
    timeline.to(barElement, { yPercent: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out"})

    let resolveDone: () => void;
    let finished = new Promise<void>((res) => (resolveDone = res));
    const resetFinished = () => {
        finished = new Promise<void>((res) => (resolveDone = res));
    };

    const timelineTwo: Timeline = gsap.timeline(({ paused: true }));

    const setTiming = prefersReduce ? 0.2 : 1.2;

    timelineTwo.to(counter, {
        value: 100,
        duration: setTiming,
        ease: "power2.out",
        onUpdate: render
    });

    timelineTwo.to(loaderContainerElement, {
        yPercent: prefersReduce ? 0 : -2,
        autoAlpha: 0,
        ease: "power2.out",
        onComplete: () => loaderContainerElement.remove()
    }, "+=0.1");


    const onComplete = async () => finished;

    const play = async (): Promise<void> => {
        counter.value = 0;
        render();
        timelineTwo.restart();
        return finished;
    };

    const set = () => {
        console.log('set');
    };

    const done = () => {
        console.log('done');

    };

    const kill = () => {
        console.log('kill');
    };

    return {
        play,
        set,
        done,
        kill,
        onComplete
    };

}
