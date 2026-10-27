import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Coffee, Layers, Cpu, GitBranch, Server, Code2, Radio,
  Terminal, BrainCircuit, Network, Search, Bot,
} from 'lucide-react';

interface Skill {
  id: string;
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
      { id: 'java', index: '01', title: 'Java', category: 'Language',
        description: 'Writing object-oriented applications in Java, from console utilities to enterprise-grade services. Applies encapsulation, inheritance, polymorphism, SOLID principles and design patterns.',
        tools: ['Java 17', 'Maven', 'JUnit', 'OOP', 'Design Patterns'], Icon: Coffee },
      { id: 'python', index: '02', title: 'Python', category: 'Language',
        description: 'Writing data pipelines, analysis scripts and machine learning code, with a focus on clean, testable modules.',
        tools: ['Pandas', 'NumPy', 'pytest'], Icon: Terminal },
      { id: 'cpp', index: '03', title: 'C++', category: 'Systems',
        description: 'Working close to the metal for performance-critical code, embedded firmware and algorithm implementations.',
        tools: ['STL', 'CMake', 'GDB'], Icon: Cpu },
      { id: 'dsa', index: '04', title: 'DSA', category: 'Fundamentals',
        description: 'Choosing the right data structure for each problem and reasoning about time and space complexity.',
        tools: ['Arrays', 'Trees', 'Graphs'], Icon: GitBranch },
    ],
  },
  {
    label: 'Engineering and web',
    skills: [
      { id: 'spring', index: '05', title: 'Spring Boot', category: 'Framework',
        description: 'Building production-ready REST APIs and microservices, covering security, data persistence and deployment configuration.',
        tools: ['Spring MVC', 'Spring Data', 'Spring Security'], Icon: Layers },
      { id: 'backend', index: '06', title: 'Backend', category: 'Engineering',
        description: 'Designing server-side systems with REST APIs, authentication flows, database design and containerised deployment.',
        tools: ['REST', 'MySQL', 'Docker'], Icon: Server },
      { id: 'react', index: '07', title: 'React', category: 'Frontend',
        description: 'Building responsive, component-driven interfaces, managing state cleanly and connecting them to live backends.',
        tools: ['TypeScript', 'Tailwind', 'Vite'], Icon: Code2 },
      { id: 'iot', index: '08', title: 'IoT', category: 'Hardware',
        description: 'Programming microcontrollers, reading sensors and building end-to-end embedded systems.',
        tools: ['ESP32', 'Arduino', 'MQTT'], Icon: Radio },
    ],
  },
  {
    label: 'AI',
    skills: [
      { id: 'ml', index: '09', title: 'Machine Learning', category: 'Machine Learning',
        description: 'Building end-to-end ML pipelines, from data preparation and feature work to training and evaluation.',
        tools: ['scikit-learn', 'Pandas', 'NumPy'], Icon: BrainCircuit },
      { id: 'dl', index: '10', title: 'Deep Learning', category: 'Deep Learning',
        description: 'Training convolutional neural networks for image classification, with PyTorch and TensorFlow.',
        tools: ['PyTorch', 'TensorFlow', 'CNNs'], Icon: Network },
      { id: 'rag', index: '11', title: 'RAG & Retrieval', category: 'Retrieval',
        description: 'Building retrieval-augmented pipelines that combine semantic and keyword search, rerank results and tune each stage for quality and latency.',
        tools: ['Chroma', 'BM25', 'Hybrid Search', 'Reranking'], Icon: Search },
      { id: 'agents', index: '12', title: 'Agentic Workflows', category: 'Agents',
        description: 'Designing LLM agents with bounded research loops, evidence checks, conflict resolution and citation validation.',
        tools: ['OpenRouter', 'Agent Loops', 'Evidence Validation'], Icon: Bot },
    ],
  },
];

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
      `radial-gradient(circle at ${lx}% ${ly}%, rgba(251,191,36,0.07) 0%, transparent 65%)`
  );

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
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
      <span className="absolute left-0 top-0 h-px w-0 bg-amber-400 group-hover:w-full transition-all duration-700 ease-out" />

      <div className="flex items-start justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          {s.index} — {s.category}
        </span>
        <s.Icon
          className="w-5 h-5 text-neutral-400 group-hover:text-amber-500 transition-colors duration-300"
          strokeWidth={1.25}
        />
      </div>

      <div>
        <h3 className="text-xl md:text-2xl tracking-tight text-black mb-3">{s.title}</h3>
        <p className="text-neutral-600 leading-relaxed text-sm mb-6">{s.description}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-2 pt-5 border-t border-neutral-200">
          {s.tools.map((t) => (
            <span
              key={t}
              className="text-xs text-neutral-500 group-hover:text-amber-600 transition-colors duration-300"
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
        </div>

        <div className="space-y-12 md:space-y-16">
          {groups.map((g) => (
            <div key={g.label}>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-6 h-px bg-amber-400" />
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
