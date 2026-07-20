"use client";

import { motion } from "framer-motion";
import GlobalCTA from "../components/ui/GlobalCTA";
import { TechCard } from "../components/ui/tech-card";
import { allSkills } from "../data/skills";
import { FaShieldAlt, FaBolt, FaCode, FaSearch } from "react-icons/fa";

// Categories mapping
const categories = [
  {
    title: "Frontend & Interface Engineering",
    description: "Crafting interactive, highly optimized, and responsive user interfaces using modern frameworks, styling libraries, and fluid hardware-accelerated animations.",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "GSAP", "Redux", "Zustand"]
  },
  {
    title: "Backend & Cloud Infrastructure",
    description: "Architecting secure server-side logic, real-time server connections, custom API endpoints, automated hosting deployments, and distributed version control.",
    skills: ["Node.js", "Express.js", "Supabase", "Firebase", "Appwrite", "Vercel", "Git"]
  },
  {
    title: "Databases & Tooling",
    description: "Designing structured schema patterns, managing reliable relational/NoSQL databases, and ensuring robust data integrity.",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Turso", "NoSQL", "Convex", "Prisma"]
  },
  {
    title: "AI Systems & Workflows",
    description: "Integrating advanced Large Language Model (LLM) APIs, leveraging AI-assisted coding, and building automated intelligent pipelines.",
    skills: ["OpenAI", "Gemini", "Claude"]
  }
];

const principles = [
  {
    icon: FaCode,
    title: "Clean Architecture",
    description: "Writing strictly-typed, SOLID, modular, and DRY codebases that scale cleanly."
  },
  {
    icon: FaBolt,
    title: "Buttery Smooth UX",
    description: "Targeting 60fps animations and rendering performance for lag-free scrolling."
  },
  {
    icon: FaSearch,
    title: "SEO & Performance",
    description: "Optimizing bundle sizes, meta-tags, and semantic HTML for Google search visibility."
  },
  {
    icon: FaShieldAlt,
    title: "Security Baseline",
    description: "Securing APIs, validating schemas with Zod, and configuring httpOnly auth."
  }
];

const SkillCategoryCard = ({ title, description, skillsList, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#09090b] border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-stretch hover:border-white/10 transition-colors duration-300"
    >
      {/* Left Column: Title & Description */}
      <div className="flex-1 flex flex-col justify-center text-left">
        <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-[0.25em] font-semibold mb-2 block">
          Category 0{index + 1}
        </span>
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-3">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light max-w-lg">
          {description}
        </p>
      </div>

      {/* Right Column: Interactive Tech Cards Group */}
      <div className="flex-1 flex flex-wrap items-center justify-start md:justify-end gap-3.5 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.02] min-h-[140px]">
        {skillsList.map((tech, idx) => (
          <TechCard key={tech.name} tech={tech} index={idx} />
        ))}
      </div>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="relative w-full min-h-[100svh] flex flex-col justify-start bg-black text-white pt-24 lg:pt-32 pb-20">
      
      {/* Background Grid & Radial Glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-cyan-500/[0.02] blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase mb-4"
          >
            My Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-mono text-xs md:text-sm tracking-widest uppercase"
          >
            Technologies I use to build premium digital products
          </motion.p>
        </div>

        {/* Categories Stack */}
        <div className="w-full flex flex-col gap-6 mb-20">
          {categories.map((cat, idx) => {
            // Filter allSkills objects that match the names in cat.skills list
            const matchedSkills = allSkills.filter(s => cat.skills.includes(s.name));
            return (
              <SkillCategoryCard
                key={idx}
                index={idx}
                title={cat.title}
                description={cat.description}
                skillsList={matchedSkills}
              />
            );
          })}
        </div>

        {/* Principles Section */}
        <div className="w-full text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-3"
          >
            Engineering Standards
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto"
          >
            Coding guidelines followed on every single project
          </motion.p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {principles.map((pr, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#09090b] border border-white/5 rounded-2xl p-6 text-left hover:border-cyan-500/20 transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <pr.icon className="text-sm" aria-hidden="true" />
              </div>
              <h4 className="text-sm font-bold text-white uppercase mb-2 tracking-wide">{pr.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">{pr.description}</p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Global Call to Action */}
      <GlobalCTA />
    </section>
  );
}
