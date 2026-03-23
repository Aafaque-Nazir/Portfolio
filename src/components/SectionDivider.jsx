"use client";
import { motion } from "framer-motion";

const SectionDivider = () => {
  return (
    <div className="relative w-full h-40 flex flex-col items-center justify-center overflow-hidden pointer-events-none py-12">
      {/* 🌟 Background Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-32 bg-cyan-500/10 blur-[50px] rounded-full" />

      {/* 📏 Horizon Lines */}
      <div className="absolute w-[85%] max-w-5xl flex items-center justify-between">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-[1.5px] flex-grow bg-gradient-to-r from-transparent via-cyan-500/50 to-cyan-400/80 origin-right rounded-full shadow-[0_0_10px_#22d3ee]"
        />
        
        {/* ✨ The Quantum Orbit Core */}
        <div className="relative z-10 mx-6 flex items-center justify-center w-24 h-24" style={{ perspective: "1000px" }}>
          
          {/* Central Energy Orb */}
          <motion.div
            animate={{ scale: [0.9, 1.2, 0.9], filter: ["hue-rotate(0deg)", "hue-rotate(45deg)", "hue-rotate(0deg)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-5 h-5 rounded-full bg-cyan-300 shadow-[0_0_20px_#67e8f9,inset_0_0_10px_#fff]"
          />

          {/* Orbiting Ring 1 (Horizontal tilt) */}
          <motion.div
            animate={{ rotateZ: [0, 360], rotateY: 70, rotateX: 60 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute w-14 h-14 border-[1.5px] border-cyan-400/70 rounded-full"
            style={{ transformStyle: "preserve-3d" }}
          />

          {/* Orbiting Ring 2 (Vertical tilt) */}
          <motion.div
            animate={{ rotateZ: [360, 0], rotateX: 70, rotateY: 60 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-20 h-20 border-[1px] border-cyan-300/40 rounded-full"
            style={{ transformStyle: "preserve-3d" }}
          />
          
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="h-[1.5px] flex-grow bg-gradient-to-l from-transparent via-cyan-500/50 to-cyan-400/80 origin-left rounded-full shadow-[0_0_10px_#22d3ee]"
        />
      </div>
      
      {/* 💫 Ambient Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.9, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 bg-cyan-200 rounded-full shadow-[0_0_8px_#fff]"
          style={{
             left: `calc(50% + ${(i % 2 === 0 ? 1 : -1) * (30 + i * 20)}px)`,
             top: `calc(50% + ${(i % 2 === 0 ? -1 : 1) * 15}px)`
          }}
        />
      ))}
    </div>
  );
};

export default SectionDivider;
