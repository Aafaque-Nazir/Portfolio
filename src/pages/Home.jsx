import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Globe,
  Layers,
  ShoppingCart,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Zap,
  FolderGit2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import GlobalBackground from "../components/GlobalBackground";
import { SplitText } from "../components/ui/SplitText";
import { projects } from "../data/projects";
import FAQ from "../components/ui/FAQ";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const Home = () => {
  const navigate = useNavigate();

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
        className="relative min-h-[85vh] flex flex-col justify-center text-white overflow-hidden pt-24 pb-8 sm:pt-28 sm:pb-10"
      >
        <GlobalBackground />

        {/* Ambient Subtle Radial Spotlight */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center text-left max-w-3xl"
          >
            {/* Title / Name */}
            <div className="relative mb-3">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-white leading-[0.9]">
                <div className="overflow-hidden flex flex-wrap">
                  <span className="inline-block text-white">AAFAQUE</span>
                </div>
                <div className="overflow-hidden flex flex-wrap mt-1.5">
                  <span className="inline-block bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    NAZIR
                  </span>
                </div>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="mb-5 font-mono">
              <SplitText
                type="words"
                delay={0}
                className="text-zinc-400 text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase font-mono font-medium"
              >
                WEB DEVELOPER &amp; FRONTEND ENGINEER
              </SplitText>
            </div>

            {/* Normal, honest description */}
            <div className="max-w-2xl mb-6">
              <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal border-l border-zinc-700 pl-4">
                I build fast, responsive websites and modern web applications with clean code, smooth interactions, and thoughtful design.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 flex-nowrap">
              <Link
                to="/contact"
                className="px-4 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-zinc-200 text-black font-semibold text-xs uppercase tracking-wider rounded-full transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 active:scale-95"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => document.getElementById("featured-work")?.scrollIntoView({ behavior: "smooth" })}
                className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 text-zinc-300 hover:text-white text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 active:scale-95"
              >
                <span>View Projects</span>
                <span className="text-zinc-400">↓</span>
              </button>

              <a
                href="https://github.com/Aafaque-Nazir"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 text-zinc-400 hover:text-white transition-all flex items-center justify-center shrink-0 active:scale-95"
              >
                <FaGithub className="text-base sm:text-lg" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Sleek Obsidian Bento Capsule */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
          <div className="relative rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl p-3 sm:p-4 shadow-[0_16px_40px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Ambient top highlight line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {/* 01. Projects */}
              <div
                onClick={() => document.getElementById("featured-work")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 p-3.5 sm:p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    Portfolio
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/[0.04] text-zinc-400 group-hover:text-white transition-colors">
                    <FolderGit2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                      {projects.length}+
                    </span>
                    <span className="text-xs font-mono text-zinc-400 font-medium">Projects</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5 font-light">
                    Built &amp; deployed
                  </p>
                </div>
              </div>

              {/* 02. Tech Stack */}
              <div className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 p-3.5 sm:p-4 transition-all duration-200 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    Core Stack
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/[0.04] text-zinc-400 group-hover:text-white transition-colors">
                    <Code2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg sm:text-xl font-bold font-mono text-zinc-100 tracking-tight">
                      React &amp; Next.js
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5 font-light">
                    TypeScript · Tailwind CSS
                  </p>
                </div>
              </div>

              {/* 03. Performance */}
              <div className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 p-3.5 sm:p-4 transition-all duration-200 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    Performance
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/[0.04] text-zinc-400 group-hover:text-white transition-colors">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                      &lt;1s
                    </span>
                    <span className="text-xs font-mono text-zinc-400 font-medium">Fast Load</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5 font-light">
                    Optimized for desktop and mobile
                  </p>
                </div>
              </div>

              {/* 04. Availability */}
              <Link
                to="/contact"
                className="group relative rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 p-3.5 sm:p-4 transition-all duration-200 flex flex-col justify-between block cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                    Availability
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/[0.04] text-zinc-400 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg sm:text-xl font-bold font-mono text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                      Open for Work
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5 font-light flex items-center justify-between">
                    <span>Freelance &amp; Contract</span>
                    <span className="text-zinc-400 text-xs font-mono group-hover:translate-x-0.5 transition-transform">→</span>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. ABOUT ME
      ────────────────────────────────────────────────────────────── */}
      <section id="about-teaser" className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="md:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
              About Me
            </h2>
            <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed mb-3">
              I am a web developer with a strong focus on modern frontend technologies like React, Next.js, and Tailwind CSS. I care deeply about writing clean, maintainable code and crafting interfaces that are fast, accessible, and intuitive.
            </p>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed mb-4">
              Whether building an entire application from scratch or polishing animations and user interactions, I focus on delivering solid, reliable results.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <span>Read my full background and approach →</span>
            </Link>
          </div>

          <div className="md:col-span-5 p-5 sm:p-6 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-200 font-bold text-base font-mono">
                AN
              </div>
              <div>
                <p className="text-base font-bold text-white">Aafaque Nazir</p>
                <p className="text-xs font-mono text-zinc-400">Web Developer &amp; Frontend Engineer</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs font-mono text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-500">Location:</span>
                <span>India</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Focus:</span>
                <span className="text-zinc-200 font-medium">Frontend &amp; Full-Stack</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Experience:</span>
                <span>Self-Driven Builder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. FEATURED PROJECTS
      ────────────────────────────────────────────────────────────── */}
      <section id="featured-work" className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Featured Projects
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl mt-1.5 font-light">
              A selection of web apps and sites I've built, focusing on speed, responsiveness, and clean user experience.
            </p>
          </div>

          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors self-start sm:self-end"
          >
            <span>View All ({projects.length}) Projects</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="group relative flex flex-col bg-zinc-950/80 border border-white/10 hover:border-white/25 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] cursor-pointer"
            >
              {/* Media Preview (Proportional 16:9) */}
              <div className="relative w-full aspect-video overflow-hidden bg-zinc-950 border-b border-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 mt-3.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-[10px] sm:text-xs font-mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between gap-3">
                  <Link
                    to={`/projects/${project.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors group/link"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3 text-zinc-400 group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
                  </Link>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white text-xs font-mono font-medium transition-all"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clean banner to view full vault */}
        <div className="p-5 md:p-6 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Want to see more work?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 font-light">
              Explore the complete list of {projects.length} projects including e-commerce, web apps, and landing pages.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs uppercase tracking-wider transition-all shrink-0 active:scale-95"
          >
            <span>All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. WHAT I DO (SERVICES)
      ────────────────────────────────────────────────────────────── */}
      <section id="services-preview" className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              What I Do
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl mt-1.5 font-light">
              Here is what I can build for your business or project.
            </p>
          </div>

          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors self-start sm:self-end"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Simple Service Cards with Crisp Vector Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
          <div
            onClick={() => navigate("/services", { state: { plan: "Websites" } })}
            className="p-5 sm:p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.6)]"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 mb-4">
                <Globe className="w-4 h-4 text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Websites</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-4">
                Clean, modern landing pages and portfolio websites designed to look sharp, load fast, and be fully responsive on mobile.
              </p>
            </div>
            <Link
              to="/services"
              state={{ plan: "Websites" }}
              onClick={(e) => e.stopPropagation()}
              className="group/link inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3 h-3 text-zinc-400 group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
            </Link>
          </div>

          <div
            onClick={() => navigate("/services", { state: { plan: "Custom Web Applications" } })}
            className="p-5 sm:p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.6)]"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 mb-4">
                <Layers className="w-4 h-4 text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Web Applications</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-4">
                Custom full-stack web apps, admin dashboards, and client portals with relational databases and authentication.
              </p>
            </div>
            <Link
              to="/services"
              state={{ plan: "Custom Web Applications" }}
              onClick={(e) => e.stopPropagation()}
              className="group/link inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3 h-3 text-zinc-400 group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
            </Link>
          </div>

          <div
            onClick={() => navigate("/services", { state: { plan: "Custom Online Stores" } })}
            className="p-5 sm:p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.6)]"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 mb-4">
                <ShoppingCart className="w-4 h-4 text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">E-Commerce Stores</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-4">
                Online storefronts with catalog browsing, shopping carts, instant search, and smooth checkout flows.
              </p>
            </div>
            <Link
              to="/services"
              state={{ plan: "Custom Online Stores" }}
              onClick={(e) => e.stopPropagation()}
              className="group/link inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3 h-3 text-zinc-400 group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. COMMON QUESTIONS (FAQ)
      ────────────────────────────────────────────────────────────── */}
      <section id="faq-section" className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-t border-white/5">
        <FAQ />
      </section>

    </div>
  );
};

export default Home;
