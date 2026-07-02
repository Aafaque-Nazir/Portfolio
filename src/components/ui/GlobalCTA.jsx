import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const GlobalCTA = () => {
  return (
    <div className="relative py-24 bg-black overflow-hidden border-t border-white/[0.05]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >


          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase mb-6 leading-tight">
            Ready to build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500">
              something amazing?
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Let's turn your ideas into digital reality. I build fast, scalable, and stunning web experiences.
          </p>

          <Link
            to="/contact"
            className="group relative px-8 py-4 bg-white text-black font-bold text-base md:text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start a Project
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default GlobalCTA;
