import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "./3d-card";
import ProgressiveImage from "./ProgressiveImage";
import { RiFolder3Fill, RiArrowLeftLine } from "react-icons/ri";
import { projects } from "../../data/projects";

function ProjectCard({ project }) {
    return (
        <Link to={`/projects/${project.id}`} className="group block w-full h-full outline-none">
            <div className="relative w-full h-full bg-[#030303] border border-white/[0.05] rounded-[24px] overflow-hidden flex flex-col transition-all duration-700 hover:border-cyan-500/30 hover:shadow-[0_0_40px_-15px_rgba(34,211,238,0.2)] hover:-translate-y-2 z-10 hover:z-20 group-hover:bg-[#050505]">

                {/* Inner Glow Border */}
                <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] pointer-events-none z-30 transition-all duration-700 group-hover:shadow-[inset_0_0_0_1px_rgba(34,211,238,0.2)]" />

                {/* 1. Feature Image (Edge to Edge, Top) */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900 border-b border-white/[0.04]">
                    {/* Dark gradient overlay at the bottom of the image for text readability if needed, or just cinematic feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent z-10 opacity-70" />
                    <div className="absolute inset-0 bg-cyan-900/20 mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                    <ProgressiveImage
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        imgClassName="transform transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-[1.08]"
                    />

                    {/* Live Indicator on hover */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                        <span className="text-[9px] font-bold text-white uppercase tracking-widest">Live</span>
                    </div>

                    {/* Floating Tech Stack Overlay - Cascading in from bottom */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 z-20">
                        {project.techStack.map((tech, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-medium text-cyan-50/90 tracking-wide translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl"
                                style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 2. Details Block */}
                <div className="p-5 md:p-6 flex flex-col flex-grow relative overflow-hidden bg-gradient-to-b from-transparent to-transparent group-hover:to-cyan-950/10 transition-colors duration-700">

                    <div className="flex justify-between items-start mb-3 relative z-10">
                        <div className="pr-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-slate-500 group-hover:text-cyan-400 transition-colors text-sm">
                                    {project.icon}
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 group-hover:text-cyan-400 transition-colors duration-500">
                                    {project.category}
                                </span>
                            </div>
                            <h4 className="text-lg md:text-xl font-black text-slate-200 group-hover:text-white tracking-tight transition-colors">
                                {project.title}
                            </h4>
                        </div>

                        {/* Directed Action Indicator */}
                        <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/[0.08] flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-500 shrink-0 transform group-hover:-rotate-45">
                            <RiArrowLeftLine className="text-slate-400 group-hover:text-black text-lg rotate-180 transition-colors duration-500" />
                        </div>
                    </div>

                    <p className="text-slate-400/80 text-[12px] md:text-[13px] leading-relaxed font-medium line-clamp-2 relative z-10 group-hover:text-slate-300 transition-colors flex-grow">
                        {project.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export function ProjectShowcase() {
    const [selectedFolder, setSelectedFolder] = useState(null);

    const categories = Array.from(new Set(projects.map((p) => p.category)));

    const folders = categories.map((cat) => ({
        name: cat,
        projects: projects.filter((p) => p.category === cat),
    }));

    return (
        <div className="relative w-full h-auto min-h-[380px]">

            <AnimatePresence mode="wait">
                {!selectedFolder ? (
                    <motion.div
                        key="folders-view"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto relative z-10"
                    >
                        {folders.map((folder) => (
                            <motion.div
                                layoutId={`folder-container-${folder.name}`}
                                key={folder.name}
                                onClick={() => setSelectedFolder(folder)}
                                className="group relative cursor-pointer outline-none w-full"
                                whileTap={{ scale: 0.97 }}
                            >
                                {/* Glow Behind Card */}
                                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/0 via-cyan-400/15 to-blue-600/0 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out z-0 translate-y-4 group-hover:translate-y-0" />

                                {/* Folder Card */}
                                <div className="relative w-full bg-zinc-950/60 backdrop-blur-3xl border border-white/5 group-hover:border-cyan-500/25 rounded-[2rem] overflow-hidden transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] z-10 group-hover:bg-zinc-900/80">

                                    {/* Folder Tab */}
                                    <div className="absolute top-0 left-8 w-1/3 min-w-[100px] h-1.5 bg-cyan-500 rounded-b-lg shadow-[0_0_15px_rgba(34,211,238,0.4)] opacity-70 group-hover:opacity-100 group-hover:h-2 transition-all duration-500" />

                                    {/* Thumbnail Preview Stack */}
                                    <div className="relative w-full h-[140px] overflow-hidden bg-zinc-900/50 border-b border-white/[0.04]">
                                        <div className="absolute inset-0 flex gap-1 p-3">
                                            {folder.projects.slice(0, 3).map((p, i) => (
                                                <div
                                                    key={p.id}
                                                    className="relative flex-1 rounded-lg overflow-hidden border border-white/[0.06] opacity-60 group-hover:opacity-90 transition-all duration-500"
                                                    style={{ transitionDelay: `${i * 75}ms` }}
                                                >
                                                    <ProgressiveImage
                                                        src={p.image}
                                                        alt={p.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                        imgClassName="scale-105 group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent pointer-events-none" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 pb-5">
                                        {/* Folder Icon + Count */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-cyan-500/30 group-hover:shadow-[inset_0_0_15px_rgba(34,211,238,0.15)] transition-all duration-500">
                                                <RiFolder3Fill className="text-xl text-slate-400 group-hover:text-cyan-400 transition-all duration-500" />
                                            </div>
                                            <span className="text-[11px] font-medium text-slate-500 bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full">
                                                {folder.projects.length} {folder.projects.length === 1 ? 'project' : 'projects'}
                                            </span>
                                        </div>

                                        {/* Folder Name */}
                                        <h3 className="text-2xl md:text-[1.7rem] font-black text-white tracking-tight leading-none mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all duration-300">
                                            {folder.name}
                                        </h3>

                                        {/* View Button */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                                            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.15em] group-hover:text-cyan-400/80 transition-colors">
                                                View Projects
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] flex items-center justify-center transition-all duration-500">
                                                <RiArrowLeftLine className="text-white group-hover:text-black rotate-180 text-sm transition-all duration-500" />
                                            </div>
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
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative bg-zinc-950/40 backdrop-blur-2xl border border-white/[0.08] rounded-[2rem] w-full max-w-6xl mx-auto shadow-[0_0_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden z-20"
                    >
                        {/* Immersive Ambient Backgrounds */}
                        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none mix-blend-overlay" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08)_0%,transparent_50%)] pointer-events-none" />

                        {/* Top Accent Line (Glowing) */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.5)]" />

                        {/* Sticky Glass Header Bar */}
                        <div className="relative z-30 sticky top-0 px-6 md:px-10 py-6 flex items-center justify-between border-b border-white/[0.06] bg-zinc-950/50 backdrop-blur-md">

                            {/* Left: Back + Title */}
                            <div className="flex items-center gap-5 md:gap-6">
                                <motion.button
                                    whileHover={{ x: -4, scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedFolder(null)}
                                    className="group/btn flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.1] hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 shadow-lg"
                                >
                                    <RiArrowLeftLine className="text-slate-400 group-hover/btn:text-cyan-400 text-lg transition-colors" />
                                    <span className="hidden sm:block text-[10px] md:text-xs font-bold text-slate-300 group-hover/btn:text-cyan-400 uppercase tracking-widest transition-colors">
                                        Back
                                    </span>
                                </motion.button>

                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[inset_0_0_15px_rgba(34,211,238,0.1)]">
                                        <RiFolder3Fill className="text-xl text-cyan-400" />
                                    </div>
                                    <div>
                                        <motion.h3
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                                            className="text-xl md:text-3xl font-black text-white tracking-tight"
                                        >
                                            {selectedFolder.name}
                                        </motion.h3>
                                        <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">
                                            Curated Collection
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Projects Grid */}
                        <div className="p-6 md:p-10 relative z-20 min-h-[400px]">
                            <div className={`grid gap-6 md:gap-8 ${selectedFolder.projects.length <= 2
                                    ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                }`}>
                                <AnimatePresence>
                                    {selectedFolder.projects.map((project, idx) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.15 + idx * 0.1,
                                                ease: [0.16, 1, 0.3, 1]
                                            }}
                                            key={project.id}
                                            className="h-full"
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
