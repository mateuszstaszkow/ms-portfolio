'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SectionHead } from './fx';

type Kind = 'bug' | 'fast' | 'tank' | 'feat' | 'coffee';

interface Ent {
  kind: Kind;
  x: number;
  y: number;
  vy: number;
  r: number;
  hp: number;
  t: number;
  seed: number;
  label: string;
  hit: number;
}

interface Part {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface Float {
  x: number;
  y: number;
  life: number;
  text: string;
  color: string;
}

const BUG_NAMES = [
  'NullPointerException',
  'undefined is not a function',
  'off-by-one',
  'CORS error',
  'flaky test',
  'merge conflict',
  'timezone bug',
  'works on my machine',
  'infinite loop',
  'NaN'
];
const FAST_NAMES = ['race condition', 'heisenbug', 'deadlock'];
const TANK_NAMES = ['memory leak', 'legacy monolith', 'tech debt'];
const FEATS = [
  'feat: dark mode',
  'feat: SSO',
  'feat: payments',
  'feat: export',
  'feat: search'
];

const COLORS: Record<Kind, string> = {
  bug: '#ff2e88',
  fast: '#ffd166',
  tank: '#a78bfa',
  feat: '#00ff9c',
  coffee: '#22d3ee'
};

const pick = <T,>(a: T[]) => a[(Math.random() * a.length) | 0];

function rank(score: number) {
  if (score >= 1500) return '10x legend';
  if (score >= 900) return 'staff engineer';
  if (score >= 500) return 'senior dev';
  if (score >= 200) return 'mid-level dev';
  return 'intern on day one';
}

/** Canvas minigame: squash bugs before they reach production. */
export default function BugHunt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'idle' | 'play' | 'over'>('idle');
  const [final, setFinal] = useState({ score: 0, squashed: 0 });
  const [best, setBest] = useState(0);
  const game = useRef({
    ents: [] as Ent[],
    parts: [] as Part[],
    floats: [] as Float[],
    score: 0,
    squashed: 0,
    combo: 0,
    comboT: 0,
    uptime: 100,
    time: 0,
    spawnT: 0,
    slow: 0,
    shake: 0,
    flash: 0,
    w: 0,
    h: 0
  });

  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem('v2-bughunt-best')) || 0);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const start = useCallback(() => {
    Object.assign(game.current, {
      ents: [],
      parts: [],
      floats: [],
      score: 0,
      squashed: 0,
      combo: 0,
      comboT: 0,
      uptime: 100,
      time: 0,
      spawnT: 0.4,
      slow: 0,
      shake: 0,
      flash: 0
    });
    setPhase('play');
  }, []);

  // Sizing + idle backdrop.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const g = game.current;
      g.w = canvas.clientWidth;
      g.h = canvas.clientHeight;
      canvas.width = g.w * dpr;
      canvas.height = g.h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawBackdrop(ctx, g.w, g.h, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Main loop.
  useEffect(() => {
    if (phase !== 'play') return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const g = game.current;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      last = performance.now();
    });
    io.observe(canvas);

    const spawn = (level: number) => {
      const r = Math.random();
      const kind: Kind =
        r < 0.06
          ? 'coffee'
          : r < 0.2
            ? 'feat'
            : r < 0.4
              ? 'fast'
              : r < 0.54 && level > 1
                ? 'tank'
                : 'bug';
      const scale = g.h / 480;
      const base = (52 + level * 9) * scale;
      const radius =
        kind === 'tank' ? 26 : kind === 'fast' ? 15 : kind === 'bug' ? 19 : 22;
      g.ents.push({
        kind,
        x: 40 + Math.random() * (g.w - 80),
        y: -30,
        vy:
          base *
          (kind === 'fast'
            ? 1.5
            : kind === 'tank'
              ? 0.62
              : kind === 'coffee'
                ? 1.25
                : 1),
        r: radius,
        hp: kind === 'tank' ? 3 : 1,
        t: 0,
        seed: Math.random() * 10,
        label:
          kind === 'bug'
            ? pick(BUG_NAMES)
            : kind === 'fast'
              ? pick(FAST_NAMES)
              : kind === 'tank'
                ? pick(TANK_NAMES)
                : kind === 'feat'
                  ? pick(FEATS)
                  : 'coffee',
        hit: 0
      });
    };

    const burst = (x: number, y: number, color: string, n: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = 60 + Math.random() * 220;
        g.parts.push({
          x,
          y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          life: 0.5 + Math.random() * 0.4,
          color
        });
      }
    };
    const say = (x: number, y: number, text: string, color: string) =>
      g.floats.push({ x, y, text, color, life: 1 });

    const over = () => {
      const result = { score: g.score, squashed: g.squashed };
      setFinal(result);
      setBest((b) => {
        const nb = Math.max(b, result.score);
        try {
          localStorage.setItem('v2-bughunt-best', String(nb));
        } catch {
          /* storage unavailable */
        }
        return nb;
      });
      setPhase('over');
    };

    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const pad = e.pointerType === 'mouse' ? 8 : 18;
      for (let i = g.ents.length - 1; i >= 0; i--) {
        const en = g.ents[i];
        if (Math.hypot(en.x - x, en.y - y) > en.r + pad) continue;
        if (en.kind === 'feat') {
          g.uptime -= 12;
          g.combo = 0;
          g.shake = 0.3;
          g.flash = 0.25;
          say(en.x, en.y, 'you deleted a feature!', '#ff5c6c');
          burst(en.x, en.y, COLORS.feat, 10);
          g.ents.splice(i, 1);
        } else if (en.kind === 'coffee') {
          g.slow = 4.5;
          g.uptime = Math.min(100, g.uptime + 8);
          say(en.x, en.y, 'caffeine: time slowed', COLORS.coffee);
          burst(en.x, en.y, COLORS.coffee, 14);
          g.ents.splice(i, 1);
        } else {
          en.hp -= 1;
          en.hit = 0.12;
          if (en.hp <= 0) {
            g.combo += 1;
            g.comboT = 1.6;
            const gain =
              (en.kind === 'tank' ? 30 : en.kind === 'fast' ? 20 : 10) *
              Math.min(g.combo, 8);
            g.score += gain;
            g.squashed += 1;
            say(
              en.x,
              en.y,
              `+${gain}${g.combo > 1 ? `  x${Math.min(g.combo, 8)}` : ''}`,
              '#d7e3e0'
            );
            burst(en.x, en.y, COLORS[en.kind], 18);
            g.shake = Math.max(g.shake, 0.12);
            g.ents.splice(i, 1);
          } else {
            burst(x, y, COLORS[en.kind], 5);
          }
        }
        return;
      }
      g.combo = 0;
      g.parts.push({ x, y, vx: 0, vy: 0, life: 0.25, color: '#6b7f7c' });
    };
    canvas.addEventListener('pointerdown', onDown);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible) return;

      g.time += dt;
      g.slow = Math.max(0, g.slow - dt);
      g.shake = Math.max(0, g.shake - dt);
      g.flash = Math.max(0, g.flash - dt);
      g.comboT -= dt;
      if (g.comboT <= 0) g.combo = 0;
      const d = dt * (g.slow > 0 ? 0.42 : 1);
      const level = 1 + Math.floor(g.time / 10);
      const prod = g.h - 44;

      g.spawnT -= d;
      if (g.spawnT <= 0) {
        spawn(level);
        g.spawnT =
          Math.max(0.26, 1.05 - level * 0.075) * (0.65 + Math.random() * 0.7);
      }

      for (let i = g.ents.length - 1; i >= 0; i--) {
        const en = g.ents[i];
        en.t += d;
        en.hit = Math.max(0, en.hit - dt);
        en.y += en.vy * d;
        if (en.kind === 'fast') en.x += Math.cos(en.t * 5 + en.seed) * 130 * d;
        else if (en.kind !== 'feat')
          en.x += Math.cos(en.t * 2 + en.seed) * 22 * d;
        en.x = Math.max(en.r, Math.min(g.w - en.r, en.x));
        if (en.y >= prod) {
          if (en.kind === 'feat') {
            g.score += 5;
            say(en.x, prod - 8, '+5 shipped', COLORS.feat);
          } else if (en.kind !== 'coffee') {
            g.uptime -= en.kind === 'tank' ? 22 : 12;
            g.shake = 0.35;
            g.flash = 0.3;
            g.combo = 0;
            say(en.x, prod - 8, 'bug in prod!', '#ff5c6c');
            burst(en.x, prod, '#ff5c6c', 12);
          }
          g.ents.splice(i, 1);
        }
      }
      for (let i = g.parts.length - 1; i >= 0; i--) {
        const p = g.parts[i];
        p.life -= dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 420 * dt;
        if (p.life <= 0) g.parts.splice(i, 1);
      }
      for (let i = g.floats.length - 1; i >= 0; i--) {
        const f = g.floats[i];
        f.life -= dt;
        f.y -= 34 * dt;
        if (f.life <= 0) g.floats.splice(i, 1);
      }

      // ---- render
      ctx.save();
      if (g.shake > 0) {
        ctx.translate(
          (Math.random() - 0.5) * g.shake * 40,
          (Math.random() - 0.5) * g.shake * 40
        );
      }
      drawBackdrop(ctx, g.w, g.h, g.time);
      if (g.slow > 0) {
        ctx.fillStyle = 'rgba(34, 211, 238, 0.06)';
        ctx.fillRect(0, 0, g.w, g.h);
      }
      for (const en of g.ents) drawEnt(ctx, en);
      for (const p of g.parts) {
        ctx.globalAlpha = Math.max(0, p.life * 1.6);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
      }
      ctx.globalAlpha = 1;
      ctx.font = '700 13px ui-monospace, Menlo, monospace';
      ctx.textAlign = 'center';
      for (const f of g.floats) {
        ctx.globalAlpha = Math.max(0, f.life);
        ctx.fillStyle = f.color;
        ctx.fillText(f.text, Math.max(70, Math.min(g.w - 70, f.x)), f.y);
      }
      ctx.globalAlpha = 1;
      if (g.flash > 0) {
        ctx.fillStyle = `rgba(255, 46, 80, ${g.flash * 0.7})`;
        ctx.fillRect(0, 0, g.w, g.h);
      }
      ctx.restore();

      // ---- hud
      ctx.textAlign = 'left';
      ctx.font = '700 14px ui-monospace, Menlo, monospace';
      ctx.fillStyle = '#00ff9c';
      ctx.fillText(`score ${String(g.score).padStart(5, '0')}`, 16, 26);
      ctx.fillStyle = '#6b7f7c';
      ctx.fillText(`lvl ${level}`, 150, 26);
      if (g.combo > 1) {
        ctx.fillStyle = '#ffd166';
        ctx.fillText(`combo x${Math.min(g.combo, 8)}`, 210, 26);
      }
      const bw = Math.min(180, g.w * 0.34);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#6b7f7c';
      ctx.fillText('uptime', g.w - bw - 26, 26);
      ctx.strokeStyle = 'rgba(0,255,156,.4)';
      ctx.strokeRect(g.w - bw - 16, 14, bw, 14);
      const up = Math.max(0, g.uptime) / 100;
      ctx.fillStyle = up > 0.5 ? '#00ff9c' : up > 0.25 ? '#ffd166' : '#ff2e88';
      ctx.fillRect(g.w - bw - 14, 16, (bw - 4) * up, 10);

      if (g.uptime <= 0) {
        cancelAnimationFrame(raf);
        over();
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
    };
  }, [phase]);

  return (
    <section id="game" className="sec game">
      <div className="wrap">
        <SectionHead
          idx="05"
          tag="./bug_hunt --play"
          title="Take a break. Squash some bugs."
          sub="Bugs are crawling towards production. Click or tap to squash them — but let the green features ship."
        />
        <div className={`game-frame ${phase === 'play' ? 'playing' : ''}`}>
          <div className="code-bar">
            <i />
            <i />
            <i />
            <span>bug_hunt.exe</span>
            <span className="game-best">
              best {String(best).padStart(5, '0')}
            </span>
          </div>
          <div className="game-area">
            <canvas ref={canvasRef} className="game-canvas" />
            {phase !== 'play' && (
              <div className="game-overlay">
                {phase === 'idle' ? (
                  <>
                    <div className="game-title glitch" data-text="BUG HUNT">
                      BUG HUNT
                    </div>
                    <ul className="game-rules">
                      <li>
                        <b style={{ color: COLORS.bug }}>●</b> squash bugs
                        before they hit production
                      </li>
                      <li>
                        <b style={{ color: COLORS.feat }}>■</b> never click a
                        feature — let it ship
                      </li>
                      <li>
                        <b style={{ color: COLORS.coffee }}>◆</b> grab coffee to
                        slow down time
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={start}
                    >
                      <span>▶ start debugging</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="game-title glitch" data-text="PROD IS DOWN">
                      PROD IS DOWN
                    </div>
                    <div className="game-score">
                      <div>
                        <span>score</span>
                        <b>{final.score}</b>
                      </div>
                      <div>
                        <span>bugs squashed</span>
                        <b>{final.squashed}</b>
                      </div>
                      <div>
                        <span>rank</span>
                        <b>{rank(final.score)}</b>
                      </div>
                    </div>
                    <p className="game-pitch">
                      I do this on real codebases too — with fewer explosions.
                    </p>
                    <div className="cta-row center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={start}
                      >
                        <span>↻ redeploy</span>
                      </button>
                      <a href="#contact" className="btn">
                        <span>hire the real thing</span>
                      </a>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function drawBackdrop(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number
) {
  ctx.fillStyle = '#050a0d';
  ctx.fillRect(-20, -20, w + 40, h + 40);
  ctx.strokeStyle = 'rgba(0, 255, 156, 0.06)';
  ctx.lineWidth = 1;
  const off = (t * 18) % 32;
  ctx.beginPath();
  for (let x = 0; x <= w; x += 32) {
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, h);
  }
  for (let y = off; y <= h; y += 32) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(w, y + 0.5);
  }
  ctx.stroke();
  const prod = h - 44;
  ctx.fillStyle = 'rgba(0, 255, 156, 0.07)';
  ctx.fillRect(0, prod, w, 44);
  ctx.strokeStyle = '#00ff9c';
  ctx.setLineDash([8, 6]);
  ctx.lineDashOffset = -t * 20;
  ctx.beginPath();
  ctx.moveTo(0, prod + 0.5);
  ctx.lineTo(w, prod + 0.5);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '700 12px ui-monospace, Menlo, monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#00ff9c';
  ctx.fillText('▼ PRODUCTION ▼', w / 2, prod + 27);
}

function drawEnt(ctx: CanvasRenderingContext2D, en: Ent) {
  const color = en.hit > 0 ? '#ffffff' : COLORS[en.kind];
  ctx.save();
  ctx.translate(en.x, en.y);
  ctx.shadowColor = COLORS[en.kind];
  ctx.shadowBlur = 14;
  if (en.kind === 'feat') {
    ctx.font = '700 12px ui-monospace, Menlo, monospace';
    const tw = ctx.measureText(en.label).width + 22;
    ctx.fillStyle = 'rgba(0, 255, 156, 0.14)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-tw / 2, -14, tw, 28, 6);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(en.label, 0, 4);
    ctx.restore();
    return;
  }
  if (en.kind === 'coffee') {
    ctx.strokeStyle = color;
    ctx.fillStyle = 'rgba(34, 211, 238, 0.18)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(-11, -8, 20, 20, 4);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(11, 2, 6, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    ctx.lineWidth = 2;
    for (let i = -1; i <= 1; i++) {
      const sway = Math.sin(en.t * 6 + i) * 2;
      ctx.beginPath();
      ctx.moveTo(i * 6 - 1, -13);
      ctx.quadraticCurveTo(i * 6 - 1 + sway, -18, i * 6 - 1, -23);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }
  const r = en.r;
  const wig = Math.sin(en.t * (en.kind === 'fast' ? 22 : 12)) * 0.35;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  for (const side of [-1, 1]) {
    for (let k = -1; k <= 1; k++) {
      const a = k * 0.55 + wig * (k === 0 ? -1 : 1);
      ctx.beginPath();
      ctx.moveTo(side * r * 0.5, k * r * 0.35);
      ctx.lineTo(
        side * (r * 0.5 + Math.cos(a) * r * 0.75),
        k * r * 0.35 + Math.sin(a) * r * 0.75
      );
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(side * r * 0.2, r * 0.7);
    ctx.quadraticCurveTo(
      side * r * 0.5,
      r * 1.15,
      side * r * 0.6 + wig * 4,
      r * 1.35
    );
    ctx.stroke();
  }
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(0, -r * 0.1, r * 0.62, r * 0.82, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, r * 0.72, r * 0.38, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(5, 10, 13, 0.55)';
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.85);
  ctx.lineTo(0, r * 0.45);
  ctx.stroke();
  ctx.fillStyle = '#050a0d';
  ctx.beginPath();
  ctx.arc(-r * 0.16, r * 0.8, r * 0.09, 0, Math.PI * 2);
  ctx.arc(r * 0.16, r * 0.8, r * 0.09, 0, Math.PI * 2);
  ctx.fill();
  if (en.kind === 'tank' && en.hp > 0) {
    ctx.fillStyle = '#050a0d';
    ctx.font = '700 12px ui-monospace, Menlo, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(String(en.hp), 0, 2);
  }
  ctx.font = '11px ui-monospace, Menlo, monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(215, 227, 224, 0.75)';
  ctx.fillText(en.label, 0, -r - 8);
  ctx.restore();
}
