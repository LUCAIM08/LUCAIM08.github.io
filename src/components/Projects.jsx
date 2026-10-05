import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { featuredProjects, site } from '../data/site.js';

function TiltCard({ project, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const glowX = useTransform(sx, [-0.5, 0.5], ['20%', '80%']);
  const glowY = useTransform(sy, [-0.5, 0.5], ['20%', '80%']);
  const glow = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, ${project.accent}33, transparent 60%)`
  );

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const href = project.url || site.github;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={{ perspective: 1000 }}
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ boxShadow: `0 0 36px ${project.accent}44`, borderColor: project.accent + '88' }}
        className="glass relative block h-full overflow-hidden rounded-3xl p-7"
      >
        <motion.div
          aria-hidden="true"
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0"
        />
        <div style={{ transform: 'translateZ(40px)' }} className="relative flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span
              className="font-mono text-xs"
              style={{ color: project.accent }}
            >
              {String(index + 1).padStart(2, '0')} // repo
            </span>
            {project.stars != null && (
              <span className="font-mono text-xs text-slate-400">★ {project.stars}</span>
            )}
          </div>

          <h3 className="mt-4 text-xl font-semibold text-white">{project.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
            {project.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-md border border-white/10 bg-ink-900/60 px-2.5 py-1 font-mono text-[11px] text-slate-300"
              >
                {t}
              </li>
            ))}
          </ul>

          <span
            className="mt-6 font-mono text-xs transition-transform group-hover:translate-x-1"
            style={{ color: project.accent }}
          >
            View on GitHub →
          </span>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState(featuredProjects);
  const [status, setStatus] = useState('loading'); // loading | live | fallback

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://api.github.com/users/${site.githubUser}/repos?per_page=100&sort=updated`, {
      signal: ctrl.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error('GitHub API error');
        return r.json();
      })
      .then((repos) => {
        const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));
        setProjects(
          featuredProjects.map((p) => {
            const repo = byName.get(p.repo.toLowerCase());
            if (!repo) return p;
            return {
              ...p,
              description: repo.description || p.description,
              url: repo.html_url,
              stars: repo.stargazers_count,
              tags: repo.language && !p.tags.includes(repo.language)
                ? [repo.language, ...p.tags].slice(0, 4)
                : p.tags,
            };
          })
        );
        setStatus('live');
      })
      .catch((e) => {
        if (e.name !== 'AbortError') setStatus('fallback');
      });
    return () => ctrl.abort();
  }, []);

  return (
    <section id="projects" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="section-label">02 / Featured Projects</p>
          <h2 className="section-title">Things I've built.</h2>
        </div>
        <span className="font-mono text-xs text-slate-500">
          {status === 'live' && '● synced with GitHub'}
          {status === 'loading' && '○ fetching repos…'}
          {status === 'fallback' && '○ offline mode (static data)'}
        </span>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <TiltCard key={p.title} project={p} index={i} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-slate-400 transition hover:text-neon-cyan"
        >
          See all repositories on GitHub →
        </a>
      </div>
    </section>
  );
}