import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Coffee, Layers, Cpu, Box, GitBranch, Server, Code2, Radio } from 'lucide-react';

interface Skill {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  Icon: typeof Coffee;
}

const skills: Skill[] = [
  {
    id: 'java',
    index: '01',
    title: 'Java',
    category: 'Language',
    description:
      'Writing robust, object-oriented applications in Java — from console utilities to full enterprise-grade services with clean architecture.',
    tools: ['Java 17', 'Maven', 'JUnit'],
    Icon: Coffee,
  },
  {
    id: 'spring',
    index: '02',
    title: 'Spring Boot',
    category: 'Framework',
    description:
      'Building production-ready REST APIs and microservices with Spring Boot — handling security, data persistence, and deployment configuration.',
    tools: ['Spring MVC', 'Spring Data', 'Spring Security'],
    Icon: Layers,
  },
  {
    id: 'cpp',
    index: '03',
    title: 'C++',
    category: 'Language',
    description:
      'Working close to the metal with C++ for performance-critical systems, embedded firmware, and algorithm implementations.',
    tools: ['STL', 'CMake', 'GDB'],
    Icon: Cpu,
  },
  {
    id: 'oop',
    index: '04',
    title: 'OOP',
    category: 'Paradigm',
    description:
      'Designing systems around objects — applying encapsulation, inheritance, polymorphism, and SOLID principles to write maintainable, scalable code.',
    tools: ['Design Patterns', 'SOLID', 'UML'],
    Icon: Box,
  },
  {
    id: 'dsa',
    index: '05',
    title: 'DSA',
    category: 'Fundamentals',
    description:
      'Fluent in core data structures and algorithms — selecting the right structure for the problem and reasoning clearly about time and space complexity.',
    tools: ['Arrays', 'Trees', 'Graphs'],
    Icon: GitBranch,
  },
  {
    id: 'backend',
    index: '06',
    title: 'Backend',
    category: 'Engineering',
    description:
      'Architecting server-side systems — REST APIs, authentication flows, database design, and deployment pipelines that hold up under load.',
    tools: ['REST', 'MySQL', 'Docker'],
    Icon: Server,
  },
  {
    id: 'react',
    index: '07',
    title: 'React',
    category: 'Frontend',
    description:
      'Crafting responsive, component-driven UIs with React — managing state cleanly, composing reusable components, and wiring them to live backends.',
    tools: ['TypeScript', 'Tailwind', 'Vite'],
    Icon: Code2,
  },
  {
    id: 'iot',
    index: '08',
    title: 'IoT',
    category: 'Hardware',
    description:
      'Bridging software and the physical world — programming microcontrollers, reading sensors, and building end-to-end embedded systems.',
    tools: ['ESP32', 'Arduino', 'MQTT'],
    Icon: Radio,
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

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
      onMouseMove={onMove}
      onMouseLeave={onLeave}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200">
          {skills.map((s) => (
            <TiltCard key={s.id} s={s} />
          ))}
        </div>

      </div>
    </section>
  );
}
