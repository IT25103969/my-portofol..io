import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import {
  Coffee, Layers, Cpu, GitBranch, Server, Code2, Radio,
  Terminal, BrainCircuit, Network, Search, Bot,
} from 'lucide-react';

type Level = 'core' | 'working' | 'exploring';

const LEVELS: Record<Level, { label: string; filled: number; hint: string }> = {
  core: { label: 'Core', filled: 3, hint: 'Daily use, shipped in projects' },
  working: { label: 'Working', filled: 2, hint: 'Used in real builds' },
  exploring: { label: 'Exploring', filled: 1, hint: 'Actively learning' },
};

interface Skill {
  id: string;
  level: Level;
  index: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  Icon: typeof Coffee;
}

interface Group {
  label: string;
  skills: Skill[];
}

const groups: Group[] = [
  {
    label: 'Languages & fundamentals',
    skills: [
      { id: 'java', level: 'core', index: '01', title: 'Java', category: 'Language',
        description: 'Object-oriented services and tools, built with SOLID principles and design patterns.',
        tools: ['Java 17', 'Maven', 'JUnit', 'OOP', 'Design Patterns'], Icon: Coffee },
      { id: 'python', level: 'core', index: '02', title: 'Python', category: 'Language',
        description: 'Data pipelines, analysis and machine learning code in clean, testable modules.',
        tools: ['Pandas', 'NumPy', 'pytest'], Icon: Terminal },
      { id: 'cpp', level: 'working', index: '03', title: 'C++', category: 'Systems',
        description: 'Performance-critical code, embedded firmware and algorithm implementations.',
        tools: ['STL', 'CMake', 'GDB'], Icon: Cpu },
      { id: 'dsa', level: 'core', index: '04', title: 'DSA', category: 'Fundamentals',
        description: 'Picking the right structure for the problem and reasoning about time and space.',
        tools: ['Arrays', 'Trees', 'Graphs'], Icon: GitBranch },
    ],
  },
  {
    label: 'Engineering and web',
    skills: [
      { id: 'spring', level: 'working', index: '05', title: 'Spring Boot', category: 'Framework',
        description: 'Production-style REST APIs with security, persistence and validation.',
        tools: ['Spring MVC', 'Spring Data', 'Spring Security'], Icon: Layers },
      { id: 'backend', level: 'working', index: '06', title: 'Backend', category: 'Engineering',
        description: 'Server-side systems: REST APIs, auth flows, database design and deployment.',
        tools: ['REST', 'MySQL', 'Docker'], Icon: Server },
      { id: 'react', level: 'working', index: '07', title: 'React', category: 'Frontend',
        description: 'Responsive, component-driven interfaces wired to live backends.',
        tools: ['TypeScript', 'Tailwind', 'Vite'], Icon: Code2 },
      { id: 'iot', level: 'working', index: '08', title: 'IoT', category: 'Hardware',
        description: 'Microcontrollers, sensors and cloud-connected embedded systems.',
        tools: ['ESP32', 'Arduino', 'MQTT'], Icon: Radio },
    ],
  },
  {
    label: 'AI',
    skills: [
      { id: 'ml', level: 'working', index: '09', title: 'Machine Learning', category: 'Machine Learning',
        description: 'End-to-end pipelines, from data preparation and features to evaluation.',
        tools: ['scikit-learn', 'Pandas', 'NumPy'], Icon: BrainCircuit },
      { id: 'dl', level: 'working', index: '10', title: 'Deep Learning', category: 'Deep Learning',
        description: 'Custom CNNs for image classification, with leakage-aware evaluation and Grad-CAM.',
        tools: ['TensorFlow', 'Keras', 'CNNs', 'Grad-CAM'], Icon: Network },
      { id: 'rag', level: 'working', index: '11', title: 'RAG & Retrieval', category: 'Retrieval',
        description: 'Hybrid semantic + keyword retrieval with rank fusion and reranking.',
        tools: ['Chroma', 'BM25', 'Hybrid Search', 'Reranking'], Icon: Search },
      { id: 'agents', level: 'working', index: '12', title: 'Agentic Workflows', category: 'Agents',
        description: 'Bounded LLM agent loops with evidence checks and citation validation.',
        tools: ['OpenRouter', 'Agent Loops', 'Evidence Validation'], Icon: Bot },
    ],
  },
];

function LevelMeter({ level, tone = 'card' }: { level: Level; tone?: 'card' | 'legend' }) {
  const { label, filled } = LEVELS[level];
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex gap-[3px]" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-[3px] w-3 ${
              i < filled
                ? tone === 'card'
                  ? 'bg-neutral-800'
                  : 'bg-neutral-800'
                : 'bg-neutral-300'
            }`}
          />
        ))}
      </span>
      <span className="text-sm text-neutral-600">
        <span className="sr-only">Proficiency: </span>
        {label}
      </span>
    </span>
  );
}

function TiltCard({ s }: { s: Skill }) {
  const ref = useRef<HTMLDivElement>(null);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 200, damping: 20 });
  const springRotY = useSpring(rotY, { stiffness: 200, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const background = useTransform(
    [glowX, glowY],
    ([lx, ly]: number[]) =>
      `radial-gradient(circle at ${lx}% ${ly}%, rgba(0,0,0,0.03) 0%, transparent 65%)`
  );

  const reduce = useReducedMotion();

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const rect = ref.current!.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    rotX.set((ny - 0.5) * -10);
    rotY.set((nx - 0.5) * 10);
    glowX.set(nx * 100);
    glowY.set(ny * 100);
  };

  const onLeave = () => {
    rotX.set(0);
    rotY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: 'preserve-3d',
        transformPerspective: 600,
        background,
      }}
      whileHover={{ scale: 1.015 }}
      transition={{ scale: { type: 'spring', stiffness: 300, damping: 22 } }}
      className="relative bg-neutral-50 hover:bg-white active:bg-white transition-colors p-6 md:p-8 flex flex-col justify-between gap-8 md:gap-10 group overflow-hidden"
    >
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-0 bg-amber-400 group-hover:w-full transition-all duration-700 ease-out" />

      <div className="flex items-start justify-between">
        <span className="text-sm text-neutral-500 tabular-nums">
          {s.index} · {s.category}
        </span>
        <s.Icon
          aria-hidden="true"
          className="w-5 h-5 text-neutral-500 group-hover:text-black transition-colors duration-300"
          strokeWidth={1.25}
        />
      </div>

      <div>
        <h3 className="text-xl md:text-2xl tracking-tight text-black mb-2">{s.title}</h3>
        <div className="mb-4">
          <LevelMeter level={s.level} />
        </div>
        <p className="text-neutral-700 leading-relaxed text-[15px] mb-6">{s.description}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-2 pt-5 border-t border-neutral-200">
          {s.tools.map((t) => (
            <span
              key={t}
              className="text-sm text-neutral-500 group-hover:text-black transition-colors duration-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function HorizontalBentoGrid() {
  return (
    <section id="skills" className="bg-neutral-50 border-y border-neutral-200 px-6 md:px-10 py-16 md:py-32">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12 md:mb-20">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">— Capabilities (02)</p>
          <h2 className="text-3xl md:text-6xl tracking-tight text-black">Skills, in detail.</h2>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {(Object.keys(LEVELS) as Level[]).map((l) => (
              <div key={l} className="flex items-center gap-3">
                <dt>
                  <LevelMeter level={l} tone="legend" />
                </dt>
                <dd className="text-sm text-neutral-500">{LEVELS[l].hint}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-12 md:space-y-16">
          {groups.map((g) => (
            <div key={g.label}>
              <div className="flex items-center gap-4 mb-4">
                <span aria-hidden="true" className="w-6 h-px bg-amber-400" />
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{g.label}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200">
                {g.skills.map((s) => (
                  <TiltCard key={s.id} s={s} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
