import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Notes', href: '#notes' },
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
      className="hidden lg:inline-flex text-sm border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
    >
      {children}
    </motion.a>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <a
      href={href}
      aria-current={active ? 'location' : undefined}
      className={`group relative text-sm transition-colors py-1 ${
        active ? 'text-black' : 'text-neutral-600 hover:text-black'
      }`}
    >
      {label}
      <span
        aria-hidden="true"
        className={`absolute left-0 bottom-0 h-px bg-amber-400 transition-all duration-300 ease-out ${
          active ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </a>
  );
}

/** Tracks which section is currently around the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = links.map((l) => l.href.slice(1));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const { scrollYProgress } = useScroll();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Compact once scrolled; hide while scrolling down, reveal on any upward scroll
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > lastY + 6 && y > 160) setHidden(true);
      else if (y < lastY - 6 || y <= 160) setHidden(false);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Escape closes the mobile menu; focus moves into the menu on open and back to the toggle on close
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus({ preventScroll: true });
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      window.addEventListener('keydown', onKey);
      wasOpen.current = true;
      return () => window.removeEventListener('keydown', onKey);
    }
    if (wasOpen.current) {
      menuButtonRef.current?.focus({ preventScroll: true });
      wasOpen.current = false;
    }
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: hidden && !open ? '-100%' : 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onFocusCapture={() => setHidden(false)}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled || open
            ? 'bg-white border-b border-neutral-300 shadow-[0_8px_24px_-14px_rgba(0,0,0,0.18)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav aria-label="Primary" className={`max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between transition-[padding] duration-300 ${
            scrolled ? 'py-3.5' : 'py-4 md:py-5'
          }`}>
          <a href="#top" className="font-medium tracking-[-0.02em] text-black text-[15px] md:text-[17px]" onClick={() => setOpen(false)}>
            Shihaz<span className="text-amber-400">/</span>Shaheem
          </a>

          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} active={active === l.href.slice(1)} />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <MagneticCTA href="#contact">Available for work</MagneticCTA>

            <button
              ref={menuButtonRef}
              className="md:hidden flex items-center justify-center w-10 h-10 text-black -mr-1"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <motion.div
          aria-hidden="true"
          className="h-[2px] bg-gradient-to-r from-neutral-900 via-amber-400 to-amber-300 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-20 px-6 pb-10 overflow-y-auto"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1 flex-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.href.slice(1) ? 'location' : undefined}
                  className="text-[9vw] tracking-tight text-black aria-[current=location]:text-amber-600 border-b border-neutral-100 py-4 hover:text-amber-500 active:text-amber-500 transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

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
