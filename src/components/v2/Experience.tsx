'use client';

import React, { useEffect, useRef, useState } from 'react';
import { COMPANIES } from './data';
import { clamp, onScrollFrame, Scramble, SectionHead } from './fx';
import { Scene } from './Scenes';

/**
 * Scrollytelling: the stage on the left stays pinned while company cards
 * scroll past; the animated developer switches scene with the active card.
 */
export default function Experience() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);

  useEffect(
    () =>
      onScrollFrame(() => {
        const vh = window.innerHeight;
        const line = window.innerWidth < 900 ? vh * 0.74 : vh * 0.5;
        let best = 0;
        let bestDist = Infinity;
        let prog = 0;
        cards.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - line);
          if (d < bestDist) {
            bestDist = d;
            best = i;
            prog = clamp((line - r.top) / r.height);
          }
        });
        setActive(best);
        stage.current?.style.setProperty('--p', (prog - 0.5).toFixed(3));
        if (rail.current) {
          const total = (best + prog) / COMPANIES.length;
          rail.current.style.transform = `scaleX(${clamp(total)})`;
        }
      }),
    []
  );

  const go = (i: number) =>
    cards.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const c = COMPANIES[active];
  const style = { ['--ac' as string]: c.accent };

  return (
    <section id="experience" className="sec exp">
      <div className="wrap">
        <SectionHead
          idx="02"
          tag="experience.log"
          title="Ten companies. Scroll the story."
          sub="Banks, insurers, big tech, a crypto startup, a research lab — and a business of my own. Watch the dev at work as you scroll."
        />
      </div>

      <div className="exp-grid" style={style}>
        <div className="stage-wrap">
          <div className="stage" ref={stage}>
            <div className="stage-top">
              <span className="rec">
                <i /> REC
              </span>
              <span>
                scene {String(active + 1).padStart(2, '0')}/{COMPANIES.length}
              </span>
              <span className="stage-host">{c.host}</span>
            </div>
            <div className="stage-view">
              <div className="stage-grid" aria-hidden="true" />
              <div key={c.id} className="scene-in">
                <Scene id={c.scene} />
              </div>
              <i className="corner tl" />
              <i className="corner tr" />
              <i className="corner bl" />
              <i className="corner br" />
            </div>
            <div className="stage-bottom">
              <span className="stage-cap">
                <span className="prompt">{'>'}</span>{' '}
                <Scramble key={c.id} text={c.caption} play />
              </span>
              <span className="stage-loc">
                [{c.cc}] {c.where}
              </span>
            </div>
            <div className="stage-rail">
              <div className="stage-rail-fill" ref={rail} />
              {COMPANIES.map((co, i) => (
                <button
                  key={co.id}
                  type="button"
                  className={i === active ? 'on' : i < active ? 'past' : ''}
                  style={{ left: `${((i + 0.5) / COMPANIES.length) * 100}%` }}
                  onClick={() => go(i)}
                  aria-label={`Jump to ${co.name}`}
                  title={co.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="exp-cards">
          {COMPANIES.map((co, i) => (
            <article
              key={co.id}
              id={`exp-${co.id}`}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className={`exp-card ${i === active ? 'on' : ''}`}
              style={{ ['--ac' as string]: co.accent }}
            >
              <div className="exp-card-in">
                <div className="exp-meta">
                  <span className="exp-idx">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="exp-years">{co.years}</span>
                  <span className="exp-cc">
                    [{co.cc}] {co.where}
                  </span>
                </div>
                <div className="exp-cmd">
                  <span className="prompt">$</span> ssh mateusz@{co.host}
                </div>
                <h3 className="exp-name glitch-hover" data-text={co.name}>
                  {co.name}
                </h3>
                <div className="exp-role">{co.role}</div>
                {co.highlight && (
                  <div className="exp-high">
                    <span>★</span> {co.highlight}
                  </div>
                )}
                <p className="exp-desc">{co.desc}</p>
                <div className="chips">
                  {co.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={co.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="exp-link"
                >
                  open project <span>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
