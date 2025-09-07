import gsap from 'gsap';
import type { Timeline } from "../model/gsap";
import { getElementByDataAnimation } from "./data-animation";

export const heroAnimation = (doc: Document): Timeline => {
  const location = 'hero';

  const container = getElementByDataAnimation<HTMLElement>(location, 'hero');
  const containerWidth = container?.getBoundingClientRect().width ?? 0;

  /* Elements */
  const logoElement = getElementByDataAnimation<HTMLElement>(location, 'hero-logo');
  const revealBarElement = getElementByDataAnimation<HTMLElement>(location, 'hero-reveal-bar');

  const tl: Timeline = gsap.timeline({});

  if (!logoElement || !revealBarElement) {
    console.warn("Missing hero elements");
    return tl;
  }

  /* Animations */
  tl
    .addLabel("Hero")
    .add(barAnimation(revealBarElement, containerWidth), "start")
    .add(logoInAnimation(logoElement), "start+=0.5")
    .add(logoOutAnimation(logoElement), "start+=2")
    .add(titleAnimation(location), "start+=2.15")
    .add(contentAnimation(location), "start+=4");

  return tl;
};

const barAnimation = (element: HTMLElement, containerWidth: number): Timeline => {
  const tl = gsap.timeline({});
  return tl
    .to(element, { x: containerWidth, opacity: 0, duration: 0.25, ease: 'power1.in', width: "7rem" })
    .to(element, { x: 0, opacity: 1, duration: 0.15, ease: 'power1.in', width: containerWidth })
    .to(element, { opacity: 0, duration: 0.01 });
};

const logoInAnimation = (element: HTMLElement): Timeline => {
  const tl = gsap.timeline({});

  return tl
    .to(element, {
      opacity: 1,
      scale: 1.2,
      duration: 1,
      ease: "power1.in"
    });
};

const logoOutAnimation = (element: HTMLElement): Timeline => {
  const tl = gsap.timeline({});
  return tl.to(element, { autoAlpha: 0, scale: 0.95, duration: 0.25 });
};

const titleAnimation = (location: string): Timeline => {
  const tl = gsap.timeline({});
  const titleElement = getElementByDataAnimation<HTMLElement>(location, "hero-title-cta");

  //gsap.set(titleElement, { y: -50 });

  const children = titleElement?.querySelectorAll('div');

  return tl.to(children, {
    opacity: "100%",
    //y: -100,
    duration: 0.75,
    scale: 1.5,
    ease: "power1.in",
    stagger: 0.75
  }).to(titleElement, { autoAlpha: 0 });
  
}

const contentAnimation = (location: string): Timeline => {
  const tl = gsap.timeline({});
  const contentElement = getElementByDataAnimation<HTMLElement>(location, "hero-content-cta");
  const children = contentElement?.querySelectorAll('span');

  gsap.set(contentElement, { y: -75 });

  return tl.to(children, {
    opacity: "100%",
    scale: 1.5,
    y: -100,
    duration: 0.75,
    ease: "power1.in",
    stagger: 0.75
  });
};

