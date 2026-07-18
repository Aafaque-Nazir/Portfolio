import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const GlobalCTA = () => {
  return (
    <div className="relative py-16 bg-transparent overflow-hidden">
      {/* Subtle blend glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/[0.04] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.25em] font-semibold mb-3">Next Step</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase mb-4 leading-tight">
            Ready to build <span className="text-cyan-400">something amazing?</span>
          </h2>

          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed font-light">
            Let's turn your ideas into digital reality. I build fast, secure, and responsive web experiences.
          </p>

          <Link
            to="/contact"
            className="group relative px-8 py-3.5 bg-white text-black font-bold text-sm rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start a Project
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default GlobalCTA;
