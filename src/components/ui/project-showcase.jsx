import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "./3d-card";
import {
    RiSignalTowerFill,
    RiShoppingCartFill,
    RiMotorbikeFill,
    RiRestaurantFill,
    RiCarFill,
    RiBusFill,
    RiBrainFill,
    RiPlaneFill,
    RiCupFill,
    RiFolder3Fill,
    RiArrowLeftLine,
} from "react-icons/ri";

const projects = [
    {
        title: "VelvetBrew Coffee",
        description:
            "Premium e-commerce platform for luxury coffee machines, artisan beans, and curated accessories with a dark, immersive brand experience.",
        image: "./velvet.png",
        link: "https://velvet-coffee.netlify.app",
        icon: <RiCupFill />,
        category: "Commerce & Services",
        techStack: ["React", "Motion", "MongoDB"],
        status: "Live",
        id: 9,
    },
    {
        title: "Dubai Travel & Tourism",
        description:
            "Premium booking platform for exclusive Dubai experiences, from desert safaris to Dubai Tech.",
        image: "./dubai.png",
        link: "https://dubai-tt.netlify.app/",
        icon: <RiPlaneFill />,
        category: "Commerce & Services",
        techStack: ["Next.Js", "Tailwind", "Motion"],
        status: "Live",
        id: 8,
    },
    {
        title: "Luxury Chauffeur",
        description:
            "Premium booking engine for high-end fleet reservation management with real-time availability.",
        image: "./car-thumbnail.png",
        link: "https://royalcarz.netlify.app/",
        icon: <RiCarFill />,
        category: "Commerce & Services",
        techStack: ["React", "Motion", "Tailwind"],
        status: "Live",
        id: 5,
    },
    {
        title: "Ecommerce Store",
        description:
            "Seamless and secure shopping experience converting visitors to customers with optimized checkout flows.",
        image: "./ecommerce-thumbnail.png",
        link: "https://shopease-aafaque.netlify.app/",
        icon: <RiShoppingCartFill />,
        category: "Commerce & Services",
        techStack: ["React", "Redux", "Stripe"],
        status: "Live",
        id: 2,
    },
    {
        title: "Food Delivery App",
        description:
            "Streamlines food ordering to reduce wait times and maximize turnover for local chains.",
        image: "./resturant-thumbnail.png",
        link: "https://bread-and-bite.netlify.app/",
        icon: <RiMotorbikeFill />,
        category: "Commerce & Services",
        techStack: ["React", "Firebase", "Maps API"],
        status: "Live",
        id: 3,
    },
    {
        title: "Coursira",
        description:
            "Revolutionizing self-education with an AI engine that generates custom study plans, proctored tests, and instant feedback loops.",
        image: "./coursira-thumbnail.png",
        link: "https://coursira.vercel.app/",
        icon: <RiBrainFill />,
        category: "EdTech & AI",
        techStack: ["Next.js", "Gemini", "NeonDB"],
        status: "Live",
        id: 7,
    },
    {
        title: "Bus Booked",
        description:
            "Bus operator dashboard with real-time seat management and WhatsApp integration for automated ticketing.",
        image: "./bus-booked-thumbnail.png",
        link: "https://busbooked.netlify.app/",
        icon: <RiBusFill />,
        category: "SaaS Systems",
        techStack: ["React", "Firebase", "Redux"],
        status: "Live",
        id: 6,
    },
    {
        title: "Inventory Management",
        description:
            "Real-time stock tracking and automated reordering system for high-volume retail businesses.",
        image: "./inventory-thumbnail.png",
        link: "https://nvntory-mgm.vercel.app/",
        icon: <RiSignalTowerFill />,
        category: "SaaS Systems",
        techStack: ["Next.js", "Supabase", "Prisma"],
        status: "Live",
        id: 1,
    },
    {
        title: "Smart Dining OS",
        description:
            "End-to-end Restaurant OS streamlining operations with table-to-kitchen ordering and analytics.",
        image: "./smart-dining-thumbnail.png",
        link: "https://korner-kafe.netlify.app/",
        icon: <RiRestaurantFill />,
        category: "SaaS Systems",
        techStack: ["React", "Node.js", "Socket.io"],
        status: "Beta",
        id: 4,
    },
];

function ProjectCard({ project }) {
    return (
        <a href={project.link} target="_blank" rel="noreferrer" className="group block w-full h-full outline-none">
            <div className="relative w-full h-full bg-[#030303] border border-white/[0.04] rounded-3xl overflow-hidden flex flex-col transition-all duration-500 hover:border-white/[0.15] hover:shadow-[0_20px_40px_-20px_rgba(34,211,238,0.2)] hover:-translate-y-2">
                
                {/* 1. Feature Image (Edge to Edge, Top) */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900 border-b border-white/[0.04]">
                    <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform transition-transform duration-[1.2s] ease-[0.16,1,0.3,1] group-hover:scale-[1.03]"
                    />
                    
                    {/* Floating Tech Stack Overlay - Cascading in on hover */}
                    <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-20">
                        {project.techStack.map((tech, idx) => (
                            <span 
                                key={idx} 
                                className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-[6px] text-[9px] font-mono text-cyan-50 uppercase tracking-[0.2em] transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 shadow-xl" 
                                style={{ transitionDelay: `${idx * 75}ms` }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 2. Minimal Details Block */}
                <div className="p-6 md:p-8 flex flex-col flex-grow relative overflow-hidden bg-gradient-to-b from-transparent to-transparent group-hover:to-cyan-950/10 transition-colors duration-700">
                    
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="pr-4">
                            <div className="flex items-center gap-2 mb-2.5">
                                <span className="text-slate-500 group-hover:text-cyan-500/80 transition-colors text-base">
                                    {project.icon}
                                </span>
                                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500 group-hover:text-cyan-500/80 transition-colors">
                                    {project.category}
                                </span>
                            </div>
                            <h4 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-white tracking-tight transition-colors">
                                {project.title}
                            </h4>
                        </div>
                        
                        {/* Directed Action Indicator */}
                        <div className="w-10 h-10 rounded-full border border-white/[0.05] bg-white/[0.01] flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-500 shrink-0 transform group-hover:-rotate-45">
                            <RiArrowLeftLine className="text-slate-500 group-hover:text-black text-lg rotate-180 transition-colors duration-500" />
                        </div>
                    </div>

                    <p className="text-slate-400/80 text-xs md:text-[13px] leading-relaxed font-medium line-clamp-3 relative z-10 group-hover:text-slate-300 transition-colors flex-grow">
                        {project.description}
                    </p>
                </div>
            </div>
        </a>
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
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto relative z-10"
                    >
                        {folders.map((folder, idx) => (
                            <motion.div
                                layoutId={`folder-container-${folder.name}`}
                                key={folder.name}
                                onClick={() => setSelectedFolder(folder)}
                                className="group relative cursor-pointer outline-none w-full h-[320px]"
                                whileTap={{ scale: 0.97 }}
                            >
                                {/* 🌟 Magnetic Glow Behind Card */}
                                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/0 via-cyan-400/20 to-blue-600/0 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out z-0 translate-y-4 group-hover:translate-y-0" />
                                
                                {/* 📁 Main Folder Body - Glassmorphic Aesthetic */}
                                <div className="relative w-full h-full bg-zinc-950/60 backdrop-blur-3xl border border-white/5 group-hover:border-cyan-500/30 rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] z-10 group-hover:bg-zinc-900/80">
                                    
                                    {/* Abstract Grid Background inside Folder */}
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none transition-opacity group-hover:opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                                    {/* Physical Folder Tab Simulation */}
                                    <div className="absolute top-0 left-8 w-1/3 min-w-[120px] h-2 bg-cyan-500 rounded-b-xl shadow-[0_0_20px_rgba(34,211,238,0.5)] opacity-80 group-hover:opacity-100 group-hover:h-3 transition-all duration-500" />
                                    
                                    {/* Header: Icon & Tech Dots */}
                                    <div className="flex justify-between items-start relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-inner group-hover:shadow-[inset_0_0_20px_rgba(34,211,238,0.2)] group-hover:border-cyan-500/40 transition-all duration-500">
                                            <RiFolder3Fill className="text-3xl text-slate-400 group-hover:text-cyan-400 transform group-hover:scale-110 transition-all duration-500 drop-shadow-md" />
                                        </div>

                                        <div className="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                        </div>
                                    </div>

                                    {/* Massive Background Typography */}
                                    <div className="absolute -bottom-6 -right-6 text-[150px] font-black text-white/[0.02] tracking-tighter pointer-events-none group-hover:-translate-x-4 group-hover:-translate-y-4 transition-transform duration-700 ease-out select-none">
                                        0{idx + 1}
                                    </div>

                                    {/* Middle: Title & Count */}
                                    <div className="relative z-10 mt-auto mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 mb-4 group-hover:border-cyan-500/30 transition-colors">
                                            <span className="w-2 h-2 rounded-full bg-cyan-500" />
                                            <span className="text-[10px] font-mono text-cyan-50 uppercase tracking-widest leading-none pt-0.5">
                                                {folder.projects.length} Architectures
                                            </span>
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all duration-300 drop-shadow-lg">
                                            {folder.name}
                                        </h3>
                                    </div>
                                    
                                    {/* Footer line & Arrow Button */}
                                    <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5 transform group-hover:-translate-y-1 transition-transform duration-500">
                                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] group-hover:text-cyan-400/80 transition-colors">
                                            View Archive
                                        </span>
                                        <div 
                                            className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                                        >
                                            <RiArrowLeftLine className="text-white group-hover:text-black rotate-180 text-lg transition-transform duration-500 group-hover:translate-x-0.5" />
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
                        className="relative bg-zinc-950/80 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-6 md:p-12 lg:p-16 w-full max-w-7xl mx-auto shadow-[0_20px_80px_-20px_rgba(0,0,0,1)] overflow-hidden z-20"
                    >
                        {/* 🌟 Folder Expanded Top Lighting / Glow */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-blue-900/5 to-transparent pointer-events-none mix-blend-screen opacity-70" />
                        
                        {/* Folder Top Rim Edge Highlight */}
                        <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-cyan-500/0 via-cyan-400/50 to-blue-600/0 shadow-[0_0_30px_rgba(34,211,238,0.8)]" />

                        {/* Top Area: Close Action & CyberMetadata */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 relative z-20 gap-8">
                            
                            {/* Return Button */}
                            <motion.button
                                whileHover={{ x: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedFolder(null)}
                                className="group/btn flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300"
                            >
                                <RiArrowLeftLine className="text-slate-400 group-hover/btn:text-cyan-400 text-lg transition-colors" />
                                <span className="text-xs font-bold text-slate-300 group-hover/btn:text-cyan-50 uppercase tracking-[0.2em] transition-colors">
                                    Close Archive
                                </span>
                            </motion.button>
                            
                            {/* Tech Metadata Label */}
                            <div className="hidden md:flex items-center gap-6 text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] px-6 py-2 rounded-xl bg-white/[0.02] border border-white/5">
                                <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_#22d3ee] animate-pulse" />
                                    System.Active
                                </span>
                                <span>Directory Idx: {selectedFolder.projects.length} Files</span>
                            </div>
                        </div>

                        {/* Middle Area: Massive Header */}
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 relative z-20 pb-8">
                            {/* Giant Ghost Icon */}
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] flex items-center justify-center shadow-inner relative group/icon overflow-hidden hidden sm:flex">
                                <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500" />
                                <RiFolder3Fill className="text-5xl md:text-6xl text-cyan-500/40 group-hover/icon:text-cyan-400 group-hover/icon:scale-110 transition-all duration-500" />
                            </div>
                            
                            {/* Title Segment */}
                            <div className="flex-1 w-full text-center md:text-left">
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-[11px] font-mono text-cyan-400/80 uppercase tracking-[0.3em] mb-3 inline-flex items-center gap-2"
                                >
                                    <span className="w-3 h-[1px] bg-cyan-500/50 block" />
                                    Archive / {selectedFolder.name.toLowerCase().replace(/\s+/g, '-')}
                                </motion.div>
                                <motion.h3 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                                    className="text-5xl md:text-6xl lg:text-[5rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30 tracking-tight leading-none drop-shadow-sm"
                                >
                                    {selectedFolder.name}
                                </motion.h3>
                            </div>
                        </div>

                        {/* Thin Cybernetic Divider Line */}
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

                        {/* Rendered Works Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-20">
                            <AnimatePresence>
                                {selectedFolder.projects.map((project, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ 
                                            duration: 0.6,
                                            delay: 0.15 + idx * 0.1, 
                                            ease: [0.16, 1, 0.3, 1] // Native Apple Spring Curve
                                        }}
                                        key={project.id}
                                        className="h-full"
                                    >
                                        <ProjectCard project={project} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
