import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProgressiveImage from "./ProgressiveImage";
import { RiFolder3Fill, RiArrowLeftLine, RiExternalLinkLine } from "react-icons/ri";
import { projects } from "../../data/projects";

function ProjectCard({ project }) {
    return (
        <div className="group relative w-full h-full bg-[#09090b] border border-white/10 hover:border-cyan-500/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

            {/* Feature Image with Controlled Compact Proportions */}
            <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-zinc-950 border-b border-white/5 flex items-center justify-center p-3">
                <ProgressiveImage
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full flex items-center justify-center"
                    imgClassName="w-full h-full object-contain p-1 transform transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent pointer-events-none" />

                {/* Category Pill */}
                <span className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-cyan-400 uppercase tracking-wider">
                    {project.category}
                </span>
            </div>

            {/* Details Block */}
            <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1 mt-3">
                        {project.techStack.slice(0, 3).map((tech, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[10px] font-mono text-slate-300"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.techStack.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[9px] font-mono text-slate-500">
                                +{project.techStack.length - 3}
                            </span>
                        )}
                    </div>
                </div>

                {/* Card Actions: Case Study & Live Demo */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-300 hover:text-cyan-300 transition-colors group/link"
                    >
                        <span>Case Study</span>
                        <RiArrowLeftLine className="rotate-180 text-xs text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] group-hover/link:translate-x-1 transition-transform" />
                    </Link>

                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white text-[11px] font-mono font-medium transition-all"
                        >
                            <span>Live Demo</span>
                            <RiExternalLinkLine className="text-[10px]" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export function ProjectShowcase({ selectedFolder: externalFolder, setSelectedFolder: setExternalFolder }) {
    const [internalFolder, setInternalFolder] = useState(null);
    const selectedFolder = externalFolder !== undefined ? externalFolder : internalFolder;
    const setSelectedFolder = setExternalFolder || setInternalFolder;

    const categories = Array.from(new Set(projects.map((p) => p.category)));

    const folders = categories.map((cat) => ({
        name: cat,
        projects: projects.filter((p) => p.category === cat),
    }));

    return (
        <div className="relative w-full h-auto">

            <AnimatePresence mode="wait">
                {!selectedFolder ? (
                    <motion.div
                        key="folders-view"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
                        transition={{ duration: 0.35 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto relative z-10"
                    >
                        {folders.map((folder) => (
                            <motion.div
                                layoutId={`folder-container-${folder.name}`}
                                key={folder.name}
                                onClick={() => setSelectedFolder(folder)}
                                className="group relative cursor-pointer outline-none w-full"
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="relative w-full bg-[#09090b] border border-white/10 group-hover:border-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] group-hover:-translate-y-1">

                                    {/* Folder Tab Indicator */}
                                    <div className="absolute top-0 left-6 w-24 h-1 bg-cyan-400 rounded-b shadow-[0_0_10px_rgba(34,211,238,0.5)]" />

                                    {/* Thumbnail Preview Stack */}
                                    <div className="relative w-full h-28 overflow-hidden bg-zinc-950 border-b border-white/5">
                                        <div className="absolute inset-0 flex gap-1.5 p-2.5">
                                            {folder.projects.slice(0, 3).map((p) => (
                                                <div
                                                    key={p.id}
                                                    className="relative flex-1 rounded-lg overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center p-1.5 opacity-75 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <ProgressiveImage
                                                        src={p.image}
                                                        alt={p.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="w-full h-full"
                                                        imgClassName="w-full h-full object-contain"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 sm:p-5">
                                        <div className="flex items-center justify-between mb-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                                                <RiFolder3Fill className="text-base" />
                                            </div>
                                            <span className="text-[10px] font-mono font-medium text-slate-400 bg-white/[0.03] border border-white/10 px-2 py-0.5 rounded-full">
                                                {folder.projects.length} {folder.projects.length === 1 ? 'project' : 'projects'}
                                            </span>
                                        </div>

                                        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mb-3 group-hover:text-cyan-300 transition-colors">
                                            {folder.name}
                                        </h2>

                                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                            <span className="text-[11px] font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
                                                Explore Folder
                                            </span>
                                            <RiArrowLeftLine className="rotate-180 text-xs text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)] group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        layoutId={`folder-container-${selectedFolder.name}`}
                        key="expanded-folder"
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative bg-zinc-950/70 backdrop-blur-2xl border border-white/10 rounded-2xl w-full max-w-5xl mx-auto shadow-2xl overflow-hidden z-20"
                    >
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

                        {/* Compact Header Bar */}
                        <div className="relative z-30 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-zinc-950/90 backdrop-blur-md">
                            <motion.button
                                whileHover={{ x: -2 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setSelectedFolder(null)}
                                className="group/btn inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-cyan-400/50 hover:bg-zinc-800 transition-all text-xs font-mono font-medium text-white shadow-sm"
                            >
                                <RiArrowLeftLine className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] group-hover/btn:-translate-x-0.5 transition-transform text-sm" />
                                <span>All Categories</span>
                            </motion.button>

                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                                    <RiFolder3Fill className="text-sm" />
                                </div>
                                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                                    {selectedFolder.name}
                                </h2>
                                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                                    {selectedFolder.projects.length} {selectedFolder.projects.length === 1 ? 'project' : 'projects'}
                                </span>
                            </div>
                        </div>

                        {/* Compact Projects Grid */}
                        <div className="p-4 sm:p-6 md:p-8 relative z-20">
                            <div className={`grid gap-5 ${
                                selectedFolder.projects.length === 1
                                    ? 'grid-cols-1 max-w-sm mx-auto'
                                    : selectedFolder.projects.length === 2
                                        ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
                                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                            }`}>
                                <AnimatePresence>
                                    {selectedFolder.projects.map((project, idx) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: idx * 0.08,
                                                ease: [0.16, 1, 0.3, 1]
                                            }}
                                            key={project.id}
                                            className="h-full flex"
                                        >
                                            <ProjectCard project={project} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
