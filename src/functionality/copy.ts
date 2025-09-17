import { getAnimationSelector } from '../animations/data-animation';
import gsap from 'gsap';

export const copyPhone = (document: Document) => {
  const copyButtonSelector = getAnimationSelector('location-phone-copy');
  const copyButton =
    document.querySelector<HTMLButtonElement>(copyButtonSelector);

  if (!copyButton) {
    console.warn('Location: unable to find copy button for phone number');
    return;
  }

  const el = document.createElement('p');
  el.className = 'text-center';
  el.textContent = 'Phone number copied to your clipboard!';

  copyButton?.addEventListener('click', () => {
    navigator.clipboard?.writeText('(503) 308-8455');
    notifyAnimation(document, el);
  });
};

type Timeline = gsap.core.Timeline;

export const notifyAnimation = (document: Document, element: HTMLElement) => {
  const notifySelector = getAnimationSelector('notify');
  const notifyElement = document.querySelector<HTMLElement>(notifySelector);
  const notifyContainerSelector = getAnimationSelector('notify-container');
  const notifyContainerElement = document.querySelector<HTMLElement>(
    notifyContainerSelector
  );

  if (!notifyElement) {
    console.warn('Notify: not found');
    return;
  }

  if (!notifyContainerElement) {
    console.warn('Notify: container not found');
    return;
  }

  notifyContainerElement.appendChild(element);

  const timeline: Timeline = gsap.timeline({
    defaults: {
      ease: 'power3.out',
    },
  });

  const holdInSeconds = '+=1.5';

  timeline
    .to(notifyElement, { y: 0, duration: 0.4 })
    .to(
      notifyElement,
      { y: '100%', duration: 0.35, ease: 'power2.in' },
      holdInSeconds
    )
    .add(() => element.remove());
};
