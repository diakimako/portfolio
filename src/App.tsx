import { useState, useEffect, useRef, type ReactNode, type ElementType } from 'react';
import { Moon, Sun, MapPin, Clock, Phone, Mail, Globe, ExternalLink, GraduationCap } from 'lucide-react';
import pfp from './assets/pfp.jpg';
import './index.css';

/* ─── DATA ────────────────────────────────────────────────── */
const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
  { label: 'GitHub', href: 'https://github.com', external: true },
];

const info = [
  { icon: GraduationCap, text: 'BS @ IIT-M' },
  { icon: MapPin, text: 'India' },
  { icon: Clock, text: 'UTC +05:30' },
  { icon: Phone, text: '+62 895-2044-1498' },
  { icon: Mail, text: 'shadylarva@gmail.com' },
  { icon: Globe, text: 'shadylarva.me' },
];

const projects = [
  {
    title: 'Zero-Config UI Lib',
    desc: 'Headless component library built strictly around monospace type systems. Zero imposed styling.',
    tags: ['React', 'TypeScript', 'A11y'],
    href: '#',
  },
  {
    title: 'Minimalist CLI',
    desc: 'Command-line tool for converting Markdown files to strictly monochrome, semantic HTML.',
    tags: ['Rust', 'CLI'],
    href: '#',
  },
  {
    title: 'Grid Alignment Engine',
    desc: 'Layout engine that enforces 8px and 12px snap adherence at compile time.',
    tags: ['WASM', 'C++'],
    href: '#',
  },
];

const about = [
  'Interested in the intersection of constraint and craft — where tight rules force better decisions.',
  'Building tools for developers who believe less surface area means fewer failure modes.',
  'Every pixel and every byte should justify its existence.',
];

/* ─── SCROLL-REVEAL HOOK ──────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          obs.unobserve(el);
        }
      },
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
    <TagEl
      ref={ref}
      className={`reveal reveal-${variant} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </TagEl>
  );
}

/* Thin divider that slides in */
function RevealRule() {
  const ref = useReveal(0.5);
  return <div ref={ref as any} className="rule rule-reveal" />;
}

/* Section title with line-wipe */
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
        <polyline
          points="2.5,6 5,8.5 9.5,3.5"
          stroke="#0a0a0a"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
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
            <img src={pfp} alt="Dia's profile picture" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }} />
          </div>
        </div>
        <div className="profile-name fade-up d2">
          Dia <VerifiedBadge />
        </div>
        <p className="profile-role fade-up d3">Web Developer</p>
      </section>

      <RevealRule />

      {/* ── Info ───────────────────────────── */}
      <section className="section">
        <RevealTitle>Info</RevealTitle>
        <div className="info-grid stagger">
          {info.map(({ icon: Icon, text }) => (
            <Reveal key={text} variant="left" className="info-item">
              <span className="info-icon"><Icon size={14} /></span>
              {text}
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

      {/* ── About ──────────────────────────── */}
      <section className="section">
        <RevealTitle>About</RevealTitle>
        <div className="about-list stagger">
          {about.map((line, i) => (
            <Reveal key={i} variant="right" className="about-item">
              {line}
            </Reveal>
          ))}
        </div>
      </section>

      <RevealRule />

      {/* ── Contact ────────────────────────── */}
      <section className="section" id="contact">
        <RevealTitle>Contact</RevealTitle>
        <Reveal variant="up" className="form" as="form" {...{ onSubmit: (e: Event) => e.preventDefault() }}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="field">
            <label htmlFor="msg">Message</label>
            <textarea id="msg" rows={4} placeholder="What's on your mind?" />
          </div>
          <button type="submit" className="submit-btn">Send Message →</button>
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
