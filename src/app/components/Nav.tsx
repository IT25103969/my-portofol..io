import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function MagneticCTA({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 280, damping: 20 });
  const sy = useSpring(my, { stiffness: 280, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.38);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.38);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="hidden md:inline-flex text-sm border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
    >
      {children}
    </motion.a>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="group relative text-sm text-neutral-600 hover:text-black transition-colors py-1">
      {label}
      <span className="absolute left-0 -bottom-0.5 h-px bg-amber-400 w-0 group-hover:w-full transition-all duration-300 ease-out" />
    </a>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || open ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 md:px-10 py-4 md:py-5 flex items-center justify-between">
          <a href="#top" className="tracking-tight text-black text-sm md:text-base" onClick={() => setOpen(false)}>
            Shihaz<span className="text-amber-400">/</span>Shaheem
          </a>

          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <MagneticCTA href="#contact">Available for work</MagneticCTA>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10 text-black -mr-1"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        <motion.div
          className="h-px bg-gradient-to-r from-neutral-900 via-amber-400 to-amber-300 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-20 px-6 pb-10 overflow-y-auto"
          >
            <div className="flex flex-col gap-1 flex-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  onClick={() => setOpen(false)}
                  className="text-[11vw] tracking-tight text-black border-b border-neutral-100 py-5 hover:text-amber-500 active:text-amber-500 transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center border border-black px-6 py-4 text-sm uppercase tracking-[0.15em] hover:bg-black hover:text-white active:bg-black active:text-white transition-colors"
              >
                Available for work
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
