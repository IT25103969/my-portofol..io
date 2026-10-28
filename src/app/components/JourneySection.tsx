import { motion } from 'motion/react';
import { Award, GraduationCap, Rocket } from 'lucide-react';

type Kind = 'venture' | 'education' | 'award';

interface Milestone {
  period: string;
  kind: Kind;
  title: string;
  org: string;
  description: string;
  current?: boolean;
}

// Education, recognition and collaboration, newest first. Projects live in Selected work.
// Add internships, hackathons or certifications here as they happen.
const milestones: Milestone[] = [
  {
    period: 'Now',
    kind: 'venture',
    title: 'Founder, AlchemyX Global',
    org: 'Startup · AI systems for businesses',
    description:
      'Building AI systems that help businesses put retrieval, agents and automation to work in their day-to-day operations.',
    current: true,
  },
  {
    period: '2026',
    kind: 'award',
    title: 'Certificate of Excellence',
    org: 'ParkPulse',
    description:
      'Recognised for full-stack system architecture, real-time software engineering and practical AI integration.',
  },
  {
    period: 'Now',
    kind: 'education',
    title: 'BSc (Hons) Information Technology',
    org: 'SLIIT · Specialising in Artificial Intelligence',
    description:
      'Coursework across software engineering, data structures, databases and machine learning, with a focus on applied AI.',
    current: true,
  },
];

const KIND_META: Record<Kind, { label: string; Icon: typeof Award }> = {
  venture: { label: 'Founder', Icon: Rocket },
  education: { label: 'Education', Icon: GraduationCap },
  award: { label: 'Award', Icon: Award },
};

export function JourneySection() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="bg-neutral-50 border-y border-neutral-200 py-16 md:py-32 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto md:grid md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4 mb-10 md:mb-0">
          <div className="md:sticky md:top-32">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">— Journey (04)</p>
            <h2 id="journey-heading" className="text-3xl md:text-5xl tracking-tight text-black leading-[1.05]">
              Work, study &amp;
              <br />
              recognition.
            </h2>
          </div>
        </div>

        <ol className="md:col-span-8 relative">
          {/* Timeline spine */}
          <span aria-hidden="true" className="absolute left-[5px] md:left-[calc(8.5rem+5px)] top-2 bottom-2 w-px bg-neutral-200" />

          {milestones.map((m, i) => {
            const { label, Icon } = KIND_META[m.kind];
            return (
              <motion.li
                key={m.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative grid grid-cols-[auto_1fr] md:grid-cols-[6.5rem_auto_1fr] gap-x-5 md:gap-x-8 pb-10 md:pb-14 last:pb-0"
              >
                {/* Period — inline on mobile, own column on desktop */}
                <p className="hidden md:block pt-0.5 text-base text-black tabular-nums text-right">{m.period}</p>

                {/* Node */}
                <span aria-hidden="true" className="relative mt-1.5 flex h-[11px] w-[11px]">
                  {m.current && (
                    <span className="absolute inset-0 rounded-full bg-amber-400 opacity-60 motion-safe:animate-ping" />
                  )}
                  <span
                    className={`relative h-[11px] w-[11px] rounded-full border ${
                      m.kind === 'award' || m.current
                        ? 'bg-amber-400 border-amber-500'
                        : 'bg-white border-neutral-500'
                    }`}
                  />
                </span>

                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-2 text-sm text-neutral-500">
                    <span className="md:hidden text-black tabular-nums">{m.period}</span>
                    <span className="md:hidden" aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
                      {label}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl tracking-tight text-black">{m.title}</h3>
                  <p className="text-[15px] text-neutral-600 mt-1">{m.org}</p>
                  <p className="text-[15px] md:text-base text-neutral-700 leading-relaxed mt-3 max-w-xl">{m.description}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
