"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss, SiFramer, SiGit,
  SiTypescript, SiNodedotjs, SiSupabase, SiPostgresql, SiMysql,
  SiMongodb, SiFirebase, SiGreensock, SiRedux, SiVercel, SiDocker,
  SiFigma, SiOpenai
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { SkillDock } from "../components/ui/skill-dock";
import { TechCard } from "../components/ui/tech-card";

const GeminiIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.97 0c0 9.87-2.9 12.18-11.97 12 9.07-.18 11.97 2.13 11.97 12 0-9.87 2.9-12.18 11.97-12-9.07.18-11.97-2.13-11.97-12z"
      fill="#8E75B2"
    />
  </svg>
);

const AntigravityIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path
      d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"
      fill="#FFD700"
    />
  </svg>
);

const allSkills = [
  // --- Frontend Core ---
  { icon: SiReact, name: "React", color: "#61DAFB", category: "Frontend" },
  { icon: SiNextdotjs, name: "Next.js", color: "#ffffff", category: "Frontend" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6", category: "Frontend" },
  { icon: SiJavascript, name: "JavaScript", color: "#F0DB4F", category: "Frontend" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4", category: "Frontend" },
  { icon: SiFramer, name: "Framer Motion", color: "#0055FF", category: "Frontend" },
  { icon: SiGreensock, name: "GSAP", color: "#88CE02", category: "Frontend" },
  { icon: SiRedux, name: "Redux", color: "#764ABC", category: "Frontend" },

  // --- Backend ---
  { icon: SiNodedotjs, name: "Node.js", color: "#339933", category: "Backend" },
  { icon: SiSupabase, name: "Supabase", color: "#3ECF8E", category: "Backend" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28", category: "Backend" },

  // --- Database ---
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1", category: "Database" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248", category: "Database" },
  { icon: SiMysql, name: "MySQL", color: "#4479A1", category: "Database" },

  // --- DevOps ---
  { icon: SiDocker, name: "Docker", color: "#2496ED", category: "DevOps" },
  { icon: SiVercel, name: "Vercel", color: "#ffffff", category: "DevOps" },
  { icon: SiGit, name: "Git", color: "#F05032", category: "DevOps" },

  // --- Tools ---
  { icon: SiFigma, name: "Figma", color: "#F24E1E", category: "Tools" },
  { icon: VscVscode, name: "VS Code", color: "#007ACC", category: "Tools" },

  // --- AI ---
  { icon: SiOpenai, name: "OpenAI", color: "#412991", category: "AI" },
  { icon: GeminiIcon, name: "Gemini", color: "#8E75B2", category: "AI" },
  { icon: AntigravityIcon, name: "Antigravity", color: "#FFD700", category: "AI" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All"
    ? allSkills
    : allSkills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="relative h-[110vh] min-h-[800px] flex flex-col justify-center items-center overflow-hidden bg-black text-white">

      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Radial Gradient for Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />


      <div className="container mx-auto px-4 z-10 flex flex-col items-center h-full justify-center">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-4 uppercase tracking-tighter"
          >
            Tech Arsenal
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            My preferred weapons of choice for building scalable apps.
          </p>
        </div>

        {/* Skill Holographic Grid */}
        <div className="w-full max-w-6xl mb-12 min-h-[300px]">
          <motion.div
            layout
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((tech, index) => (
                <TechCard key={tech.name} tech={tech} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Floating Interactions Dock */}
        <div className="absolute bottom-12 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <SkillDock activeCategory={activeCategory} setCategory={setActiveCategory} />
          </div>
        </div>

      </div>
    </section>
  );
}
