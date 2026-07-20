import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import GlobalCTA from "../components/ui/GlobalCTA";
import ProgressiveImage from "../components/ui/ProgressiveImage";
import { RiArrowLeftLine, RiExternalLinkLine, RiCheckboxCircleFill } from "react-icons/ri";

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

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-32 pb-0">
      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-20">
        
        {/* Breadcrumb */}
        <div className="inline-flex items-center gap-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] mb-12 md:mb-16">
          <Link 
            to="/projects" 
            className="group flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
          >
            <RiArrowLeftLine className="text-sm group-hover:-translate-x-1 transition-transform" />
            <span>Projects</span>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-cyan-400/80">{project.title}</span>
        </div>

        {/* Header Content */}
        <div className="mb-16">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="text-cyan-400 text-lg">{project.icon}</span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-400 uppercase">
              // {project.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-none mb-8">
            {project.title}
          </h1>
          <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-20 border border-white/5 shadow-[0_0_50px_rgba(34,211,238,0.05)]"
        >
          <ProgressiveImage 
            src={project.image} 
            alt={project.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Two-Column Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-24 items-start">
          
          {/* Left Column: Narrative (Challenge & Solution) */}
          <div className="md:col-span-8 space-y-16">
            {/* Problem */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] md:text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
                  01
                </span>
                <h3 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase">
                  The Challenge
                </h3>
              </div>
              <div className="pl-4 md:pl-6 border-l border-white/10">
                <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed">
                  {project.problem}
                </p>
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] md:text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
                  02
                </span>
                <h3 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase">
                  The Solution
                </h3>
              </div>
              <div className="pl-4 md:pl-6 border-l border-cyan-400/30">
                <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Sleek Sidebar Meta Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-4 border border-white/5 bg-white/[0.01] rounded-2xl p-6 md:p-8 space-y-8"
          >
            {/* Tech Stack */}
            <div>
              <h4 className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-4">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-mono text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Link */}
            <div className="pt-6 border-t border-white/5">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="group relative w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Launch Site <RiExternalLinkLine className="text-sm" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              </a>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Global CTA at the bottom */}
      <GlobalCTA />
    </div>
  );
};

export default ProjectDetails;
