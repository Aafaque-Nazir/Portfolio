"use client";

import { motion } from "framer-motion";

export function TechCard({ tech, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{
                duration: 0.4,
                delay: index * 0.02,
                ease: "easeOut"
            }}
            className="group relative w-12 h-12 md:w-16 md:h-16 lg:w-14 lg:h-14 cursor-pointer z-0 hover:z-50 shrink-0"
        >
            {/* INNER CONTAINER (Hardware Accelerated) */}
            <div className="absolute inset-0 rounded-full bg-stone-950 border border-white/5 overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:border-white/20 isolation-isolate transform-gpu">

                {/* Animated Rotating Border (Hidden until hover for performance) */}
                <div
                    className="absolute inset-[-50%] w-[200%] h-[200%] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-300 z-0 will-change-transform"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, ${tech.color || '#fff'} 60deg, transparent 120deg, transparent 180deg, ${tech.color || '#fff'} 240deg, transparent 300deg)`
                    }}
                />

                {/* Inner Background to mask the center */}
                <div className="absolute inset-[2px] rounded-full bg-black z-10" />

                {/* Spotlight FX (CSS only, zero JS overhead) */}
                <div
                    className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
                    style={{
                        background: `radial-gradient(circle at center, ${tech.color}30 0%, transparent 70%)`
                    }}
                />

                {/* Content (Icon) */}
                <div className="relative h-full w-full flex flex-col items-center justify-center z-30">
                    <div
                        className="text-xl md:text-2xl transition-all duration-300 group-hover:scale-110 group-hover:brightness-125"
                        style={{ color: tech.color || '#fff', filter: `drop-shadow(0 0 8px ${tech.color}40)` }}
                    >
                        <tech.icon />
                    </div>
                </div>
            </div>

            {/* Terminal Tooltip */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center z-50 pointer-events-none translate-y-2 group-hover:translate-y-0 min-w-max">
                <div className="bg-black/95 border border-white/10 px-2.5 py-1 rounded-md shadow-xl">
                    <span className="text-[9px] font-mono font-black text-white tracking-[0.1em] uppercase whitespace-nowrap">
                        {tech.name}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
