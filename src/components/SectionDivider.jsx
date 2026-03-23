"use client";
import { motion } from "framer-motion";

const SectionDivider = () => {
  return (
    <div className="relative w-full h-32 flex flex-col items-center justify-center overflow-hidden pointer-events-none py-12">
      {/* 📏 Base Track Lines */}
      <div className="absolute w-[80%] max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-cyan-900/40 to-transparent" />

      {/* ✨ The Glass Capsule */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Animated Aurora Glow behind the capsule */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-24 h-10 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-xl rounded-full"
        />

        {/* The Capsule Outline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-16 h-8 rounded-full bg-slate-900/40 backdrop-blur-md border border-cyan-500/20 flex items-center justify-center shadow-[inset_0_0_15px_rgba(6,182,212,0.1),0_0_10px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Inner Glare / Reflection effect */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
          
          {/* Moving core dot inside the capsule */}
          <motion.div
            animate={{
              x: [-12, 12, -12],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionDivider;
