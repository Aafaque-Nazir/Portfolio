"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

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
      className={`group relative rounded-[2rem] p-[1px] overflow-hidden transition-all duration-500 isolation-isolate ${className}`}
    >
      {/* Border Glow */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(350px circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 85%)`
          ),
        }}
      />
      <div className="relative h-full bg-zinc-950/40 backdrop-blur-3xl rounded-[1.95rem] border border-white/5 p-8 overflow-hidden">
        {/* Spotlight */}
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.95rem]"
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
                <h3 className="text-xs font-mono text-cyan-500 tracking-[0.3em] uppercase">{title}</h3>
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
    <section id="about" className="relative w-full h-[100svh] min-h-[650px] flex flex-col justify-center items-center px-4 overflow-hidden bg-black py-10">
      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col h-full justify-center">
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Identity */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
               <h2 className="text-6xl lg:text-8xl font-black tracking-tighter text-white mb-6">
                 About <span className="text-cyan-500">Me</span>
               </h2>
            </motion.div>

            <AboutNode className="max-w-xl">
               <p className="text-xl lg:text-2xl text-gray-300 font-light leading-relaxed mb-6">
                  Frontend-First <span className="text-white font-bold">Full Stack Architect</span> with a precision-driven <span className="text-cyan-500 underline decoration-white/20 underline-offset-8">Business Mindset</span>.
               </p>
               <p className="text-sm lg:text-base text-gray-500 leading-relaxed font-light mb-6">
                  I don't just build websites; I engineer high-performance digital solutions that bridge <span className="text-white">Advanced UI aesthetics</span> with complex <span className="text-white">Full-stack logic</span>. 
               </p>
               <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] font-mono text-cyan-500/70 italic">
                    "Every pixel is a decision. Every line of code is an asset."
                  </p>
               </div>
            </AboutNode>
          </div>

          {/* Right: Philosophy */}
          <div className="flex flex-col gap-6">
             {/* Bento Stats */}
             <div className="grid grid-cols-2 gap-4">
                <AboutNode title="Requests">
                   <span className="text-4xl font-black text-white tracking-tighter">1M+</span>
                   <p className="text-[10px] font-mono text-cyan-500 uppercase mt-1">Uptime Guarded</p>
                </AboutNode>
                <AboutNode title="Stability">
                   <span className="text-4xl font-black text-white tracking-tighter">100%</span>
                   <p className="text-[10px] font-mono text-cyan-500 uppercase mt-1">Type-Safe Logic</p>
                </AboutNode>
             </div>

             {/* Philosophy Card */}
             <AboutNode title="Product Philosophy">
                <div className="space-y-6">
                   {[
                     { 
                       label: "Zero Genericism", 
                       desc: "Refined, custom components engineered from scratch. No common UI presets.",
                       icon: "M13 10V3L4 14h7v7l9-11h-7z"
                     },
                     { 
                       label: "Security First", 
                       desc: "Hardened data layers and secure authentication systems built into every core.",
                       icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                     },
                     { 
                       label: "Obsessive Performance", 
                       desc: "Sub-second benchmarks as a standard requirement, not a visual feature.",
                       icon: "M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4z"
                     }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4 group/item">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 group-hover/item:bg-cyan-500 group-hover/item:text-black transition-all">
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                           </svg>
                        </div>
                        <div>
                           <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1 group-hover/item:text-cyan-400 transition-colors">{item.label}</h4>
                           <p className="text-[11px] text-gray-500 leading-relaxed font-light">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </AboutNode>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
