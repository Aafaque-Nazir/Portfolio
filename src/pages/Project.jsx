import React from "react";
import { ProjectShowcase } from "../components/ui/project-showcase";

const Project = () => {
  return (
    <div id="projects" className="relative h-auto py-24 bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-[1] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase mb-4">
            Selected Works<span className="text-cyan-500">.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A curated collection of <span className="text-cyan-400 font-bold">highly interactive web experiences</span> and creative front-end sandboxes.
            Engineered for speed, designed for impact.
          </p>
        </div>

        {/* Project Grid / Folders */}
        <ProjectShowcase />
      </div>
    </div>
  );
};

export default Project;
