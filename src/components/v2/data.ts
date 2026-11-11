export type SceneId =
  | 'hackathon'
  | 'bank'
  | 'crypto'
  | 'insurance'
  | 'flight'
  | 'phones'
  | 'lead'
  | 'bpm'
  | 'founder'
  | 'lab';

export interface Company {
  id: string;
  name: string;
  host: string;
  cc: string;
  where: string;
  years: string;
  role: string;
  desc: string;
  highlight?: string;
  tech: string[];
  url: string;
  scene: SceneId;
  caption: string;
  accent: string;
}

export const COMPANIES: Company[] = [
  {
    id: 'sanoma',
    name: 'Sanoma',
    host: 'sanoma.fi',
    cc: 'FI',
    where: 'Finland',
    years: '2025',
    role: 'Frontend Engineer',
    desc: 'Frontend development of the e-learning platform. Took 2nd place at the HackDays4Learning AI hackathon with Diversplainer, an AI tool for accessibility.',
    highlight: 'AI Hackathon — 2nd place',
    tech: ['Angular', 'AWS', 'AWS Bedrock', 'LLMs'],
    url: 'https://www.sanomapro.fi/',
    scene: 'hackathon',
    caption: 'lifting the hackathon trophy',
    accent: '#ffd166'
  },
  {
    id: 'bnpp',
    name: 'BNP Paribas',
    host: 'cib.bnpparibas',
    cc: 'FR',
    where: 'France',
    years: '2024 — 2025',
    role: 'Full Stack Engineer',
    desc: 'Full stack development of low-latency transactional systems for corporate banking clients, as a member of the best-performing team.',
    highlight: 'Best-performing team',
    tech: ['Angular', 'Spring', 'Oracle', 'Apigee'],
    url: 'https://cib.bnpparibas/centric/',
    scene: 'bank',
    caption: 'streaming low-latency transactions',
    accent: '#00ff9c'
  },
  {
    id: 'aktionariat',
    name: 'Aktionariat',
    host: 'aktionariat.com',
    cc: 'CH',
    where: 'Zurich, Switzerland',
    years: '2021 — 2024',
    role: 'Full Stack Engineer — one-man army',
    desc: 'Designed, built and delivered the whole Corporate Dashboard single-handedly — a blockchain share-tokenization product for a renowned Zurich startup.',
    highlight: 'Sole owner, design to delivery',
    tech: ['Angular', 'Spring', 'Web3', 'ethers.js', 'WalletConnect'],
    url: 'https://www.aktionariat.com/solutions/corporate-dashboard',
    scene: 'crypto',
    caption: 'juggling tokens on-chain',
    accent: '#a78bfa'
  },
  {
    id: 'mobiliar',
    name: 'die Mobiliar',
    host: 'mobiliar.ch',
    cc: 'CH',
    where: 'Vaud, Switzerland',
    years: '2020 — 2021',
    role: 'Full Stack Engineer',
    desc: 'Exclusive full stack responsibility for several applications in the life-insurance portfolio of a major Swiss insurer — including ML-powered document analysis.',
    highlight: 'Owner of a whole app portfolio',
    tech: ['Angular', 'Spring', 'TensorFlow', 'Kubernetes', 'SAFe'],
    url: 'https://www.mobiliar.ch/privatpersonen/sparen-und-vorsorgen/todesfallversicherung',
    scene: 'insurance',
    caption: 'keeping the app portfolio covered',
    accent: '#ff5c6c'
  },
  {
    id: 'ey',
    name: 'Ernst & Young',
    host: 'ey.com',
    cc: 'GB',
    where: 'London, UK',
    years: '2019 — 2020',
    role: 'Full Stack Engineer · Tech Lead & Architect track',
    desc: 'Full stack development in large, organized teams on internal automation platforms for the London offices. Developed an architectural framework for the whole Software Engineering department.',
    highlight: 'Department-wide architecture framework',
    tech: ['Angular', 'Spring', 'Nest', 'SCRUM', 'Team Leading'],
    url: 'https://www.ey.com/en_uk',
    scene: 'flight',
    caption: 'en route to the London office',
    accent: '#ffe600'
  },
  {
    id: 'samsung',
    name: 'Samsung',
    host: 'samsung.com',
    cc: 'KR',
    where: 'with Suwon, South Korea',
    years: '2017 — 2018',
    role: 'Full Stack Engineer',
    desc: 'Full stack development of a smart code-quality platform for smartphones, in cooperation with the Suwon office. The system won the Samsung Best R&D Project award.',
    highlight: 'Samsung Best R&D Project',
    tech: ['Angular', 'Vue', 'Spring', 'SCRUM'],
    url: 'https://samsungrd.pl/en',
    scene: 'phones',
    caption: 'scanning smartphone code quality',
    accent: '#4d9fff'
  },
  {
    id: 'aramco',
    name: 'Aramco',
    host: 'ithra.com',
    cc: 'SA',
    where: 'Saudi Arabia',
    years: '2019',
    role: 'Team Lead — frontend',
    desc: 'Team management, software development and architecture design of the frontend for an educational platform in the Middle East.',
    highlight: 'Led the frontend team',
    tech: ['Angular', 'Team Lead', 'Architecture', 'Kanban'],
    url: 'https://www.ithra.com/en',
    scene: 'lead',
    caption: 'running the team kanban',
    accent: '#ff9f43'
  },
  {
    id: 'proservice',
    name: 'ProService Finteco',
    host: 'psfinteco.com',
    cc: 'PL',
    where: 'Poland',
    years: '2018 — 2019',
    role: 'Frontend Engineer — one-man army',
    desc: 'Core system refactor with Business Process Modelling tools and SCRUM for a major Polish stock transfer agent.',
    highlight: 'Core system refactor',
    tech: ['Angular', 'BPM', 'GraphQL', 'SCRUM'],
    url: 'https://psfinteco.com/en/',
    scene: 'bpm',
    caption: 'rewiring business processes',
    accent: '#22d3ee'
  },
  {
    id: 'msd',
    name: 'MSD Apartments',
    host: 'msd-apartments',
    cc: 'PL',
    where: 'Koszalin, Poland',
    years: 'own venture',
    role: 'Founder & CEO',
    desc: 'Founded and run a long- and short-term apartment rental company by the Polish sea: marketing, customer relations, team management — and the frontend, too.',
    highlight: 'Built a business, not just software',
    tech: ['React', 'Team Management', 'Customer Relations'],
    url: 'https://www.youtube.com/watch?v=JiDVGROMxqQ',
    scene: 'founder',
    caption: 'handing over the keys by the sea',
    accent: '#ff8fab'
  },
  {
    id: 'ge',
    name: 'General Electric',
    host: 'ge-aviation.lab',
    cc: 'PL',
    where: 'Warsaw, Poland',
    years: '2016',
    role: 'Aviation Lab Intern',
    desc: 'Frontend development of a desktop application for a Sourcing-Measurement Unit in the Aviation Lab at the Institute of Aviation in Warsaw.',
    highlight: 'Where it all started',
    tech: ['C++', 'Qt', 'SCPI', 'Electronics'],
    url: 'https://ilot.lukasiewicz.gov.pl/en/',
    scene: 'lab',
    caption: 'probing signals in the aviation lab',
    accent: '#7cc4ff'
  }
];

export interface SkillModule {
  id: string;
  title: string;
  file: string;
  blurb: string;
  rows: string[][];
}

export const SKILLS: SkillModule[] = [
  {
    id: 'web',
    title: 'Full Stack Web Dev',
    file: 'fullstack.ts',
    blurb: 'From pixel to database to cloud — whole products, end to end.',
    rows: [
      ['React', 'Angular', 'Vue'],
      ['Spring', 'Nest', 'Gorilla'],
      ['AWS', 'GCP', 'Azure'],
      ['Web3', 'ETH', 'WalletConnect'],
      ['SQL', 'NoSQL']
    ]
  },
  {
    id: 'ai',
    title: 'AI & ML Publications',
    file: 'research.py',
    blurb: 'Peer-reviewed NLP research on LLMs — not just API calls.',
    rows: [
      ['NLP', 'AI', 'ML'],
      ['IEEE', 'LREC', 'MDPI'],
      ['Scikit', 'TensorFlow']
    ]
  },
  {
    id: 'iot',
    title: 'IoT & Robotics',
    file: 'firmware.c',
    blurb:
      'Comfortable below the browser: microcontrollers, robots, compilers.',
    rows: [
      ['C', 'C++', 'Assembler'],
      ['Arduino', 'AVR', 'STM32'],
      ['KNX', 'LOXONE', 'KRL'],
      ['Matlab', 'Simulink'],
      ['ANTLR', 'LLVM']
    ]
  }
];

export const MARQUEE_A = [
  'TypeScript',
  'Angular',
  'React',
  'Next.js',
  'Vue',
  'Java',
  'Spring',
  'Node.js',
  'Nest',
  'Go',
  'Python',
  'Kotlin',
  'Scala'
];

export const MARQUEE_B = [
  'AWS',
  'GCP',
  'Azure',
  'Kubernetes',
  'Docker',
  'Kafka',
  'PostgreSQL',
  'Oracle',
  'MongoDB',
  'Web3',
  'TensorFlow',
  'LLMs',
  'C++',
  'STM32'
];

export const LINKS = {
  email: 'mateuszstasz@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mateusz-staszk%C3%B3w-4bb952121/',
  github: 'https://github.com/mateuszstaszkow',
  interview:
    'https://justjoin.it/blog/kultura-pracy-w-szwajcarii-jest-zroznicowana/'
};
