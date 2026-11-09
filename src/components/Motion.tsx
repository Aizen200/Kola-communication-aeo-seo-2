'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '@/lib/smooth';

const clamp = (n: number) => Math.min(1, Math.max(0, n));

// Page-wide motion: smooth scrolling, reveal on enter, scroll-driven word reveal,
// timeline progress and hero parallax. Everything stays visible without it.
export default function Motion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealed = document.querySelectorAll<HTMLElement>('.label, .h-section, [data-reveal]');

    if (reduced) {
      revealed.forEach((el) => el.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('in');
          observer.unobserve(e.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    revealed.forEach((el) => observer.observe(el));

    const wordBlocks = Array.from(document.querySelectorAll<HTMLElement>('[data-words]')).map((el) => ({
      el,
      words: Array.from(el.querySelectorAll<HTMLElement>('[data-w]')),
    }));
    const progress = document.querySelectorAll<HTMLElement>('[data-progress]');
    const parallax = document.querySelectorAll<HTMLElement>('[data-parallax]');

    const update = () => {
      const vh = window.innerHeight;
      wordBlocks.forEach(({ el, words }) => {
        const rect = el.getBoundingClientRect();
        const lit = clamp((vh * 0.85 - rect.top) / (rect.height + vh * 0.35)) * words.length;
        words.forEach((w, i) => {
          w.style.opacity = String(0.22 + 0.78 * clamp(lit - i));
        });
      });
      progress.forEach((el) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--p', String(clamp((vh * 0.55 - rect.top) / rect.height)));
      });
      if (window.scrollY < vh * 1.2) {
        parallax.forEach((el) => {
          const [x, y] = (el.dataset.parallax || '0,0').split(',').map(Number);
          el.style.translate = `${window.scrollY * x}px ${window.scrollY * y}px`;
        });
      }
    };

    const lenis = new Lenis({ lerp: 0.1 });
    setLenis(lenis);
    lenis.on('scroll', update);
    window.addEventListener('resize', update);
    update();

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

    // In-page links scroll through Lenis so they share its easing
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const target = link && document.querySelector<HTMLElement>(link.getAttribute('href') || '');
      if (!target) return;
      e.preventDefault();
      lenis.start();
      lenis.scrollTo(target);
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onClick);
      window.removeEventListener('resize', update);
      observer.disconnect();
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
