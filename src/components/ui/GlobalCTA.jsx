import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const GlobalCTA = () => {
  return (
    <div className="w-full py-8 md:py-12 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">
        <div className="p-6 md:p-8 rounded-2xl bg-zinc-950/60 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Have a project in mind?
            </h3>
            <p className="text-xs md:text-sm text-gray-400 mt-1 font-light">
              Feel free to reach out if you're looking for a developer or want to collaborate.
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shrink-0"
          >
            <span>Get in Touch</span>
            <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GlobalCTA;
