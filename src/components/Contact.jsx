import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '../data/site.js';

const projectTypes = ['Web App', 'Embedded/Hardware', 'Automation/Scripts', 'Other'];

/* ---------- Success burst: checkmark + particles ---------- */
function SuccessBurst() {
  const dots = Array.from({ length: 12 }, (_, i) => i);
  return (
    <span className="relative mr-2 inline-flex h-5 w-5 items-center justify-center">
      {dots.map((i) => {
        const angle = (i / dots.length) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{ background: i % 2 ? '#a3ff12' : '#22d3ee' }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * 26,
              y: Math.sin(angle) * 26,
              opacity: 0,
              scale: 0.3,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        );
      })}
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#a3ff12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M5 12.5l4.5 4.5L19 7.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </svg>
    </span>
  );
}

/* ---------- Form ---------- */
function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', email: '', type: projectTypes[0], message: '' });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          projectType: form.type,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
      setForm({ name: '', email: '', type: projectTypes[0], message: '' });
      setTimeout(() => setStatus('idle'), 4500);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const labelCls = 'mb-1.5 block font-mono text-xs text-slate-400';

  return (
    <form onSubmit={submit} className="glass space-y-5 rounded-3xl p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className={labelCls}>Name</span>
          <input required className="field" placeholder="Ada Lovelace" value={form.name} onChange={set('name')} />
        </label>
        <label>
          <span className={labelCls}>Email</span>
          <input required type="email" className="field" placeholder="ada@company.com" value={form.email} onChange={set('email')} />
        </label>
      </div>

      <label className="block">
        <span className={labelCls}>Project Type</span>
        <select className="field" value={form.type} onChange={set('type')}>
          {projectTypes.map((t) => (
            <option key={t} value={t} className="bg-ink-900">
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelCls}>Message</span>
        <textarea
          required
          rows={5}
          className="field resize-none"
          placeholder="Tell me about your idea, timeline and goals…"
          value={form.message}
          onChange={set('message')}
        />
      </label>

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        animate={{
          borderColor:
            status === 'sent' ? '#a3ff12' : status === 'error' ? '#f43f5e' : 'rgba(34,211,238,0.5)',
        }}
        className="glass relative flex w-full items-center justify-center overflow-hidden rounded-xl border px-6 py-3.5 font-mono text-sm font-medium text-white transition-shadow hover:shadow-glow disabled:cursor-wait"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            {status === 'idle' && 'Send Message'}
            {status === 'sending' && (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-neon-cyan border-t-transparent" />
                Sending...
              </>
            )}
            {status === 'sent' && (
              <>
                <SuccessBurst />
                Message Sent! 🚀
              </>
            )}
            {status === 'error' && 'Something went wrong — try email instead'}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </form>
  );
}

/* ---------- Quick-copy cards ---------- */
function CopyCard({ label, value, href, onCopied }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    onCopied(`${label} copied to clipboard`);
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 0 28px rgba(99,102,241,0.3)' }}
      className="glass flex items-center justify-between gap-3 rounded-2xl p-4"
    >
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">{label}</p>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="block truncate text-sm text-slate-200 hover:text-neon-cyan">
            {value}
          </a>
        ) : (
          <p className="truncate text-sm text-slate-200">{value}</p>
        )}
      </div>
      <button
        onClick={copy}
        className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 font-mono text-xs text-slate-300 transition hover:border-neon-cyan/60 hover:text-neon-cyan"
      >
        Copy
      </button>
    </motion.div>
  );
}

/* ---------- Section ---------- */
export default function Contact() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  return (
    <section id="contact" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <p className="section-label">03 / Work With Me</p>
        <h2 className="section-title">
          Have an idea or a project you'd like to bring to life?
          <span className="mt-1 block bg-gradient-to-r from-neon-cyan to-neon-indigo bg-clip-text text-transparent">
            Let's build something together.
          </span>
        </h2>
        <p className="mt-5 text-slate-400">
          Are you a business, developer, or creator with an idea in mind? Get in touch about
          collaborations, software development, embedded systems, or technical consulting.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ContactForm />
        </motion.div>

        <motion.div
          className="space-y-4 lg:col-span-2"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="font-mono text-xs text-slate-500">// direct links</p>
          <CopyCard label="Email" value={site.email} onCopied={showToast} />
          <CopyCard label="GitHub" value={`@${site.handle}`} href={site.github} onCopied={showToast} />
          <CopyCard label="LinkedIn" value={site.linkedin.replace('https://www.', '')} href={site.linkedin} onCopied={showToast} />
          <CopyCard label="Discord" value={site.discord} onCopied={showToast} />
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass fixed bottom-8 left-1/2 z-[60] -translate-x-1/2 rounded-xl border-neon-volt/40 px-5 py-3 font-mono text-sm text-neon-volt shadow-glow-volt"
          >
            ✓ {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}