"use client";
import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import FAQ from "../components/ui/FAQ";

const AboutNode = ({ children, title, className = "" }) => {
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
      className={`group relative rounded-2xl p-[1px] overflow-hidden transition-all duration-300 isolation-isolate border border-white/10 hover:border-cyan-500/30 ${className}`}
    >
      {/* Border Glow */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(350px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.1), transparent 85%)`
          ),
        }}
      />
      <div className="relative h-full bg-[#09090b] rounded-[15px] p-6 sm:p-8 overflow-hidden">
        {/* Spotlight */}
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[15px]"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.02), transparent 80%)`
            ),
          }}
        />
        <div className="relative z-10">
          {title && (
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-cyan-500 rounded-full" />
              <h2 className="text-xs font-mono text-cyan-400 tracking-[0.25em] uppercase font-bold">{title}</h2>
            </div>
          )}
          {children}
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" aria-label="About Aafaque Nazir — Full-Stack Web Developer & Creative Engineer" className="relative w-full min-h-[100svh] flex flex-col justify-start items-center bg-black pt-28 sm:pt-32 pb-16">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-start">

        {/* Header Section: Unified Page H1 */}
        <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-3"
          >
            About Me
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed"
          >
            My background, engineering philosophy, and how I approach building modern web experiences.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-16">
          {/* Left: Identity & Quality Metrics */}
          <div className="flex flex-col gap-6 h-full justify-between">
            <AboutNode title="Background & Focus" className="flex-1">
              <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed mb-4">
                <span className="text-white font-bold">Full-Stack Web Developer</span> focused on <span className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-8">clean code & modern design</span>.
              </p>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light mb-4">
                I build fast, secure, and responsive web applications from the ground up using modern tools like <span className="text-white">React, Next.js, and Node.js</span>.
              </p>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light mb-6">
                I bridge engineering and design — crafting responsive interfaces with clean code and reliable backend systems.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-xs font-mono text-cyan-400/80 italic">
                  "Every detail matters — from clean code to great user experience."
                </p>
              </div>
            </AboutNode>

            {/* Quality Standards & Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 px-5 bg-[#09090b] border border-white/10 hover:border-cyan-500/30 rounded-2xl relative overflow-hidden group transition-all duration-300">
              {/* Animated Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none opacity-20" />
              
              <div className="relative z-10 flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tighter">100<span className="text-cyan-400 text-xs sm:text-sm">%</span></span>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">Responsive</span>
              </div>
              
              <div className="relative z-10 flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tighter">&lt;1s</span>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">Fast Load</span>
              </div>
              
              <div className="relative z-10 flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tighter">Clean</span>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">Code Quality</span>
              </div>
              
              <div className="relative z-10 flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-cyan-400 font-mono tracking-tighter">11<span className="text-white text-xs sm:text-sm">+</span></span>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">Projects</span>
              </div>
            </div>
          </div>

          {/* Right: Core Principles */}
          <div className="flex flex-col h-full">
            <AboutNode title="Core Principles" className="w-full h-full flex flex-col justify-between">
              <div className="space-y-6">
                {[
                  {
                    label: "Full-Stack Development",
                    desc: "Connecting frontend interfaces smoothly with secure backend databases, auth, and APIs.",
                    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  },
                  {
                    label: "Responsive Design",
                    desc: "Building layouts that adapt fluidly across mobile phones, tablets, and desktop screens.",
                    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  },
                  {
                    label: "Performance & UX",
                    desc: "Focusing on fast load times, smooth interactions, and clean component structure.",
                    icon: "M13 10V3L4 14h7v7l9-11h-7z"
                  },
                  {
                    label: "Clean & Maintainable Code",
                    desc: "Writing modular, scalable, and type-safe code designed for long-term maintainability.",
                    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group/item">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover/item:bg-cyan-500 group-hover/item:text-black transition-all shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-1 group-hover/item:text-cyan-400 transition-colors">{item.label}</h3>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AboutNode>
          </div>
        </div>

        {/* FAQ Section cleanly anchored inside max-w-6xl */}
        <div className="w-full border-t border-white/5 pt-12">
          <FAQ />
        </div>

      </div>
    </section>
  );
};

export default About;
