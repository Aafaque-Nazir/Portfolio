import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ProjectShowcase } from "../components/ui/project-showcase";
import { projects } from "../data/projects";

const Project = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);

  return (
    <div id="projects" className="relative w-full min-h-screen flex flex-col items-center justify-start bg-black text-white pt-20 sm:pt-24 pb-16">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-[1] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Header Section: Shown when browsing all folders */}
        <AnimatePresence mode="wait">
          {!selectedFolder && (
            <motion.div
              key="project-header"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-center mb-7 sm:mb-8 max-w-2xl mx-auto"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase mb-2">
                Featured Work &amp; Projects
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                A collection of web applications, e-commerce stores, and client websites built with modern frameworks and responsive design.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Grid / Folders */}
        <div className="w-full">
          <ProjectShowcase
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
          />
        </div>

        {/* Visible Case Study Directory — Replaces hidden sr-only link block */}
        {!selectedFolder && (
          <nav
            aria-label="All Portfolio Case Studies"
            className="w-full mt-12 pt-8 border-t border-white/5"
          >
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
              All Case Studies ({projects.length})
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {projects.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/projects/${p.id}/`}
                    className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-950/60 border border-white/[0.07] hover:border-accent/35 text-xs text-zinc-300 hover:text-white transition-colors"
                  >
                    <span className="font-medium truncate">{p.title}</span>
                    <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                      {p.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Project;
