import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import ProgressiveImage from "../components/ui/ProgressiveImage";
import SEO from "../components/SEO";
import { RiArrowLeftLine, RiExternalLinkLine, RiArrowRightLine } from "react-icons/ri";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProject = projects.find((p) => p.id === parseInt(id, 10));
    if (foundProject) {
      setProject(foundProject);
    } else {
      navigate("/projects");
    }
  }, [id, navigate]);

  if (!project) return null;

  // Next / Prev project navigation
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-black pt-28 md:pt-32 pb-16">
      {/* Dynamic Project SEO */}
      <SEO project={project} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link 
            to="/projects" 
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-cyan-400/50 text-slate-200 hover:text-white text-xs font-mono font-medium transition-all duration-200"
          >
            <RiArrowLeftLine className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </Link>

          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        {/* Project Header: Clean, balanced sizing */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {project.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mt-2 max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* 2-Column Content Grid: Project Info & Compact Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10">
          
          {/* Left Column (7 cols): The Problem & The Solution */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Problem Card */}
            <div className="p-5 sm:p-6 rounded-xl bg-zinc-950/70 border border-white/5">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  The Problem
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Solution Card */}
            <div className="p-5 sm:p-6 rounded-xl bg-zinc-950/70 border border-white/5">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  The Solution
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Right Column (5 cols): Compact Image Preview & Actions */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Compact Image Card (Controlled height, never blows up screen) */}
            <div className="rounded-xl border border-white/10 bg-zinc-950 p-3 flex items-center justify-center overflow-hidden">
              <ProgressiveImage 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 sm:h-56 rounded-lg bg-black/50"
                imgClassName="w-full h-full object-contain rounded-lg"
              />
            </div>

            {/* Meta & Tech Stack Card */}
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 space-y-3">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/5 text-[11px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Demo Action */}
              {project.link && (
                <div className="pt-2 border-t border-white/5">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                  >
                    <span>Launch Live Site</span>
                    <RiExternalLinkLine className="text-sm" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Pagination: Fully Responsive */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="group inline-flex items-center justify-between sm:justify-start gap-2 px-3.5 py-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white transition-all w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">
                <RiArrowLeftLine className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] group-hover:-translate-x-1 transition-transform" />
                <span className="text-slate-500">Prev:</span>
                <span className="font-medium text-white">{prevProject.title}</span>
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white font-medium transition-all w-full sm:w-auto"
          >
            <span>All Projects</span>
          </Link>

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.id}`}
              className="group inline-flex items-center justify-between sm:justify-end gap-2 px-3.5 py-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white transition-all w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">
                <span className="text-slate-500">Next:</span>
                <span className="font-medium text-white">{nextProject.title}</span>
                <RiArrowRightLine className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;
