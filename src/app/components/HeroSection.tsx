import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function useScramble(original: string) {
  const [display, setDisplay] = useState(original);
  const busy = useRef(false);
  const iv = useRef<ReturnType<typeof setInterval> | null>(null);

  const trigger = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    let iter = 0;
    iv.current = setInterval(() => {
      setDisplay(
        original
          .split('')
          .map((ch, i) =>
            i < iter ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join('')
      );
      iter += 0.5;
      if (iter > original.length) {
        clearInterval(iv.current!);
        setDisplay(original);
        busy.current = false;
      }
    }, 35);
  }, [original]);

  useEffect(() => () => { if (iv.current) clearInterval(iv.current); }, []);

  return { display, trigger };
}

const wordVariants = {
  hidden: (i: number) => ({ y: i === 0 ? '-110%' : '110%', opacity: 0 }),
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function HeroBg({
  springX,
  springY,
}: {
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) {
  const circleX = useTransform(springX, [-0.5, 0.5], ['-20px', '20px']);
  const circleY = useTransform(springY, [-0.5, 0.5], ['-14px', '14px']);
  const innerX = useTransform(springX, [-0.5, 0.5], ['10px', '-10px']);
  const innerY = useTransform(springY, [-0.5, 0.5], ['8px', '-8px']);
  const blobX = useTransform(springX, [-0.5, 0.5], ['-40px', '40px']);
  const blobY = useTransform(springY, [-0.5, 0.5], ['-30px', '30px']);
  const blob2X = useTransform(springX, [-0.5, 0.5], ['25px', '-25px']);
  const blob2Y = useTransform(springY, [-0.5, 0.5], ['18px', '-18px']);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">

      {/* Soft warm base wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-white to-neutral-50" />

      {/* Aurora blob — amber */}
      <motion.div
        style={{ x: blobX, y: blobY }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[20vw] -left-[15vw] w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] rounded-full bg-amber-200/45 blur-[120px]"
      />

      {/* Aurora blob — cool slate */}
      <motion.div
        style={{ x: blob2X, y: blob2Y }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-[25vw] -right-[10vw] w-[70vw] h-[70vw] sm:w-[55vw] sm:h-[55vw] rounded-full bg-neutral-300/40 blur-[140px]"
      />

      {/* Fine dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #c7c7c7 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.3,
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
        }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Large outer circle — hidden on mobile */}
      <motion.div
        style={{ x: circleX, y: circleY }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.2, ease: 'easeOut' }}
        className="absolute hidden sm:block right-[-18vw] top-1/2 -translate-y-1/2 w-[72vw] h-[72vw] rounded-full border border-neutral-200/70"
      />

      {/* Inner ring — hidden on mobile */}
      <motion.div
        style={{ x: innerX, y: innerY }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.45, ease: 'easeOut' }}
        className="absolute hidden sm:block right-[-6vw] top-1/2 -translate-y-1/2 w-[38vw] h-[38vw] rounded-full border border-neutral-200/60"
      />

      {/* Slow-rotating dashed ring — hidden on mobile */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="absolute hidden sm:block right-[2vw] top-1/2 -translate-y-1/2 w-[26vw] h-[26vw] rounded-full border border-dashed border-amber-300/40"
      />

      {/* Orbiting amber dot — hidden on mobile */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute hidden sm:block right-[2vw] top-1/2 -translate-y-1/2 w-[26vw] h-[26vw]"
      >
        <div className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
      </motion.div>

      {/* Horizontal rule — lower third */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-[68%] h-px bg-neutral-200 origin-left"
      />

      {/* Vertical rule — hidden on mobile */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute hidden sm:block right-[8vw] top-0 bottom-0 w-px bg-neutral-100 origin-top"
      />

      {/* Crosshair — bottom left */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="absolute left-[12%] bottom-[22%] text-neutral-300"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
      </motion.svg>

      {/* Corner bracket — top right */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute top-[10%] right-[10%] text-neutral-200"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path d="M28 0 L0 0 L0 28" stroke="currentColor" strokeWidth="1" />
      </motion.svg>

      {/* Corner bracket — bottom left */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15, duration: 0.8 }}
        className="absolute bottom-[12%] left-[6%] text-neutral-200"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path
          d="M0 0 L28 0 L28 28"
          stroke="currentColor"
          strokeWidth="1"
          transform="translate(0,28) rotate(-90)"
        />
      </motion.svg>
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 55, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 55, damping: 18 });

  const nameX = useTransform(springX, [-0.5, 0.5], ['-10px', '10px']);
  const nameY = useTransform(springY, [-0.5, 0.5], ['-6px', '6px']);
  const metaX = useTransform(springX, [-0.5, 0.5], ['5px', '-5px']);
  const metaY = useTransform(springY, [-0.5, 0.5], ['3px', '-3px']);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current!.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const s1 = useScramble('Shihaz');
  const s2 = useScramble('Shaheem');

  return (
    <section
      ref={sectionRef}
      id="top"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative min-h-screen flex flex-col justify-between px-6 md:px-10 pt-28 md:pt-32 pb-10 md:pb-12 overflow-hidden"
    >
      <HeroBg springX={springX} springY={springY} />

      {/* Metadata row — 2×2 on mobile, 4-col on md */}
      <motion.div
        style={{ x: metaX, y: metaY }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-xs uppercase tracking-[0.12em] md:tracking-[0.2em] text-neutral-500"
      >
        <div>
          <p className="text-neutral-400 mb-1">Index</p>
          <p className="text-black">001 / Portfolio</p>
        </div>
        <div>
          <p className="text-neutral-400 mb-1">Discipline</p>
          <p className="text-black">AI · Software</p>
        </div>
        <div>
          <p className="text-neutral-400 mb-1">Based</p>
          <p className="text-black">Colombo, LK</p>
        </div>
        <div>
          <p className="text-neutral-400 mb-1">Status</p>
          <p className="text-black flex items-center gap-2">
            <span className="relative flex w-2 h-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available — 2026
          </p>
        </div>
      </motion.div>

      {/* Main name */}
      <motion.div
        style={{ x: nameX, y: nameY }}
        className="relative max-w-7xl mx-auto w-full py-6 md:py-8"
      >
        <h1 className="text-[18vw] sm:text-[16vw] md:text-[13vw] leading-[0.88] tracking-tight text-black">
          {[
            { word: 'Shihaz', scramble: s1 },
            { word: 'Shaheem', scramble: s2 },
          ].map(({ word, scramble }, i) => (
            <span
              key={word}
              className="block overflow-hidden pb-[0.06em] cursor-default"
              onMouseEnter={scramble.trigger}
            >
              <motion.span
                className="inline-block select-none"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
              >
                {scramble.display}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative max-w-7xl mx-auto w-full flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8 items-start md:items-end"
      >
        <div className="md:col-span-2 max-w-xl">
          <p className="text-sm md:text-xl text-neutral-700 leading-relaxed">
            An IT undergraduate at <span className="text-black">SLIIT</span> specializing
            in Artificial Intelligence — designing intelligent systems, exploring data,
            and crafting interfaces with intent.
          </p>
        </div>
        <div className="flex md:justify-end">
          <a
            href="#about"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-black"
          >
            <span className="relative">
              Scroll to explore
              <span className="absolute left-0 -bottom-1 h-px w-full bg-black origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500" />
            </span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
