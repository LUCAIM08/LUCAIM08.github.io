import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillTabs } from '../data/site.js';

const tabs = Object.keys(skillTabs);

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const badge = {
  hidden: { opacity: 0, y: 24, scale: 0.85 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 16 } },
};

export default function TechStack() {
  const [active, setActive] = useState(tabs[0]);

  return (
    <section id="about" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">01 / About &amp; Stack</p>
        <h2 className="section-title">Building from the circuit board to the browser.</h2>
        <p className="mt-5 max-w-2xl text-slate-400">
          I'm a computer science student who enjoys the whole stack: robots that compete in FTC,
          embedded firmware, networked systems, and polished web apps. I like turning rough
          ideas into things that actually run.
        </p>
      </motion.div>

      <div className="glass mt-12 rounded-3xl p-6 md:p-8">
        <div role="tablist" className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={active === t}
              onClick={() => setActive(t)}
              className={`relative rounded-lg px-4 py-2 font-mono text-xs transition-colors md:text-sm ${
                active === t ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {active === t && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-lg border border-neon-cyan/40 bg-neon-cyan/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={active}
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {skillTabs[active].map((s) => (
              <motion.li
                key={s.name}
                variants={badge}
                whileHover={{
                  scale: 1.1,
                  borderColor: s.color,
                  boxShadow: `0 0 20px ${s.color}66, inset 0 0 12px ${s.color}22`,
                  color: s.color,
                }}
                className="cursor-default rounded-xl border border-white/10 bg-ink-800/80 px-4 py-2.5 font-mono text-sm text-slate-300"
              >
                {s.name}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}