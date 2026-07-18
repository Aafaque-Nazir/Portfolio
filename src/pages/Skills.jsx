"use client";

import { motion } from "framer-motion";
import GlobalCTA from "../components/ui/GlobalCTA";
import CodeShowcase from "../components/ui/CodeShowcase";
import { TechCard } from "../components/ui/tech-card";
import { allSkills } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="relative w-full min-h-[100svh] flex flex-col justify-center bg-black text-white shrink-0 overflow-hidden select-none pt-24 lg:pt-32 pb-20">

      {/* Dynamic Background Watermark (Reduced Spacy feel) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none overflow-hidden">
        <span className="text-[25vh] font-black tracking-tighter uppercase whitespace-nowrap rotate-90 lg:rotate-0">
          SKILLS
        </span>
      </div>

      {/* Hide Scrollbar Globally */}
      <style dangerouslySetInnerHTML={{
        __html: `
        #skills::-webkit-scrollbar { display: none; }
        #skills { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Neural Hub Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-cyan-500/[0.01] blur-[100px] pointer-events-none" />

      {/* Header: Tightened vertical space */}
      <div className="relative z-20 w-full pt-8 lg:pt-12 pb-6 lg:pb-4 flex flex-col items-center shrink-0">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase mb-4"
        >
          Skills
        </motion.h2>
      </div>

      {/* Grid: Occupies more center space */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center justify-center">
        <motion.div
          key="all-skills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:flex lg:flex-wrap justify-items-center justify-center gap-4 md:gap-6 lg:gap-8 w-full h-fit py-2 pb-12"
        >
          {allSkills.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </motion.div>
      </div>

      {/* How I Code Section */}
      <CodeShowcase />

      {/* Global Call to Action */}
      <GlobalCTA />
    </section>
  );
}
