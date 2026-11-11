'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BASE_PATH } from '@/components/shared/utils/basePath';
import { clamp, onScrollFrame, prefersReducedMotion } from './fx';

const BOOT_LINES = [
  '[ ok ] mounting /dev/portfolio',
  '[ ok ] loading experience.log ........ 10 companies',
  '[ ok ] linking research.bib .......... 4 papers',
  '[ ok ] spawning animated_dev.svg',
  '[ ok ] injecting bugs into minigame',
  '[ ok ] handshake with visitor',
  'ACCESS GRANTED — welcome.'
];

/** Short terminal boot sequence shown once per session. */
export function Boot() {
  const [lines, setLines] = useState(0);
  const [state, setState] = useState<'run' | 'out' | 'gone'>('run');

  useEffect(() => {
    const finish = (instant: boolean) => {
      document.documentElement.dataset.booted = '1';
      window.dispatchEvent(new Event('v2:booted'));
      try {
        sessionStorage.setItem('v2-booted', '1');
      } catch {
        /* storage unavailable */
      }
      if (instant) {
        setState('gone');
        return;
      }
      setState('out');
      setTimeout(() => setState('gone'), 650);
    };

    let seen = false;
    try {
      seen = sessionStorage.getItem('v2-booted') === '1';
    } catch {
      /* storage unavailable */
    }
    if (seen || prefersReducedMotion()) {
      finish(true);
      return;
    }

    let i = 0;
    let done = false;
    const end = () => {
      if (done) return;
      done = true;
      clearInterval(timer);
      finish(false);
    };
    const timer = setInterval(() => {
      i += 1;
      setLines(i);
      if (i >= BOOT_LINES.length) {
        clearInterval(timer);
        setTimeout(end, 420);
      }
    }, 150);
    window.addEventListener('keydown', end);
    window.addEventListener('pointerdown', end);
    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', end);
      window.removeEventListener('pointerdown', end);
    };
  }, []);

  if (state === 'gone') return null;
  return (
    <div
      className={`boot ${state === 'out' ? 'boot-out' : ''}`}
      aria-hidden="true"
    >
      <div className="boot-box">
        <div className="boot-title">ms://v2 — boot</div>
        {BOOT_LINES.slice(0, lines).map((l, i) => (
          <div key={l} className={i === BOOT_LINES.length - 1 ? 'boot-ok' : ''}>
            {l}
          </div>
        ))}
        <div className="boot-bar">
          <span style={{ width: `${(lines / BOOT_LINES.length) * 100}%` }} />
        </div>
        <div className="boot-skip">press any key to skip</div>
      </div>
    </div>
  );
}

const NAV = [
  { id: 'skills', label: 'skills' },
  { id: 'experience', label: 'experience' },
  { id: 'work', label: 'work' },
  { id: 'research', label: 'research' },
  { id: 'game', label: 'game' },
  { id: 'contact', label: 'contact' }
];

/** Fixed top navigation, scroll progress and section readout. */
export function Hud() {
  const bar = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState('top');
  const [solid, setSolid] = useState(false);

  useEffect(
    () =>
      onScrollFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? clamp(window.scrollY / max) : 0;
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
        if (pct.current) {
          pct.current.textContent = String(Math.round(p * 100)).padStart(
            3,
            '0'
          );
        }
        setSolid(window.scrollY > 40);
        let current = 'top';
        for (const n of NAV) {
          const el = document.getElementById(n.id);
          if (
            el &&
            el.getBoundingClientRect().top <= window.innerHeight * 0.45
          ) {
            current = n.id;
          }
        }
        setActive(current);
      }),
    []
  );

  return (
    <>
      <nav className={`hud ${solid ? 'hud-solid' : ''}`}>
        <a href="#top" className="hud-logo">
          <span className="hud-logo-mark">ms</span>
          <span className="hud-logo-rest">{'://v2'}</span>
        </a>
        <div className="hud-links">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? 'on' : ''}
            >
              {n.label}
            </a>
          ))}
        </div>
        <a href={`${BASE_PATH}/`} className="hud-v1">
          v1 ↗
        </a>
        <div className="hud-progress">
          <div ref={bar} />
        </div>
      </nav>
      <div className="readout" aria-hidden="true">
        <span>scroll</span>
        <span ref={pct} className="readout-num">
          000
        </span>
        <span>%</span>
        <span className="readout-sec">
          {'// '}
          {active}
        </span>
      </div>
    </>
  );
}

/** Trailing ring that follows the pointer on precise-pointer devices. */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion())
      return;
    const el = ring.current;
    if (!el) return;
    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let raf = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.classList.add('show');
      const target = e.target as Element | null;
      el.classList.toggle(
        'hot',
        !!target?.closest?.('a, button, [data-hot], input, canvas')
      );
    };
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ring} className="cursor-ring" aria-hidden="true" />;
}

const RAIN =
  'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF<>/{}[]=+*;';

/** Code rain background, paused whenever it is off screen. */
export function MatrixCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduced = prefersReducedMotion();
    const size = 16;
    let w = 0;
    let h = 0;
    let drops: number[] = [];
    let raf = 0;
    let last = 0;
    let visible = true;
    let mx = -9999;
    let my = -9999;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${size - 2}px monospace`;
      const cols = Math.ceil(w / size);
      drops = Array.from({ length: cols }, () => Math.random() * -60);
      ctx.fillStyle = '#04070a';
      ctx.fillRect(0, 0, w, h);
    };

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || t - last < 48) return;
      last = t;
      ctx.fillStyle = 'rgba(4, 7, 10, 0.14)';
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < drops.length; i++) {
        const x = i * size;
        const y = drops[i] * size;
        const near = Math.hypot(x - mx, y - my) < 130;
        ctx.fillStyle = near
          ? '#ff2e88'
          : Math.random() > 0.94
            ? '#d6fff0'
            : 'rgba(0, 255, 156, 0.75)';
        ctx.fillText(RAIN[(Math.random() * RAIN.length) | 0], x, y);
        drops[i] = y > h && Math.random() > 0.975 ? 0 : drops[i] + 1;
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    if (reduced) {
      for (let k = 0; k < 40; k++) draw(k * 100);
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} className="matrix" aria-hidden="true" />;
}
