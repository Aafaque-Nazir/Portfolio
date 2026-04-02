import React from "react";
import { ProjectShowcase } from "../components/ui/project-showcase";

const Project = () => {
  return (
    <div id="projects" className="relative min-h-screen py-24 bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-[1] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 uppercase tracking-tight">
            Selected Works
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A curated collection of <span className="text-cyan-400 font-bold">scalable web applications</span> and digital experiences.
            Engineered for performance, designed for impact.
          </p>
        </div>

        {/* Project Grid / Folders */}
        <ProjectShowcase />
      </div>
    </div>
  );
};

export default Project;
