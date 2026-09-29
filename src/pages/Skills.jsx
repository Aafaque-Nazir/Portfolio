"use client";

import { motion } from "framer-motion";
import { TechCard } from "../components/ui/tech-card";
import { allSkills } from "../data/skills";
import { FaShieldAlt, FaBolt, FaCode, FaSearch } from "react-icons/fa";

// Categories mapping
const categories = [
  {
    title: "Frontend Development",
    description: "Building responsive, fast, and interactive user interfaces using modern frameworks, clean CSS, and smooth animations.",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "GSAP", "Redux", "Zustand"]
  },
  {
    title: "Backend & APIs",
    description: "Writing server-side code, creating REST & real-time APIs, setting up authentication, and deploying applications.",
    skills: ["Node.js", "Express.js", "Supabase", "Firebase", "Appwrite", "Vercel", "Git"]
  },
  {
    title: "Databases",
    description: "Designing database schemas, managing relational and NoSQL data, and ensuring fast, reliable queries.",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Turso", "NoSQL", "Convex", "Prisma"]
  },
  {
    title: "AI Integrations",
    description: "Integrating modern AI APIs (OpenAI, Gemini, Claude) for chat features, intelligent search, and automations.",
    skills: ["OpenAI", "Gemini", "Claude"]
  }
];

const principles = [
  {
    icon: FaCode,
    title: "Clean Code",
    description: "Writing modular, well-structured, and readable code that is easy to maintain and extend."
  },
  {
    icon: FaBolt,
    title: "Fast Performance",
    description: "Optimizing bundle sizes, assets, and render cycles for quick loading and smooth scrolling."
  },
  {
    icon: FaSearch,
    title: "SEO & Accessibility",
    description: "Using semantic HTML, proper meta tags, and structured data for search engine visibility."
  },
  {
    icon: FaShieldAlt,
    title: "Security Mindset",
    description: "Validating user input, securing authentication sessions, and protecting backend routes."
  }
];

const SkillCategoryCard = ({ title, description, skillsList, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#09090b] border border-white/5 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row gap-5 md:gap-8 items-stretch hover:border-white/10 transition-colors duration-300"
    >
      {/* Left Column: Title & Description */}
      <div className="flex-1 flex flex-col justify-center text-left">
        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
          {title}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed font-light max-w-lg">
          {description}
        </p>
      </div>

      {/* Right Column: Interactive Tech Cards Group */}
      <div className="flex-1 flex flex-wrap items-center justify-start md:justify-end gap-3 p-4 sm:p-5 rounded-2xl bg-white/[0.01] border border-white/[0.02]">
        {skillsList.map((tech, idx) => (
          <TechCard key={tech.name} tech={tech} index={idx} />
        ))}
      </div>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="relative w-full min-h-[100svh] flex flex-col justify-start bg-black text-white pt-28 sm:pt-32 pb-16">
      
      {/* Background Grid & Radial Glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-cyan-500/[0.02] blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Header Section: Unified Page H1 */}
        <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-3"
          >
            My Stack
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed"
          >
            Technologies and tools I use to build fast, scalable, and responsive web applications.
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
        <div className="w-full text-center mb-10 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2"
          >
            Engineering Standards
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed"
          >
            Coding guidelines followed on every single project.
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
              <h3 className="text-sm sm:text-base font-bold text-white uppercase mb-1.5 tracking-wide">{pr.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">{pr.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
