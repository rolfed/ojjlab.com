import gsap from 'gsap';
import { getAnimationSelector } from './data-animation';

export interface TitleSelectors {
  barSelector: string;
  textSelector: string;
};

const titleAnimation = (elements: TitleSelectors) => {
  const { barSelector, textSelector } = elements;
  const bar = document.querySelector(barSelector);
  const text = document.querySelector(textSelector);

  if (!text) {
    console.warn('Title Animation: text element not found');
    return;
  }

  const tl = gsap.timeline();

  tl.to(
    bar, { duration: 0.05, backgroundColor: "#ffffff", ease: "power1.inOut" }
  ).to(
      bar, { duration: 0.1, width: "100%", ease: "power2.out" }
  ).to(
      bar, { duration: 0.1, opacity: 0, onComplete: () => {
        (text as HTMLElement).style.visibility = "visible";
      }
  });
};

export const heroTitleAnimation = () => {

  const textSelector = getAnimationSelector("hero-title");
  const barSelector = getAnimationSelector("hero-reveal-bar");

  const heroTitle: TitleSelectors = {
      barSelector,
      textSelector
  };

  return titleAnimation(heroTitle);
}
