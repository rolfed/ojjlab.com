import gsap from 'gsap';
import { getAnimationSelector } from './data-animation';

export interface TitleSelectors {
  containerSelector: string;
  barSelector: string;
  textSelector: string;
};

const titleAnimation = (elements: TitleSelectors) => {
  const { containerSelector, barSelector, textSelector } = elements;
  const container = document.querySelector(containerSelector)
  const bar = document.querySelector(barSelector);
  const text = document.querySelector(textSelector);

  if (!container) {
    console.warn('Title Animation: container element not found');
    return;
  }

  if (!text) {
    console.warn('Title Animation: text element not found');
    return;
  }


  const containerWidth = container.getBoundingClientRect().width.toString();
  console.log('test: ', containerWidth);
  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' }
  });

  tl.to(
    bar, { x: 0, duration: 0.25, delay: 0.15 },
  )
  .to(
    bar, { x: containerWidth, opacity: 0,  width: "7rem" }
  )
  .to(text, { opacity: "100%", duration: 0.25 });
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

  return titleAnimation(heroTitle);
}
