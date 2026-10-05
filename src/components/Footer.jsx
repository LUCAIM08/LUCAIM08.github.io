import { motion } from 'framer-motion';
import { site } from '../data/site.js';

const socials = [
  { label: 'GitHub', href: site.github },
  { label: 'LinkedIn', href: site.linkedin },
  { label: 'Email', href: `mailto:${site.email}` },
];

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative z-10 border-t border-white/10 bg-ink-950/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-mono text-sm text-white">
            <span className="text-neon-cyan">&lt;</span>LUCAIM08<span className="text-neon-cyan">/&gt;</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>

        <ul className="flex gap-3">
          {socials.map((s) => (
            <li key={s.label}>
              <motion.a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -3, boxShadow: '0 0 18px rgba(34,211,238,0.4)' }}
                className="glass inline-block rounded-lg px-4 py-2 font-mono text-xs text-slate-300 hover:text-neon-cyan"
              >
                {s.label}
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="animate-float">
          <motion.button
            onClick={toTop}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Back to top"
            className="glass flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs text-neon-cyan hover:shadow-glow"
          >
            ↑ Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}