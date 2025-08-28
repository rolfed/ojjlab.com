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
  const container = document.querySelector(containerSelector)
  const bar = document.querySelector(barSelector);
  const text = document.querySelector(textSelector);

  const containerWidth = container.getBoundingClientRect().width.toString();
  const tl = gsap.timeline({
    defaults: { ease: 'power2.out', smoothChildTiming: true }
  });

  if (!container) {
    console.warn('Title Animation: container element not found');
    return tl;
  }

  if (!text) {
    console.warn('Title Animation: text element not found');
    return tl;
  }

  let timeline = tl.to(
      bar, { x: 0, duration: 0.25, delay: 0.25, ease: 'elastic' },
    )
    .to(
      bar, { x: containerWidth, opacity: 0, width: "7rem" }
    )
    .to(
      bar, { x: 0, width: containerWidth, opacity: 100, duration: 0.01 }
    )
    .to(
      bar, { opacity: 0, duration: 0.01 }
    )
    .to(text, { opacity: "100%", duration: 1 });

  return timeline;
};

const titleOffsetAnimation = (elements: TitleSelectors): Timeline => {
  const { textSelector } = elements;
  const text = document.querySelector<HTMLElement>(textSelector);
  const timeline = gsap.timeline();

  if (!text) {
    console.warn('Title Animation: text element not found');
    return timeline;
  } 

  const lines = Array.from(text.querySelectorAll<HTMLElement>('span'));

  timeline.from(lines, {
    xPercent: 10,
    opacity: 0,
    stagger: 0.12
  })

  return timeline;
};

export const heroTitleAnimation = () => {

  const containerSelector = getAnimationSelector('hero-reveal-container');
  const textSelector = getAnimationSelector('hero-title');
  const barSelector = getAnimationSelector('hero-reveal-bar');

  const heroTitle: TitleSelectors = {
    containerSelector,
    barSelector,
    textSelector
  };

  gsap.timeline() 
    .add(titleAnimation(heroTitle))
    .add(titleOffsetAnimation(heroTitle), "-=1");
  
}
