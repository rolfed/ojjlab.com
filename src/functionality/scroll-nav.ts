export const initScrollNavigation = (): void => {
  const heroNav = document.querySelector('.hero-nav') as HTMLElement;
  const heroSection = document.querySelector('.hero') as HTMLElement;

  if (!heroNav || !heroSection) {
    return;
  }

  let isScrolled = false;

  function handleScroll(): void {
    // Calculate hero content height
    const heroContentHeight = heroSection.offsetHeight;
    const scrollY = window.scrollY;

    // Add scrolled class when user scrolls past the hero section
    if (scrollY > heroContentHeight && !isScrolled) {
      heroNav.classList.add('scrolled');
      isScrolled = true;
    } else if (scrollY <= heroContentHeight && isScrolled) {
      heroNav.classList.remove('scrolled');
      isScrolled = false;
    }
  }

  // Add scroll event listener with throttling for performance
  let ticking = false;
  function requestTick(): void {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });

  // Initialize on load
  handleScroll();
};
