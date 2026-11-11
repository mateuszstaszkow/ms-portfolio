'use client';

import React, { useEffect, useRef, useState } from 'react';

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Calls cb at most once per animation frame on scroll / resize. */
export function onScrollFrame(cb: () => void) {
  let raf = 0;
  const handler = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      cb();
    });
  };
  window.addEventListener('scroll', handler, { passive: true });
  window.addEventListener('resize', handler);
  handler();
  return () => {
    window.removeEventListener('scroll', handler);
    window.removeEventListener('resize', handler);
    if (raf) cancelAnimationFrame(raf);
  };
}

export function useInView<T extends Element>(
  once = true,
  margin = '0px 0px -10% 0px'
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin, threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, margin]);
  return [ref, inView] as const;
}

/** True once the boot overlay has finished (or was skipped). */
export function useBooted() {
  const [booted, setBooted] = useState(false);
  useEffect(() => {
    if (document.documentElement.dataset.booted === '1') {
      setBooted(true);
      return;
    }
    const on = () => setBooted(true);
    window.addEventListener('v2:booted', on);
    return () => window.removeEventListener('v2:booted', on);
  }, []);
  return booted;
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  kind?: 'up' | 'left' | 'right' | 'zoom' | 'clip';
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  kind = 'up'
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`rv rv-${kind} ${inView ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const GLYPHS = '!<>-_\\/[]{}=+*^?#01';

interface ScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  play?: boolean;
}

/** Decodes text out of random glyphs when it scrolls into view. */
export function Scramble({ text, className, delay = 0, play }: ScrambleProps) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const [out, setOut] = useState(text);
  const go = play ?? inView;

  useEffect(() => {
    if (!go || prefersReducedMotion()) return;
    let raf = 0;
    let start = 0;
    const dur = Math.min(1500, 400 + text.length * 38);
    const step = (t: number) => {
      if (!start) start = t + delay;
      const p = Math.max(0, (t - start) / dur);
      if (p >= 1) {
        setOut(text);
        return;
      }
      const n = Math.floor(p * text.length);
      let s = text.slice(0, n);
      for (let i = n; i < text.length; i++) {
        s +=
          text[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [go, text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/** Terminal style typewriter cycling through words. */
export function Typed({
  words,
  play = true
}: {
  words: string[];
  play?: boolean;
}) {
  const [out, setOut] = useState('');
  useEffect(() => {
    if (!play) return;
    if (prefersReducedMotion()) {
      setOut(words[0]);
      return;
    }
    let w = 0;
    let n = 0;
    let dir = 1;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[w];
      n += dir;
      setOut(word.slice(0, n));
      let wait = dir > 0 ? 55 + Math.random() * 50 : 24;
      if (dir > 0 && n >= word.length) {
        dir = -1;
        wait = 1700;
      } else if (dir < 0 && n <= 0) {
        dir = 1;
        w = (w + 1) % words.length;
        wait = 280;
      }
      timer = setTimeout(tick, wait);
    };
    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, [words, play]);
  return (
    <>
      <span>{out}</span>
      <span className="caret" aria-hidden="true" />
    </>
  );
}

export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const [val, setVal] = useState(to);
  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    let raf = 0;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = clamp((t - start) / 1400);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    setVal(0);
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

interface SectionHeadProps {
  idx: string;
  tag: string;
  title: string;
  sub?: string;
}

export function SectionHead({ idx, tag, title, sub }: SectionHeadProps) {
  return (
    <header className="sec-head">
      <Reveal kind="left">
        <div className="sec-tag">
          <span className="sec-idx">{idx}</span>
          <span className="sec-slash">{'//'}</span>
          <span>{tag}</span>
          <span className="sec-rule" />
        </div>
      </Reveal>
      <h2 className="sec-title">
        <Scramble text={title} />
      </h2>
      {sub && (
        <Reveal delay={120}>
          <p className="sec-sub">{sub}</p>
        </Reveal>
      )}
    </header>
  );
}
