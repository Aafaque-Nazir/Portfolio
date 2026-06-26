"use client";
import { motion } from "framer-motion";

const SectionDivider = () => {
  return (
    <div className="relative w-full h-32 flex flex-col items-center justify-center overflow-hidden pointer-events-none bg-black">
      
      {/* Container for the line and glowing center */}
      <div className="absolute w-[85%] max-w-6xl flex items-center justify-center relative">
        
        {/* Left Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-cyan-900/50 to-cyan-500/80 origin-right"
        />

        {/* Central Core (Noticeable but sleek) */}
        <div className="relative flex items-center justify-center px-4">
          
          {/* Large diffuse glow */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-32 h-8 bg-cyan-500/30 blur-2xl rounded-full"
          />

          {/* Central Bright Spot */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="relative z-10 w-4 h-1 bg-cyan-300 shadow-[0_0_20px_#22d3ee,0_0_40px_#fff] rounded-full"
          />

          {/* Rotating minimal brackets */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-12 h-12 border-[0.5px] border-dashed border-cyan-500/40 rounded-full"
          />

          {/* Minimal pulsing rings */}
          <motion.div
            animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-6 h-6 border-[1px] border-cyan-400 rounded-full"
          />
        </div>

        {/* Right Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-[1px] flex-grow bg-gradient-to-l from-transparent via-cyan-900/50 to-cyan-500/80 origin-left"
        />
        
        {/* Scanning Light Particle */}
        <motion.div
          animate={{ left: ["0%", "100%", "0%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute w-16 h-[2px] bg-white shadow-[0_0_20px_#fff,0_0_40px_#22d3ee,0_0_60px_#22d3ee] rounded-full z-20"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        />
      </div>
      
    </div>
  );
};

export default SectionDivider;
