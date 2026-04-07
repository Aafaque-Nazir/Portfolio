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
        <CardContainer className="inter-var w-full h-full">
            <CardBody className="bg-gradient-to-b from-[#0a0f18] to-black relative group/card hover:shadow-2xl hover:shadow-cyan-500/[0.15] border-white/5 hover:border-cyan-500/30 w-full h-full rounded-2xl p-5 border backdrop-blur-xl flex flex-col transition-all duration-500 ease-out">
                
                {/* Header: Icon + Title */}
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-white flex items-center gap-3 tracking-tight group-hover/card:text-cyan-300 transition-colors"
                >
                    <span className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 text-xl border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover/card:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all">
                        {project.icon}
                    </span>
                    {project.title}
                </CardItem>

                {/* Description */}
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-slate-400 text-sm mt-4 line-clamp-2 leading-relaxed flex-grow font-medium"
                >
                    {project.description}
                </CardItem>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-5" />

                {/* Image */}
                <CardItem translateZ="100" className="w-full mt-auto relative z-10">
                    <div className="rounded-xl overflow-hidden shadow-2xl block h-44 relative group/image">
                        <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay opacity-0 group-hover/image:opacity-100 transition-opacity z-10" />
                        <img
                            src={project.image}
                            height="1000"
                            width="1000"
                            className="h-full w-full object-cover rounded-xl group-hover/card:scale-110 transition-transform duration-700 ease-out"
                            alt={project.title}
                        />
                    </div>
                </CardItem>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-5" />

                {/* Footer: Tech Stack + Link */}
                <div className="flex justify-between items-center mt-auto pb-1 relative z-20">
                    <CardItem
                        translateZ={20}
                        className="flex gap-2 text-xs font-bold"
                    >
                        {project.techStack.slice(0, 2).map((tech, idx) => (
                            <span key={idx} className="px-2.5 py-1.5 bg-white/[0.03] rounded-lg text-slate-300 border border-white/5 uppercase tracking-wider text-[9px] shadow-inner group-hover/card:border-white/10 transition-colors">
                                {tech}
                            </span>
                        ))}
                    </CardItem>
                    <CardItem
                        translateZ={20}
                        as={Link}
                        to={project.link}
                        target="__blank"
                        className="relative overflow-hidden px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 text-xs font-bold whitespace-nowrap transition-all group/btn"
                    >
                        <span className="relative z-10 flex items-center gap-1 group-hover/btn:text-white transition-colors">
                            View <span className="hidden sm:inline">Project</span> 
                            <RiArrowLeftLine className="rotate-135 ml-1" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
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
             {/* Floating Background Orbs for eye-catchy depth */}
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse" />
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }} />

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
                        className="relative bg-gradient-to-b from-[#05080e] to-black border border-white/[0.08] rounded-[40px] p-6 sm:p-10 md:p-14 lg:p-20 w-full max-w-[90rem] mx-auto shadow-2xl overflow-hidden z-20 hover:border-white/[0.15] transition-colors duration-700"
                    >
                         {/* Ambient Folder Glow */}
                         <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

                        {/* Folder Top Flap (Expanded) */}
                        <div className="absolute top-0 left-0 w-2/3 md:w-1/3 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-br-3xl shadow-[0_0_20px_rgba(34,211,238,0.4)]" />

                        {/* Header of the expanded folder */}
                        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-10 relative z-20">
                            <div>
                                <motion.button
                                    whileHover={{ x: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedFolder(null)}
                                    className="flex items-center gap-3 text-sm font-bold text-slate-400 hover:text-white transition-colors mb-8 group/back"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/5 group-hover/back:bg-white/20 group-hover/back:shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center transition-all duration-300">
                                        <RiArrowLeftLine className="text-current text-xl group-hover/back:-translate-x-1 transition-transform" />
                                    </div>
                                    <span className="uppercase tracking-widest text-xs">Return</span>
                                </motion.button>
                                
                                <div className="flex items-center gap-4">
                                     <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                                        <RiFolder3Fill className="text-3xl text-cyan-400" />
                                     </div>
                                    <div>
                                        <motion.h3 
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 tracking-tight"
                                        >
                                            {selectedFolder.name}
                                        </motion.h3>
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex items-center gap-3 mt-4"
                                        >
                                            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                                                Archive
                                            </span>
                                            <span className="text-slate-400 text-sm font-medium tracking-widest uppercase">
                                                {selectedFolder.projects.length} curated works inside
                                            </span>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Projects Grid for this specific folder */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 relative z-20">
                            <AnimatePresence>
                                {selectedFolder.projects.map((project, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ 
                                            duration: 0.6,
                                            delay: 0.3 + idx * 0.15, 
                                            ease: [0.16, 1, 0.3, 1] // Apple-like spring easing
                                        }}
                                        key={project.id}
                                        className="h-[450px]"
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
