import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Boxes,
  Wrench,
  Brain,
  Rocket,
  Globe,
  CheckCircle2,
  Github,
  Linkedin,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";

export default function App() {
  const [sent, setSent] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef(null);

  const sectionIds = [
    "home",
    "about",
    "services",
    "work",
    "skills",
    "testimonials",
    "contact",
  ];
  const currentSectionRef = useRef("");

  // Ensure dynamic viewport height CSS var for older Tailwind setups
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  useEffect(() => {
    // Prevent body scroll to eliminate double scrollbar
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      setShowBackToTop(el.scrollTop > 300);
      setScrollY(el.scrollTop);
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.id;
          if (id && id !== currentSectionRef.current) {
            currentSectionRef.current = id;
            history.replaceState(null, "", `#${id}`);
          }
        }
      },
      { root: el, threshold: 0.55 }
    );

    sections.forEach((s) => io.observe(s));

    // initial hash navigation after a short delay
    const handleInitialNavigation = () => {
      const initialHash = decodeURIComponent(window.location.hash || "")
        .replace("#", "")
        .trim();
      if (initialHash && sectionIds.includes(initialHash)) {
        const targetElement = document.getElementById(initialHash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    const initTimer = setTimeout(handleInitialNavigation, 200);

    const onHashChange = () => {
      const h = decodeURIComponent(window.location.hash || "")
        .replace("#", "")
        .trim();
      if (h && sectionIds.includes(h)) {
        const targetElement = document.getElementById(h);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      io.disconnect();
      clearTimeout(initTimer);
      // Restore body scroll on cleanup
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const safeScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    history.replaceState(null, "", `#${id}`);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const services = [
    {
      title: "Deploy AI Apps & Models",
      desc: "Package, ship, and scale ML/LLM apps with CI/CD and robust MLOps.",
      bullets: ["AWS/GCP/Azure", "Docker, Jenkins & Kubernetes", "Monitoring"],
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      title: "AI Integrations & SaaS",
      desc: "Plug AI into existing systems or build new SaaS products end-to-end.",
      bullets: ["APIs & automations", "Payments & auth", "Multi-tenant design"],
      icon: <Wrench className="w-5 h-5" />,
    },
    {
      title: "LLMs, RAG & Agents",
      desc: "Retrieval pipelines, agentic workflows, and domain fine-tuning.",
      bullets: ["LangChain", "RAG", "LoRA/QLoRA"],
      icon: <Brain className="w-5 h-5" />,
    },
    {
      title: "React Web Development",
      desc: "Responsive React sites and dashboards with clean UX & performance.",
      bullets: ["React", "FastAPI/Flask"],
      icon: <Globe className="w-5 h-5" />,
    },
  ];

  const projects = [
    {
      title: "Medical voice chatbot",
      desc: "Medical AI voice enabled chatbot, with conversational history.",
      link: "https://wizbot-ai-2o.onrender.com/",
      tags: ["OpenAI API", "Whisper", "Elevenlabs", "Flask", "React"],
      image: "/projects/wizbotai2.png",
    },
    {
      title: "Music Recommendation System",
      desc: "Recommends bollywoood music based on user's image input.",
      link: "https://huggingface.co/spaces/SameehK/MusRec/",
      tags: ["Vision model", "gradio ui", "youtube embedding"],
      image: "/projects/musrecai.png",
    },
    {
      title: "Online medical consultation system",
      desc: "with live consultation features with doctor.",
      link: "https://github.com/Sameeh07/Online_medical_consultation",
      tags: [
        "mongodb",
        "expressjs",
        "reactjs",
        "nodejs",
        "socket.io",
        "webrtc/peerjs",
      ],
      image: "/projects/omcs.png",
    },
    {
      title: "Multiple Disease Prediction System",
      desc: "Disease Prediction using ML with 80% accuracy",
      link: "https://diseasediagnosisbysam.streamlit.app/",
      tags: ["LogistricRegression", "SVM", "Streamlit"],
      image: "/projects/diseasepred.png",
    },
    {
      title: "Hotel Reservation Cancellation Prediction",
      desc: "Reservation Cancellation Prediction ML model deployed using MLFlow, Docker, Jenkins and GCP",
      link: "https://github.com/Sameeh07/Hotel-Reservation-Prediction",
      tags: ["LightGBM", "GCP", "Docker", "Jenkins"],
      image: "/projects/image.png",
    },
  ];

  const testimonials = [
    {
      quote: "Delivered a production-ready pipeline in weeks. Clear, pragmatic, fast.",
      author: "Arjun Mehta",
      role: "CTO, Nimbus SaaS",
    },
    {
      quote:
        "Our LLM answers improved massively with his retrieval tuning.",
      author: "Priya Nair",
      role: "Head of Support, Helply",
    },
    {
      quote:
        "Great communicator — scoped, built, and shipped ahead of plan.",
      author: "Rahul Verma",
      role: "Product Lead, FinX",
    },
    {
      quote: "CI/CD for ML with proper monitoring — game changer for us.",
      author: "Sana Iqbal",
      role: "Data Science Manager, Retail.ai",
    },
    {
      quote:
        "React site + RAG backend in under two weeks. Impeccable quality.",
      author: "Ethan Cole",
      role: "Founder, OpsBoard",
    },
    {
      quote:
        "Clean APIs and docs; our team could extend features easily.",
      author: "Neha Gupta",
      role: "Engineering Manager, MedAssist",
    },
    {
      quote:
        "Edge vision pipeline is rock solid and cost-efficient.",
      author: "Vikram Rao",
      role: "VP Operations, FabTech",
    },
    {
      quote:
        "Understands business goals, not just models. Highly recommended.",
      author: "Zoya Khan",
      role: "CEO, BrightOps",
    },
  ];

  const rowA = testimonials.filter((_, i) => i % 2 === 0);
  const rowB = testimonials.filter((_, i) => i % 2 !== 0);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 flex flex-col overflow-hidden"
         style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}>
      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              safeScrollTo("home");
            }}
            className="font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight flex-shrink-0"
            style={{
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, Segoe UI, Inter, Roboto, sans-serif",
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400 drop-shadow-[0_0_12px_rgba(139,92,246,0.35)]">
              Abdul Sameeh K
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-4 lg:gap-6 text-sm font-medium">
            {["About", "Services", "Work", "Skills", "Testimonials", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    safeScrollTo(item.toLowerCase());
                  }}
                  className="text-gray-300 hover:text-fuchsia-300 transition-colors whitespace-nowrap"
                >
                  {item}
                </a>
              )
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 text-gray-200 flex-shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl z-50">
            <div className="flex flex-col py-2">
              {["About", "Services", "Work", "Skills", "Testimonials", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      safeScrollTo(item.toLowerCase());
                    }}
                    className="px-6 py-3 text-gray-200 hover:bg-slate-900 hover:text-fuchsia-300 transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </nav>
        )}
      </header>

      {/* PAGE SCROLLER (single visible scrollbar hidden via CSS) */}
      <main
        ref={scrollRef}
        id="page"
        className="flex-1 snap-y snap-proximity overflow-y-auto overflow-x-hidden scroll-smooth pt-16"
        // Fit exactly below the fixed 4rem header, using dynamic viewport units with fallbacks
        style={{
          height:
            "calc(100dvh - 4rem)",
        }}
      >
        {/* Hero */}
        <section
          id="home"
          className="snap-start flex items-center"
          style={{ minHeight: "calc(100dvh - 4rem)" }}
        >
          <div className="container mx-auto px-4 py-8 sm:py-12 md:py-20">
            <div className="grid gap-8 md:gap-10 md:grid-cols-2 items-center max-w-6xl mx-auto">
              <motion.div
                className="order-2 md:order-1 text-center md:text-left"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400">
                    Abdul Sameeh K
                  </span>
                </h1>
                <p className="mt-4 text-gray-300/90 text-sm sm:text-base md:text-lg leading-relaxed">
                  Software Engineer specialized in AI & ML. I build AI-driven apps, fine-tune LLMs
                  for domain tasks, and ship reliable MLOps pipelines across AWS/GCP/Azure.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center">
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      safeScrollTo("services");
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 shadow-lg shadow-fuchsia-900/30 text-center"
                  >
                    View Services
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      safeScrollTo("contact");
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full font-medium border border-fuchsia-500/60 text-fuchsia-200 hover:bg-fuchsia-950/30 text-center"
                  >
                    Book Appointment
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="order-1 md:order-2 flex justify-center"
                style={{ y: scrollY * -0.05 }}
              >
                <img
                  src="/grad.jpg"
                  alt="Abdul Sameeh"
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full object-cover shadow-[0_30px_80px_-20px_rgba(168,85,247,0.45)] ring-4 ring-slate-900"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="snap-start flex items-center"
          style={{ minHeight: "calc(100dvh - 4rem)" }}
        >
          <div className="container mx-auto px-4 py-8 sm:py-12 md:py-20 max-w-4xl">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="text-gray-300 leading-relaxed text-center text-sm sm:text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              I have hands-on experience developing AI-driven applications, implementing machine
              learning models, and fine-tuning large language models (LLMs) for domain-specific
              tasks. My skill set extends to MLOps practices—such as model deployment, monitoring,
              and pipeline automation—along with a solid foundation in cloud platforms and DevOps
              tools.
            </motion.p>

            <motion.h3
              className="mt-8 sm:mt-10 text-lg sm:text-xl md:text-2xl font-bold text-center mb-3"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Educational Qualification
            </motion.h3>
            <motion.div
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 md:p-8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <p className="font-semibold text-sm sm:text-base">
                  B.E. in Artificial Intelligence &amp; Machine Learning
                </p>
                <p className="text-gray-400 mt-1 text-sm">
                  Visvesvaraya Technological University (VTU)
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="snap-start flex items-center"
          style={{ minHeight: "calc(100dvh - 4rem)" }}
        >
          <div className="container mx-auto px-4 py-8 sm:py-12 md:py-20">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Services
            </motion.h2>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="rounded-2xl border border-slate-800 p-4 sm:p-6 bg-slate-900/60 hover:bg-slate-900/80 transition-all shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="rounded-xl bg-fuchsia-900/30 p-2 text-fuchsia-300 flex-shrink-0">
                      {s.icon}
                    </span>
                    <h3 className="font-semibold text-base sm:text-lg flex-1 leading-tight">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-300/90 leading-relaxed">{s.desc}</p>
                  <ul className="mt-3 space-y-1 text-xs sm:text-sm text-gray-400">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="text-fuchsia-300 mt-1 flex-shrink-0">•</span>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      safeScrollTo("contact");
                    }}
                    className="mt-4 inline-block text-xs sm:text-sm text-fuchsia-300 font-medium hover:text-fuchsia-200"
                  >
                    Book appointment →
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Work */}
        <section
          id="work"
          className="snap-start flex items-center"
          style={{ minHeight: "calc(100dvh - 4rem)" }}
        >
          <div className="container mx-auto px-4 py-8 sm:py-12 md:py-20">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {projects.map((p, i) => (
                <motion.a
                  key={p.title}
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 hover:bg-slate-900/80 transition-all shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="h-40 sm:h-48 w-full object-cover" />
                  ) : (
                    <ProjectThumb title={p.title} />
                  )}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-semibold text-base sm:text-lg group-hover:text-fuchsia-300 transition-colors leading-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-gray-300/90 leading-relaxed">
                      {p.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs rounded-full bg-fuchsia-900/30 px-2 py-1 text-fuchsia-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="snap-start flex items-center"
          style={{ minHeight: "calc(100dvh - 4rem)" }}
        >
          <div className="container mx-auto px-4 py-8 sm:py-12 md:py-20">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Skills
            </motion.h2>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              <SkillCard title="Languages" items={["Python", "JavaScript", "C", "C++", "Java"]} />
              <SkillCard title="Frontend" items={["HTML", "CSS", "React.js"]} />
              <SkillCard title="Databases" items={["MySQL", "MongoDB", "PostgreSQL"]} />
              <SkillCard
                title="DevOps & Cloud"
                items={[
                  "Git",
                  "GitHub",
                  "GitHub Actions",
                  "Jenkins",
                  "Docker",
                  "AWS",
                  "GCP",
                  "Azure",
                  "Kubernetes",
                  "Helm",
                  "Terraform",
                  "MLflow",
                  "Grafana",
                  "Prometheus",
                ]}
              />
              <SkillCard
                title="Frameworks & Libraries"
                items={[
                  "Flask",
                  "FastAPI",
                  "TensorFlow",
                  "PyTorch",
                  "Keras",
                  "scikit-learn",
                  "Matplotlib",
                  "OpenCV",
                ]}
              />
              <SkillCard
                title="AI/ML"
                items={[
                  "LLMs",
                  "Reinforcement Learning",
                  "NLP",
                  "RPA",
                  "n8n",
                  "Generative AI",
                  "LangChain",
                  "AI Agents",
                  "Hugging Face",
                  "FAISS",
                  "VectorDB",
                  "MLOps",
                  "LoRA",
                  "QLoRA",
                  "AWS Sagemaker",
                  "RAG",
                  "MCP",
                  "Computer Vision",
                  "Robotics",
                  "Speech & Audio",
                  "Ethical AI",
                ]}
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="snap-start flex items-center"
          style={{ minHeight: "calc(100dvh - 4rem)" }}
        >
          <div className="container mx-auto px-4 py-8 sm:py-12 md:py-20">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Reviews
            </motion.h2>

            <div className="relative overflow-hidden space-y-4 sm:space-y-6">
              <div className="marquee-row">
                <div className="marquee-track">
                  {[...rowA, ...rowA, ...rowA].map((t, i) => (
                    <figure
                      key={`A-${i}`}
                      className="marquee-card flex-shrink-0 w-[240px] sm:w-[280px] md:w-[320px] mr-4 sm:mr-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
                    >
                      <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-white grid place-content-center font-semibold text-xs sm:text-sm">
                          {t.author
                            .split(" ")
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <figcaption className="text-xs sm:text-sm">
                          <p className="font-medium text-gray-100">{t.author}</p>
                          {t.role && <p className="text-gray-400">{t.role}</p>}
                        </figcaption>
                      </div>
                      <blockquote className="text-xs sm:text-sm text-gray-300/90 leading-relaxed">
                        "{t.quote}"
                      </blockquote>
                    </figure>
                  ))}
                </div>
              </div>

              <div className="marquee-row">
                <div className="marquee-track marquee-track--reverse">
                  {[...rowB, ...rowB, ...rowB].map((t, i) => (
                    <figure
                      key={`B-${i}`}
                      className="marquee-card flex-shrink-0 w-[240px] sm:w-[280px] md:w-[320px] mr-4 sm:mr-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
                    >
                      <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-white grid place-content-center font-semibold text-xs sm:text-sm">
                          {t.author
                            .split(" ")
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <figcaption className="text-xs sm:text-sm">
                          <p className="font-medium text-gray-100">{t.author}</p>
                          {t.role && <p className="text-gray-400">{t.role}</p>}
                        </figcaption>
                      </div>
                      <blockquote className="text-xs sm:text-sm text-gray-300/90 leading-relaxed">
                        "{t.quote}"
                      </blockquote>
                    </figure>
                  ))}
                </div>
              </div>
            </div>

            <p className="sr-only">Client testimonials scroll continuously in two rows</p>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="snap-start flex items-center"
          style={{ minHeight: "calc(100dvh - 4rem)" }}
        >
          <div className="container mx-auto px-4 py-8 sm:py-12 md:py-20 max-w-6xl">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Book an Appointment
            </motion.h2>

            <p className="text-center text-sm sm:text-base text-gray-300 mb-2">
              Prefer email?{" "}
              <a
                className="text-fuchsia-300 hover:text-fuchsia-200 underline"
                href="mailto:abdulsameehk786@gmail.com?subject=Project%20inquiry"
              >
                Email me directly
              </a>
            </p>
            <p className="text-center text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
              I reply within <strong>24 hours</strong>. I don't sell or share your data—information
              is used only to respond to your inquiry. Please briefly describe your project (goals,
              timeline, budget ballpark) so I can help faster.
            </p>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {!sent ? (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  className="rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-800 bg-slate-900/60"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const data = new FormData(form);
                    await fetch("/", {
                      method: "POST",
                      headers: { "Content-Type": "application/x-www-form-urlencoded" },
                      body: new URLSearchParams(data).toString(),
                    });
                    setSent(true);
                    form.reset();
                  }}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <input
                    type="hidden"
                    name="subject"
                    value="New appointment request from portfolio"
                  />
                  <p className="hidden">
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </p>

                  <LabeledInput id="name" name="name" label="Name" required />
                  <LabeledInput id="email" name="email" type="email" label="Email" required />

                  <div className="mt-4">
                    <label className="text-sm font-medium" htmlFor="message">
                      Project details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm sm:text-base focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-900/40 resize-none"
                      placeholder="Tell me about your problem, goals, scope, timeline, and budget."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full font-medium text-white bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 shadow-lg shadow-fuchsia-900/40 text-sm sm:text-base"
                  >
                    Send Request
                  </button>
                </form>
              ) : (
                <div className="rounded-2xl p-6 sm:p-8 flex items-center justify-center border border-emerald-900/40 bg-emerald-900/20">
                  <div className="flex items-center gap-3 text-emerald-300">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <p className="font-medium text-sm sm:text-base">
                      Your request has been sent! I'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              <aside className="rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-800 bg-slate-900/60">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">How it works</h3>
                <ol className="space-y-3 sm:space-y-4">
                  <Step
                    n={1}
                    title="Submit your project details"
                    text="Tell me about your project, your goals, and what you're looking for. If I'm a good fit, I'll invite you to schedule a free 30-minute consultation."
                  />
                  <Step
                    n={2}
                    title="Receive a cost estimate"
                    text="After the consultation, I'll share my standard hourly or daily rate. If your project needs a fixed price, I'll provide one within three business days so you can decide with confidence."
                  />
                  <Step
                    n={3}
                    title="Work begins"
                    text="I'll start development, perform a technical audit, or collaborate with your team — keeping you updated throughout."
                  />
                  <Step
                    n={4}
                    title="Delivery & ongoing support"
                    text="Once completed, I'll deliver the results and make adjustments as needed. For long-term projects, I provide continued support and optimizations."
                  />
                </ol>
              </aside>
            </div>

            <div className="mt-8 flex justify-center items-center space-x-8">
              <a
                href="https://linkedin.com/in/sameehk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/sameeh07"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://huggingface.co/SameehK"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hugging Face Profile"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <span className="text-2xl leading-none">🤗</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950/80 border-t border-slate-800 py-6 sm:py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              © {new Date().getFullYear()} Abdul Sameeh K · All rights reserved
            </p>
          </div>
        </footer>
      </main>

      {/* Back to top */}
      <button
        onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-2 sm:p-3 rounded-full text-white bg-gradient-to-r from-fuchsia-600 to-indigo-600 shadow-lg hover:shadow-xl transition-all z-40 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}

/* --- Reusable components --- */
function Step({ n, title, text }) {
  return (
    <li className="flex gap-3">
      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-fuchsia-900/30 text-fuchsia-300 grid place-content-center text-xs sm:text-sm font-semibold">
        {n}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-100 text-sm sm:text-base leading-tight">{title}</p>
        <p className="mt-1 text-xs sm:text-sm text-gray-300 leading-relaxed">{text}</p>
      </div>
    </li>
  );
}

function LabeledInput({ id, name, type = "text", label, required }) {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-300" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm sm:text-base focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-900/40 transition-all"
      />
    </div>
  );
}

function ProjectThumb({ title }) {
  const initials = title
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="h-40 sm:h-48 bg-gradient-to-br from-fuchsia-600 to-indigo-600 grid place-content-center">
      <span className="text-xl sm:text-2xl font-bold text-white">{initials}</span>
    </div>
  );
}

function SkillCard({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-800 p-4 sm:p-6 bg-slate-900/60 hover:bg-slate-900/80 transition-all shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <span className="p-1.5 sm:p-2 rounded-xl bg-fuchsia-900/30 text-fuchsia-300 flex-shrink-0">
          <CategoryIcon title={title} />
        </span>
        <h3 className="font-semibold text-base sm:text-lg leading-tight">{title}</h3>
      </div>
      <ul className="flex flex-wrap gap-1.5 sm:gap-2">
        {items.map((s) => (
          <li
            key={s}
            className="text-xs sm:text-sm rounded-full border border-slate-800 bg-slate-950/40 px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-1.5 hover:border-fuchsia-600/50 transition-colors"
          >
            <ToolIcon name={s} />
            <span className="leading-none">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CategoryIcon({ title }) {
  const map = {
    Languages: <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />,
    Frontend: <Globe className="w-4 h-4 sm:w-5 sm:h-5" />,
    Databases: <Database className="w-4 h-4 sm:w-5 sm:h-5" />,
    "DevOps & Cloud": <Cloud className="w-4 h-4 sm:w-5 sm:h-5" />,
    "Frameworks & Libraries": <Boxes className="w-4 h-4 sm:w-5 sm:h-5" />,
    "AI/ML": <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />,
  };
  return map[title] ?? <Boxes className="w-4 h-4 sm:w-5 sm:h-5" />;
}

function ToolIcon({ name }) {
  const lower = (name || "").toLowerCase();
  if (/(python|java(script)?|c\+\+|\bc\b|java)/.test(lower))
    return <Code2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-fuchsia-300" />;
  if (/(react|html|css|frontend|vite)/.test(lower))
    return <Globe className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-300" />;
  if (/(mysql|mongo|postgres|vector|faiss)/.test(lower))
    return <Database className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-300" />;
  if (/(git|github|jenkins|ci|cd|helm|terraform|kubernetes|docker|registry)/.test(lower))
    return <GitBranch className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-300" />;
  if (/(aws|gcp|azure|sagemaker|cloud)/.test(lower))
    return <Cloud className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-sky-300" />;
  if (/(tensor|torch|keras|scikit|opencv|mlflow|grafana|prometheus|matplotlib)/.test(lower))
    return <Boxes className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-300" />;
  if (/(llm|rag|langchain|agent|n8n|nlp|vision|speech|robotics|lora|qlora|mcp)/.test(lower))
    return <Brain className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-fuchsia-300" />;
  return <Boxes className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />;
}
