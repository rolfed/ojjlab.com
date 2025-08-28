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
  const tl = gsap.timeline({
    defaults: { ease: 'power2.out', smoothChildTiming: true }
  });

  if (!container) {
    console.warn('Title Animation: container selector not found');
    return tl;
  }

  const containerWidth = container.getBoundingClientRect().width;



  if (!text) {
    console.warn('Title Animation: text selector not found');
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
    console.warn('Title Animation: text selector not found');
    return timeline;
  } 

  const lines = Array.from(text.querySelectorAll<HTMLElement>('span'));

  timeline.from(lines, {
    xPercent: 10,
    opacity: 0,
    stagger: 0.15
  })

  return timeline;
};

const subTitleAnimation = (selector: string): Timeline => {
  const timeline: Timeline = gsap.timeline();
  const content = document.querySelector<HTMLElement>(selector);

  if (!content) {
    console.warn('Sub Title Animation: text selector not found');
    return timeline;
  } 

  const lines = Array.from(content.querySelectorAll<HTMLElement>('span'));

  timeline.from(lines, {
    yPercent: 20,
    autoAlpha: 0,
    stagger: 0.5
  });

  return timeline;
};

const heroImageAnimation = (selector: string): Timeline => {
  const timeline: Timeline = gsap.timeline();
  const image = document.querySelector<HTMLElement>(selector);

  if (!image) {
    console.warn('Image Animation: text selector not found');
    return timeline;
  } 

  timeline.set(image, { force3D: true });

  timeline.fromTo(image, { scale: 1 }, { scale: 1.15, duration: 100, ease: 'power1.out' })
  

  return timeline;
}

export const heroTitleAnimation = () => {

  const heroImage = getAnimationSelector('hero-image');
  const containerSelector = getAnimationSelector('hero-reveal-container');
  const textSelector = getAnimationSelector('hero-title');
  const barSelector = getAnimationSelector('hero-reveal-bar');
  const heroImageSelector = getAnimationSelector('hero-content');

  const heroTitle: TitleSelectors = {
    containerSelector,
    barSelector,
    textSelector
  };

  gsap.timeline() 
    .add(titleAnimation(heroTitle))
    .add(titleOffsetAnimation(heroTitle))
    .add(subTitleAnimation(heroImageSelector))
    .add(heroImageAnimation(heroImage))
};
