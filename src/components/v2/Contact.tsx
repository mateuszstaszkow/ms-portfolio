'use client';

import React, { useRef, useState } from 'react';
import { BASE_PATH } from '@/components/shared/utils/basePath';
import { COMPANIES, LINKS, SKILLS } from './data';
import { Reveal, Scramble } from './fx';

interface Line {
  kind: 'in' | 'out' | 'err' | 'ok';
  text: string;
  href?: string;
}

const HELP: Line[] = [
  { kind: 'out', text: 'available commands:' },
  { kind: 'out', text: '  whoami      who is this guy' },
  { kind: 'out', text: '  skills      list the stack' },
  { kind: 'out', text: '  experience  list companies' },
  { kind: 'out', text: '  contact     how to reach me' },
  { kind: 'out', text: '  resume      open the CV' },
  { kind: 'out', text: '  game        jump to bug_hunt' },
  { kind: 'out', text: '  sudo hire   you know you want to' },
  { kind: 'out', text: '  clear       wipe the screen' }
];

function run(raw: string): Line[] | 'clear' {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case '':
      return [];
    case 'help':
    case '?':
    case 'ls':
      return HELP;
    case 'whoami':
      return [
        { kind: 'out', text: 'Mateusz Staszkow — full stack engineer.' },
        {
          kind: 'out',
          text: 'Ships web products end to end, publishes NLP research,'
        },
        { kind: 'out', text: 'and builds robots when nobody is watching.' }
      ];
    case 'skills':
      return SKILLS.map((s) => ({
        kind: 'out' as const,
        text: `${s.file.padEnd(14)} ${s.rows.flat().join(', ')}`
      }));
    case 'experience':
      return COMPANIES.map((c) => ({
        kind: 'out' as const,
        text: `[${c.cc}] ${c.name.padEnd(20)} ${c.role}`,
        href: `#exp-${c.id}`
      }));
    case 'contact':
      return [
        {
          kind: 'ok',
          text: `mail      ${LINKS.email}`,
          href: `mailto:${LINKS.email}`
        },
        {
          kind: 'ok',
          text: 'linkedin  /in/mateusz-staszków',
          href: LINKS.linkedin
        },
        { kind: 'ok', text: 'github    /mateuszstaszkow', href: LINKS.github }
      ];
    case 'resume':
    case 'cv':
      window.open(`${BASE_PATH}/mateusz-staszkow-cv.pdf`, '_blank', 'noopener');
      return [{ kind: 'ok', text: 'opening mateusz-staszkow-cv.pdf …' }];
    case 'game':
      document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' });
      return [{ kind: 'ok', text: 'launching bug_hunt …' }];
    case 'sudo hire':
    case 'sudo hire-me':
    case 'hire':
      window.location.href = `mailto:${LINKS.email}?subject=${encodeURIComponent("Let's work together")}`;
      return [
        { kind: 'ok', text: '[sudo] permission granted.' },
        { kind: 'ok', text: 'opening your mail client — talk soon.' }
      ];
    case 'exit':
      return [
        {
          kind: 'err',
          text: 'nice try. there is no escape, only collaboration.'
        }
      ];
    case 'rm -rf /':
      return [
        { kind: 'err', text: 'permission denied: this portfolio has backups.' }
      ];
    default:
      return [{ kind: 'err', text: `command not found: ${cmd} — try "help"` }];
  }
}

function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: 'ms-shell v2.0 — type "help" and press enter.' }
  ]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [, setHi] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLDivElement>(null);

  const submit = (cmd: string) => {
    const res = run(cmd);
    setValue('');
    setHi(-1);
    if (cmd.trim()) setHistory((h) => [cmd, ...h].slice(0, 30));
    if (res === 'clear' || cmd.trim().toLowerCase() === 'clear') {
      setLines([]);
      return;
    }
    setLines((l) =>
      [...l, { kind: 'in' as const, text: cmd }, ...res].slice(-60)
    );
    requestAnimationFrame(() => {
      if (body.current) body.current.scrollTop = body.current.scrollHeight;
    });
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit(value);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      setHi((i) => {
        const next = Math.max(
          -1,
          Math.min(history.length - 1, i + (e.key === 'ArrowUp' ? 1 : -1))
        );
        setValue(next < 0 ? '' : history[next]);
        return next;
      });
    }
  };

  return (
    <div
      className="term"
      onClick={() => input.current?.focus({ preventScroll: true })}
    >
      <div className="code-bar">
        <i />
        <i />
        <i />
        <span>visitor@ms-portfolio: ~</span>
      </div>
      <div className="term-body" ref={body}>
        {lines.map((l, i) => (
          <div key={i} className={`term-line t-${l.kind}`}>
            {l.kind === 'in' && <span className="prompt">$ </span>}
            {l.href ? (
              <a
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                {l.text}
              </a>
            ) : (
              l.text
            )}
          </div>
        ))}
        <div className="term-input">
          <span className="prompt">$</span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            aria-label="Terminal input"
            placeholder="help"
          />
        </div>
      </div>
      <div className="term-quick">
        {['whoami', 'skills', 'contact', 'sudo hire'].map((c) => (
          <button key={c} type="button" onClick={() => submit(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="sec contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="wrap contact-grid">
        <div>
          <Reveal kind="left">
            <div className="sec-tag">
              <span className="sec-idx">06</span>
              <span className="sec-slash">{'//'}</span>
              <span>contact.sh</span>
              <span className="sec-rule" />
            </div>
          </Reveal>
          <h2 className="contact-title">
            <span className="glitch" data-text="LET'S BUILD">
              <Scramble text="LET'S BUILD" />
            </span>
            <span className="glitch outline" data-text="SOMETHING.">
              <Scramble text="SOMETHING." delay={200} />
            </span>
          </h2>
          <Reveal delay={150}>
            <p className="sec-sub">
              Have a product to ship, a legacy system to rescue or an idea that
              needs a one-man army? Send a message and let&apos;s talk.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div className="cta-row">
              <a
                href={`mailto:${LINKS.email}`}
                className="btn btn-primary"
                data-hot
              >
                <span>{LINKS.email}</span>
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <span>linkedin ↗</span>
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <span>github ↗</span>
              </a>
              <a
                href={`${BASE_PATH}/mateusz-staszkow-cv.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <span>resume.pdf</span>
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal kind="right" delay={150}>
          <Terminal />
        </Reveal>
      </div>
      <footer className="foot">
        <span>© {new Date().getFullYear()} Mateusz Staszkow</span>
        <span className="foot-mid">
          built with Next.js, SVG, canvas and too much coffee
        </span>
        <span>
          <a href={`${BASE_PATH}/`}>classic v1</a>
          {' · '}
          <a href={LINKS.interview} target="_blank" rel="noopener noreferrer">
            interview
          </a>
          {' · '}
          <a href="#top">back to top ↑</a>
        </span>
      </footer>
    </section>
  );
}
