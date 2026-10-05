import { motion } from 'framer-motion';

const heading = 'Luca Illica Magrini — Software Developer & CS Student.';
const words = heading.split(' ');

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};
const word = {
  hidden: { opacity: 0, scale: 0.7, y: 20, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 140, damping: 14 },
  },
};

export default function Hero() {
  return (
    <section id="top" className="section flex min-h-screen flex-col justify-center pt-36">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass mb-8 inline-flex w-fit items-center gap-3 rounded-full px-4 py-2"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-neon-volt opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neon-volt shadow-glow-volt" />
        </span>
        <span className="font-mono text-xs text-slate-300">
          Open for new projects &amp; collaborations
        </span>
      </motion.div>

      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl text-4xl font-extrabold leading-[1.3] tracking-tight text-white sm:text-5xl md:text-7xl"
        aria-label={heading}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            variants={word}
            aria-hidden="true"
            className={`mr-[0.28em] inline-block pb-[0.12em] ${
              ['Luca', 'Illica', 'Magrini'].includes(w)
                ? 'bg-gradient-to-r from-neon-cyan to-neon-indigo bg-clip-text text-transparent'
                : ''
            }`}
          >
            {w}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="mt-8 max-w-2xl text-lg text-slate-400"
      >
        Specializing in software engineering, FTC Robotics, embedded systems, and custom web
        applications.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.7 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        {/* Primary CTA with persistent rotating glow border on hover */}
        <a href="#projects" className="group relative inline-flex overflow-hidden rounded-xl p-[2px]">
          <span
            aria-hidden="true"
            className="absolute inset-[-100%] animate-border-spin opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0 60%, #22d3ee 75%, #6366f1 90%, #a3ff12 100%)',
            }}
          />
          <span className="absolute inset-0 rounded-xl border border-neon-cyan/40 transition-opacity group-hover:opacity-0" />
          <span className="relative rounded-[10px] bg-ink-900 px-7 py-3.5 font-mono text-sm font-medium text-white transition group-hover:shadow-glow">
            Explore Projects
          </span>
        </a>

        <a
          href="#contact"
          className="glass rounded-xl px-7 py-3.5 font-mono text-sm font-medium text-slate-200 transition hover:border-neon-indigo/60 hover:shadow-glow-indigo"
        >
          Let's Work Together / Contact
        </a>
      </motion.div>
    </section>
  );
}