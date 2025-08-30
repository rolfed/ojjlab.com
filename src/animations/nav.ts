import gsap from 'gsap';
import { getAnimationSelector } from "./data-animation";

type Timeline = gsap.core.Timeline;

const animateNavElementOnHover = (element: HTMLLinkElement): Timeline  => {
  const timeline = gsap.timeline({ paused: true })

  if (!element) {
    console.warn('Nav animation: nav element not defined');
    return timeline;
  } 

  console.log(element);

  timeline.to(element, {
    scale: 2,
    ease: 'power2.ou'
  });

  return timeline;
};

export const navAnimation = (document: Document): void => {
  const navSelector = getAnimationSelector('nav');
  const navContainer = document.querySelector<HTMLElement>(navSelector);

  if (!navContainer) {
    console.warn('Nav animations: nav container not defined');
    return;
  }

  const navElements = Array.from(
    navContainer.querySelectorAll<HTMLElement>('li>a')
  );

  navElements.map((el: HTMLLinkElement) => {
    el.addEventListener('mouseover', () => animateNavElementOnHover(el).play());
  });
};
