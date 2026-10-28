import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Award, ChevronDown, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  /** One-line hook shown on the collapsed row */
  headline: string;
  problem: string;
  /** What I built: concrete, scannable points */
  built: string[];
  outcome: string;
  /** For team projects: what I personally owned */
  myPart?: string;
  year: string;
  role: string;
  /** First MAX_TAGS render as pills, the rest as plain text */
  tech: string[];
  award?: string;
  github?: string;
}

const MAX_TAGS = 5;
const partLabel = 'text-sm font-medium text-neutral-500 mb-1.5';

const projects: Project[] = [
  {
    id: 1,
    title: 'ParkPulse',
    headline: 'Certificate of Excellence winner',
    problem:
      'Parking facilities juggle slots, tickets, memberships and billing across separate tools and manual steps, so operators lack a live view and drivers wait.',
    built: [
      'Live map of 6 zones with colour-coded slot states, overflow alerts and auto-release timers',
      'Time-based ticketing with per-vehicle-type rates, card or cash checkout, and three membership tiers with instant QR passes',
      'Stateless JWT auth (HS256) with 5 access tiers, 14 custom permissions, session timeouts and lockout policies',
      'Parker, a Groq Llama 3.3 assistant, gives staff role-gated analytics; Recharts dashboards cover traffic and revenue',
    ],
    outcome:
      'One real-time platform for drivers and operators, recognised with a Certificate of Excellence for its architecture, real-time engineering and AI integration.',
    year: '2026',
    role: 'Full Stack · System Architecture · AI',
    tech: ['Spring Boot', 'React', 'TypeScript', 'MySQL', 'Groq Llama 3.3', 'Java', 'Tailwind CSS', 'Recharts', 'ZXing'],
    award:
      'Certificate of Excellence for Full-Stack System Architecture, Real-Time Software Engineering and Practical AI Integration',
    github: 'https://github.com/shihaz6/ParkPulse_16',
  },
  {
    id: 2,
    title: 'Rice Leaf Disease CNN',
    headline: '98.68% held-out accuracy, leakage-audited',
    problem:
      'Classify four rice leaf diseases from photos with a model trained from scratch, and prove the score is real rather than inflated by duplicate images.',
    built: [
      'Found leakage behind a too-good 99.7% validation score: perceptual hashing revealed near-duplicates shared across splits',
      'Cleaned 5,932 images to 2,138 with SHA-256, pHash and Union-Find grouping, then rebuilt splits with StratifiedGroupKFold so no group is shared',
      'Five custom CNN variants testing augmentation, BatchNorm, dropout and learning rate, all retrained on the corrected data',
      'Grad-CAM heatmaps confirming the model focuses on lesions, not background',
    ],
    outcome:
      '98.68% accuracy and 0.986 macro-F1 on an untouched test set (299 of 303 correct). All four errors involve the Blast class, which points to the next improvement.',
    year: '2026',
    role: 'Deep Learning · Computer Vision',
    tech: ['TensorFlow', 'Keras', 'Python', 'scikit-learn', 'imagehash', 'Grad-CAM', 'Google Colab'],
    github: 'https://github.com/shihaz6',
  },
  {
    id: 3,
    title: 'AlchemAI',
    headline: 'Agentic RAG with validated citations',
    problem:
      'LLM answers over private documents are hard to trust: retrieval misses exact terms, sources conflict, and citations can be invented.',
    built: [
      'Hybrid search: Chroma semantic + BM25 lexical, fused with reciprocal-rank fusion and reranked to the top five',
      'Agent loop capped at four iterations: entity resolution, sufficiency check, conflict adjudication, follow-up queries',
      'Citation validation against supplied evidence IDs, with a deterministic fallback when generation fails',
      'Ingests .txt, .md, .docx, .pdf and .csv, with optional OCR for scanned PDFs',
    ],
    outcome:
      'Answers grounded in a local corpus, with every citation checked against real evidence and a safe fallback instead of a guess when generation fails.',
    year: '2026',
    role: 'AI · RAG · Agentic Systems',
    tech: ['Python', 'Streamlit', 'ChromaDB', 'BM25', 'Voyage AI', 'OpenRouter'],
    github: 'https://github.com/shihaz6',
  },
  {
    id: 4,
    title: 'Voice POS Order Entry',
    headline: 'Spoken orders to POS, reranker-verified',
    problem:
      'Pharmacy staff key in orders by hand while serving customers. Voice entry has to be fast, but a wrong medicine or strength is not acceptable.',
    built: [
      'Voice grammar of quantity, product, strength with unit normalisation; malformed orders are rejected before any POS search',
      'Progressive fuzzy matching scores name similarity separately from strength, and a Double Metaphone bonus can never rescue a weak match',
      'Deterministic matcher and LLM reranker must agree to add automatically; on disagreement the user picks a candidate or cancels',
      'API key stays in the server environment; regression tests use synthetic products, a simulated DOM and mocked providers',
    ],
    outcome:
      'A working MVP: spoken orders become POS line items only when two independent checks agree, and nothing ever touches checkout or payment.',
    year: '2026',
    role: 'AI · Voice · Browser Extension',
    tech: ['Chrome MV3', 'JavaScript', 'Node.js', 'Groq Whisper', 'GPT-OSS', 'MediaRecorder'],
    github: 'https://github.com/shihaz6',
  },
  {
    id: 5,
    title: 'Voyara',
    headline: 'Led a team-built booking platform',
    problem:
      'A tour-guide platform has many actors (tourists, hotels, transport providers, admins) whose bookings, approvals and permissions all have to stay consistent.',
    built: [
      'Led SLIIT team B3G1-03 across the Spring Boot backend and React frontend',
      'Accommodation module: admin and hotel-partner CRUD, destination search, room and occupancy rules, ownership checks, approval workflow and soft delete that preserves booking history',
      'voyAI travel assistant on Groq (gpt-oss-120b) via an OpenAI-compatible API, with the key kept server-side and local fallback replies',
      'Email verification with single-use, expiring 6-digit codes and a resend flow; unverified accounts can’t sign in',
    ],
    outcome:
      'A team-built Spring Boot + React platform with enforced validation and role-based access across every booking workflow.',
    myPart: 'Team lead. I owned the accommodation module, the voyAI integration and email verification.',
    year: '2026',
    role: 'Team lead · Backend · AI',
    tech: ['Spring Boot 3', 'Spring Security', 'Spring Data JPA', 'SQL Server', 'React', 'TypeScript', 'Groq'],
    github: 'https://github.com/shihaz6',
  },
  {
    id: 6,
    title: 'Home Automation System',
    headline: 'ESP32 to cloud dashboard, with Telegram alerts',
    problem:
      'Control lights, appliances and sensors at home from anywhere, and know immediately when something needs attention.',
    built: [
      'Firebase as the real-time hub: commands, device states and sensor data stay in sync between the dashboard and the ESP32',
      'Web control dashboard on Netlify, with Firebase handling authentication and live updates in the background',
      'Telegram alerts for system events, status changes and safety warnings, even when the dashboard isn’t open',
      'End-to-end IoT architecture covering firmware, cloud database, web deployment and device-to-user messaging',
    ],
    outcome:
      'A complete working system from firmware to cloud to phone, with real-time control and instant alerts.',
    year: '2025',
    role: 'IoT · Embedded · Cloud',
    tech: ['ESP32-S3', 'C++', 'Arduino', 'Firebase', 'Netlify', 'Telegram Bot API'],
    github: 'https://github.com/shihaz6',
  },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  // The first (strongest) project starts open, so visitors see rows expand
  const [open, setOpen] = useState(index === 0);
  const detailsId = `project-${project.id}-details`;
  const num = String(index + 1).padStart(2, '0');
  const tags = project.tech.slice(0, MAX_TAGS);
  const extraTags = project.tech.slice(MAX_TAGS);

  const headline = (
    <span className="inline-flex items-center gap-2">
      {project.award && (
        <Award className="w-4 h-4 shrink-0 text-amber-500" strokeWidth={1.5} aria-hidden="true" />
      )}
      {project.headline}
    </span>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="border-b border-neutral-200"
    >
      <button
        type="button"
        className="w-full text-left group min-h-[44px]"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={detailsId}
      >
        {/* Mobile layout */}
        <div className="flex items-start justify-between gap-4 py-6 md:hidden">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-neutral-500 mb-2 tabular-nums">
              {num} · {project.year}
            </p>
            <h3 className="text-2xl tracking-tight text-black">{project.title}</h3>
            <p className="text-[15px] text-neutral-800 mt-2">{headline}</p>
            <p className="text-sm text-neutral-500 mt-1">{project.role}</p>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 shrink-0"
            aria-hidden="true"
          >
            <ChevronDown className="w-5 h-5 text-neutral-500" strokeWidth={1.25} />
          </motion.span>
        </div>

        {/* Desktop layout */}
        <div
          className={`hidden md:grid grid-cols-12 gap-8 items-center py-9 transition-colors ${
            open ? 'bg-neutral-50' : 'hover:bg-neutral-50/70'
          }`}
        >
          <div className="col-span-1 text-sm text-neutral-500 tabular-nums">{num}</div>
          <div className="col-span-5">
            <h3
              className={`text-2xl lg:text-3xl tracking-tight text-black transition-transform duration-500 ${
                open ? 'translate-x-2' : 'group-hover:translate-x-2'
              }`}
            >
              {project.title}
            </h3>
            <p className="text-sm text-neutral-500 mt-1.5">{project.role}</p>
          </div>
          <p className="col-span-4 text-base text-neutral-800">{headline}</p>
          <p className="col-span-1 text-sm text-black tabular-nums">{project.year}</p>
          <div className="col-span-1 flex justify-end" aria-hidden="true">
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown
                className={`w-5 h-5 transition-colors ${
                  open ? 'text-black' : 'text-neutral-500 group-hover:text-black'
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
            id={detailsId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 pt-2 md:pl-[calc(1/12*100%+2rem)] md:pr-[calc(1/12*100%+2rem)]">
              <div className="border-l border-neutral-900 pl-5 md:pl-8 space-y-5">
                {project.award && (
                  <p className="inline-flex items-start gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2 max-w-2xl leading-relaxed">
                    <Award className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
                    <span>
                      <span className="sr-only">Award: </span>
                      {project.award}
                    </span>
                  </p>
                )}

                {project.myPart && (
                  <p className="text-base text-black max-w-2xl">
                    <span className="font-medium">My role: </span>
                    {project.myPart}
                  </p>
                )}

                <dl className="space-y-5 max-w-2xl">
                  <div>
                    <dt className={partLabel}>Problem</dt>
                    <dd className="text-base text-neutral-800 leading-relaxed">{project.problem}</dd>
                  </div>
                  <div>
                    <dt className={partLabel}>What I built</dt>
                    <dd>
                      <ul className="space-y-2.5">
                        {project.built.map((h) => (
                          <li key={h} className="flex gap-3 text-[15px] text-neutral-700 leading-relaxed">
                            <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-neutral-400" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className={partLabel}>Outcome</dt>
                    <dd className="text-base text-black leading-relaxed">{project.outcome}</dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-2">
                  {tags.map((t) => (
                    <span key={t} className="text-sm px-3 py-1 border border-neutral-300 text-neutral-700">
                      {t}
                    </span>
                  ))}
                  {extraTags.length > 0 && (
                    <span className="text-sm text-neutral-500 pl-1">+ {extraTags.join(', ')}</span>
                  )}
                </div>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 min-h-[44px] text-sm text-black hover:text-amber-600 transition-colors"
                  >
                    <Github className="w-4 h-4" strokeWidth={1.25} aria-hidden="true" />
                    <span className="underline underline-offset-4 decoration-neutral-300 group-hover/link:decoration-current">
                      View on GitHub
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 group-hover/link:rotate-45 transition-transform duration-300"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </a>
                )}
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
    <section id="projects" aria-labelledby="projects-heading" className="bg-white py-16 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">— Selected work (03)</p>
          <motion.h2
            id="projects-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-7xl tracking-tight text-black"
          >
            A few things I've made.
          </motion.h2>
          <p className="mt-4 text-[15px] text-neutral-600">Select a project to see how it works.</p>
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
