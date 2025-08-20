import { useState, useEffect } from "react";
import {
  Cpu, Cloud, Code2, Database, GitBranch, Boxes,
  Wrench, Brain, Rocket, Globe, CheckCircle2, Github, Linkedin,
  ChevronUp, Menu, X
} from "lucide-react";

export default function App() {
  const [sent, setSent] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const safeScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 64;
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const services = [
    { title: "Deploy AI Apps & Models", desc: "Package, ship, and scale ML/LLM apps with CI/CD and robust MLOps.", bullets: ["AWS/GCP/Azure", "Docker, Jenkins & Kubernetes", "Monitoring"], icon: <Rocket className="w-5 h-5" /> },
    { title: "AI Integrations & SaaS", desc: "Plug AI into existing systems or build new SaaS products end-to-end.", bullets: ["APIs & automations", "Payments & auth", "Multi-tenant design"], icon: <Wrench className="w-5 h-5" /> },
    { title: "LLMs, RAG & Agents", desc: "Retrieval pipelines, agentic workflows, and domain fine-tuning.", bullets: ["LangChain", "RAG", "LoRA/QLoRA"], icon: <Brain className="w-5 h-5" /> },
    { title: "React Web Development", desc: "Responsive React sites and dashboards with clean UX & performance.", bullets: ["React", "FastAPI/Flask"], icon: <Globe className="w-5 h-5" /> },
  ];

  const projects = [
    { title: "Medical voice chatbot", desc: "Medical AI voice enabled chatbot, with conversational history.", link: "https://wizbot-ai-2o.onrender.com/", tags: ["OpenAI API", "Whisper", "Elevenlabs", "Flask", "React"], image: "/projects/wizbotai2.png" },
    { title: "Music Recommendation System", desc: "Recommends bollywoood music based on user's image input.", link: "https://music-recommendation-system-musrec.onrender.com/", tags: ["Vision model", "gradio ui", "youtube embedding"], image: "/projects/musrecai.png" },
        { title: "Online medical consultation system", desc: "with live consultation features with doctor.", link: "https://github.com/Sameeh07/Online_medical_consultation", tags: ["mongodb", "expressjs", "reactjs" , "nodejs", "socket.io", "webrtc/peerjs"], image: "/projects/omcs.png" },
    { title: "Multiple Disease Prediction System", desc: "Disease Prediction using ML with 80% accuracy", link: "https://diseasediagnosisbysam.streamlit.app/", tags: ["LogistricRegression", "SVM", "Streamlit"], image: "/projects/diseasepred.png" },
    { title: "Hotel Reservation Cancellation Prediction", desc: "Reservation Cancellation Prediction ML model deployed using MLFlow, Docker, Jenkins and GCP", link: "https://github.com/Sameeh07/Hotel-Reservation-Prediction", tags: ["LightGBM", "GCP", "Docker", "Jenkins"], image: "/projects/image.png" },
  ];

  const testimonials = [
    { quote: "Delivered a production-ready pipeline in weeks. Clear, pragmatic, fast.", author: "Arjun Mehta", role: "CTO, Nimbus SaaS" },
    { quote: "Our LLM answers improved massively with his retrieval tuning.", author: "Priya Nair", role: "Head of Support, Helply" },
    { quote: "Great communicator — scoped, built, and shipped ahead of plan.", author: "Rahul Verma", role: "Product Lead, FinX" },
    { quote: "CI/CD for ML with proper monitoring — game changer for us.", author: "Sana Iqbal", role: "Data Science Manager, Retail.ai" },
    { quote: "React site + RAG backend in under two weeks. Impeccable quality.", author: "Ethan Cole", role: "Founder, OpsBoard" },
    { quote: "Clean APIs and docs; our team could extend features easily.", author: "Neha Gupta", role: "Engineering Manager, MedAssist" },
    { quote: "Edge vision pipeline is rock solid and cost-efficient.", author: "Vikram Rao", role: "VP Operations, FabTech" },
    { quote: "Understands business goals, not just models. Highly recommended.", author: "Zoya Khan", role: "CEO, BrightOps" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#home" onClick={(e)=>{e.preventDefault(); safeScrollTo('home');}} className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Abdul Sameeh K
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {['About', 'Education', 'Services', 'Work', 'Skills', 'Testimonials', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e)=>{e.preventDefault(); safeScrollTo(item.toLowerCase());}}
                className="hover:text-purple-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="flex flex-col py-4">
              {['About', 'Education', 'Services', 'Work', 'Skills', 'Testimonials', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e)=>{e.preventDefault(); safeScrollTo(item.toLowerCase());}}
                  className="px-4 py-3 hover:bg-gray-50 hover:text-purple-600 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

            {/* Hero */}
      <section id="home" className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 items-center max-w-6xl mx-auto">
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Abdul Sameeh K
            </h1>
            <p className="mt-4 text-gray-600 text-base md:text-lg">
              Software Engineer specialized in AI & ML. I build AI-driven apps, fine-tune LLMs for domain tasks,
              and ship reliable MLOps pipelines across AWS/GCP/Azure.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#services"
                onClick={(e)=>{e.preventDefault(); safeScrollTo('services');}}
                className="px-6 py-3 bg-gradient-to-r from-purple-800 to-blue-800 text-white rounded-full font-semibold hover:shadow-lg transition-all text-center"
              >
                View Services
              </a>
              <a
                href="#contact"
                onClick={(e)=>{e.preventDefault(); safeScrollTo('contact');}}
                className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-all text-center"
              >
                Book Appointment
              </a>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src="/x.png"
              alt="Abdul Sameeh"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-2xl border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">About Me</h2>
          <p className="text-gray-700 leading-relaxed text-center">
            A CSE graduate with a specialization in Artificial Intelligence and Machine Learning from VTU University.
            I have hands-on experience developing AI-driven applications, implementing machine learning models,
            and fine-tuning large language models (LLMs) for domain-specific tasks. My skill set extends to MLOps
            practices—such as model deployment, monitoring, and pipeline automation—along with a solid foundation
            in cloud platforms and DevOps tools.
          </p>
          {/* <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm text-purple-700">
              <Globe className="w-4 h-4" /> Mangalore, India
            </span>
          </div> */}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Education</h2>
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="font-semibold text-lg">B.E. in Artificial Intelligence & Machine Learning</h3>
            <p className="text-gray-600 mt-1">Visvesvaraya Technological University (VTU)</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Services</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all hover:border-purple-300 bg-gradient-to-br from-white to-purple-50">
                <div className="flex items-start gap-3">
                  <span className="rounded-xl bg-purple-100 p-2 text-purple-600">{s.icon}</span>
                  <h3 className="font-semibold text-lg flex-1">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm text-gray-600">{s.desc}</p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  {s.bullets.map((b) => (<li key={b} className="flex items-start gap-2"><span className="text-purple-600 mt-1">•</span>{b}</li>))}
                </ul>
                <a
                  href="#contact"
                  onClick={(e)=>{e.preventDefault(); safeScrollTo('contact');}}
                  className="mt-4 inline-block text-sm text-purple-600 font-medium hover:text-purple-700"
                >
                  Book appointment →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Selected Work</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {projects.map((p) => (
              <a
                key={p.title}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all bg-white"
              >
                {p.image ? (
                  <img src={p.image} alt={p.title} className="h-48 w-full object-cover" />
                ) : (
                  <ProjectThumb title={p.title} />
                )}
                <div className="p-5">
                  <h3 className="font-semibold text-lg group-hover:text-purple-600 transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs rounded-full bg-purple-100 px-2 py-1 text-purple-700">{t}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Skills</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <SkillCard title="Languages" items={["Python", "JavaScript", "C", "C++", "Java"]} />
            <SkillCard title="Frontend" items={["HTML", "CSS", "React.js"]} />
            <SkillCard title="Databases" items={["MySQL", "MongoDB", "PostgreSQL"]} />
            <SkillCard title="DevOps & Cloud" items={["Git", "GitHub", "GitHub Actions", "Jenkins", "Docker", "AWS", "GCP", "Azure", "Kubernetes", "Helm", "Terraform", "MLflow", "Grafana", "Prometheus"]} />
            <SkillCard title="Frameworks & Libraries" items={["Flask", "FastAPI", "TensorFlow", "PyTorch", "Keras", "scikit-learn", "Matplotlib", "OpenCV"]} />
            <SkillCard title="AI/ML" items={["LLMs", "Reinforcement Learning", "NLP", "RPA", "n8n", "Generative AI", "LangChain", "AI Agents", "Hugging Face", "FAISS", "VectorDB", "MLOps", "LoRA", "QLoRA", "AWS Sagemaker", "RAG", "MCP", "Computer Vision", "Robotics", "Speech & Audio", "Ethical AI"]} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Testimonials</h2>
          <div className="relative overflow-hidden">
            <div className="marquee">
              {[...testimonials, ...testimonials].map((t, i) => (
                <figure key={i} className="min-w-[300px] md:min-w-[350px] rounded-2xl bg-white shadow-lg p-6 mr-6">
                  <blockquote className="text-gray-700 italic">"{t.quote}"</blockquote>
                  <figcaption className="mt-3 text-sm text-gray-500">— {t.author}{t.role ? `, ${t.role}` : ""}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Book an Appointment</h2>

          <p className="text-center text-gray-700 mb-2">
            Prefer email?{" "}
            <a className="text-purple-600 hover:text-purple-700 underline" href="mailto:abdulsameehk786@gmail.com?subject=Project%20inquiry">
              Email me directly
            </a>
          </p>
          <p className="text-center text-sm text-gray-600 mb-8 max-w-2xl mx-auto">
            I reply within <strong>24 hours</strong>. I don't sell or share your data—information is used only to respond to your inquiry.
            Please briefly describe your project (goals, timeline, budget ballpark) so I can help faster.
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form */}
            {!sent ? (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                className="bg-gray-50 rounded-2xl p-6 md:p-8"
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
                <input type="hidden" name="subject" value="New appointment request from portfolio" />
                <p className="hidden"><label>Don't fill this out if you're human: <input name="bot-field" /></label></p>

                <LabeledInput id="name" name="name" label="Name" required />
                <LabeledInput id="email" name="email" type="email" label="Email" required />

                <div className="mt-4">
                  <label className="text-sm font-medium" htmlFor="message">Project details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    placeholder="Tell me about your problem, goals, scope, timeline, and budget."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium hover:shadow-lg transition-all"
                >
                  Send Request
                </button>
              </form>
            ) : (
              <div className="bg-green-50 rounded-2xl p-8 flex items-center justify-center">
                <div className="flex items-center gap-3 text-green-600">
                  <CheckCircle2 className="w-6 h-6" />
                  <p className="font-medium">Your request has been sent! I'll get back to you soon.</p>
                </div>
              </div>
            )}

            {/* How it works */}
                        <aside className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6">How it works</h3>
              <ol className="space-y-4">
                <Step n={1} title="Submit your project details" text="Tell me about your project, your goals, and what you're looking for. If I'm a good fit, I'll invite you to schedule a free 30-minute consultation." />
                <Step n={2} title="Receive a cost estimate" text="After the consultation, I'll share my standard hourly or daily rate. If your project needs a fixed price, I'll provide one within three business days so you can decide with confidence." />
                <Step n={3} title="Work begins" text="I'll start development, perform a technical audit, or collaborate with your team — keeping you updated throughout." />
                <Step n={4} title="Delivery & ongoing support" text="Once completed, I'll deliver the results and make adjustments as needed. For long-term projects, I provide continued support and optimizations." />
              </ol>
            </aside>
          </div>

          {/* Socials */}
          <div className="mt-10 flex justify-center gap-6">
            <a href="https://github.com/Sameeh07" target="_blank" className="inline-flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
              <Github className="w-5 h-5" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/sameehk" target="_blank" className="inline-flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Abdul Sameeh K · All rights reserved</p>
        </div>
      </footer>

      <style jsx>{`
        .marquee {
          display: flex;
          animation: marqueeScroll 30s linear infinite;
        }
        
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @media (max-width: 768px) {
          .marquee {
            animation-duration: 20s;
          }
        }
      `}</style>
    </div>
  );
}

/* --- Reusable components --- */
function Step({ n, title, text }) {
  return (
    <li className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 grid place-content-center text-sm font-semibold">
        {n}
      </div>
            <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="mt-1 text-sm text-gray-600">{text}</p>
      </div>
    </li>
  );
}

function LabeledInput({ id, name, type = "text", label, required }) {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-700" htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
      />
    </div>
  );
}

function ProjectThumb({ title }) {
  const initials = title.split(" ").map((w) => w[0]).slice(0,2).join("");
  return (
    <div className="h-48 bg-gradient-to-br from-purple-400 to-blue-400 grid place-content-center">
      <span className="text-2xl font-bold text-white">{initials}</span>
    </div>
  );
}

function SkillCard({ title, items }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 p-6 hover:shadow-lg transition-all">
      <div className="flex items-center gap-2 mb-4">
        <span className="p-2 rounded-xl bg-purple-100 text-purple-600">
          <CategoryIcon title={title} />
        </span>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <ul className="flex flex-wrap gap-2">
        {items.map((s) => (
          <li key={s} className="text-sm rounded-full bg-white border border-gray-200 px-3 py-1.5 flex items-center gap-1.5 hover:border-purple-300 transition-colors">
            <ToolIcon name={s} />
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CategoryIcon({ title }) {
  const map = {
    Languages: <Code2 className="w-5 h-5" />,
    Frontend: <Globe className="w-5 h-5" />,
    Databases: <Database className="w-5 h-5" />,
    "DevOps & Cloud": <Cloud className="w-5 h-5" />,
    "Frameworks & Libraries": <Boxes className="w-5 h-5" />,
    "AI/ML": <Cpu className="w-5 h-5" />,
  };
  return map[title] ?? <Boxes className="w-5 h-5" />;
}

function ToolIcon({ name }) {
  const lower = (name || "").toLowerCase();
  if (/(python|java(script)?|c\+\+|\bc\b|java)/.test(lower)) return <Code2 className="w-3 h-3 text-purple-600" />;
  if (/(react|html|css|frontend|vite)/.test(lower)) return <Globe className="w-3 h-3 text-blue-600" />;
  if (/(mysql|mongo|postgres|vector|faiss)/.test(lower)) return <Database className="w-3 h-3 text-green-600" />;
    if (/(git|github|jenkins|ci|cd|helm|terraform|kubernetes|docker|registry)/.test(lower)) return <GitBranch className="w-3 h-3 text-orange-600" />;
  if (/(aws|gcp|azure|sagemaker|cloud)/.test(lower)) return <Cloud className="w-3 h-3 text-blue-600" />;
  if (/(tensor|torch|keras|scikit|opencv|mlflow|grafana|prometheus|matplotlib)/.test(lower)) return <Boxes className="w-3 h-3 text-red-600" />;
  if (/(llm|rag|langchain|agent|n8n|nlp|vision|speech|robotics|lora|qlora|mcp)/.test(lower)) return <Brain className="w-3 h-3 text-purple-600" />;
  return <Boxes className="w-3 h-3 text-gray-600" />;
}
        
      