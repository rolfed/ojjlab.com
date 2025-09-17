import gsap from 'gsap';
import type { Timeline } from '../model/gsap';
import { getElementByDataAnimation } from './data-animation';

export const heroAnimation = (_doc: Document): Timeline => {
  const location = 'hero';

  const container = getElementByDataAnimation<HTMLElement>(location, 'hero');
  const containerWidth = container?.getBoundingClientRect().width ?? 0;

  /* Elements */
  const logoElement = getElementByDataAnimation<HTMLElement>(
    location,
    'hero-logo'
  );
  const revealBarElement = getElementByDataAnimation<HTMLElement>(
    location,
    'hero-reveal-bar'
  );

  const tl: Timeline = gsap.timeline({
    onStart: () => window.scrollTo({ top: 0, behavior: 'auto' }),
  });

  if (!logoElement || !revealBarElement) {
    console.warn('Missing hero elements');
    return tl;
  }

  /* Animations */
  tl.addLabel('Hero')
    .add(barAnimation(revealBarElement, containerWidth), 'start')
    .add(logoInAnimation(logoElement), 'start+=0.5')
    .add(logoOutAnimation(logoElement), 'start+=2')
    .add(titleAnimation(location), 'start+=3')
    .add(contentAnimation(location), 'start+=6.5')
    .add(heroEnterLayout(location), 'start+=10');

  return tl;
};

const barAnimation = (
  element: HTMLElement,
  containerWidth: number
): Timeline => {
  const tl = gsap.timeline({});
  return tl
    .to(element, {
      x: containerWidth,
      opacity: 0,
      duration: 0.25,
      ease: 'power1.in',
      width: '7rem',
    })
    .to(element, {
      x: 0,
      opacity: 1,
      duration: 0.15,
      ease: 'power1.in',
      width: containerWidth,
    })
    .to(element, { opacity: 0, duration: 0.01 });
};

const logoInAnimation = (element: HTMLElement): Timeline => {
  const tl = gsap.timeline({});

  return tl.to(element, {
    opacity: 1,
    scale: 1.2,
    duration: 1,
    ease: 'power1.in',
  });
};

const logoOutAnimation = (element: HTMLElement): Timeline => {
  const tl = gsap.timeline({});
  return tl.to(element, { autoAlpha: 0, scale: 2, y: -16, duration: 0.75 });
};

const _textAnimation = (children: Array<HTMLElement>): Timeline => {
  const tl = gsap.timeline({});

  if (!children?.length) {
    return tl;
  }

  tl.to(children, {
    keyframes: [
      { autoAlpha: 1, y: 0, scale: 1.5, duration: 0.5, ease: 'power2.in' }, // show
      { scale: 1, duration: 0.5, ease: 'back.out(1.6)' },
      { duration: 1, delay: 0.2 },
      { autoAlpha: 0, scale: 2, y: -5, duration: 0.3, ease: 'power2.in' }, // disapear
    ],
    stagger: { each: 0.35, from: 'start' },
  });

  return tl;
};

const titleAnimation = (location: string): Timeline => {
  const titleElement = getElementByDataAnimation<HTMLElement>(
    location,
    'hero-title-cta'
  );
  gsap.set(titleElement, { opacity: '100%' });
  const children = titleElement?.querySelectorAll('div');
  return _textAnimation(Array.from(children || []));
};

const contentAnimation = (location: string): Timeline => {
  const contentElement = getElementByDataAnimation<HTMLElement>(
    location,
    'hero-content-cta'
  );
  const children = contentElement?.querySelectorAll('span');
  return _textAnimation(Array.from(children || []));
};

const heroEnterLayout = (location: string): Timeline => {
  const tl = gsap.timeline({});
  const hero = getElementByDataAnimation<HTMLElement>(location, 'hero');
  const root = getElementByDataAnimation<HTMLElement>(location, 'root');
  const heroContent = getElementByDataAnimation<HTMLElement>(
    location,
    'hero-content'
  );
  const nav = getElementByDataAnimation<HTMLElement>(location, 'nav');
  const container = getElementByDataAnimation<HTMLElement>(
    location,
    'hero-overlay'
  );
  const overlayContent = getElementByDataAnimation<HTMLElement>(
    location,
    'hero-overlay-content'
  );
  const revealBar = getElementByDataAnimation<HTMLElement>(
    location,
    'hero-reveal-bar'
  );

  if (!hero || !root || !container || !nav || !overlayContent || !revealBar) {
    return tl;
  }

  const getHeight = window.innerWidth >= 768 ? '100vh' : '100dvh';

  tl.to(hero, {
    ['height']: () => getHeight,
    duration: 0.7,
    ease: 'power2.inOut',
  })
    .add(() => {
      container.style.setProperty('height', getHeight);
      container.style.setProperty('min-height', getHeight);

      nav.removeAttribute('hidden');
      revealBar.classList.add('hidden');

      overlayContent.classList.add('hidden');
      hero.classList.add('hero-entered', '__border-b');
      root.classList.remove('overflow-hidden');
    })
    .to([heroContent, nav], {
      opacity: '100%',
      visibility: 'visible',
    });

  return tl;
};
