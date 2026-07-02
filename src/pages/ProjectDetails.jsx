import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import GlobalCTA from "../components/ui/GlobalCTA";
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
        
        {/* Back Button */}
        <Link 
          to="/projects" 
          className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.1] hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 shadow-lg mb-12 w-max"
        >
          <RiArrowLeftLine className="text-lg text-slate-400 group-hover:text-cyan-400 group-hover:-translate-x-1 transition-all" />
          <span className="text-[10px] md:text-xs font-bold text-slate-300 group-hover:text-cyan-400 uppercase tracking-widest transition-colors">
            Back to Projects
          </span>
        </Link>

        {/* Header Content */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-cyan-400 text-2xl">{project.icon}</span>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              {project.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-12">
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-xs font-semibold text-slate-300 tracking-wide">
              {tech}
            </span>
          ))}
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-20 border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.1)]"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </motion.div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20">
          
          {/* Problem */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-sm">01</span>
              The Problem
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {project.problem}
            </p>
          </motion.div>

          {/* Solution */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">02</span>
              The Solution
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {project.solution}
            </p>
          </motion.div>
        </div>

        {/* Lighthouse Scores */}
        {project.lighthouse && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-8 mb-20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.05),transparent_50%)] pointer-events-none" />
            <h3 className="text-xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
              <RiCheckboxCircleFill className="text-emerald-400" />
              Verified Performance
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Performance", score: project.lighthouse.perf },
                { label: "Accessibility", score: project.lighthouse.access },
                { label: "Best Practices", score: project.lighthouse.bp },
                { label: "SEO", score: project.lighthouse.seo },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center space-y-3">
                  <div className="relative">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                      <circle 
                        cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" 
                        strokeDasharray={36 * 2 * Math.PI} 
                        strokeDashoffset={36 * 2 * Math.PI - (stat.score / 100) * 36 * 2 * Math.PI}
                        className={stat.score >= 90 ? "text-emerald-400" : "text-yellow-400"} 
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-white">
                      {stat.score}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Live Link Button */}
        <div className="flex justify-center">
          <a 
            href={project.link} 
            target="_blank" 
            rel="noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 text-black font-black text-lg rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          >
            <span className="relative z-10">View Live Project</span>
            <RiExternalLinkLine className="relative z-10 text-xl" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </a>
        </div>

      </div>

      {/* Global CTA at the bottom */}
      <GlobalCTA />
    </div>
  );
};

export default ProjectDetails;
