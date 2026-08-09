import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaArrowRight, FaStar, FaLock } from "react-icons/fa";
import GlobalBackground from "../components/GlobalBackground";
import { SplitText } from "../components/ui/SplitText";
import { projects } from "../data/projects";
import { allSkills } from "../data/skills";
import FAQ from "../components/ui/FAQ";
import GlobalCTA from "../components/ui/GlobalCTA";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

// Reusable BentoCard component - Optimized solid background for FPS and smooth scrolling
const BentoCard = ({ children, className = "", title, headerAction, colSpan = "col-span-1", rowSpan = "row-span-1" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-[2rem] p-[1px] overflow-hidden bg-white/5 transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] ${colSpan} ${rowSpan} ${className}`}
    >
      {/* Spotlight Border */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none hidden md:block"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(200px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.2), transparent 85%)`
          ),
        }}
      />
      {/* Solid background color to avoid backdrop-blur performance drops */}
      <div className="relative h-full w-full bg-[#09090b] rounded-[1.95rem] border border-white/5 p-4 md:p-5 flex flex-col justify-between overflow-hidden">
        {/* Spotlight Inner */}
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.95rem] hidden md:block"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(250px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.03), transparent 80%)`
            ),
          }}
        />
        <div className="relative z-10 h-full w-full flex flex-col justify-between">
          {(title || headerAction) && (
            <div className="flex items-center justify-between mb-2 shrink-0">
              {title ? <h3 className="text-[9px] font-mono text-cyan-400/80 uppercase tracking-[0.2em] font-bold">{title}</h3> : <div />}
              {headerAction}
            </div>
          )}
          <div className="flex-grow flex flex-col justify-center">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────
// 2. Project Deck Module — Shows top 3 only, drives to /projects
// Psychology: Scarcity + FOMO — "there's more you haven't seen"
// ─────────────────────────────────────────────────────────────────
const ProjectDeckModule = () => {
  const [shuffledProjects, setShuffledProjects] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const TEASER_COUNT = 3;

  useEffect(() => {
    const shuffled = [...projects].sort(() => Math.random() - 0.5).slice(0, TEASER_COUNT);
    setShuffledProjects(shuffled);
  }, []);

  useEffect(() => {
    if (shuffledProjects.length === 0) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % shuffledProjects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [shuffledProjects.length]);

  if (shuffledProjects.length === 0) return null;

  const currentProject = shuffledProjects[activeIdx];

  return (
    <BentoCard colSpan="col-span-1 lg:col-span-2" rowSpan="row-span-1 md:row-span-2" title="Featured Projects">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.3 }}
          className="relative h-full w-full flex flex-col group/project pt-2"
        >
          {/* Project Image */}
          <div className="relative w-full h-[160px] md:h-[55%] overflow-hidden rounded-2xl bg-zinc-950 shrink-0 mb-4 md:mb-6 border border-white/5">
            <img
              src={currentProject.image}
              alt={currentProject.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover/project:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Project Info */}
          <div className="flex flex-col justify-between flex-grow">
            <div>
              <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">{currentProject.title}</h4>
              <p className="text-xs md:text-sm text-slate-400 font-light line-clamp-2 mt-2 leading-relaxed">{currentProject.description}</p>
            </div>

            {/* Bottom: Dot indicators + "See All" CTA */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                {shuffledProjects.map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? "bg-cyan-400 shadow-[0_0_6px_#22d3ee]" : "bg-white/10"}`} />
                ))}
                <span className="text-[9px] font-mono text-slate-600 ml-1">of {projects.length}</span>
              </div>
              <Link to="/projects" className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 hover:text-white group/link transition-colors">
                See All Projects <FaArrowRight className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </BentoCard>
  );
};

// ─────────────────────────────────────────────────────────────────
// 3. Interactive Stack Explorer — Shows top 5 only, drives to /skills
// Psychology: Iceberg Effect — showing the tip implies massive depth
// ─────────────────────────────────────────────────────────────────
const InteractiveStackModule = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const VISIBLE_COUNT = 5;

  const categories = [
    { name: "Frontend", id: "Frontend", locked: false },
    { name: "Backend", id: "Backend", locked: false },
    { name: "Database", id: "Database", locked: true },
    { name: "AI", id: "AI", locked: true }
  ];

  const skillsByCategory = allSkills.filter(s => s.category === activeCategory).slice(0, VISIBLE_COUNT);
  const totalSkills = allSkills.length;

  return (
    <BentoCard
      colSpan="col-span-1 md:col-span-2"
      rowSpan="row-span-1"
      title="Core Technologies"
      headerAction={
        <Link to="/skills" className="flex items-center gap-1.5 text-[9px] font-mono text-cyan-400 hover:text-white uppercase tracking-widest transition-colors group font-bold">
          +{totalSkills - VISIBLE_COUNT} More <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={8} />
        </Link>
      }
    >
      <div className="flex flex-col md:flex-row h-full gap-4 md:gap-6 pt-2">
        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:flex md:flex-col gap-2 shrink-0 md:w-40 justify-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => !cat.locked && setActiveCategory(cat.id)}
              className={`py-2 px-3 rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider text-center md:text-left border transition-all flex items-center justify-center md:justify-start gap-2 ${cat.locked
                ? "bg-white/[0.01] text-gray-600 border-white/5 cursor-not-allowed opacity-60"
                : activeCategory === cat.id
                  ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                  : "bg-white/[0.01] text-gray-500 border-white/5 hover:border-white/10 hover:text-white cursor-pointer"
                }`}
              title={cat.locked ? "Explore full stack on Skills page" : ""}
            >
              {cat.name}
              {cat.locked && <FaLock className="text-[8px] text-gray-500" />}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="flex-grow flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 relative gap-4">
          <div className="grid grid-cols-5 gap-3 md:gap-4 w-full">
            {skillsByCategory.map((tech) => (
              <div
                key={tech.name}
                className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-xl hover:border-cyan-500/30 transition-all hover:scale-110"
                style={{ color: tech.color }}
                title={tech.name}
              >
                <tech.icon aria-hidden="true" />
              </div>
            ))}
          </div>
          <Link to="/skills" className="text-[9px] font-mono text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest">
            Explore full tech stack →
          </Link>
        </div>
      </div>
    </BentoCard>
  );
};

// ─────────────────────────────────────────────────────────────────
// 4. Service Teaser — Simple tiles, drives to /services
// Psychology: Choice Simplification — 3 easy doors, not a complex calculator
// ─────────────────────────────────────────────────────────────────
const RecommenderModule = () => {
  const services = [
    { title: "Websites", desc: "Conversion-focused, animated, fast", linkState: "High-Converting Websites", icon: "🌐" },
    { title: "E-Commerce", desc: "Custom storefronts, payments, inventory", linkState: "Custom Online Stores", icon: "🛒" },
    { title: "Web Apps", desc: "Dashboards, SaaS, real-time systems", linkState: "Custom Web Apps", icon: "⚡" },
  ];

  return (
    <BentoCard colSpan="col-span-1 md:col-span-2" rowSpan="row-span-2" title="Services">
      <div className="flex flex-col h-full justify-between py-1 text-white">
        <div className="mb-4">
          <h4 className="text-lg font-black text-white uppercase tracking-tight">What do you need?</h4>
          <p className="text-[10px] text-slate-500 mt-1 font-mono">Pick a service to learn more</p>
        </div>

        <div className="flex flex-col gap-3 flex-grow justify-center">
          {services.map((s) => (
            <Link
              key={s.title}
              to="/services"
              state={{ plan: s.linkState }}
              className="group/svc flex items-center gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-cyan-500/20 hover:bg-cyan-500/[0.03] transition-all duration-300"
            >
              <span className="text-2xl shrink-0">{s.icon}</span>
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-black text-white uppercase tracking-tight group-hover/svc:text-cyan-400 transition-colors">{s.title}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{s.desc}</p>
              </div>
              <FaArrowRight className="text-[10px] text-slate-600 group-hover/svc:text-cyan-400 group-hover/svc:translate-x-1 transition-all shrink-0" />
            </Link>
          ))}
        </div>

        <Link
          to="/services"
          className="mt-4 w-full py-3 bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 text-white hover:text-cyan-400 font-bold uppercase tracking-wider text-[10px] rounded-xl flex items-center justify-center gap-2 group/all transition-all shrink-0"
        >
          Explore All Services <FaArrowRight className="group-hover/all:translate-x-1 transition-transform text-[8px]" />
        </Link>
      </div>
    </BentoCard>
  );
};

// ─────────────────────────────────────────────────────────────────
// 5. Contact Node — Clock + single CTA only, drives to /contact
// Psychology: Commitment Escalation — page visit = micro-commitment
// ─────────────────────────────────────────────────────────────────
const ContactNodeModule = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BentoCard colSpan="col-span-1 md:col-span-2" rowSpan="row-span-1" title="Availability">
      <div className="flex flex-col md:flex-row h-full gap-5 pt-2 items-center">
        {/* Clock + Status */}
        <div className="flex-grow w-full">
          <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block mb-1">My Local Time (IST)</span>
          <h4 className="text-2xl md:text-3xl font-mono font-black text-cyan-400 tracking-tighter">{time || "00:00:00"}</h4>
          <div className="flex items-center gap-2 mt-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider">Available for Projects</span>
          </div>
        </div>

        {/* Single CTA */}
        <Link
          to="/contact"
          className="w-full md:w-auto px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-black uppercase tracking-wider text-[10px] rounded-xl flex items-center justify-center gap-2 group/cta transition-all shrink-0 shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
        >
          Let's Talk <FaArrowRight className="group-hover/cta:translate-x-1 transition-transform text-[8px]" />
        </Link>
      </div>
    </BentoCard>
  );
};

// ─────────────────────────────────────────────────────────────────
// 6. Rating Teaser — Stars + score only, drives to /about
// Psychology: Social Proof Tease — rating without review creates curiosity
// ─────────────────────────────────────────────────────────────────
const TestimonialMarqueeModule = () => {
  return (
    <BentoCard colSpan="col-span-1" title="Client Reviews">
      <div className="h-full w-full flex flex-col items-center justify-center gap-3 py-2">
        {/* Star Rating */}
        <div className="flex gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => <FaStar key={i} size={16} />)}
        </div>

        {/* Score */}
        <div className="text-center">
          <span className="text-3xl font-black text-white tracking-tighter">5.0</span>
          <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">Verified Reviews</p>
        </div>

        {/* CTA to full reviews */}
        <Link to="/about" className="text-[9px] font-mono text-cyan-400/70 hover:text-cyan-400 transition-colors uppercase tracking-widest flex items-center gap-1 group/rev mt-1">
          Read reviews <FaArrowRight className="group-hover/rev:translate-x-1 transition-transform" size={8} />
        </Link>
      </div>
    </BentoCard>
  );
};


// ═══════════════════════════════════════════════════════════════════
// HOME PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════
const Home = () => {
  const firstName = "AAFAQUE".split("");
  const lastName = "NAZIR".split("");

  return (
    <>
      <div className="relative z-10 w-full min-h-screen bg-transparent">
        {/* 🚀 HERO SECTION */}
        <section
          id="home"
          aria-label="Hero — Aafaque Nazir, Frontend Engineer & Creative Developer"
          className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
        >
          {/* Particle Background - Runs ONLY within Hero section to auto-stop when scrolled off-screen (60 FPS optimization) */}
          <GlobalBackground />

          {/* Deep Ambient Glows */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-cyan-600/20 rounded-full blur-[120px] opacity-20" />
            <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-cyan-400/10 rounded-full blur-[100px] opacity-10" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full pt-28 pb-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-12 flex flex-col justify-center text-left max-w-4xl"
            >
              {/* Massive Typography */}
              <div className="relative mb-6">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black tracking-tighter text-white leading-[0.9]">
                  {/* Mobile View (CSS animation) */}
                  <div className="overflow-hidden flex flex-wrap md:hidden animate-[fadeInUp_0.8s_ease-out_forwards]">
                    <span className="inline-block">AAFAQUE</span>
                  </div>
                  <div className="overflow-hidden flex flex-wrap mt-2 md:hidden animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] opacity-0">
                    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-white drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">NAZIR</span>
                  </div>

                  {/* Desktop View (Framer Motion) */}
                  <div className="overflow-hidden hidden md:flex flex-wrap">
                    {firstName.map((char, index) => (
                      <motion.span key={index} variants={charVariants} className="inline-block">
                        {char}
                      </motion.span>
                    ))}
                  </div>
                  <div className="overflow-hidden hidden md:flex flex-wrap mt-2">
                    {lastName.map((char, index) => (
                      <motion.span
                        key={index}
                        variants={charVariants}
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-white drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                </h1>
              </div>

              {/* Subheadline */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-8 font-mono"
              >
                <SplitText
                  type="words"
                  delay={0.5}
                  className="text-cyan-400/80 text-[10px] sm:text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold"
                >
                  WEB DEVELOPER & FRONTEND ENGINEER
                </SplitText>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="max-w-2xl mb-8 md:mb-10"
              >
                <p className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed font-light border-l-[1px] border-cyan-500/30 pl-4 md:pl-6">
                  I build fast, beautiful websites that help your business grow. I focus on writing clean code and creating great user experiences.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-row gap-3 items-center w-full sm:w-auto"
              >
                <Link
                  to="/contact"
                  aria-label="Navigate to contact page"
                  className="group relative px-6 sm:px-8 py-4 bg-white text-black font-bold text-sm md:text-base rounded-full overflow-hidden hover:scale-[1.02] transition-transform duration-300 flex items-center gap-2.5 flex-grow sm:flex-none justify-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    Contact Me
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500 -z-10" />
                </Link>

                <a
                  href="https://github.com/Aafaque-Nazir"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit GitHub"
                  className="p-4 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:text-white text-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all flex items-center justify-center shrink-0"
                >
                  <FaGithub size={20} />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Down */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30 pointer-events-auto"
            onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="text-[9px] font-mono text-cyan-500/50 uppercase tracking-[0.25em]">Explore Hub</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-5 h-5 flex items-center justify-center text-cyan-400"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </section>

        {/* 🎛️ BENTO DASHBOARD */}
        <section id="dashboard" className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase mt-2">
              Quick Look
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
              A quick snapshot — explore each section for the full story.
            </p>
          </div>

          {/* Responsive CSS Grid: auto-rows applies only on tablet and desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:auto-rows-[220px]">
            {/* 1. Bio card — shortened with /about CTA */}
            <BentoCard colSpan="col-span-1 md:col-span-2" title="About Me">
              <div className="flex items-start gap-4 h-full pt-2">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl font-black">
                    AN
                  </div>
                  <span className="absolute bottom-0 right-0 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="flex flex-col justify-between flex-grow h-full">
                  <div>
                    <h4 className="text-base font-black text-white leading-tight">Aafaque Nazir</h4>
                    <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block mt-1">● Available for Freelance</span>
                    <p className="text-[11px] text-slate-400 mt-2.5 font-light leading-relaxed">
                      Full-stack engineer crafting premium web experiences — from database architecture to pixel-perfect UI.
                    </p>
                  </div>
                  <Link to="/about" className="inline-flex items-center gap-1.5 text-[9px] font-mono text-cyan-400/70 hover:text-cyan-400 uppercase tracking-widest transition-colors group/bio mt-3">
                    Discover my story <FaArrowRight className="group-hover/bio:translate-x-1 transition-transform" size={8} />
                  </Link>
                </div>
              </div>
            </BentoCard>

            {/* 2. Core performance metric (Lighthouse circle gauge) */}
            <BentoCard colSpan="col-span-1" title="My Performance">
              <div className="flex flex-col items-center justify-center h-full gap-2 mt-2">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="42" stroke="rgba(255,255,255,0.03)" strokeWidth="5" fill="transparent" />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="42"
                      stroke="#22d3ee"
                      strokeWidth="5"
                      fill="transparent"
                      strokeDasharray={42 * 2 * Math.PI}
                      initial={{ strokeDashoffset: 42 * 2 * Math.PI }}
                      whileInView={{ strokeDashoffset: 42 * 2 * Math.PI * (1 - 0.90) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white tracking-tighter">90+<span className="text-cyan-400 text-xs">+</span></span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Lighthouse score</span>
              </div>
            </BentoCard>

            {/* 3. Rating Teaser — drives to /about */}
            <TestimonialMarqueeModule />

            {/* 4. Project Deck — top 3 teaser, drives to /projects */}
            <ProjectDeckModule />

            {/* 5. Service Tiles — drives to /services */}
            <RecommenderModule />

            {/* 6. Stack Explorer — top 5 teaser, drives to /skills */}
            <InteractiveStackModule />

            {/* 7. Contact — clock + CTA, drives to /contact */}
            <ContactNodeModule />
          </div>
        </section>

        {/* 🧭 EXPLORE HUB — Navigation Safety Net */}
        <section id="explore-hub" className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-white/5">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono text-cyan-400/80 tracking-[0.3em] uppercase font-bold">Dive Deeper</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white uppercase mt-2">
              Explore More
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed font-light">
              Each page tells a different part of the story. Pick one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "About", desc: "The engineer behind the code", path: "/about" },
              { title: "Skills", desc: `${allSkills.length} technologies, 4 domains`, path: "/skills" },
              { title: "Projects", desc: `${projects.length} live case studies`, path: "/projects" },
              { title: "Services", desc: "Custom web solutions", path: "/services" },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  to={item.path}
                  className="group/nav relative block p-6 rounded-2xl bg-[#09090b] border border-white/5 hover:border-white/10 hover:bg-zinc-900/80 transition-all duration-500 overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-black text-white uppercase tracking-tight">{item.title}</h3>
                      <div className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover/nav:bg-white/10 group-hover/nav:border-white/10 transition-all duration-500">
                        <FaArrowRight className="text-[10px] text-slate-500 group-hover/nav:text-white transition-colors" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-mono group-hover/nav:text-slate-400 transition-colors">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ❓ FAQ Accordions */}
        <section id="faq-section" className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-white/5">
          <FAQ />
        </section>

        {/* Global CTA */}
        <section id="cta-section" className="relative w-full">
          <GlobalCTA />
        </section>
      </div>
    </>
  );
};

export default Home;
