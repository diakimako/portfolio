import { useState, useEffect, useRef, type ReactNode, type ElementType } from 'react';
import { Moon, Sun, MapPin, Clock, Mail, Globe, ExternalLink, GraduationCap, Venus } from 'lucide-react';
import pfp from './assets/pfp.jpg';
import './index.css';

/* ─── DATA ───────────────────────────────────────────────── */
const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
  { label: 'GitHub', href: 'https://github.com/diakimako', external: true },
];

const info = [
  { icon: GraduationCap, label: 'Education', text: 'BS 2nd Sem @IIT-M' },
  { icon: MapPin, label: 'Location', text: 'India' },
  { icon: Clock, label: 'Timezone', text: 'UTC +05:30' },
  { icon: Venus, label: 'Pronouns', text: 'she / her' },
  { icon: Mail, label: 'Email', text: 'shadylarva@gmail.com', href: 'mailto:shadylarva@gmail.com' },
  { icon: Globe, label: 'Website', text: 'shadylarva.me', href: 'https://shadylarva.me' },
];

const projects = [
  {
    title: 'Zero-Config UI Lib',
    desc: 'Headless component library built strictly around monospace type systems. Zero imposed styling.',
    tags: ['React', 'TypeScript', 'A11y'],
    href: '#',
    img: null as string | null,
  },
  {
    title: 'Minimalist CLI',
    desc: 'Command-line tool for converting Markdown files to strictly monochrome, semantic HTML.',
    tags: ['Rust', 'CLI'],
    href: '#',
    img: null as string | null,
  },
  {
    title: 'Grid Alignment Engine',
    desc: 'Layout engine that enforces 8px and 12px snap adherence at compile time.',
    tags: ['WASM', 'C++'],
    href: '#',
    img: null as string | null,
  },
];

const about = [
  'Web Developer, Design Engineer with 5+ years of experience, known for pixel-perfect execution and strong attention to small details.',
  'Skilled in Next.js, React, TypeScript, Vite and modern front-end technologies; building high-quality, user-centric web and mobile applications.',
  'Passionate about exploring new technologies and turning ideas into reality through polished, thoughtfully crafted personal projects.',
];

const stack = [
  { name: 'Next.js', slug: 'nextdotjs', href: 'https://nextjs.org' },
  { name: 'React', slug: 'react', href: 'https://react.dev' },
  { name: 'TypeScript', slug: 'typescript', href: 'https://typescriptlang.org' },
  { name: 'Vite', slug: 'vite', href: 'https://vitejs.dev' },
  { name: 'Node.js', slug: 'nodedotjs', href: 'https://nodejs.org' },
  { name: 'Tailwind', slug: 'tailwindcss', href: 'https://tailwindcss.com' },
  { name: 'Figma', slug: 'figma', href: 'https://figma.com' },
  { name: 'Git', slug: 'git', href: 'https://git-scm.com' },
  { name: 'Framer', slug: 'framer', href: 'https://framer.com' },
  { name: 'Vercel', slug: 'vercel', href: 'https://vercel.com' },
  { name: 'WordPress', slug: 'wordpress', href: 'https://wordpress.org' },
  { name: 'Firebase', slug: 'firebase', href: 'https://firebase.google.com' },
];

const services = [
  { icon: '💻', name: 'Web Development', desc: 'Fast, responsive websites and web apps built with Next.js, React, and modern tooling.' },
  { icon: '📱', name: 'App Development', desc: 'Cross-platform mobile apps with clean UX and smooth performance.' },
  { icon: '🎨', name: 'UI / UX Design', desc: 'Pixel-perfect interfaces in Figma — from wireframes to production-ready handoff.' },
  { icon: '⚡', name: 'Performance Audits', desc: 'Speed optimisation, Core Web Vitals, and accessibility improvements for existing sites.' },
];

const CONTACT_EMAIL = 'shadylarva@gmail.com';
const INSTAGRAM_URL = 'https://www.instagram.com/diakimako';
const FORMSPREE_URL = 'https://formspree.io/f/mgolllga';

/* ─── SCROLL-REVEAL HOOK ──────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in'); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ─── REVEAL WRAPPERS ─────────────────────────────────────── */
type RevealProps = {
  children: ReactNode;
  variant?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
  as?: ElementType;
};

function Reveal({ children, variant = 'up', delay = 0, className = '', as: Tag = 'div' }: RevealProps) {
  const ref = useReveal();
  const TagEl = Tag as any;
  return (
    <TagEl ref={ref} className={`reveal reveal-${variant} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </TagEl>
  );
}

function RevealRule() {
  const ref = useReveal(0.5);
  return <div ref={ref as any} className="rule rule-reveal" />;
}

function RevealTitle({ children }: { children: ReactNode }) {
  const ref = useReveal(0.4);
  return (
    <p ref={ref as any} className="section-title title-line">
      <span>{children}</span>
    </p>
  );
}

/* ─── VERIFIED BADGE ──────────────────────────────────────── */
function VerifiedBadge() {
  return (
    <span className="badge" aria-label="Verified">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <polyline points="2.5,6 5,8.5 9.5,3.5" stroke="#0a0a0a"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* ─── TEXT FLIP ───────────────────────────────────────────── */
function TextFlip({ items, interval = 2400 }: { items: string[]; interval?: number }) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');
  useEffect(() => {
    const t = setInterval(() => {
      setPhase('out');
      setTimeout(() => {
        setIdx(i => (i + 1) % items.length);
        setPhase('in');
        setTimeout(() => setPhase('idle'), 300);
      }, 300);
    }, interval);
    return () => clearInterval(t);
  }, [items.length, interval]);
  return <span className={`text-flip text-flip--${phase}`}>{items[idx]}</span>;
}

/* ─── COPY BUTTON ─────────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) { }
  };
  return (
    <button
      className={`copy-btn${copied ? ' copied' : ''}`}
      onClick={handleCopy}
      aria-label="Copy email"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function App() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="col">

      {/* ── Navbar ─────────────────────────── */}
      <nav className="nav">
        <span className="nav-logo">DIA</span>
        <div className="nav-links">
          {navLinks.map(l => (
            <a key={l.label} className="nav-link" href={l.href}
              target={l.external ? '_blank' : '_self'} rel="noreferrer">
              {l.label}
            </a>
          ))}
          {/* Instagram nav text link */}
          <a href={INSTAGRAM_URL} className="nav-link"
            target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="#contact" className="btn-primary"
            style={{ padding: '7px 14px', fontSize: 'var(--sz-xs)' }}>
            Hire Me
          </a>
          <button className="theme-btn" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </nav>

      {/* ── Cover ──────────────────────────── */}
      <div className="cover" />

      {/* ── Profile ────────────────────────── */}
      <section className="profile fade-up d1">
        <div className="avatar-wrap">
          <div className="avatar-inner">
            <img src={pfp} alt="Dia's profile picture" />
          </div>
        </div>

        <div className="profile-name fade-up d2">
          Dia <VerifiedBadge />
        </div>

        <p className="profile-role fade-up d3">
          <TextFlip items={['Web Developer', 'App Developer', 'Design Engineer', 'Graphics designer']} />
        </p>

        {/* Availability signal */}
        <div className="avail-badge fade-up d3">
          <span className="avail-dot" />
          Available for projects
        </div>

        {/* Social proof stats */}
        <div className="stats-row fade-up">
          <div className="stat-item">
            <span className="stat-num">5+</span>
            <span className="stat-label">Years Exp.</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">30+</span>
            <span className="stat-label">Projects Built</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">&lt;5h</span>
            <span className="stat-label">Response</span>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="cta-row fade-up">
          <a href="#contact" className="btn-primary">Hire Me →</a>
          <a href="#projects" className="btn-ghost">View Work</a>
        </div>
      </section>

      <RevealRule />

      {/* ── Info ───────────────────────────── */}
      <section className="section">
        <RevealTitle>Info</RevealTitle>
        <div className="info-grid stagger">
          {info.map(({ icon: Icon, label, text, href }) => (
            <Reveal key={label} variant="left" className="info-row">
              <span className="info-icon"><Icon size={14} /></span>
              <span className="info-label">{label}</span>
              <span className="info-value">
                {href
                  ? <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">{text}</a>
                  : text}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <RevealRule />

      {/* ── About ──────────────────────────── */}
      <section className="section">
        <RevealTitle>About</RevealTitle>
        <div className="about-list stagger">
          {about.map((line, i) => (
            <Reveal key={i} variant="right" className="about-item">{line}</Reveal>
          ))}
        </div>
      </section>

      <RevealRule />

      {/* ── Services ───────────────────────── */}
      <section className="section">
        <RevealTitle>Services</RevealTitle>
        <div className="services-grid stagger">
          {services.map(s => (
            <Reveal key={s.name} variant="up" className="service-card">
              <div className="service-icon">{s.icon}</div>
              <div className="service-name">{s.name}</div>
              <p className="service-desc">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <RevealRule />

      {/* ── Stack ──────────────────────────── */}
      <section className="section">
        <RevealTitle>Stack</RevealTitle>
        <div className="stack-grid stagger">
          {stack.map(({ name, slug, href }) => (
            <Reveal key={name} variant="scale" className="stack-btn" as="a"
              {...{ href, target: '_blank', rel: 'noreferrer' } as object}>
              <img src={`https://cdn.simpleicons.org/${slug}/ffffff`} alt={name} loading="lazy" />
              {name}
            </Reveal>
          ))}
        </div>
      </section>

      <RevealRule />

      {/* ── Projects ───────────────────────── */}
      <section className="section" id="projects">
        <RevealTitle>Projects</RevealTitle>
        <div className="cards stagger">
          {projects.map(p => (
            <Reveal key={p.title} variant="up" className="card">
              <div className="card-img">
                {p.img
                  ? <img src={p.img} alt={p.title} />
                  : <div className="card-img-placeholder"><span>{p.title[0]}</span></div>
                }
              </div>
              <div className="card-header">
                <span className="card-title">{p.title}</span>
                <a className="card-link" href={p.href} target="_blank" rel="noreferrer">
                  <ExternalLink size={14} />
                </a>
              </div>
              <p className="card-desc">{p.desc}</p>
              <div className="tags">
                {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <RevealRule />

      {/* ── Contact ────────────────────────── */}
      <section className="section" id="contact">
        <RevealTitle>Contact</RevealTitle>

        {/* Quick-action row */}
        <div className="contact-meta">
          <div className="contact-email-wrap">
            <a href={`mailto:${CONTACT_EMAIL}`} className="contact-email-btn">
              <Mail size={13} /> {CONTACT_EMAIL}
            </a>
            <CopyButton text={CONTACT_EMAIL} />
          </div>
          <span className="response-tag">
            <span className="response-dot" />
            Usually responds within 5 hours
          </span>
        </div>

        {/* Form wired to Formspree */}
        <Reveal variant="up" className="form" as="form"
          {...{
            action: FORMSPREE_URL,
            method: 'POST',
          }}>
          <div className="field">
            <label htmlFor="email">Your Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="field">
            <label htmlFor="msg">Message</label>
            <textarea id="msg" name="message" rows={4} placeholder="Tell me about your project..." required />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">Send Message →</button>
            <a href={INSTAGRAM_URL} className="ig-dm-btn" target="_blank" rel="noreferrer">
              DM on Instagram
            </a>
          </div>
        </Reveal>
      </section>

      <RevealRule />

      {/* ── Footer ─────────────────────────── */}
      <Reveal variant="up" className="footer" as="footer">
        <span>© {new Date().getFullYear()} Dia</span>
        <span>Built with precision.</span>
      </Reveal>

    </div>
  );
}
