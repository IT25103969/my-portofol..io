import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-black text-white px-6 md:px-10 pt-16 md:pt-32 pb-10">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 md:mb-8">
          — Contact (04)
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-[10vw] leading-[0.9] tracking-tight mb-8 md:mb-12"
        >
          Let's build
          <br />
          <span className="italic font-light text-amber-400">something.</span>
        </motion.h2>

        <a
          href="mailto:theshihaz6@gmail.com"
          className="group flex items-start gap-3 text-base sm:text-lg md:text-3xl text-white border-b border-neutral-700 hover:border-white pb-3 mb-12 md:mb-20 transition-colors break-all"
        >
          <span className="flex-1 min-w-0">theshihaz6@gmail.com</span>
          <ArrowUpRight
            className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-45 transition-transform duration-500 shrink-0 mt-1"
            strokeWidth={1.25}
          />
        </a>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 md:pt-12 border-t border-neutral-800">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">Social</p>
            <div className="space-y-3">
              <a
                href="https://github.com/IT25103969"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white hover:text-neutral-400 active:text-neutral-400 transition-colors py-0.5"
              >
                <Github className="w-4 h-4 shrink-0" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/shihaz-shaheem-024679242/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white hover:text-neutral-400 active:text-neutral-400 transition-colors py-0.5"
              >
                <Linkedin className="w-4 h-4 shrink-0" /> LinkedIn
              </a>
              <a
                href="mailto:theshihaz6@gmail.com"
                className="flex items-center gap-2 text-sm text-white hover:text-neutral-400 active:text-neutral-400 transition-colors py-0.5"
              >
                <Mail className="w-4 h-4 shrink-0" /> Email
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">Navigate</p>
            <div className="space-y-3">
              <a
                href="#about"
                className="block text-sm text-white hover:text-neutral-400 active:text-neutral-400 transition-colors py-0.5"
              >
                About
              </a>
              <a
                href="#skills"
                className="block text-sm text-white hover:text-neutral-400 active:text-neutral-400 transition-colors py-0.5"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="block text-sm text-white hover:text-neutral-400 active:text-neutral-400 transition-colors py-0.5"
              >
                Work
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">Location</p>
            <p className="text-sm text-white">Colombo</p>
            <p className="text-sm text-neutral-500">Sri Lanka</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">Status</p>
            <p className="flex items-center gap-2 text-sm text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              Available — 2026
            </p>
          </div>
        </div>

        <div className="mt-10 md:mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between gap-2 text-xs text-neutral-500">
          <p>© {currentYear} Shihaz Shaheem — All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
