import { useEffect, useState } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'motion/react';

const ITEMS = [
  'RAG & Retrieval',
  'AI Agents',
  'Computer Vision',
  'Deep Learning',
  'Voice AI',
  'Spring Boot',
  'React',
  'IoT & ESP32',
];

const DURATION = 30;

export function Marquee() {
  const controls = useAnimationControls();
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      controls.stop();
      controls.set({ x: '0%' });
      return;
    }
    controls.start({
      x: ['0%', '-50%'],
      transition: {
        duration: hovered ? DURATION * 3.5 : DURATION,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  }, [hovered, controls, reduce]);

  return (
    <div
      className="border-y border-neutral-200 bg-white py-6 md:py-8 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={controls}
        className="flex gap-10 md:gap-12 whitespace-nowrap"
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div
            key={i}
            aria-hidden={i >= ITEMS.length ? true : undefined}
            className="flex items-center gap-10 md:gap-12 text-2xl sm:text-3xl md:text-5xl text-black tracking-tight"
          >
            <motion.span
              whileHover={{ color: 'rgb(245 158 11)' }}
              transition={{ duration: 0.2 }}
              className="cursor-default select-none"
            >
              {item}
            </motion.span>
            <span aria-hidden="true" className="text-neutral-300">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
