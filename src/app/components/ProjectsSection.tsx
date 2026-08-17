import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ChevronDown, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  year: string;
  role: string;
  tech: string[];
  github?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'ParkPulse',
    description:
      'A smart parking management platform with real-time slot tracking, entry/exit automation, and an admin dashboard. Designed for scalability across multi-level parking facilities.',
    year: '2025',
    role: 'Backend · System Design',
    tech: ['Spring Boot', 'Java', 'MySQL'],
    github: 'https://github.com/shihaz6/ParkPulse_16',
  },
  {
    id: 2,
    title: 'Home Automation System',
    description:
      'An IoT-driven home control system using ESP32-S3 microcontrollers to manage lighting, appliances, and environmental sensors — synced to Firebase for real-time remote control.',
    year: '2025',
    role: 'IoT · Embedded · Firmware',
    tech: ['ESP32-S3', 'Firebase', 'C++', 'Arduino'],
    github: 'https://github.com/IT25103969',
  },
  {
    id: 3,
    title: 'BloodHound AI',
    description:
      'An AI-powered diagnostic assistant that analyses symptoms and patient data to assist in early-stage disease detection — built with a focus on accuracy and clinical usability.',
    year: '2025',
    role: 'AI · Research · Engineering',
    tech: ['Python', 'TensorFlow', 'Flask', 'React'],
    github: 'https://github.com/IT25103969',
  },
  {
    id: 4,
    title: 'ESP32 Face Tracker',
    description:
      'An AI-controlled ESP32 system with a servo-mounted camera that detects and tracks human faces in real time using computer vision, running inference at the edge.',
    year: '2024',
    role: 'Embedded · Computer Vision',
    tech: ['ESP32', 'OpenCV', 'Python', 'C++'],
    github: 'https://github.com/IT25103969',
  },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="border-b border-neutral-200"
    >
      <button
        className="w-full text-left group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {/* Mobile layout */}
        <div className="flex items-start justify-between gap-4 py-6 md:hidden">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-amber-500 shrink-0">
                ({String(index + 1).padStart(2, '0')})
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-neutral-500">
                {project.year}
              </span>
            </div>
            <h3 className="text-xl tracking-tight text-black">{project.title}</h3>
            <p className="text-xs text-neutral-500 mt-1">{project.role}</p>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-neutral-400" strokeWidth={1.25} />
          </motion.span>
        </div>

        {/* Desktop layout */}
        <div
          className={`hidden md:grid grid-cols-12 gap-10 items-center py-10 transition-colors ${
            open ? 'bg-amber-50/40' : 'hover:bg-neutral-50/60'
          }`}
        >
          <div className="col-span-1 text-sm text-amber-500">
            ({String(index + 1).padStart(2, '0')})
          </div>
          <div className="col-span-3">
            <h3
              className={`text-2xl md:text-3xl tracking-tight text-black transition-transform duration-500 ${
                open ? 'translate-x-2' : 'group-hover:translate-x-2'
              }`}
            >
              {project.title}
            </h3>
          </div>
          <div className="col-span-5 text-neutral-500 text-sm">{project.role}</div>
          <div className="col-span-2 text-sm text-neutral-500">
            <p className="text-black">{project.year}</p>
          </div>
          <div className="col-span-1 flex justify-end">
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown
                className={`w-5 h-5 transition-colors ${
                  open ? 'text-amber-500' : 'text-neutral-400 group-hover:text-black'
                }`}
                strokeWidth={1.25}
              />
            </motion.span>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pt-2 md:pl-[calc(1/12*100%+2.5rem)] md:pr-[calc(1/12*100%+2.5rem)]">
              <div className="border-l-2 border-amber-400 pl-5 md:pl-8 space-y-4 md:space-y-5">
                <p className="text-neutral-700 leading-relaxed text-sm md:text-base max-w-2xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 border border-amber-200 bg-amber-50 text-amber-700 tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-1">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-black hover:text-amber-600 active:text-amber-600 transition-colors py-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4" strokeWidth={1.25} />
                    View on GitHub
                    <ArrowUpRight
                      className="w-3.5 h-3.5 group-hover/link:rotate-45 transition-transform duration-300"
                      strokeWidth={1.5}
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-white py-16 md:py-48 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10 md:mb-20">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">
            — Selected work (03)
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-7xl tracking-tight text-black"
          >
            A few things I've made.
          </motion.h2>
          <p className="mt-3 text-sm text-neutral-400 tracking-wide">Tap any row to explore →</p>
        </div>

        <div className="border-t border-neutral-200">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
