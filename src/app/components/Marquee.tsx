import { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'motion/react';

const ITEMS = [
  'Machine Learning',
  'Neural Networks',
  'Full Stack',
  'Data Science',
  'Computer Vision',
  'Research',
  'TypeScript',
  'Python',
];

const DURATION = 30;

export function Marquee() {
  const controls = useAnimationControls();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    controls.start({
      x: ['0%', '-50%'],
      transition: {
        duration: hovered ? DURATION * 3.5 : DURATION,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  }, [hovered, controls]);

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
            className="flex items-center gap-10 md:gap-12 text-2xl sm:text-3xl md:text-5xl text-black tracking-tight"
          >
            <motion.span
              whileHover={{ color: 'rgb(245 158 11)' }}
              transition={{ duration: 0.2 }}
              className="cursor-default select-none"
            >
              {item}
            </motion.span>
            <span className="text-amber-300">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
