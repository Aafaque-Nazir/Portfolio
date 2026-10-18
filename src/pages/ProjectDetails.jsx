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
    <div className="min-h-screen bg-black text-white pt-24 sm:pt-28 pb-16">
      {/* Dynamic Project SEO */}
      <SEO project={project} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Minimal Editorial Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between text-xs font-mono mb-6">
          <Link 
            to="/projects" 
            className="group inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <RiArrowLeftLine className="transition-transform group-hover:-translate-x-0.5" />
            <span>Projects</span>
          </Link>

          <span className="text-zinc-500 uppercase tracking-widest text-[11px]">
            {project.category}
          </span>
        </nav>

        {/* Project Header: Crisp, confident, clean */}
        <header className="mb-8 max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-2.5">
            {project.title}
          </h1>
          <p className="text-sm text-zinc-400 font-normal leading-relaxed">
            {project.description}
          </p>
        </header>

        {/* Main Grid: Clean & Structured */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start mb-10">
          
          {/* Left Column (7 cols): The Problem & The Solution */}
          <div className="md:col-span-7 flex flex-col gap-4">
            {/* Problem Card */}
            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80">
              <h2 className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-medium mb-2">
                The Problem
              </h2>
              <p className="text-sm text-zinc-300 font-normal leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Solution Card */}
            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80">
              <h2 className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-medium mb-2">
                The Solution
              </h2>
              <p className="text-sm text-zinc-300 font-normal leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Right Column (5 cols): Visual Preview & Metadata */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {/* Visual Preview */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-3 flex items-center justify-center overflow-hidden">
              <ProgressiveImage 
                src={project.image} 
                alt={project.title} 
                className="w-full h-40 rounded-lg bg-black/40"
                imgClassName="w-full h-full object-contain"
              />
            </div>

            {/* Tech Stack & Action */}
            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-medium block mb-2.5">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Live Site Link */}
              {project.link && (
                <div className="pt-2 border-t border-zinc-800/60">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Visit Live Website</span>
                    <RiExternalLinkLine className="text-sm" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Pagination Buttons */}
        <footer className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="group inline-flex items-center justify-between sm:justify-start gap-2 px-3.5 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all shadow-sm"
            >
              <span className="flex items-center gap-1.5 min-w-0">
                <RiArrowLeftLine className="text-zinc-400 group-hover:text-white transition-transform group-hover:-translate-x-0.5 shrink-0" />
                <span className="text-zinc-500 font-normal shrink-0">Prev:</span>
                <span className="font-medium text-zinc-200 group-hover:text-white truncate max-w-[150px] sm:max-w-[180px]">
                  {prevProject.title}
                </span>
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          <Link
            to="/projects"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all shadow-sm text-center"
          >
            All Projects
          </Link>

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.id}`}
              className="group inline-flex items-center justify-between sm:justify-end gap-2 px-3.5 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all shadow-sm"
            >
              <span className="flex items-center gap-1.5 min-w-0">
                <span className="text-zinc-500 font-normal shrink-0">Next:</span>
                <span className="font-medium text-zinc-200 group-hover:text-white truncate max-w-[150px] sm:max-w-[180px]">
                  {nextProject.title}
                </span>
                <RiArrowRightLine className="text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 shrink-0" />
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </footer>

      </div>
    </div>
  );
};

export default ProjectDetails;
