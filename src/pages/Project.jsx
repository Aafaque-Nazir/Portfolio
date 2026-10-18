import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectShowcase } from "../components/ui/project-showcase";

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
                My Projects
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                A collection of web applications and sites built with modern frameworks, clean code, and responsive design.
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
      </div>
    </div>
  );
};

export default Project;
