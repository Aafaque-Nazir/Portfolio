"use client";
import { motion } from "framer-motion";

const SectionDivider = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center overflow-hidden pointer-events-none py-8">
      {/* 💥 Shockwave Impact Ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0, borderWidth: "4px" }}
        whileInView={{ scale: 1.5, opacity: 0, borderWidth: "0px" }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        className="absolute z-0 w-24 h-6 border-cyan-400/50 rounded-full"
      />

      {/* ⚡ Left High-Speed Beam */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        whileInView={{ x: "0%", opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="absolute left-0 w-[50%] h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-cyan-400 shadow-[0_0_20px_#06b6d4]"
      />

      {/* ⚡ Right High-Speed Beam */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        whileInView={{ x: "0%", opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="absolute right-0 w-[50%] h-[2px] bg-gradient-to-l from-transparent via-teal-500 to-cyan-400 shadow-[0_0_20px_#14b8a6]"
      />

      {/* 💠 Central Core Reactor */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "backOut" }}
          className="w-8 h-8 bg-slate-950 border-2 border-cyan-400 rotate-45 flex items-center justify-center shadow-[0_0_30px_#06b6d4]"
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </motion.div>

        {/* Floating Particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 0, y: 0 }}
            whileInView={{
              opacity: [0, 1, 0],
              x: (i % 2 === 0 ? 1 : -1) * 40,
              y: (i < 2 ? -1 : 1) * 40,
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-200 rounded-full"
          />
        ))}
      </div>

      {/* 📝 Technical Label */}
      <div className="absolute bottom-2 text-[10px] text-cyan-500/50 font-mono tracking-[0.3em] uppercase">
        System Partition // Active
      </div>
    </div>
  );
};

export default SectionDivider;
