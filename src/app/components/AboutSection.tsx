import { motion } from 'motion/react';
import portraitImg from '../../imports/3fb34df4-e0c9-4a95-a628-5d716184faac.jpg';

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-16 md:py-48 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10 md:mb-0 md:grid md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <div className="md:sticky md:top-32">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-1">— About</p>
              <p className="text-sm text-neutral-500">(01)</p>
            </div>
          </div>

          <div className="md:col-span-9 space-y-10 md:space-y-16 mt-8 md:mt-0">
            {/* Heading + portrait row */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-2xl md:text-5xl leading-[1.15] md:leading-[1.1] tracking-tight text-black md:max-w-[58%]"
              >
                I build at the intersection of{' '}
                <em className="italic text-amber-500">intelligence</em> and interface —
                turning models, data, and ideas into things people can use.
              </motion.h2>

              {/* Portrait */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="relative shrink-0 self-start md:self-auto w-48 md:w-56 aspect-[3/4]"
              >
                {/* Offset amber accent block */}
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-amber-300/30 border border-amber-300/50" />
                {/* Image */}
                <div className="relative w-full h-full overflow-hidden border border-neutral-200">
                  <img
                    src={portraitImg}
                    alt="Shihaz Shaheem"
                    className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  {/* Subtle overlay label */}
                  <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-white/80 backdrop-blur-sm border-t border-neutral-200">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Shihaz Shaheem</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-neutral-700 leading-relaxed text-sm md:text-base">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Currently studying for my BSc (Hons) in Information Technology with a
                specialization in Artificial Intelligence at the Sri Lanka Institute of
                Information Technology. My focus sits between research and engineering —
                shipping work that's both rigorous and refined.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                I care about clarity, restraint, and craft — whether that's a clean
                architectural decision in a backend service, an evaluation pipeline for
                a model, or a small interaction that just feels right.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 md:pt-12 border-t border-neutral-200">
              {[
                { k: 'Education', v: 'SLIIT — BSc IT' },
                { k: 'Specialization', v: 'Artificial Intelligence' },
                { k: 'Location', v: 'Colombo, Sri Lanka' },
                { k: 'Status', v: 'Open to work' },
              ].map((m, i) => (
                <motion.div
                  key={m.k}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  viewport={{ once: true }}
                  whileHover={{ x: 4 }}
                  className="group"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-neutral-400 mb-2 group-hover:text-amber-500 transition-colors duration-300">
                    {m.k}
                  </p>
                  <p className="text-black text-sm md:text-base">{m.v}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
