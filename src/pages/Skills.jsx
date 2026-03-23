"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss, SiFramer, SiGit,
  SiTypescript, SiNodedotjs, SiSupabase, SiPostgresql, SiMysql,
  SiMongodb, SiFirebase, SiGreensock, SiRedux, SiVercel, SiOpenai
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { SkillDock } from "../components/ui/skill-dock";
import { TechCard } from "../components/ui/tech-card";

const GeminiIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.97 0c0 9.87-2.9 12.18-11.97 12 9.07-.18 11.97 2.13 11.97 12 0-9.87 2.9-12.18 11.97-12-9.07.18-11.97-2.13-11.97-12z" fill="#8E75B2" />
  </svg>
);

const AntigravityIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" fill="#FFD700" />
  </svg>
);

const allSkills = [
  { icon: SiReact, name: "React", color: "#61DAFB", category: "Frontend" },
  { icon: SiNextdotjs, name: "Next.js", color: "#ffffff", category: "Frontend" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6", category: "Frontend" },
  { icon: SiJavascript, name: "JavaScript", color: "#F0DB4F", category: "Frontend" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4", category: "Frontend" },
  { icon: SiFramer, name: "Framer Motion", color: "#ffffff", category: "Frontend" },
  { icon: SiGreensock, name: "GSAP", color: "#88CE02", category: "Frontend" },
  { icon: SiRedux, name: "Redux", color: "#764ABC", category: "Frontend" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933", category: "Backend" },
  { icon: SiSupabase, name: "Supabase", color: "#3ECF8E", category: "Backend" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28", category: "Backend" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1", category: "Database" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248", category: "Database" },
  { icon: SiMysql, name: "MySQL", color: "#4479A1", category: "Database" },
  { icon: SiVercel, name: "Vercel", color: "#ffffff", category: "DevOps" },
  { icon: SiGit, name: "Git", color: "#F05032", category: "DevOps" },
  { icon: VscVscode, name: "VS Code", color: "#007ACC", category: "Tools" },
  { icon: SiOpenai, name: "OpenAI", color: "#10a37f", category: "AI" },
  { icon: GeminiIcon, name: "Gemini", color: "#8E75B2", category: "AI" },
  { icon: AntigravityIcon, name: "Antigravity", color: "#FFD700", category: "AI" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All"
    ? allSkills
    : allSkills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="relative h-[100svh] min-h-[500px] flex flex-col items-center bg-black text-white shrink-0 overflow-hidden select-none">
      
      {/* Hide Scrollbar Globally for this section */}
      <style jsx global>{`
        #skills::-webkit-scrollbar { display: none; }
        #skills { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Neural Hub Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-cyan-500/[0.01] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 z-10 flex flex-col items-center justify-center h-full max-h-screen pt-4 pb-24 lg:pb-28">
        
        {/* Ultra-Compressed Header */}
        <div className="text-center mb-6 lg:mb-8 shrink-0">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl lg:text-5xl font-black text-white tracking-tighter uppercase"
          >
            Tech <span className="text-cyan-500">Arsenal</span>
          </motion.h2>
        </div>

        {/* Dynamic Skill Grid: High Density / Zero Scroll */}
        <div className="w-full max-w-5xl flex items-center justify-center overflow-visible">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-wrap justify-center gap-2.5 md:gap-6 lg:gap-8 max-h-[55vh] md:max-h-full overflow-visible"
          >
            {filteredSkills.map((tech, index) => (
              <TechCard key={tech.name} tech={tech} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Floating Dock Layer: Responsive spacing */}
        <div className="absolute bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none h-fit px-4">
          <div className="pointer-events-auto bg-black/40 backdrop-blur-3xl border border-white/5 rounded-2xl p-0.5 shadow-2xl scale-90 lg:scale-100">
             <SkillDock activeCategory={activeCategory} setCategory={setActiveCategory} />
          </div>
        </div>
      </div>
    </section>
  );
}
