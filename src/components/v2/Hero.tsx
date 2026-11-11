'use client';

import React, { useEffect, useRef } from 'react';
import { BASE_PATH } from '@/components/shared/utils/basePath';
import { MatrixCanvas } from './Chrome';
import { MARQUEE_A, MARQUEE_B, SKILLS } from './data';
import {
  clamp,
  CountUp,
  onScrollFrame,
  Reveal,
  Scramble,
  SectionHead,
  Typed,
  useBooted
} from './fx';

export interface Stats {
  years: number;
  companies: number;
  countries: number;
  projects: number;
  papers: number;
}

const ROLES = [
  'full_stack_engineer',
  'ai_ml_researcher',
  'web3_builder',
  'tech_lead',
  'robotics_tinkerer'
];

export function Hero({ stats }: { stats: Stats }) {
  const booted = useBooted();
  const inner = useRef<HTMLDivElement>(null);

  // Parallax the hero content away while scrolling out.
  useEffect(
    () =>
      onScrollFrame(() => {
        const el = inner.current;
        if (!el) return;
        const p = clamp(window.scrollY / window.innerHeight);
        el.style.setProperty('--hp', p.toFixed(3));
      }),
    []
  );

  const items = [
    { n: stats.years, s: '+', l: 'years shipping' },
    { n: stats.companies, s: '', l: 'companies' },
    { n: stats.countries, s: '', l: 'countries' },
    { n: stats.projects, s: '', l: 'projects' },
    { n: stats.papers, s: '', l: 'publications' }
  ];

  return (
    <section id="top" className={`hero ${booted ? 'hero-on' : ''}`}>
      <MatrixCanvas />
      <div className="hero-floor" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-inner" ref={inner}>
        <div className="hero-copy">
          <div className="hero-tag">
            <span className="dot" />
            <span>open to new collaborations</span>
            <span className="hero-tag-dim">{'// shipping since 2016'}</span>
          </div>

          <h1 className="hero-name" aria-label="Mateusz Staszkow">
            <span className="glitch" data-text="MATEUSZ" aria-hidden="true">
              <Scramble text="MATEUSZ" play={booted} />
            </span>
            <span
              className="glitch outline"
              data-text="STASZKOW"
              aria-hidden="true"
            >
              <Scramble text="STASZKOW" play={booted} delay={250} />
            </span>
          </h1>

          <p className="hero-role">
            <span className="prompt">{'>'}</span>{' '}
            <Typed words={ROLES} play={booted} />
          </p>

          <p className="hero-lede">
            I design, build and ship whole products — low-latency banking
            systems, blockchain dashboards and AI tooling — for teams across{' '}
            {stats.countries} countries. Backed by peer-reviewed ML research and
            a robotics background.
          </p>

          <div className="cta-row">
            <a href="#contact" className="btn btn-primary" data-hot>
              <span>hire_me()</span>
            </a>
            <a
              href={`${BASE_PATH}/mateusz-staszkow-cv.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <span>./resume.pdf</span>
            </a>
            <a href="#game" className="btn btn-ghost">
              <span>▶ play bug_hunt</span>
            </a>
          </div>
        </div>

        <div className="code-card" aria-hidden="true">
          <div className="code-bar">
            <i />
            <i />
            <i />
            <span>mateusz.ts</span>
          </div>
          <pre>
            <code>
              <span className="ln">
                <b className="k">const</b> mateusz <b className="k">=</b> {'{'}
              </span>
              <span className="ln">
                {'  '}role: <b className="s">{"'Full Stack Engineer'"}</b>,
              </span>
              <span className="ln">
                {'  '}since: <b className="n">2016</b>,
              </span>
              <span className="ln">
                {'  '}front: [<b className="s">{"'Angular'"}</b>,{' '}
                <b className="s">{"'React'"}</b>, <b className="s">{"'Vue'"}</b>
                ],
              </span>
              <span className="ln">
                {'  '}back: [<b className="s">{"'Spring'"}</b>,{' '}
                <b className="s">{"'Nest'"}</b>, <b className="s">{"'Go'"}</b>],
              </span>
              <span className="ln">
                {'  '}cloud: [<b className="s">{"'AWS'"}</b>,{' '}
                <b className="s">{"'GCP'"}</b>, <b className="s">{"'Azure'"}</b>
                ],
              </span>
              <span className="ln">
                {'  '}research: [<b className="s">{"'NLP'"}</b>,{' '}
                <b className="s">{"'LLMs'"}</b>],
              </span>
              <span className="ln">
                {'  '}awards: <b className="n">{'3'}</b>,{' '}
                <b className="c">{'// R&D, paper, hackathon…'}</b>
              </span>
              <span className="ln">
                {'  '}ships: <b className="k">true</b>
              </span>
              <span className="ln">{'};'}</span>
            </code>
          </pre>
        </div>
      </div>

      <div className="stats">
        {items.map((it, i) => (
          <div
            key={it.l}
            className="stat"
            style={{ transitionDelay: `${900 + i * 90}ms` }}
          >
            <div className="stat-n">
              <CountUp to={it.n} suffix={it.s} />
            </div>
            <div className="stat-l">{it.l}</div>
          </div>
        ))}
      </div>

      <a href="#skills" className="scroll-cue" aria-label="Scroll down">
        <span>scroll</span>
        <i />
      </a>
    </section>
  );
}

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const row = [...items, ...items, ...items];
  return (
    <div className={`marquee ${reverse ? 'rev' : ''}`} aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i}>
            {t}
            <em>{'/'}</em>
          </span>
        ))}
      </div>
    </div>
  );
}

function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(0.5 - py) * 12}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * 14}deg`);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };
  return (
    <div
      ref={ref}
      className="tilt"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="sec skills">
      <div className="wrap">
        <SectionHead
          idx="01"
          tag="skills.json"
          title="Three stacks. One engineer."
          sub="Most developers pick a lane. I ship across the whole machine — from a browser pixel down to a microcontroller pin."
        />
        <div className="skill-grid">
          {SKILLS.map((m, i) => (
            <Reveal key={m.id} delay={i * 140} kind="zoom">
              <Tilt>
                <div className="skill-card">
                  <div className="code-bar">
                    <i />
                    <i />
                    <i />
                    <span>{m.file}</span>
                  </div>
                  <div className="skill-body">
                    <div className="skill-idx">0{i + 1}</div>
                    <h3>{m.title}</h3>
                    <p>{m.blurb}</p>
                    <ul>
                      {m.rows.map((row, r) => (
                        <li key={r} style={{ ['--i' as string]: r }}>
                          <span className="skill-ln">
                            {String(r + 1).padStart(2, '0')}
                          </span>
                          {row.map((t) => (
                            <span key={t} className="chip">
                              {t}
                            </span>
                          ))}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
      <Marquee items={MARQUEE_A} />
      <Marquee items={MARQUEE_B} reverse />
    </section>
  );
}
