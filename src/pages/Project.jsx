import React, { useState } from "react";
import { ProjectShowcase } from "../components/ui/project-showcase";
import { ProjectFilter } from "../components/ui/animated-tabs";

const Project = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div id="projects" className="relative min-h-screen py-24 bg-black/95">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-[1] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

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

        {/* Filter Tabs */}
        <div className="flex justify-center mb-16">
          <div className="p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl">
            <ProjectFilter activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        {/* Project Grid */}
        <ProjectShowcase category={activeTab} />
      </div>
    </div>
  );
};

export default Project;
