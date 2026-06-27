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
    RiShipFill,
    RiHeartPulseFill,
} from "react-icons/ri";

const projects = [
    {
        title: "Restaurant OS",
        description:
            "Complete restaurant management system with live orders, table tracking, and kitchen display.",
        image: "./restaurant-os-thumbnail.png",
        link: "https://korner-kafe.netlify.app/",
        icon: <RiSignalTowerFill />,
        category: "Business Software (SaaS)",
        techStack: ["Next.js", "Supabase", "PostgreSQL"],
        status: "Live",
        id: 4,
    },
    {
        title: "E-Commerce Store",
        description:
            "Fast online store with cart, filters, and instant page loads under one second.",
        image: "./ecommerce-thumbnail.png",
        link: "https://shopease-aafaque.netlify.app/",
        icon: <RiShoppingCartFill />,
        category: "Digital Stores (E-Comm)",
        techStack: ["React", "Redux", "Tailwind CSS"],
        status: "Live",
        id: 2,
    },
    {
        title: "Yacht Booking Website",
        description:
            "Luxury yacht booking lead generation website with smooth scroll animations and elegant design.",
        image: "./yacht-booking-thumbnail.png",
        link: "https://sea-cros.netlify.app",
        icon: <RiShipFill />,
        category: "Conversion Websites",
        techStack: ["React", "GSAP", "Lenis"],
        status: "Live",
        id: 10,
    },
    {
        title: "Doctor Booking Portal",
        description:
            "Book doctor appointments with interactive calendar and real-time slot availability.",
        image: "./doctor-booking-thumbnail.png",
        link: "https://dockyy.netlify.app",
        icon: <RiHeartPulseFill />,
        category: "Conversion Websites",
        techStack: ["React", "Tailwind CSS", "Framer Motion"],
        status: "Live",
        id: 11,
    },
    {
        title: "Dubai Tour",
        description:
            "Browse and select exclusive Dubai travel packages with interactive sliders and detailed itineraries.",
        image: "./dubai-tourism-thumbnail.png",
        link: "https://dubai-tt.netlify.app/",
        icon: <RiPlaneFill />,
        category: "Conversion Websites",
        techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
        status: "Live",
        id: 8,
    },
    {
        title: "Food Delivery App",
        description:
            "Online food ordering website with menu, cart, and orders sent directly to WhatsApp.",
        image: "./food-delivery-thumbnail.png",
        link: "https://bread-and-bite.netlify.app/",
        icon: <RiMotorbikeFill />,
        category: "Digital Stores (E-Comm)",
        techStack: ["React", "Tailwind CSS", "WhatsApp API"],
        status: "Live",
        id: 3,
    },
    {
        title: "Inventory Management",
        description:
            "Real-time inventory dashboard with stock levels, alerts, and live data updates.",
        image: "./inventory-mgmt-thumbnail.png",
        link: "https://nvntory-mgm.vercel.app/",
        icon: <RiSignalTowerFill />,
        category: "Business Software (SaaS)",
        techStack: ["Next.js", "Supabase", "WebSockets"],
        status: "Live",
        id: 1,
    },
    {
        title: "Premium Burger Shop",
        description:
            "Aesthetic, high-conversion web experience for a gourmet burger restaurant with interactive animations.",
        image: "./burger-shxp-thumbnail.png",
        link: "https://burger-shxp.netlify.app",
        icon: <RiRestaurantFill />,
        category: "Conversion Websites",
        techStack: ["React", "Tailwind CSS", "Framer Motion"],
        status: "Live",
        id: 12,
    },
    {
        title: "3D Burger Experience",
        description:
            "Highly immersive scroll-driven 3D animation website where a burger dynamically builds itself as you scroll.",
        image: "./3d-burger-thumbnail.png",
        link: "https://3d-burger.netlify.app",
        icon: <RiRestaurantFill />,
        category: "Conversion Websites",
        techStack: ["React", "Three.js", "GSAP ScrollTrigger"],
        status: "Live",
        id: 13,
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
                        loading="lazy"
                        decoding="async"
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
                <div className="p-4 md:p-5 flex flex-col flex-grow relative overflow-hidden bg-gradient-to-b from-transparent to-transparent group-hover:to-cyan-950/10 transition-colors duration-700">
                    
                    <div className="flex justify-between items-start mb-2.5 relative z-10">
                        <div className="pr-3">
                            <div className="flex items-center gap-1.5 mb-1.5">
                                <span className="text-slate-500 group-hover:text-cyan-500/80 transition-colors text-xs">
                                    {project.icon}
                                </span>
                                <span className="text-[7.5px] font-mono uppercase tracking-[0.25em] text-slate-500 group-hover:text-cyan-500/80 transition-colors">
                                    {project.category}
                                </span>
                            </div>
                            <h4 className="text-base md:text-lg font-bold text-slate-100 group-hover:text-white tracking-tight transition-colors">
                                {project.title}
                            </h4>
                        </div>
                        
                        {/* Directed Action Indicator */}
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/[0.05] bg-white/[0.01] flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-500 shrink-0 transform group-hover:-rotate-45">
                            <RiArrowLeftLine className="text-slate-500 group-hover:text-black text-[14px] md:text-base rotate-180 transition-colors duration-500" />
                        </div>
                    </div>

                    <p className="text-slate-400/80 text-[10.5px] md:text-[11px] leading-relaxed font-medium line-clamp-3 relative z-10 group-hover:text-slate-300 transition-colors flex-grow">
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
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto relative z-10"
                    >
                        {folders.map((folder, idx) => (
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
                                                    <img 
                                                        src={p.image} 
                                                        alt={p.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative bg-[#060606] border border-white/[0.06] rounded-[1.5rem] w-full max-w-5xl mx-auto shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden z-20"
                    >
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

                        {/* Header Bar */}
                        <div className="relative z-20 px-5 md:px-8 py-5 flex items-center justify-between border-b border-white/[0.05]">
                            
                            {/* Left: Back + Title */}
                            <div className="flex items-center gap-4">
                                <motion.button
                                    whileHover={{ x: -3 }}
                                    whileTap={{ scale: 0.93 }}
                                    onClick={() => setSelectedFolder(null)}
                                    className="group/btn w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-cyan-500/30 hover:bg-cyan-500/10 flex items-center justify-center transition-all duration-300"
                                >
                                    <RiArrowLeftLine className="text-slate-400 group-hover/btn:text-cyan-400 text-base transition-colors" />
                                </motion.button>
                                
                                <div className="flex items-center gap-3">
                                    <RiFolder3Fill className="text-lg text-cyan-500/50" />
                                    <motion.h3 
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
                                        className="text-lg md:text-xl font-bold text-white tracking-tight"
                                    >
                                        {selectedFolder.name}
                                    </motion.h3>
                                </div>
                            </div>
                            
                            {/* Right: Count Badge */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.15 }}
                                className="flex items-center gap-2 text-[11px] font-medium text-slate-400 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                {selectedFolder.projects.length} {selectedFolder.projects.length === 1 ? 'project' : 'projects'}
                            </motion.div>
                        </div>

                        {/* Projects Grid */}
                        <div className="p-5 md:p-8">
                            <div className={`grid gap-5 md:gap-6 relative z-20 ${
                                selectedFolder.projects.length <= 2 
                                    ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' 
                                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                            }`}>
                                <AnimatePresence>
                                    {selectedFolder.projects.map((project, idx) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 30, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ 
                                                duration: 0.5,
                                                delay: 0.1 + idx * 0.08, 
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
