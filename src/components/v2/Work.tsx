'use client';

import React, { useEffect, useRef } from 'react';
import { BASE_PATH } from '@/components/shared/utils/basePath';
import { Project } from '@/components/Projects/model/projects.interface';
import { clamp, onScrollFrame, Reveal, SectionHead } from './fx';

const techList = (t: string, max: number) =>
  t
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, max);

/** Pinned section: vertical scroll drives a horizontal track of highlights. */
export function Work({
  projects,
  total
}: {
  projects: Project[];
  total: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onScrollFrame(() => {
        const w = wrap.current;
        const t = track.current;
        if (!w || !t) return;
        const r = w.getBoundingClientRect();
        const dist = r.height - window.innerHeight;
        const p = dist > 0 ? clamp(-r.top / dist) : 0;
        const max = Math.max(0, t.scrollWidth - window.innerWidth);
        t.style.transform = `translate3d(${-p * max}px, 0, 0)`;
        t.style.setProperty('--tp', p.toFixed(3));
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      }),
    []
  );

  return (
    <section
      id="work"
      className="work"
      ref={wrap}
      style={{ height: `${projects.length * 55 + 160}vh` }}
    >
      <div className="work-pin">
        <div className="wrap work-head">
          <SectionHead
            idx="03"
            tag="git log --highlights"
            title="Selected builds."
            sub={`Awards, theses and flagship products out of ${total} shipped projects.`}
          />
        </div>
        <div className="work-track" ref={track}>
          {projects.map((p, i) => (
            <article key={p.title} className="work-card" data-hot>
              <div className="work-hash">
                <span>commit</span>{' '}
                {((i + 3) * 2654435761).toString(16).slice(0, 7)}
              </div>
              <div className="work-n">{String(i + 1).padStart(2, '0')}</div>
              <h3>{p.title}</h3>
              <div className="work-place">
                @ {p.place} <span>{p.dates}</span>
              </div>
              <div className="chips">
                {techList(p.technologies, 6).map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
          <a href={`${BASE_PATH}/projects/`} className="work-card work-all">
            <div className="work-n">{total}</div>
            <h3>See every project</h3>
            <div className="work-place">cd ../projects ↗</div>
          </a>
        </div>
        <div className="work-bar">
          <div ref={bar} />
        </div>
      </div>
    </section>
  );
}

export function Research({ papers }: { papers: Project[] }) {
  return (
    <section id="research" className="sec research">
      <div className="wrap">
        <SectionHead
          idx="04"
          tag="research.bib"
          title="Peer-reviewed, not just prompted."
          sub="NLP research on sentiment, political polarization and the limits of large language models — published at IEEE, LREC, LTC and MDPI."
        />
        <div className="paper-grid">
          {papers.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 110}
              kind={i % 2 ? 'right' : 'left'}
            >
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="paper"
              >
                <div className="paper-top">
                  <span className="paper-idx">[{i + 1}]</span>
                  <span className="paper-date">{p.dates}</span>
                </div>
                <h3>{p.title}</h3>
                <div className="paper-place">{p.place}</div>
                <div className="paper-foot">
                  <span>{techList(p.technologies, 3).join(' · ')}</span>
                  <span className="paper-open">read ↗</span>
                </div>
                <i className="paper-scan" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
