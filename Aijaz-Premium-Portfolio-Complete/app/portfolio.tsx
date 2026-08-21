"use client";
import { useEffect, useMemo, useState } from "react";
type Project = {
  slug: string;
  index: string;
  title: string;
  eyebrow: string;
  summary: string;
  stack: string[];
  tone: string;
  metric: string;
  metricLabel: string;
  github: string;
  live: string;
  poster: string;
  year: string;
};
const defaultProjects: Project[] = [
  {
    slug: "insight-ai",
    index: "01",
    title: "Insight AI",
    eyebrow: "AI analytics platform",
    summary:
      "A modular intelligence workspace that turns complex datasets into interactive dashboards, visual stories, reports and actionable decisions.",
    stack: ["React", "TypeScript", "AI", "Data Visualization"],
    tone: "blue",
    metric: "AI",
    metricLabel: "decision intelligence",
    github: "https://github.com/AijazAhmed001",
    live: "/projects/insight-ai/index.html",
    poster: "/posters/insight-ai.png",
    year: "2026",
  },
  {
    slug: "nexus",
    index: "02",
    title: "Nexus",
    eyebrow: "Security operations center",
    summary:
      "An enterprise SOC command center for live events, incidents, threat intelligence, network visibility and automated response workflows.",
    stack: ["React", "TypeScript", "Cybersecurity", "Analytics"],
    tone: "red",
    metric: "24/7",
    metricLabel: "threat visibility",
    github: "https://github.com/AijazAhmed001",
    live: "/projects/nexus/index.html",
    poster: "/posters/nexus.png",
    year: "2026",
  },
  {
    slug: "nova",
    index: "03",
    title: "Nova",
    eyebrow: "Desktop operating system",
    summary:
      "A complete browser-ready operating system experience with multitasking windows, system tools, widgets, files, settings and Nova AI.",
    stack: ["React", "TypeScript", "Electron", "System UI"],
    tone: "violet",
    metric: "OS",
    metricLabel: "complete workspace",
    github: "https://github.com/AijazAhmed001",
    live: "/projects/nova/index.html",
    poster: "/posters/nova.png",
    year: "2026",
  },
  {
    slug: "sentinel-x-titan",
    index: "04",
    title: "Sentinel X Titan",
    eyebrow: "AI cyber defense",
    summary:
      "A next-generation security platform combining autonomous defense, analytics, cyber-range tooling and enterprise-grade security services.",
    stack: ["React", "AI", "Cybersecurity", "Enterprise"],
    tone: "amber",
    metric: "X",
    metricLabel: "autonomous defense",
    github: "https://github.com/AijazAhmed001",
    live: "/projects/sentinel-x-titan/index.html",
    poster: "/posters/sentinel-x-titan.png",
    year: "2026",
  },
  {
    slug: "vanta",
    index: "05",
    title: "Vanta",
    eyebrow: "Premium commerce",
    summary:
      "A polished premium storefront with discovery, collections, product detail, wishlist, cart and a complete multi-step checkout journey.",
    stack: ["React", "TypeScript", "E-commerce", "UX"],
    tone: "green",
    metric: "360°",
    metricLabel: "shopping journey",
    github: "https://github.com/AijazAhmed001",
    live: "/projects/vanta/index.html",
    poster: "/posters/vanta.png",
    year: "2026",
  },
];
const skills = [
  [
    "Product engineering",
    "React 19 · TypeScript · Vite · ASP.NET Core · REST APIs",
  ],
  [
    "Mobile & experience",
    "React Native · Android · Responsive systems · UI/UX · Prototyping",
  ],
  ["AI & data", "Python · FastAPI · RAG · Local LLMs · Analytics · SQL"],
  [
    "Cloud & operations",
    "Docker · GitHub Actions · Kubernetes · Observability · Deployment",
  ],
  [
    "Security & systems",
    "JWT · RBAC · Audit trails · Rate limiting · Networking · OWASP",
  ],
];
const Arrow = () => <span aria-hidden="true">↗</span>;
const AmbientBackdrop = ({ light = false }: { light?: boolean }) => (
  <div className={`ambient-scene${light ? " ambient-light" : ""}`} aria-hidden="true">
    <div className="ambient-aurora" />
    <div className="ambient-stars">
      {Array.from({ length: 14 }, (_, index) => <i key={index} />)}
    </div>
  </div>
);
export default function Portfolio() {
  const [menu, setMenu] = useState(false),
    [viewer, setViewer] = useState<Project | null>(null),
    [recruiter, setRecruiter] = useState(false),
    [palette, setPalette] = useState(false),
    [submitted, setSubmitted] = useState(false),
    [activeSection, setActiveSection] = useState("About");
  const [filter, setFilter] = useState("All");
  const [heroProjectIndex, setHeroProjectIndex] = useState(0);
  const [projectList, setProjectList] = useState<Project[]>(defaultProjects);
  const heroProject = projectList[heroProjectIndex % projectList.length] ?? defaultProjects[0];
  const filtered = useMemo(
    () =>
      filter === "All"
        ? projectList
        : projectList.filter((p) =>
            p.stack.some((s) => s.toLowerCase().includes(filter.toLowerCase())),
          ),
    [filter, projectList],
  );
  useEffect(() => {
    fetch("/projects-manifest.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length) setProjectList(data);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    const rotation = window.setInterval(
      () => setHeroProjectIndex((current) => (current + 1) % projectList.length),
      5600,
    );
    return () => window.clearInterval(rotation);
  }, [projectList.length]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
      if (e.key === "Escape") {
        setPalette(false);
        setViewer(null);
        setMenu(false);
      }
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]"),
      io = new IntersectionObserver(
        (es) =>
          es.forEach(
            (e) => e.isIntersecting && e.target.classList.add("is-visible"),
          ),
        { threshold: 0.12 },
      );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [recruiter, filter]);
  useEffect(() => {
    const sections = ["about", "work", "skills", "education", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = (visible.target as HTMLElement).id;
          setActiveSection(id.charAt(0).toUpperCase() + id.slice(1));
        }
      },
      { rootMargin: "-28% 0px -58%", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [recruiter]);
  const go = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
    setPalette(false);
  };
  return (
    <div className={recruiter ? "site recruiter" : "site"}>
      <header className="nav">
        <nav className={menu ? "navlinks open" : "navlinks"}>
          {["About", "Work", "Skills", "Education", "Contact"].map((x) => (
            <button
              className={activeSection === x ? "active" : ""}
              key={x}
              onClick={() => go("#" + x.toLowerCase())}
            >
              {x}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="mode" onClick={() => setRecruiter(!recruiter)}>
            {recruiter ? "Full experience" : "Recruiter view"}
          </button>
          <button className="command" onClick={() => setPalette(true)}>
            <span>⌘</span>K
          </button>
          <button
            className="menu"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? "×" : "☰"}
          </button>
        </div>
      </header>
      <main>
        <section id="home" className="hero">
          <div className="ambient one" />
          <div className="ambient two" />
          <div className="hero-copy" data-reveal>
            <h1>Narmeen Siddiqui</h1>
            <p className="lede">
              I turn complex ideas into secure, scalable and beautifully
              considered products—from interface to infrastructure.
            </p>
          </div>
          <div className="poster-stage" data-reveal>
            <img
              className="hero-character"
              src="/hero-character.png"
              alt="Illustrated portfolio guide"
            />
            <div className="poster-window">
              <div className="poster-toolbar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="poster-canvas">
                <img key={heroProject.slug} src={heroProject.poster} alt={`${heroProject.title} project poster`} />
                <div className="poster-caption">
                  <div>
                    <strong key={`${heroProject.slug}-title`}>{heroProject.title}</strong>
                  </div>
                  <button onClick={() => setViewer(heroProject)}>View project <Arrow /></button>
                </div>
                <div key={`${heroProject.slug}-progress`} className="poster-progress" />
              </div>
            </div>
          </div>
        </section>
        <section className="proof">
          <div>
            <strong>05</strong>
            <span>Flagship products</span>
          </div>
          <div>
            <strong>360°</strong>
            <span>Design to deployment</span>
          </div>
          <div>
            <strong>5</strong>
            <span>Engineering disciplines</span>
          </div>
          <div>
            <strong>24h</strong>
            <span>Typical response</span>
          </div>
        </section>
        <section id="about" className="about dark-section ambient-host">
          <AmbientBackdrop />
          <div className="section-label">01 // PURPOSE</div>
          <div className="about-grid">
            <h2 data-reveal>
              I don’t just write code.
              <br />
              <em>I shape the whole product.</em>
            </h2>
            <div data-reveal>
              <p className="large-copy">
                I’m Narmeen Siddiqui, currently studying at Air University after
                completing my O Levels and A Levels at HPGS.
              </p>
              <p>
                My work starts with the real problem and follows it through
                research, interface, system design, implementation, testing and
                deployment.
              </p>
              <a href="#work">
                See how I work <Arrow />
              </a>
            </div>
          </div>
          <div className="discipline-row" data-reveal>
            {["ENGINEERING", "DESIGN", "AI", "CLOUD", "SECURITY"].map(
              (x, i) => (
                <div key={x}>
                  <span>0{i + 1}</span>
                  {x}
                </div>
              ),
            )}
          </div>
        </section>
        <section id="work" className="work ambient-host">
          <AmbientBackdrop light />
          <div className="section-head" data-reveal>
            <div>
              <div className="section-label blue">02 // SELECTED WORK</div>
              <h2>Proof, not promises.</h2>
            </div>
            <div className="work-head-aside">
              <img
                className="work-character"
                src="/work-character.png"
                alt="Illustrated project guide"
              />
              <p>
                Production-minded projects explained through decisions, systems
                and outcomes.
              </p>
            </div>
          </div>
          <div className="filters" data-reveal>
            {["All", "React", "AI", "Cloud", "Mobile"].map((x) => (
              <button
                className={filter === x ? "active" : ""}
                onClick={() => setFilter(x)}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {filtered.map((p) => (
              <article
                className={"project-card " + p.tone}
                key={p.slug}
                data-reveal
              >
                <div className="project-visual">
                  <img className="project-poster" src={p.poster} alt={`${p.title} poster`} />
                  <div className="project-browser-bar">
                    <div className="project-browser-dots" aria-hidden="true">
                      <i /><i /><i />
                    </div>
                    <span>portfolio.local/{p.slug}</span>
                    <b>{p.year}</b>
                  </div>
                  <button className="open-project" onClick={() => setViewer(p)}>
                    Launch project <Arrow />
                  </button>
                </div>
                <div className="project-copy">
                  <div className="project-number">{p.index}</div>
                  <div>
                    <span className="project-type">{p.eyebrow}</span>
                    <h3>{p.title}</h3>
                    <p>{p.summary}</p>
                    <div className="tags">
                      {p.stack.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <button onClick={() => setViewer(p)}>
                        View {p.title} in Portfolio
                      </button>
                      <a href={p.github} target="_blank">
                        GitHub <Arrow />
                      </a>
                      <a href={p.live} target="_blank">
                        View {p.title} Project <Arrow />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="skills" className="skills ambient-host">
          <AmbientBackdrop light />
          <div className="section-label">03 // CAPABILITIES</div>
          <div className="skills-layout">
            <div className="sticky-copy" data-reveal>
              <h2>
                One builder.
                <br />
                The whole system.
              </h2>
              <p>
                Technology is useful when it disappears into a clear, reliable
                product experience.
              </p>
            </div>
            <div className="skill-list">
              {skills.map((s, i) => (
                <div className="skill" data-reveal key={s[0]}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{s[0]}</h3>
                    <p>{s[1]}</p>
                  </div>
                  <b>↘</b>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="education" className="experience ambient-host">
          <AmbientBackdrop />
          <div className="section-head light" data-reveal>
            <div>
              <div className="section-label">04 // EDUCATION</div>
              <h2>My academic journey.</h2>
            </div>
            <p>Building knowledge, confidence and a foundation for the future.</p>
          </div>
          <div className="timeline">
            <div className="timeline-line" />
            {[
              [
                "PRESENT",
                "Air University",
                "Current Student",
                "Continuing my higher education and developing the skills needed for my future career.",
              ],
              [
                "2023 — 2025",
                "HPGS",
                "A Levels",
                "Completed my A Level education at HPGS.",
              ],
              [
                "2021 — 2023",
                "HPGS",
                "O Levels",
                "Completed my O Level education at HPGS.",
              ],
            ].map((x, i) => (
              <article className="timeline-item" data-reveal key={x[1]}>
                <i>{i + 1}</i>
                <time>{x[0]}</time>
                <div>
                  <h3>{x[1]}</h3>
                  <h4>{x[2]}</h4>
                  <p>{x[3]}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="recruiter-only">
          <div className="section-label blue">RECRUITER SUMMARY</div>
          <h2>Ready for remote product engineering.</h2>
          <div className="recruiter-grid">
            <div>
              <span>Core stack</span>
              <b>React · TypeScript · .NET · SQL · React Native</b>
            </div>
            <div>
              <span>Strength</span>
              <b>End-to-end product ownership</b>
            </div>
            <div>
              <span>Location</span>
              <b>Karachi · Remote worldwide</b>
            </div>
          </div>
          <div className="hero-actions">
            <button className="primary">Download résumé ↓</button>
            <button className="secondary" onClick={() => go("#contact")}>
              Book interview
            </button>
          </div>
        </section>
        <section id="contact" className="contact ambient-host">
          <AmbientBackdrop />
          <div className="contact-glow" />
          <div className="contact-copy" data-reveal>
            <div className="section-label">05 // LET’S BUILD</div>
            <h2>
              Have an idea?
              <br />
              <em>Let’s make it real.</em>
            </h2>
            <p>
              Remote role, ambitious product, thoughtful redesign or technical
              collaboration—tell me where you want to go.
            </p>
            <div className="contact-meta">
              <span>Karachi, Pakistan · Remote worldwide</span>
              <span>Usually replies within 24 hours</span>
            </div>
          </div>
          {submitted ? (
            <div className="success">
              <i>✓</i>
              <h3>Message prepared.</h3>
              <p>
                The complete flow works. Connect your email API before
                production.
              </p>
              <button onClick={() => setSubmitted(false)}>Send another</button>
            </div>
          ) : (
            <form
              data-reveal
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="form-head">
                <div>
                  <span>PROJECT ENQUIRY</span>
                  <h3>Tell me what you’re building.</h3>
                </div>
                <i>↗</i>
              </div>
              <div className="form-row">
                <label>
                  Name
                  <input required placeholder="Your name" />
                </label>
                <label>
                  Email
                  <input required type="email" placeholder="you@company.com" />
                </label>
              </div>
              <label>
                What brings you here?
                <select required defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Remote opportunity</option>
                  <option>Website or web app</option>
                  <option>Mobile app</option>
                  <option>AI product</option>
                  <option>Design collaboration</option>
                </select>
              </label>
              <label>
                Tell me about it
                <textarea
                  required
                  minLength={20}
                  placeholder="A little context, your goal and expected timeline…"
                />
              </label>
              <button className="primary" type="submit">
                Send enquiry <Arrow />
              </button>
            </form>
          )}
        </section>
      </main>
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-intro">
              <span className="footer-mark">NS</span>
              <div>
                <h2>Narmeen Siddiqui</h2>
                <p>Air University student sharing her academic journey and selected work.</p>
              </div>
            </div>
            <div className="footer-links">
              <div>
                <span>EXPLORE</span>
                <a href="#about">About</a>
                <a href="#work">Selected work</a>
                <a href="#education">Education</a>
              </div>
              <div>
                <span>CONNECT</span>
                <a href="#contact">Start a conversation</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Narmeen Siddiqui. All rights reserved.</span>
            <span className="footer-status"><i /> Available for selected opportunities</span>
            <a href="#home">Back to top <b>↑</b></a>
          </div>
        </div>
      </footer>
      {viewer && (
        <div className="viewer-backdrop" role="dialog" aria-modal="true">
          <div className="viewer-shell">
            <div className="browser-chrome">
              <div className="browser-tab-row">
                <div className="browser-dots" aria-hidden="true">
                  <i className="green" /><i className="yellow" /><i className="blue" />
                </div>
                <div className="browser-tab">
                  <span className="browser-tab-icon">A</span>
                  <strong>{viewer.title}</strong>
                  <span>×</span>
                </div>
                <button className="viewer-close" aria-label="Close project" onClick={() => setViewer(null)}>×</button>
              </div>
              <div className="browser-navigation">
                <button className="browser-nav-back" aria-label="Back to portfolio" onClick={() => setViewer(null)}>←</button>
                <span className="browser-nav-muted" aria-hidden="true">→</span>
                <span className="browser-nav-muted" aria-hidden="true">↻</span>
                <div className="browser-address">
                  <span aria-hidden="true">⌾</span>
                  <span>portfolio.local/projects/{viewer.slug}</span>
                </div>
                <a href={viewer.github} target="_blank">GitHub <Arrow /></a>
                <a className="browser-open" href={viewer.live} target="_blank">Open full screen <Arrow /></a>
              </div>
            </div>
            <div className="frame-wrap">
              <iframe src={viewer.live} title={viewer.title} />
            </div>
          </div>
        </div>
      )}
      {palette && (
        <div className="palette-backdrop" onMouseDown={() => setPalette(false)}>
          <div className="palette" onMouseDown={(e) => e.stopPropagation()}>
            <div className="palette-search">
              ⌕ <input autoFocus placeholder="Jump anywhere…" />
            </div>
            <p>QUICK ACTIONS</p>
            {[
              ["Selected work", "#work"],
              ["Recruiter view", "recruiter"],
              ["Start a project", "#contact"],
              ["Skills & capabilities", "#skills"],
            ].map((x) => (
              <button
                key={x[0]}
                onClick={() =>
                  x[1] === "recruiter"
                    ? (setRecruiter(true), setPalette(false))
                    : go(x[1])
                }
              >
                <span>{x[0]}</span>
                <kbd>↵</kbd>
              </button>
            ))}
            <small>ESC to close · Ctrl/⌘ K to open</small>
          </div>
        </div>
      )}
    </div>
  );
}

