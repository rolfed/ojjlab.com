import gsap from 'gsap';
import { getAnimationSelector } from './data-animation';

export interface TitleSelectors {
    containerSelector: string;
    barSelector: string;
    textSelector: string;
};

type Timeline = gsap.core.Timeline;

const titleAnimation = (elements: TitleSelectors): Timeline => {
    const { containerSelector, barSelector, textSelector } = elements;
    const container = document.querySelector<HTMLElement>(containerSelector)
    const bar = document.querySelector(barSelector);
    const text = document.querySelector(textSelector);
    const timeline: Timeline = gsap.timeline({
        // paused: true,
    });

    if (!container) {
        console.warn('Title Animation: container selector not found');
        return timeline;
    }

    const containerWidth = container.getBoundingClientRect().width;

    if (!text) {
        console.warn('Title Animation: text selector not found');
        return timeline;
    }

    if (!bar) {
        console.warn('Title Animation: bar selector not found');
        return timeline;
    }

    timeline.to(bar, { x: 0, duration: 0.15, ease: 'elastic' })
        .to(bar, { x: containerWidth, opacity: 0, width: "7rem" })
        .to(bar, { x: 0, width: containerWidth, opacity: 1, duration: 0.15 })
        .to(bar, { opacity: 0, duration: 0.01 })
        .to(text, { opacity: 1, duration: 1 });

    return timeline;
};

const titleStaggerAnimation = (elements: TitleSelectors): Timeline => {
    const { textSelector } = elements;
    const text = document.querySelector<HTMLElement>(textSelector);
    const timeline = gsap.timeline({
        // paused: true,
    });

    if (!text) {
        console.warn('Title Animation: text selector not found');
        return timeline;
    }

    const lines = Array.from(text.querySelectorAll<HTMLElement>('span'));

    timeline.from(lines, {
        xPercent: 20,
        opacity: 1,
        stagger: 0.15,
        ease: 'power2.out',
    });

    return timeline;
};

const subTitleAnimation = (selector: string): Timeline => {
    const timeline = gsap.timeline({
        // paused: true,
    });
    const content = document.querySelector<HTMLElement>(selector);

    if (!content) {
        console.warn('Sub Title Animation: text selector not found');
        return timeline;
    }

    const lines = Array.from(content.querySelectorAll<HTMLElement>('span'));

    timeline.from(lines, {
        yPercent: 10,
        opacity: 0,
        ease: 'power2.out',
        stagger: 1,
    });

    return timeline;
};

const heroImageAnimation = (selector: string): Timeline => {
    const timeline: Timeline = gsap.timeline({
        // paused: true
    });
    const image = document.querySelector<HTMLElement>(selector);

    if (!image) {
        console.warn('Image Animation: text selector not found');
        return timeline;
    }

    timeline.set(image, { transformOrigin: 'center center', force3D: true });

    timeline.fromTo(image, { scale: 1 }, { scale: 2, duration: 100, ease: 'power1.out' })


    return timeline;
}

const ctaAnimation = (selector: string): Timeline => {
    const timeline: Timeline = gsap.timeline({
        // paused: true
    });
    const ctas = document.querySelector<HTMLElement>(selector);

    if (!ctas) {
        console.warn('CTAs Animation: ctas selector not found');
        return timeline;
    }

    const buttons = Array.from(ctas.querySelectorAll('a')); 

    timeline.from(buttons, {
        xPercent: 20,
        opacity: 0,
        ease: 'power2.out',
        stagger: 0.15,
    });

    return timeline;
}

export const heroTitleAnimation = (): void => {

    const heroImage = getAnimationSelector('hero-image');
    const containerSelector = getAnimationSelector('hero-reveal-container');
    const textSelector = getAnimationSelector('hero-title');
    const barSelector = getAnimationSelector('hero-reveal-bar');
    const heroImageSelector = getAnimationSelector('hero-content');
    const ctaSelector = getAnimationSelector('hero-cta');

    const heroTitle: TitleSelectors = {
        containerSelector,
        barSelector,
        textSelector
    };

    const master = gsap.timeline({ defaults: { ease: 'power2.out' }, smoothChildTiming: true });
    const revealTitleAnimation = () =>  titleAnimation(heroTitle);
    const heroImageAnimaton = () => heroImageAnimation(heroImage);
    const heroTitleStaggerAnimation = () => titleStaggerAnimation(heroTitle);
    const heroSubTitleAnimation = () => subTitleAnimation(heroImageSelector);
    const heroCtaAnimation = () => ctaAnimation(ctaSelector);

    master
        .addLabel('start', 0)
        .add(revealTitleAnimation(), 'start')    
        .add(heroTitleStaggerAnimation(), 'start+=0.75')
        .add(heroSubTitleAnimation(), 'start+=2')
        .add(heroCtaAnimation(), 'start+=3.5')
        .add(heroImageAnimaton(), 'start');     

};
