import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaArrowRight, FaRocket, FaBolt } from "react-icons/fa";
import { SiReact } from "react-icons/si";
import { RiExternalLinkLine } from "react-icons/ri";
import GlobalBackground from "../components/GlobalBackground";
import { SplitText } from "../components/ui/SplitText";
import { projects } from "../data/projects";
import { allSkills } from "../data/skills";
import FAQ from "../components/ui/FAQ";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const Home = () => {
  const navigate = useNavigate();
  const firstName = "AAFAQUE".split("");
  const lastName = "NAZIR".split("");

  // Skills filter
  const [activeSkillTab, setActiveSkillTab] = useState("Frontend");
  const skillCategories = ["Frontend", "Backend", "Database", "AI"];
  const filteredSkills = allSkills.filter((s) => s.category === activeSkillTab);

  // Top 3 projects
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="relative z-10 w-full min-h-screen bg-transparent">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION
      ────────────────────────────────────────────────────────────── */}
      <section
        id="home"
        aria-label="Hero — Aafaque Nazir, Web Developer"
        className="relative min-h-[92vh] flex flex-col justify-center text-white overflow-hidden pt-28 pb-12"
      >
        <GlobalBackground />

        {/* Ambient Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-cyan-600/15 rounded-full blur-[140px] opacity-25" />
          <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-cyan-400/10 rounded-full blur-[120px] opacity-20" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center text-left max-w-3xl"
          >
            {/* Title / Name */}
            <div className="relative mb-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.8rem] font-black tracking-tighter text-white leading-[0.9]">
                {/* Mobile */}
                <div className="overflow-hidden flex flex-wrap md:hidden">
                  <span className="inline-block">AAFAQUE</span>
                </div>
                <div className="overflow-hidden flex flex-wrap mt-2 md:hidden">
                  <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-white">
                    NAZIR
                  </span>
                </div>

                {/* Desktop */}
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

            {/* Subtitle */}
            <div className="mb-6 font-mono">
              <SplitText
                type="words"
                delay={0}
                className="text-cyan-400 text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase font-bold"
              >
                WEB DEVELOPER & FRONTEND ENGINEER
              </SplitText>
            </div>

            {/* Normal, honest description */}
            <div className="max-w-2xl mb-8">
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light border-l-2 border-cyan-500/40 pl-4">
                I build fast, responsive websites and modern web applications with clean code, smooth interactions, and thoughtful design.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 flex-nowrap">
              <Link
                to="/contact"
                className="px-3.5 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-cyan-300 text-black font-bold text-[11px] sm:text-xs uppercase tracking-wider rounded-full transition-all duration-300 flex items-center gap-1.5 sm:gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] whitespace-nowrap shrink-0"
              >
                <span>Get in Touch</span>
                <FaArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </Link>

              <button
                onClick={() => document.getElementById("featured-work")?.scrollIntoView({ behavior: "smooth" })}
                className="px-3.5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-cyan-400/40 text-gray-300 hover:text-white text-[11px] sm:text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0"
              >
                <span>View Projects</span>
                <span className="text-cyan-400">↓</span>
              </button>

              <a
                href="https://github.com/Aafaque-Nazir"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub"
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/[0.02] hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:text-white text-gray-400 transition-all flex items-center justify-center shrink-0"
              >
                <FaGithub className="text-base sm:text-lg" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Sleek Glassmorphic Bento Capsule */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="relative rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur-xl p-3 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden">
            {/* Ambient top highlight line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {/* 01. Projects */}
              <div
                onClick={() => document.getElementById("featured-work")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/30 p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 group-hover:text-cyan-400 transition-colors">
                    Portfolio
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/[0.03] text-zinc-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
                    <FaRocket className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                      {projects.length}+
                    </span>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">Projects</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 font-light">
                    Built & deployed
                  </p>
                </div>
              </div>

              {/* 02. Tech Stack */}
              <div className="group relative rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/30 p-4 transition-all duration-300 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 group-hover:text-cyan-400 transition-colors">
                    Tech Stack
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/[0.03] text-zinc-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
                    <SiReact className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg sm:text-xl font-black font-mono text-cyan-400 tracking-tight">
                      React & Next.js
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 font-light">
                    TypeScript · Tailwind CSS
                  </p>
                </div>
              </div>

              {/* 03. Performance */}
              <div className="group relative rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/30 p-4 transition-all duration-300 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 group-hover:text-cyan-400 transition-colors">
                    Performance
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/[0.03] text-zinc-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
                    <FaBolt className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                      &lt;1s
                    </span>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">Fast Load</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 font-light">
                    Quick & responsive on all devices
                  </p>
                </div>
              </div>

              {/* 04. Availability */}
              <Link
                to="/contact"
                className="group relative rounded-xl border border-cyan-500/20 bg-cyan-500/[0.03] hover:bg-cyan-500/[0.08] hover:border-cyan-500/40 p-4 transition-all duration-300 flex flex-col justify-between block cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                    Availability
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/[0.03] text-zinc-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
                    <RiExternalLinkLine className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg sm:text-xl font-black font-mono text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      Open for Work
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 font-light flex items-center justify-between">
                    <span>Freelance & Full-time</span>
                    <span className="text-cyan-400 text-xs font-mono group-hover:translate-x-0.5 transition-transform">→</span>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. FEATURED PROJECTS
      ────────────────────────────────────────────────────────────── */}
      <section id="featured-work" className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mt-2 font-light">
              A selection of web apps and sites I've built, focusing on speed, responsiveness, and clean user experience.
            </p>
          </div>

          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white transition-colors self-start sm:self-end"
          >
            <span>View All ({projects.length}) Projects</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
          </Link>
        </div>

        {/* 3 Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="group relative flex flex-col bg-[#09090b] border border-white/5 hover:border-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] cursor-pointer"
            >
              {/* Media Preview (Edge-to-edge proportional 16:9) */}
              <div className="relative w-full aspect-video sm:h-44 overflow-hidden bg-zinc-950 border-b border-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-light mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[10px] sm:text-xs font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions: Clean Link + Polished Live Demo Button */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <Link
                    to={`/projects/${project.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors group/link"
                  >
                    <span>View Details</span>
                    <FaArrowRight className="text-[10px] text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-mono font-medium transition-all duration-200"
                    >
                      <span>Live Demo</span>
                      <RiExternalLinkLine className="text-xs" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clean banner to view full vault */}
        <div className="p-6 md:p-8 rounded-2xl bg-zinc-950/60 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              Want to see more work?
            </h3>
            <p className="text-xs md:text-sm text-slate-400 mt-1 font-light">
              Explore the complete list of {projects.length} projects including e-commerce, web apps, and landing pages.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider transition-all shrink-0"
          >
            <span>All Projects</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. SKILLS & TECHNOLOGIES
      ────────────────────────────────────────────────────────────── */}
      <section id="tech-stack" className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Skills & Technologies
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 font-light">
            The core tools, languages, and frameworks I work with to build modern web applications.
          </p>

          {/* Clean Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {skillCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveSkillTab(category)}
                className={`min-h-[40px] px-5 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 ${
                  activeSkillTab === category
                    ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    : "bg-white/[0.03] text-gray-400 border border-white/5 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
          <AnimatePresence mode="wait">
            {filteredSkills.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: idx * 0.02 }}
                className="group p-4 rounded-xl bg-[#09090b] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col items-center justify-center gap-2 text-center"
              >
                <div
                  className="w-10 h-10 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-xl"
                  style={{ color: tech.color || "#22d3ee" }}
                >
                  <tech.icon />
                </div>
                <div>
                  <p className="text-xs font-mono font-medium text-white group-hover:text-cyan-300 transition-colors">
                    {tech.name}
                  </p>
                  <span className="text-xs font-mono text-slate-500">
                    {tech.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Simple Link to full skills page */}
        <div className="text-center">
          <Link
            to="/skills"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
          >
            <span>Explore full skills & tooling list →</span>
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. WHAT I DO (SERVICES)
      ────────────────────────────────────────────────────────────── */}
      <section id="services-preview" className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              What I Do
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mt-2 font-light">
              Here is what I can build for your business or project.
            </p>
          </div>

          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white transition-colors self-start sm:self-end"
          >
            <span>View All Services</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
          </Link>
        </div>

        {/* 3 Simple Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div
            onClick={() => navigate("/services", { state: { plan: "Websites & Landing Pages" } })}
            className="p-6 rounded-2xl bg-[#09090b] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between cursor-pointer hover:-translate-y-1"
          >
            <div>
              <div className="text-2xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-white mb-2">Websites</h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed mb-4">
                Clean, modern landing pages and portfolio websites designed to look great, load fast, and be fully responsive on mobile.
              </p>
            </div>
            <Link
              to="/services"
              state={{ plan: "Websites & Landing Pages" }}
              onClick={(e) => e.stopPropagation()}
              className="group/link inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Learn more</span>
              <FaArrowRight className="text-[10px] text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div
            onClick={() => navigate("/services", { state: { plan: "Custom Web Applications" } })}
            className="p-6 rounded-2xl bg-[#09090b] border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex flex-col justify-between cursor-pointer hover:-translate-y-1"
          >
            <div>
              <div className="text-2xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Web Applications</h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed mb-4">
                Custom full-stack web apps, admin dashboards, and portals with databases (PostgreSQL/Supabase) and authentication.
              </p>
            </div>
            <Link
              to="/services"
              state={{ plan: "Custom Web Applications" }}
              onClick={(e) => e.stopPropagation()}
              className="group/link inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Learn more</span>
              <FaArrowRight className="text-[10px] text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div
            onClick={() => navigate("/services", { state: { plan: "Custom Online Stores" } })}
            className="p-6 rounded-2xl bg-[#09090b] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between cursor-pointer hover:-translate-y-1"
          >
            <div>
              <div className="text-2xl mb-4">🛒</div>
              <h3 className="text-xl font-bold text-white mb-2">E-Commerce Stores</h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed mb-4">
                Online storefronts with product browsing, shopping carts, instant search, and smooth checkout flows.
              </p>
            </div>
            <Link
              to="/services"
              state={{ plan: "Custom Online Stores" }}
              onClick={(e) => e.stopPropagation()}
              className="group/link inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Learn more</span>
              <FaArrowRight className="text-[10px] text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. ABOUT ME (GENUINE & CLEAN, NO FAKE TESTIMONIALS)
      ────────────────────────────────────────────────────────────── */}
      <section id="about-teaser" className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              About Me
            </h2>
            <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-4">
              I am a web developer with a strong focus on modern frontend technologies like React, Next.js, and Tailwind CSS. I care deeply about writing clean, maintainable code and crafting interfaces that are fast, accessible, and intuitive.
            </p>
            <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed mb-6">
              Whether building an entire application from scratch or polishing animations and user interactions, I focus on delivering solid, reliable results.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
            >
              <span>Read my full background and approach →</span>
            </Link>
          </div>

          <div className="md:col-span-5 p-6 rounded-2xl bg-[#09090b] border border-white/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-lg">
                AN
              </div>
              <div>
                <p className="text-base font-bold text-white">Aafaque Nazir</p>
                <p className="text-xs font-mono text-slate-400">Web Developer & Frontend Engineer</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span>India</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Focus:</span>
                <span className="text-cyan-400">Frontend & Full-Stack</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Experience:</span>
                <span>Self-Driven Builder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. COMMON QUESTIONS (FAQ)
      ────────────────────────────────────────────────────────────── */}
      <section id="faq-section" className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
        <FAQ />
      </section>

      </div>
  );
};

export default Home;
