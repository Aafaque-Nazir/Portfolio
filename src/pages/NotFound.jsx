import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiHomeLine,
  RiCompassLine,
  RiArticleLine,
  RiArrowRightLine
} from "react-icons/ri";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO section="notFound" noindex={true} />

      <div className="relative min-h-[85vh] flex items-center justify-center bg-black text-white px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/[0.04] blur-[150px] pointer-events-none -z-0" />

        <div className="max-w-xl w-full text-center relative z-10">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>ERR_PAGE_NOT_FOUND</span>
          </motion.div>

          {/* Big Monospace 404 Heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-7xl sm:text-9xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-700 leading-none mb-4 select-none"
          >
            404
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-lg sm:text-xl font-semibold text-white mb-3"
          >
            This page has drifted off the radar.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-md mx-auto mb-8"
          >
            The link you followed may be broken, out of date, or moved to a new route. Use the links below to navigate back to safe ground.
          </motion.p>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 text-black font-semibold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              <RiHomeLine size={15} />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 font-medium text-xs uppercase tracking-wider transition-colors"
            >
              <RiCompassLine size={15} />
              <span>Projects</span>
            </Link>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 font-medium text-xs uppercase tracking-wider transition-colors"
            >
              <RiArticleLine size={15} />
              <span>Blog</span>
            </Link>
          </motion.div>

          {/* Need help footer hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-xs text-zinc-500 font-mono"
          >
            Looking for something specific?{" "}
            <Link
              to="/contact"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 inline-flex items-center gap-1"
            >
              Contact Aafaque <RiArrowRightLine size={11} />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
