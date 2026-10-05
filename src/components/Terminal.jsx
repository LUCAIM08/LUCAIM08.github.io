import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { site, skillTabs, featuredProjects } from '../data/site.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const commands = {
  help: () => [
    'Available commands:',
    '  help      show this message',
    '  about     who am I',
    '  skills    my tech stack',
    '  projects  featured work',
    '  contact   get in touch (scrolls to form)',
    '  clear     clear the terminal',
  ],
  about: () => [
    `${site.name} (${site.handle})`,
    'Software developer & CS student.',
    'Into FTC Robotics, embedded systems, and custom web apps.',
    'Open for new projects & collaborations.',
  ],
  skills: () =>
    Object.entries(skillTabs).map(
      ([cat, items]) => `[${cat}] ${items.map((s) => s.name).join(', ')}`
    ),
  projects: () =>
    featuredProjects.map((p, i) => `${i + 1}. ${p.title} — ${p.tags.join(' / ')}`),
  contact: () => [
    `email   : ${site.email}`,
    `github  : ${site.github}`,
    `discord : ${site.discord}`,
    'Scrolling to contact form...',
  ],
};

export default function Terminal() {
  const [history, setHistory] = useState([
    { t: 'out', x: "LUCA_LAB v1.0 — type 'help' to get started." },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [past, setPast] = useState([]);
  const [idx, setIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const typeLines = async (lines) => {
    for (const line of lines) {
      setHistory((h) => [...h, { t: 'out', x: '' }]);
      for (let i = 1; i <= line.length; i++) {
        await sleep(10);
        setHistory((h) => {
          const c = [...h];
          c[c.length - 1] = { t: 'out', x: line.slice(0, i) };
          return c;
        });
      }
      await sleep(60);
    }
  };

  const run = async (raw) => {
    const cmd = raw.trim().toLowerCase();
    setHistory((h) => [...h, { t: 'in', x: raw }]);
    if (!cmd) return;
    setPast((p) => [raw, ...p]);
    setIdx(-1);

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    setBusy(true);
    const handler = commands[cmd];
    const out = handler ? handler() : [`command not found: ${cmd}. Type 'help'.`];
    await typeLines(out);
    if (cmd === 'contact') {
      await sleep(400);
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
    setBusy(false);
    inputRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !busy) {
      const v = input;
      setInput('');
      run(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const n = Math.min(idx + 1, past.length - 1);
      if (past[n] !== undefined) {
        setIdx(n);
        setInput(past[n]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const n = idx - 1;
      setIdx(n);
      setInput(n >= 0 ? past[n] : '');
    }
  };

  return (
    <section id="lab" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">04 / The Lab</p>
        <h2 className="section-title">Poke around in the terminal.</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        onClick={() => inputRef.current?.focus()}
        className="glass mt-10 overflow-hidden rounded-2xl shadow-glow"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-neon-volt/80" />
          <span className="ml-3 font-mono text-xs text-slate-500">LUCA_LAB v1.0 — bash</span>
        </div>

        <div
          ref={bodyRef}
          className="h-80 overflow-y-auto bg-black/40 p-5 font-mono text-sm leading-relaxed"
        >
          {history.map((l, i) =>
            l.t === 'in' ? (
              <p key={i} className="text-slate-100">
                <span className="text-neon-volt">luca@lab</span>
                <span className="text-slate-500">:</span>
                <span className="text-neon-cyan">~</span>
                <span className="text-slate-500">$ </span>
                {l.x}
              </p>
            ) : (
              <p key={i} className="whitespace-pre-wrap text-slate-400">
                {l.x}
              </p>
            )
          )}

          <div className="flex items-center">
            <span className="text-neon-volt">luca@lab</span>
            <span className="text-slate-500">:</span>
            <span className="text-neon-cyan">~</span>
            <span className="mr-2 text-slate-500">$</span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                value={input}
                disabled={busy}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Terminal input"
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent text-slate-100 caret-transparent outline-none"
              />
              {/* custom blinking block cursor */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 flex"
                style={{ left: 0 }}
              >
                <span className="invisible whitespace-pre">{input}</span>
                <span className="ml-px inline-block h-5 w-2 animate-blink bg-neon-cyan" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}