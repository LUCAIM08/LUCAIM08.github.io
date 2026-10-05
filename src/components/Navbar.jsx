import { motion } from 'framer-motion';

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
  { href: '#lab', label: 'Lab' },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav className="glass flex w-full max-w-3xl items-center justify-between rounded-2xl px-5 py-3">
        <a href="#top" className="font-mono text-sm font-semibold text-white">
          <span className="text-neon-cyan">&lt;</span>LUCAIM08<span className="text-neon-cyan">/&gt;</span>
        </a>
        <ul className="hidden gap-6 text-sm text-slate-400 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-neon-cyan">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-lg border border-neon-cyan/40 px-3 py-1.5 font-mono text-xs text-neon-cyan transition hover:bg-neon-cyan/10 hover:shadow-glow"
        >
          Hire me
        </a>
      </nav>
    </motion.header>
  );
}