import React from 'react';
import { SceneId } from './data';

type A2 = [number, number];

const SKIN = '#f1e3d3';
const INK = '#0d171c';
const PALE = '#e6f2ef';
const CY = '#22d3ee';
const PK = '#ff2e88';
const GR = '#00ff9c';

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

interface LimbProps {
  x: number;
  y: number;
  a: A2;
  l1: number;
  l2: number;
  w: number;
  color: string;
  cls?: string;
  dim?: boolean;
  end?: React.ReactNode;
}

/** Two-segment limb. Angles: 0 = down, negative = towards the facing side. */
function Limb({ x, y, a, l1, l2, w, color, cls, dim, end }: LimbProps) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${a[0]})`}
      opacity={dim ? 0.62 : 1}
    >
      <g className={cls}>
        <line y2={l1} stroke={color} strokeWidth={w} strokeLinecap="round" />
        <g transform={`translate(0 ${l1}) rotate(${a[1]})`}>
          <line y2={l2} stroke={color} strokeWidth={w} strokeLinecap="round" />
          <g transform={`translate(0 ${l2})`}>{end}</g>
        </g>
      </g>
    </g>
  );
}

interface DevProps {
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  rot?: number;
  aL?: A2;
  aR?: A2;
  lL?: A2;
  lR?: A2;
  coat?: boolean;
  color?: string;
  cAL?: string;
  cAR?: string;
  cBody?: string;
  handR?: React.ReactNode;
  handL?: React.ReactNode;
}

/** The animated developer. Origin is the hip; faces right unless flipped. */
export function Dev(p: DevProps) {
  const s = p.s ?? 1.25;
  const aL = p.aL ?? [10, -8];
  const aR = p.aR ?? [-10, -8];
  const lL = p.lL ?? [5, 0];
  const lR = p.lR ?? [-5, 0];
  const col = p.color ?? 'var(--ac)';
  const body = p.coat ? PALE : col;
  const hand = (a: A2, held?: React.ReactNode) => (
    <>
      <g transform={`rotate(${-(a[0] + a[1])})`}>{held}</g>
      <circle r={4.8} fill={SKIN} />
    </>
  );
  const foot = (
    <rect x={-4.5} y={-4} width={16} height={8} rx={4} fill={PALE} />
  );
  return (
    <g
      transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -s : s} ${s}) rotate(${p.rot ?? 0})`}
    >
      <g className={p.cBody}>
        <Limb
          x={-8}
          y={-46}
          a={aL}
          l1={22}
          l2={20}
          w={8.5}
          color={body}
          cls={p.cAL}
          dim
          end={hand(aL, p.handL)}
        />
        <Limb
          x={-6}
          y={-2}
          a={lL}
          l1={28}
          l2={28}
          w={10}
          color="#1f2e38"
          end={foot}
        />
        <Limb
          x={6}
          y={-2}
          a={lR}
          l1={28}
          l2={28}
          w={10}
          color="#2c404d"
          end={foot}
        />
        <rect x={-14} y={-57} width={28} height={59} rx={12} fill={body} />
        <path
          d="M1 -26 h9"
          stroke="rgba(0,0,0,.3)"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <g transform="translate(1 -73)">
          <circle cx={-4} cy={1} r={17} fill={col} opacity={0.5} />
          <circle r={14.5} fill={SKIN} />
          <path
            d="M-14.5 0 A14.5 14.5 0 0 1 13 -7 Q4 -3 -5 -6 Q-11 -5 -14.5 0Z"
            fill={INK}
          />
          <rect
            className="s-visor"
            x={1}
            y={-3}
            width={15}
            height={6.5}
            rx={3}
            fill={CY}
          />
          <path
            d="M4 8 q4 3 8 0"
            stroke={INK}
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
          />
        </g>
        <Limb
          x={8}
          y={-46}
          a={aR}
          l1={22}
          l2={20}
          w={8.5}
          color={body}
          cls={p.cAR}
          end={hand(aR, p.handR)}
        />
      </g>
    </g>
  );
}

interface WinProps {
  x: number;
  y: number;
  w: number;
  h: number;
  title?: string;
  cls?: string;
  i?: number;
  children?: React.ReactNode;
}

function Win({ x, y, w, h, title, cls, i, children }: WinProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={cls} style={{ ['--i' as string]: i ?? 0 }}>
        <rect width={w} height={h} rx={6} className="s-panel" />
        <line y1={16} x2={w} y2={16} className="s-rule" />
        <circle cx={9} cy={8} r={2.4} fill="#ff5f57" />
        <circle cx={17} cy={8} r={2.4} fill="#febc2e" />
        <circle cx={25} cy={8} r={2.4} fill="#28c840" />
        {title && (
          <text x={34} y={11.5} className="s-t">
            {title}
          </text>
        )}
        {children}
      </g>
    </g>
  );
}

const CodeLines = ({
  x,
  y,
  n,
  w
}: {
  x: number;
  y: number;
  n: number;
  w: number;
}) => (
  <>
    {range(n).map((i) => (
      <rect
        key={i}
        x={x + (i % 3 === 1 ? 8 : 0)}
        y={y + i * 9}
        width={w * (0.45 + ((i * 37) % 50) / 100)}
        height={3.5}
        rx={1.5}
        className={i % 4 === 2 ? 's-ac' : 's-dimfill'}
      />
    ))}
  </>
);

const Laptop = () => (
  <g>
    <path d="M-2 0 h34 l3 4 h-40z" fill={PALE} />
    <path
      d="M2 -22 h26 a2 2 0 0 1 2 2 v20 h-30 v-20 a2 2 0 0 1 2 -2z"
      fill="#16242c"
      stroke={PALE}
      strokeWidth={1.5}
    />
    <rect className="a-blink" x={6} y={-16} width={12} height={2.5} fill={GR} />
    <rect x={6} y={-10} width={18} height={2.5} fill={CY} opacity={0.7} />
  </g>
);

/* 01 — Sanoma: AI hackathon podium */
function Hackathon() {
  const cols = ['var(--ac)', CY, PK, GR];
  return (
    <>
      {range(20).map((i) => (
        <g key={i} transform={`translate(${24 + i * 29} -20)`}>
          <rect
            className="a-fall"
            style={{
              animationDelay: `${-((i * 0.53) % 3.2)}s`,
              animationDuration: `${2.8 + (i % 5) * 0.45}s`
            }}
            width={6}
            height={11}
            fill={cols[i % 4]}
          />
        </g>
      ))}
      <text x={300} y={52} textAnchor="middle" className="s-big">
        2ND PLACE
      </text>
      <text x={300} y={72} textAnchor="middle" className="s-t">
        HACKDAYS4LEARNING 2025 // AI HACKATHON
      </text>
      <g className="par1">
        <Win
          x={36}
          y={150}
          w={150}
          h={104}
          title="diversplainer.ai"
          cls="a-pop"
          i={1}
        >
          <rect x={14} y={30} width={40} height={34} rx={8} className="s-st" />
          <circle className="a-blink" cx={27} cy={45} r={3.5} fill={CY} />
          <circle className="a-blink" cx={41} cy={45} r={3.5} fill={CY} />
          <path d="M34 30 v-7" className="s-st" />
          <circle cx={34} cy={22} r={2.5} className="s-ac" />
          <rect
            className="a-grow s-ac"
            x={64}
            y={34}
            width={70}
            height={4}
            rx={2}
          />
          <rect
            className="a-grow s-dimfill"
            style={{ animationDelay: '.4s' }}
            x={64}
            y={44}
            width={54}
            height={4}
            rx={2}
          />
          <rect
            className="a-grow s-dimfill"
            style={{ animationDelay: '.8s' }}
            x={64}
            y={54}
            width={62}
            height={4}
            rx={2}
          />
          <text x={14} y={88} className="s-t">
            accessibility: ON
          </text>
        </Win>
      </g>
      <g className="par2">
        <Win
          x={418}
          y={150}
          w={146}
          h={104}
          title="e-learning"
          cls="a-pop"
          i={2}
        >
          <path
            d="M16 34 h22 a6 6 0 0 1 6 6 v24 a6 6 0 0 0 -6 -6 h-22z M72 34 h-22 a6 6 0 0 0 -6 6 v24 a6 6 0 0 1 6 -6 h22z"
            className="s-st"
          />
          <rect
            x={84}
            y={36}
            width={50}
            height={5}
            rx={2.5}
            className="s-dimfill"
          />
          <rect
            className="a-grow s-ac"
            x={84}
            y={36}
            width={50}
            height={5}
            rx={2.5}
          />
          <rect
            x={84}
            y={48}
            width={50}
            height={5}
            rx={2.5}
            className="s-dimfill"
          />
          <rect
            className="a-grow"
            style={{ animationDelay: '.6s' }}
            x={84}
            y={48}
            width={34}
            height={5}
            rx={2.5}
            fill={CY}
          />
          <text x={16} y={90} className="s-t">
            lesson 12 / 12 ✓
          </text>
        </Win>
      </g>
      <rect x={160} y={345} width={90} height={35} className="s-panel" />
      <text x={205} y={369} textAnchor="middle" className="s-t">
        3
      </text>
      <rect
        x={350}
        y={272}
        width={90}
        height={108}
        className="s-panel"
        strokeDasharray="4 4"
      />
      <text x={395} y={332} textAnchor="middle" className="s-t">
        1
      </text>
      <rect x={250} y={302} width={100} height={78} className="s-panel s-hot" />
      <text x={300} y={354} textAnchor="middle" className="s-num">
        2
      </text>
      <Dev
        x={300}
        y={226}
        aR={[-162, -10]}
        aL={[150, 24]}
        cAL="a-wave"
        cBody="a-hop"
        handR={
          <g className="s-glow" transform="translate(0 -4)">
            <path d="M-12 -28 h24 v8 a12 12 0 0 1 -24 0z" fill="var(--ac)" />
            <path
              d="M-12 -26 h-6 v4 a7 7 0 0 0 7 7 M12 -26 h6 v4 a7 7 0 0 1 -7 7"
              stroke="var(--ac)"
              strokeWidth={2.5}
              fill="none"
            />
            <rect x={-2} y={-9} width={4} height={7} fill="var(--ac)" />
            <rect x={-8} y={-3} width={16} height={4} rx={1} fill="var(--ac)" />
          </g>
        }
      />
    </>
  );
}

/* 02 — BNP Paribas: low-latency transactions */
function Bank() {
  const wire = 'M300 250 C 350 180, 400 180, 462 236';
  return (
    <>
      <g className="par1" opacity={0.35}>
        <path
          d="M52 380 L80 200 L108 380 M63 310 H97 M58 345 H102 M80 200 V178"
          className="s-st"
        />
        <path d="M66 290 Q80 270 94 290" className="s-st" />
      </g>
      <text x={300} y={52} textAnchor="middle" className="s-big">
        LOW LATENCY
      </text>
      <text x={300} y={72} textAnchor="middle" className="s-t">
        CORPORATE BANKING // TRANSACTION STREAM
      </text>
      <g className="par2">
        <path d="M440 250 L500 214 L560 250Z" className="s-panel s-hot" />
        <rect x={440} y={252} width={120} height={8} className="s-ac" />
        {range(4).map((i) => (
          <rect
            key={i}
            x={450 + i * 29}
            y={264}
            width={13}
            height={100}
            className="s-panel"
          />
        ))}
        <rect x={432} y={366} width={136} height={14} className="s-panel" />
        <text x={500} y={241} textAnchor="middle" className="s-t">
          CIB
        </text>
      </g>
      <path d={wire} className="s-st a-dash" />
      {range(4).map((i) => (
        <g key={i}>
          <circle r={9} fill={INK} stroke="var(--ac)" strokeWidth={1.5} />
          <text y={3.5} textAnchor="middle" className="s-coin">
            €
          </text>
          <animateMotion
            dur="1.6s"
            begin={`${-i * 0.4}s`}
            repeatCount="indefinite"
            path={wire}
          />
        </g>
      ))}
      {range(5).map((i) => (
        <line
          key={i}
          className="a-dash s-st"
          opacity={0.4}
          x1={150}
          y1={120 + i * 14}
          x2={420 - i * 30}
          y2={120 + i * 14}
        />
      ))}
      <Win x={196} y={212} w={74} h={62} title="tx" cls="a-pop" i={1}>
        {range(6).map((i) => (
          <rect
            key={i}
            className="a-blink"
            style={{ animationDelay: `${i * 0.18}s` }}
            x={8 + i * 10}
            y={50 - ((i * 13) % 24) - 6}
            width={5}
            height={((i * 13) % 24) + 6}
            fill={i % 2 ? PK : 'var(--ac)'}
          />
        ))}
      </Win>
      <Win x={276} y={196} w={88} h={78} title="orders" cls="a-pop" i={2}>
        <polyline
          className="a-draw s-st"
          pathLength={1}
          points="8,62 20,50 30,56 42,36 54,44 66,26 80,30"
        />
        <CodeLines x={8} y={22} n={2} w={50} />
      </Win>
      <path
        d="M186 276 H380 M200 276 V380 M366 276 V380"
        className="s-st"
        strokeWidth={3}
      />
      <path
        d="M96 344 h44 M118 344 v36 M104 380 h28 M96 344 v-46"
        className="s-st"
        strokeWidth={3}
      />
      <Dev
        x={126}
        y={338}
        lL={[-88, 86]}
        lR={[-82, 82]}
        aL={[-28, -72]}
        aR={[-38, -74]}
        cAL="a-type"
        cAR="a-type2"
      />
    </>
  );
}

/* 03 — Aktionariat: crypto, share tokenisation */
function Crypto() {
  const orbit = 'M-105 0 a105 42 0 1 1 210 0 a105 42 0 1 1 -210 0';
  return (
    <>
      <polyline
        className="s-st par1"
        opacity={0.3}
        points="0,380 80,270 130,320 215,215 300,330 372,255 470,345 540,290 600,380"
      />
      <text x={300} y={44} textAnchor="middle" className="s-big">
        1 MAN ARMY
      </text>
      <g className="par2">
        <Win x={30} y={170} w={132} h={98} title="cap-table" cls="a-pop" i={1}>
          <circle
            cx={36}
            cy={56}
            r={22}
            className="s-st"
            strokeWidth={8}
            strokeDasharray="60 140"
          />
          <circle
            cx={36}
            cy={56}
            r={22}
            fill="none"
            stroke={CY}
            strokeWidth={8}
            strokeDasharray="34 140"
            strokeDashoffset={-62}
          />
          <CodeLines x={72} y={36} n={5} w={62} />
        </Win>
        <Win
          x={438}
          y={170}
          w={132}
          h={98}
          title="share price"
          cls="a-pop"
          i={2}
        >
          <polyline
            className="a-draw s-st"
            pathLength={1}
            strokeWidth={2}
            points="10,80 28,70 44,74 60,52 78,58 96,34 122,26"
          />
          <text x={10} y={34} className="s-t">
            ▲ on-chain
          </text>
        </Win>
      </g>
      <g transform="translate(300 128)">
        <path d={orbit} className="s-st" opacity={0.25} strokeDasharray="3 6" />
        <g>
          <g className="s-glow">
            <path d="M0 -17 L11 0 L0 6 L-11 0Z" fill="var(--ac)" />
            <path d="M0 9 L11 3 L0 19 L-11 3Z" fill="var(--ac)" opacity={0.7} />
          </g>
          <animateMotion dur="4.2s" repeatCount="indefinite" path={orbit} />
        </g>
        <g>
          <circle r={14} fill={INK} stroke={GR} strokeWidth={2} />
          <text
            y={4}
            textAnchor="middle"
            className="s-coin"
            style={{ fill: GR }}
          >
            SHR
          </text>
          <animateMotion
            dur="4.2s"
            begin="-1.4s"
            repeatCount="indefinite"
            path={orbit}
          />
        </g>
        <g>
          <circle r={14} fill={INK} stroke={CY} strokeWidth={2} />
          <path
            d="M-7 -1 q7 -7 14 0 M-4 4 q4 -4 8 0"
            stroke={CY}
            strokeWidth={2}
            fill="none"
          />
          <animateMotion
            dur="4.2s"
            begin="-2.8s"
            repeatCount="indefinite"
            path={orbit}
          />
        </g>
      </g>
      <Dev
        x={300}
        y={288}
        aR={[-150, -22]}
        aL={[150, 22]}
        cAL="a-wave"
        cAR="a-wave2"
        cBody="a-hop"
      />
      {range(7).map((i) => (
        <g key={i} transform={`translate(${96 + i * 62} 392)`}>
          {i < 6 && (
            <line x1={34} y1={17} x2={62} y2={17} className="s-st a-dash" />
          )}
          <rect
            width={34}
            height={34}
            rx={5}
            className={`s-panel ${i === 6 ? 'a-blink s-hot' : ''}`}
          />
          <text x={17} y={21} textAnchor="middle" className="s-t">
            {i === 6 ? 'new' : `#${i + 1}`}
          </text>
        </g>
      ))}
    </>
  );
}

/* 04 — die Mobiliar: insurance umbrella over an app portfolio */
function Insurance() {
  const apps = ['life', 'claims', 'pension'];
  return (
    <>
      {range(16).map((i) => (
        <g
          key={i}
          transform={`translate(${30 + i * 36} ${-6 + ((i * 29) % 34)})`}
        >
          <line
            className="a-rain"
            style={{ animationDelay: `${-((i * 0.37) % 1.4)}s` }}
            y2={14}
            stroke={CY}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>
      ))}
      <g className="par1">
        <g transform="translate(62 214)">
          <g className="a-spin">
            <path
              d="M0 -30 L23 -19 L29 7 L13 27 L-13 27 L-29 7 L-23 -19Z"
              className="s-st"
              strokeWidth={2}
            />
            {range(7).map((i) => (
              <line
                key={i}
                y2={-26}
                className="s-st"
                transform={`rotate(${i * 51.4})`}
              />
            ))}
            <circle r={6} className="s-ac" />
          </g>
          <text y={52} textAnchor="middle" className="s-t">
            kubernetes
          </text>
        </g>
      </g>
      <g className="par2">
        {[0, 1, 2].map((l) =>
          range(l === 1 ? 4 : 3).map((n) => {
            const x = 478 + l * 40;
            const y = (l === 1 ? 168 : 186) + n * 36;
            return (
              <g key={`${l}-${n}`}>
                {l < 2 &&
                  range(l === 0 ? 4 : 3).map((m) => (
                    <line
                      key={m}
                      x1={x}
                      y1={y}
                      x2={x + 40}
                      y2={(l === 0 ? 168 : 186) + m * 36}
                      className="s-st"
                      opacity={0.25}
                    />
                  ))}
                <circle
                  className="a-blink"
                  style={{ animationDelay: `${(l * 3 + n) * 0.21}s` }}
                  cx={x}
                  cy={y}
                  r={6}
                  fill={l === 1 ? CY : 'var(--ac)'}
                />
              </g>
            );
          })
        )}
        <text x={518} y={318} textAnchor="middle" className="s-t">
          tensorflow
        </text>
      </g>
      {apps.map((a, i) => (
        <Win
          key={a}
          x={296 + i * 22}
          y={236 + i * 30}
          w={104}
          h={70}
          title={a}
          cls="a-pop"
          i={i + 1}
        >
          <CodeLines x={10} y={26} n={4} w={74} />
        </Win>
      ))}
      <Dev
        x={214}
        y={305}
        aR={[-172, 4]}
        aL={[14, -30]}
        cBody="a-sway"
        handR={
          <g>
            <line y1={6} y2={-74} stroke={PALE} strokeWidth={3} />
            <path
              className="s-glow"
              d="M-112 -70 Q-112 -128 30 -130 Q172 -128 172 -70 Q138 -92 103 -70 Q68 -92 30 -70 Q-8 -92 -42 -70 Q-78 -92 -112 -70Z"
              fill="var(--ac)"
              transform="translate(-30 0)"
            />
          </g>
        }
      />
    </>
  );
}

/* 05 — EY: business flights to London */
function Flight() {
  const route = 'M110 96 Q300 6 490 96';
  const cloud =
    'M0 0 a14 14 0 0 1 26 -8 a18 18 0 0 1 34 4 a12 12 0 0 1 4 24 h-60 a12 12 0 0 1 -4 -20z';
  return (
    <>
      <path d={route} className="s-st" strokeDasharray="2 7" opacity={0.6} />
      <circle cx={110} cy={96} r={4} className="s-ac" />
      <circle cx={490} cy={96} r={4} className="s-ac a-blink" />
      <text x={110} y={116} textAnchor="middle" className="s-t">
        WAW
      </text>
      <text x={490} y={116} textAnchor="middle" className="s-t">
        LHR
      </text>
      <g>
        <path d="M-7 0 L7 0 M0 -5 L7 0 L0 5" className="s-st" strokeWidth={2} />
        <animateMotion
          dur="3.4s"
          repeatCount="indefinite"
          path={route}
          rotate="auto"
        />
      </g>
      {[
        [0, 150, 11, 1],
        [0, 262, 15, 0.7],
        [0, 176, 8, 1.2],
        [0, 318, 19, 0.6]
      ].map(([x, y, d, sc], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${sc})`}>
          <path
            className="a-drift"
            style={{
              animationDuration: `${d}s`,
              animationDelay: `${-i * 2.3}s`
            }}
            d={cloud}
            fill="rgba(215,227,224,.13)"
          />
        </g>
      ))}
      <g className="par1" opacity={0.55}>
        <path
          d="M40 420 V360 h22 v60 M70 420 V340 h30 v80 M330 420 v-58 h26 v58 M364 420 v-84 h20 v84 M392 420 v-48 h36 v48 M520 420 v-70 h28 v70"
          className="s-st"
        />
        <path
          d="M228 420 V318 l11 -22 l11 22 V420 M228 336 h22"
          className="s-st"
          strokeWidth={1.6}
        />
        <circle cx={239} cy={326} r={5} className="s-st" />
        <circle cx={150} cy={372} r={40} className="s-st" />
        <g transform="translate(150 372)">
          <g className="a-spin" style={{ animationDuration: '14s' }}>
            {range(8).map((i) => (
              <line
                key={i}
                y2={-40}
                className="s-st"
                opacity={0.6}
                transform={`rotate(${i * 45})`}
              />
            ))}
          </g>
        </g>
        <line x1={0} y1={420} x2={600} y2={420} className="s-st" />
      </g>
      <g transform="translate(300 232)">
        <g className="a-float">
          {range(4).map((i) => (
            <line
              key={i}
              className="s-st a-dash"
              x1={-250 + i * 12}
              y1={-18 + i * 12}
              x2={-150}
              y2={-18 + i * 12}
              opacity={0.6}
            />
          ))}
          <path
            d="M-118 -20 L-152 -74 L-112 -74 L-78 -24Z"
            className="s-panel s-hot"
          />
          <path d="M-20 14 L-66 70 L-30 70 L44 14Z" className="s-panel s-hot" />
          <path
            d="M-140 0 Q-140 -24 -90 -26 H78 Q132 -22 150 2 Q132 24 78 26 H-90 Q-140 24 -140 0Z"
            className="s-panel"
            strokeWidth={2}
          />
          <path d="M96 -12 q22 2 32 12 h-34z" fill={CY} opacity={0.8} />
          {range(7).map((i) => (
            <rect
              key={i}
              x={-96 + i * 26}
              y={-10}
              width={13}
              height={14}
              rx={5}
              className="s-ac"
              opacity={i === 3 ? 1 : 0.4}
            />
          ))}
          <text x={-128} y={-52} className="s-t">
            EY
          </text>
          <Dev
            x={-8}
            y={-30}
            s={1.05}
            lL={[-90, 60]}
            lR={[-84, 56]}
            aL={[-30, -66]}
            aR={[-40, -68]}
            cAL="a-type"
            cAR="a-type2"
          />
          <g transform="translate(20 -42)">
            <Laptop />
          </g>
          <g transform="translate(-22 -106)">
            <path
              className="a-scarf"
              d="M0 0 q-18 -6 -34 4 q-12 6 -22 -2"
              stroke={PK}
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </>
  );
}

/* 06 — Samsung: smartphone code quality platform */
function Phones() {
  const Phone = ({
    x,
    y,
    s,
    i
  }: {
    x: number;
    y: number;
    s: number;
    i: number;
  }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="a-pop" style={{ ['--i' as string]: i }}>
        <rect
          width={96}
          height={188}
          rx={14}
          className="s-panel"
          strokeWidth={2}
        />
        <rect x={34} y={7} width={28} height={6} rx={3} className="s-dimfill" />
        <CodeLines x={12} y={28} n={13} w={62} />
        <rect
          className="a-scan"
          x={6}
          y={22}
          width={84}
          height={3}
          fill="var(--ac)"
        />
        <g transform="translate(48 164)">
          <circle
            className="a-blink"
            style={{ animationDelay: `${i * 0.4}s` }}
            r={11}
            fill={GR}
          />
          <path
            d="M-5 0 l4 4 l7 -8"
            stroke={INK}
            strokeWidth={2.5}
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>
    </g>
  );
  return (
    <>
      <g className="par2">
        <g transform="translate(96 130)">
          <path
            d="M-44 0 A44 44 0 0 1 44 0"
            className="s-st"
            strokeWidth={7}
            opacity={0.3}
          />
          <path
            d="M-44 0 A44 44 0 0 1 31 -31"
            className="s-st"
            strokeWidth={7}
          />
          <g className="a-gauge">
            <line
              y2={-36}
              stroke={PALE}
              strokeWidth={3}
              strokeLinecap="round"
            />
          </g>
          <circle r={5} fill={PALE} />
          <text y={24} textAnchor="middle" className="s-t">
            CODE QUALITY
          </text>
        </g>
      </g>
      <g className="par1">
        <g transform="translate(486 70)">
          <g className="a-float">
            <path
              className="s-glow"
              d="M0 -22 L6 -7 L22 -7 L9 3 L14 19 L0 9 L-14 19 L-9 3 L-22 -7 L-6 -7Z"
              fill="#ffd166"
            />
            <text y={38} textAnchor="middle" className="s-t">
              BEST R&amp;D PROJECT
            </text>
          </g>
        </g>
      </g>
      <Phone x={250} y={150} s={1.2} i={1} />
      <Phone x={390} y={196} s={0.92} i={2} />
      <Phone x={494} y={230} s={0.74} i={3} />
      <line x1={30} y1={380} x2={570} y2={380} className="s-st" opacity={0.4} />
      <Dev x={176} y={305} aR={[-82, -14]} aL={[18, -34]} cAR="a-tap" />
    </>
  );
}

/* 07 — Aramco: leading the frontend team */
function Lead() {
  return (
    <>
      <g className="par1">
        <g transform="translate(92 96)">
          <circle r={26} fill="var(--ac)" className="s-glow" />
          <g className="a-spin" style={{ animationDuration: '18s' }}>
            {range(12).map((i) => (
              <line
                key={i}
                y1={-34}
                y2={-46}
                className="s-st"
                strokeWidth={2}
                transform={`rotate(${i * 30})`}
              />
            ))}
          </g>
        </g>
        <path
          d="M0 372 Q90 320 180 366 T360 360 T600 350 V440 H0Z"
          fill="rgba(255,159,67,.08)"
          stroke="var(--ac)"
          strokeOpacity={0.4}
        />
      </g>
      <Win
        x={290}
        y={84}
        w={262}
        h={164}
        title="kanban — sprint"
        cls="a-pop"
        i={1}
      >
        {['TODO', 'DOING', 'DONE'].map((c, i) => (
          <g key={c}>
            <text x={14 + i * 84} y={34} className="s-t">
              {c}
            </text>
            <line
              x1={8 + i * 84}
              y1={40}
              x2={8 + i * 84}
              y2={154}
              className="s-rule"
            />
          </g>
        ))}
        <rect
          x={14}
          y={48}
          width={66}
          height={22}
          rx={4}
          className="s-dimfill"
        />
        <rect
          x={14}
          y={76}
          width={66}
          height={22}
          rx={4}
          className="s-dimfill"
        />
        <rect
          x={98}
          y={48}
          width={66}
          height={22}
          rx={4}
          fill={CY}
          opacity={0.5}
        />
        <rect
          x={182}
          y={48}
          width={66}
          height={22}
          rx={4}
          fill={GR}
          opacity={0.5}
        />
        <rect
          x={182}
          y={76}
          width={66}
          height={22}
          rx={4}
          fill={GR}
          opacity={0.5}
        />
        <rect
          className="a-card s-ac"
          x={14}
          y={110}
          width={66}
          height={22}
          rx={4}
        />
      </Win>
      <Dev x={232} y={305} aR={[-112, -14]} aL={[26, -52]} cAR="a-point" />
      {[
        [350, GR],
        [436, CY],
        [522, PK]
      ].map(([x, c], i) => (
        <g key={i}>
          <rect
            x={(x as number) - 22}
            y={356}
            width={34}
            height={24}
            rx={4}
            className="s-panel"
          />
          <Dev
            x={(x as number) - 6}
            y={350}
            s={0.72}
            color={c as string}
            lL={[-88, 86]}
            lR={[-82, 82]}
            aL={[-28, -70]}
            aR={[-38, -72]}
            cAL="a-type"
            cAR="a-type2"
          />
          <g transform={`translate(${(x as number) + 18} 338) scale(.72)`}>
            <Laptop />
          </g>
        </g>
      ))}
    </>
  );
}

/* 08 — ProService Finteco: BPM refactor */
function Bpm() {
  const up = 'M70 190 H286 L286 120 H470 L470 190 H548';
  const down = 'M70 190 H286 L286 260 H470 L470 190 H548';
  return (
    <>
      <text x={300} y={48} textAnchor="middle" className="s-big">
        REFACTOR
      </text>
      <text x={300} y={68} textAnchor="middle" className="s-t">
        CORE SYSTEM → BUSINESS PROCESS MODEL
      </text>
      <path d={up} className="s-st a-dash" />
      <path d={down} className="s-st a-dash" />
      <circle cx={70} cy={190} r={13} className="s-panel" strokeWidth={2} />
      <circle
        cx={548}
        cy={190}
        r={13}
        className="s-panel s-hot"
        strokeWidth={4}
      />
      <rect x={120} y={166} width={96} height={48} rx={8} className="s-panel" />
      <text x={168} y={194} textAnchor="middle" className="s-t">
        validate order
      </text>
      {[286, 470].map((x) => (
        <g key={x} transform={`translate(${x} 190)`}>
          <rect
            x={-17}
            y={-17}
            width={34}
            height={34}
            className="s-panel s-hot"
            transform="rotate(45)"
          />
          <path d="M-7 0 h14 M0 -7 v14" className="s-st" strokeWidth={2} />
        </g>
      ))}
      <rect
        x={330}
        y={96}
        width={96}
        height={48}
        rx={8}
        className="s-panel a-pop"
        style={{ ['--i' as string]: 2 }}
      />
      <text x={378} y={124} textAnchor="middle" className="s-t">
        settle
      </text>
      <rect
        x={330}
        y={236}
        width={96}
        height={48}
        rx={8}
        className="s-panel a-pop"
        style={{ ['--i' as string]: 3 }}
      />
      <text x={378} y={264} textAnchor="middle" className="s-t">
        notify agent
      </text>
      {[up, down].map((p, i) => (
        <g key={i}>
          <circle r={6} fill={i ? CY : 'var(--ac)'} className="s-glow" />
          <animateMotion
            dur="3.6s"
            begin={`${-i * 1.8}s`}
            repeatCount="indefinite"
            path={p}
          />
        </g>
      ))}
      <g className="par2">
        <Win x={438} y={304} w={130} h={72} title="burndown" cls="a-pop" i={4}>
          <polyline
            className="a-draw s-st"
            pathLength={1}
            strokeWidth={2}
            points="10,28 34,34 56,44 78,48 100,58 120,64"
          />
        </Win>
      </g>
      <line x1={30} y1={380} x2={420} y2={380} className="s-st" opacity={0.4} />
      <Dev
        x={196}
        y={305}
        aR={[-166, -6]}
        aL={[16, -30]}
        cAR="a-wrench"
        handR={
          <g transform="rotate(20)">
            <rect x={-2.5} y={-34} width={5} height={34} rx={2} fill={PALE} />
            <path
              d="M-9 -46 a9 9 0 1 0 18 0 l-5 0 l0 7 l-8 0 l0 -7z"
              fill={PALE}
            />
          </g>
        }
      />
    </>
  );
}

/* 09 — MSD Apartments: founder by the sea */
function Founder() {
  const wave =
    'M-80 0 q20 -12 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0';
  return (
    <>
      <g className="par1">
        <circle
          cx={500}
          cy={96}
          r={34}
          fill="var(--ac)"
          className="s-glow"
          opacity={0.9}
        />
        <circle cx={500} cy={96} r={50} className="s-st a-pulse" />
        {[
          [150, 90, 0],
          [210, 64, 0.5],
          [96, 126, 1]
        ].map(([x, y, d], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path
              className="a-float"
              style={{ animationDelay: `${-d}s` }}
              d="M-10 0 q5 -8 10 0 q5 -8 10 0"
              stroke={PALE}
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}
      </g>
      <rect
        x={300}
        y={132}
        width={176}
        height={248}
        className="s-panel"
        strokeWidth={2}
      />
      <rect x={292} y={122} width={192} height={12} className="s-ac" />
      <text x={388} y={112} textAnchor="middle" className="s-t">
        MSD APARTMENTS
      </text>
      {range(5).map((r) =>
        range(4).map((c) => (
          <g key={`${r}-${c}`}>
            <rect
              className={(r * 4 + c) % 3 === 0 ? 'a-blink' : ''}
              style={{
                animationDelay: `${(r + c) * 0.37}s`,
                animationDuration: '3.2s'
              }}
              x={316 + c * 40}
              y={150 + r * 40}
              width={24}
              height={24}
              rx={2}
              fill={(r * 4 + c) % 3 === 0 ? '#ffd166' : 'rgba(215,227,224,.12)'}
            />
            <line
              x1={312 + c * 40}
              y1={178 + r * 40}
              x2={344 + c * 40}
              y2={178 + r * 40}
              className="s-st"
              opacity={0.5}
            />
          </g>
        ))
      )}
      <rect x={374} y={346} width={28} height={34} className="s-panel s-hot" />
      {['CEO', 'MARKETING', 'DEV'].map((t, i) => (
        <g key={t} transform={`translate(${40 + i * 12} ${190 + i * 30})`}>
          <g className="a-pop" style={{ ['--i' as string]: i + 2 }}>
            <rect
              width={t.length * 7.4 + 16}
              height={20}
              rx={10}
              className="s-panel"
            />
            <text x={8} y={13.5} className="s-t">
              {t}
            </text>
          </g>
        </g>
      ))}
      <Dev
        x={226}
        y={305}
        aR={[-140, -34]}
        aL={[14, -24]}
        cAR="a-wave"
        handR={
          <g className="s-glow">
            <circle
              cy={-10}
              r={7}
              fill="none"
              stroke="#ffd166"
              strokeWidth={3}
            />
            <path
              d="M0 -3 v20 M0 10 h6 M0 16 h5"
              stroke="#ffd166"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        }
      />
      <line x1={0} y1={380} x2={600} y2={380} className="s-st" opacity={0.4} />
      {range(3).map((i) => (
        <g key={i} transform={`translate(${i * -14} ${396 + i * 14})`}>
          <path
            className="a-wavex"
            style={{ animationDuration: `${1.6 + i * 0.5}s` }}
            d={wave}
            stroke={CY}
            strokeWidth={2.5}
            fill="none"
            opacity={0.9 - i * 0.25}
          />
        </g>
      ))}
    </>
  );
}

/* 10 — General Electric: aviation lab */
function Lab() {
  return (
    <>
      <g className="par2">
        <Win x={34} y={76} w={132} h={84} title="smu-ctl.cpp" cls="a-pop" i={1}>
          <CodeLines x={10} y={26} n={6} w={96} />
        </Win>
      </g>
      <g className="par1">
        <g transform="translate(486 150)">
          <circle r={62} className="s-panel" strokeWidth={3} />
          <circle r={52} className="s-st" opacity={0.5} />
          <g className="a-spin" style={{ animationDuration: '1.6s' }}>
            {range(10).map((i) => (
              <path
                key={i}
                d="M0 0 Q14 -24 4 -50"
                className="s-st"
                strokeWidth={3}
                transform={`rotate(${i * 36})`}
              />
            ))}
          </g>
          <circle r={11} className="s-ac" />
          <path
            d="M-3 0 a3 3 0 1 1 6 0"
            stroke={INK}
            strokeWidth={2}
            fill="none"
          />
          <text y={-72} textAnchor="middle" className="s-t">
            AVIATION LAB
          </text>
        </g>
      </g>
      <path
        d="M300 268 C330 330, 388 322, 400 276 M452 262 C470 244, 462 222, 470 206"
        className="s-st a-dash"
        style={{ stroke: PK }}
      />
      <g transform="translate(232 180)">
        <rect
          width={136}
          height={104}
          rx={8}
          className="s-panel"
          strokeWidth={2}
        />
        <rect
          x={10}
          y={10}
          width={86}
          height={64}
          rx={4}
          fill="#06120e"
          stroke="var(--ac)"
          strokeOpacity={0.5}
        />
        <path d="M10 42 h86 M53 10 v64" className="s-rule" />
        <svg x={10} y={10} width={86} height={64} viewBox="0 0 86 64">
          <path
            className="a-wavex s-glow"
            style={{ animationDuration: '1.1s', ['--wx' as string]: '40px' }}
            d="M-40 32 q10 -40 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0"
            stroke={GR}
            strokeWidth={2}
            fill="none"
          />
        </svg>
        {range(3).map((i) => (
          <circle
            key={i}
            cx={114}
            cy={22 + i * 24}
            r={8}
            className="s-st"
            strokeWidth={2}
          />
        ))}
        <line
          x1={114}
          y1={22}
          x2={119}
          y2={16}
          className="s-st"
          strokeWidth={2}
        />
        <text x={12} y={92} className="s-t">
          scope ch1 2V/div
        </text>
      </g>
      <g transform="translate(386 232)">
        <rect width={80} height={52} rx={6} className="s-panel" />
        <text x={10} y={20} className="s-t">
          SMU
        </text>
        {range(4).map((i) => (
          <circle
            key={i}
            className="a-blink"
            style={{ animationDelay: `${i * 0.3}s` }}
            cx={14 + i * 17}
            cy={36}
            r={4.5}
            fill={i % 2 ? PK : GR}
          />
        ))}
      </g>
      <path
        d="M186 286 H570 M204 286 V380 M552 286 V380"
        className="s-st"
        strokeWidth={3}
      />
      <path
        d="M96 344 h44 M118 344 v36 M104 380 h28"
        className="s-st"
        strokeWidth={3}
      />
      <Dev
        x={122}
        y={338}
        coat
        lL={[-88, 86]}
        lR={[-82, 82]}
        aL={[-26, -70]}
        aR={[-52, -62]}
        cAL="a-type"
        cAR="a-probe"
        handR={
          <path
            d="M0 0 l26 -10"
            stroke={PK}
            strokeWidth={3}
            strokeLinecap="round"
          />
        }
      />
    </>
  );
}

const MAP: Record<SceneId, () => React.ReactElement> = {
  hackathon: Hackathon,
  bank: Bank,
  crypto: Crypto,
  insurance: Insurance,
  flight: Flight,
  phones: Phones,
  lead: Lead,
  bpm: Bpm,
  founder: Founder,
  lab: Lab
};

export function Scene({ id }: { id: SceneId }) {
  const Cmp = MAP[id];
  return (
    <svg
      className="stage-svg"
      viewBox="0 0 600 440"
      role="img"
      aria-label={`Animated scene: ${id}`}
    >
      <Cmp />
    </svg>
  );
}
