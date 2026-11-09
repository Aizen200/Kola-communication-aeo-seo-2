import type Lenis from 'lenis';

// Shared handle to the smooth-scroll instance (null when reduced motion is on)
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;

export function scrollToElement(el: HTMLElement) {
  if (instance) instance.scrollTo(el);
  else el.scrollIntoView();
}
