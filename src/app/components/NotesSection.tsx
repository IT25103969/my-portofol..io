import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

interface Note {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  body: string[];
}

const notes: Note[] = [
  {
    id: 'conflicting-evidence',
    tag: 'AlchemAI · Agents',
    title: 'When sources disagree: conflict adjudication in a RAG agent',
    excerpt:
      'Most RAG demos assume retrieved passages agree. Real corpora don’t. Here’s how AlchemAI handles that without inventing an answer.',
    readTime: '3 min',
    body: [
      'Every retrieved chunk in AlchemAI carries an evidence ID. Before the model writes anything, the agent runs a sufficiency check: is there enough evidence to answer? If not, it resolves entities and issues follow-up queries.',
      'When two passages contradict each other, such as two dates or two figures for the same thing, the adjudication step sets them side by side and records which one it trusts and why, instead of quietly averaging them in the prose.',
      'The loop is capped at four iterations. Without that bound, an agent that keeps “finding more context” can burn tokens indefinitely while getting no closer to an answer.',
      'Finally, every citation in the answer is checked against the evidence IDs that were actually supplied. Anything pointing elsewhere is rejected, and if generation fails outright, a deterministic fallback returns the strongest evidence with its sources rather than a guess.',
    ],
  },
  {
    id: 'hybrid-retrieval',
    tag: 'Retrieval · Search',
    title: 'Why BM25 still earns its place next to embeddings',
    excerpt:
      'Dense vectors are great at meaning and surprisingly bad at exact names and codes. Hybrid search covers both.',
    readTime: '2 min',
    body: [
      'Semantic search finds passages that mean the same thing as the query, even with different words. It struggles with exact tokens: product codes, surnames, error strings, version numbers.',
      'BM25 is the opposite. It is blunt about meaning but precise on rare, exact terms. Running both and merging the results gives recall that neither achieves alone.',
      'Merging is the tricky part, because cosine similarity and BM25 scores aren’t on the same scale. Reciprocal-rank fusion sidesteps that by using only each document’s rank in each list, summing 1 / (k + rank).',
      'The fused list is then reranked, and only the top five passages reach the model. Fewer, better passages make answers more grounded and citations easier to verify.',
    ],
  },
];

function NoteCard({ note, index }: { note: Note; index: number }) {
  const [open, setOpen] = useState(false);
  const bodyId = `note-${note.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`group relative border border-neutral-200 bg-white p-6 md:p-10 flex flex-col transition-colors ${
        open ? 'border-neutral-300' : 'hover:border-neutral-300'
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 h-px bg-amber-400 transition-all duration-700 ease-out ${
          open ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
      <div className="flex items-center justify-between gap-4 mb-6 text-sm text-neutral-500">
        <span>{note.tag}</span>
        <span className="tabular-nums">{note.readTime} read</span>
      </div>

      <h3 className="text-xl md:text-3xl tracking-tight text-black leading-[1.15] mb-4">{note.title}</h3>
      <p className="text-[15px] md:text-base text-neutral-700 leading-relaxed">{note.excerpt}</p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            id={bodyId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-neutral-200 space-y-4 text-[15px] md:text-base text-neutral-800 leading-relaxed">
              {note.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={bodyId}
        className="mt-8 self-start inline-flex items-center gap-3 min-h-[44px] text-sm text-black hover:text-amber-600 transition-colors"
      >
        <span className="relative">
          {open ? 'Close note' : 'Read note'}
          <span className="sr-only">: {note.title}</span>
          <span aria-hidden="true" className="absolute left-0 -bottom-1 h-px w-full bg-current" />
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }} aria-hidden="true">
          <Plus className="w-4 h-4" strokeWidth={1.5} />
        </motion.span>
      </button>
    </motion.article>
  );
}

export function NotesSection() {
  return (
    <section id="notes" aria-labelledby="notes-heading" className="bg-white py-16 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-16 md:flex md:items-end md:justify-between gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">— Notes (05)</p>
            <h2 id="notes-heading" className="text-3xl md:text-6xl tracking-tight text-black">
              Writing it down.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-sm text-[15px] text-neutral-600 leading-relaxed">
            Short write-ups on design decisions behind my projects: what I tried, what broke, and what stuck.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {notes.map((n, i) => (
            <NoteCard key={n.id} note={n} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
