"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

export function TechCard({ tech, index }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.4,
                delay: index * 0.01,
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
            onMouseMove={handleMouseMove}
            className="group relative w-14 h-14 md:w-20 md:h-20 cursor-pointer z-0 hover:z-50 shrink-0"
        >
            {/* INNER CONTAINER */}
            <div className="absolute inset-0 rounded-full bg-stone-950/40 backdrop-blur-3xl border border-white/5 overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:border-white/20 isolation-isolate">
                
                {/* Animated Rotating Border (MAX COLOR) */}
                <div
                    className="absolute inset-[-50%] w-[200%] h-[200%] opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-[spin_3s_linear_infinite] z-0 will-change-transform"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, ${tech.color || '#fff'} 60deg, transparent 120deg, transparent 180deg, ${tech.color || '#fff'} 240deg, transparent 300deg)`
                    }}
                />

                {/* Inner Background to mask the center */}
                <div className="absolute inset-[2.5px] rounded-full bg-black z-10" />

                {/* Spotlight FX */}
                <motion.div
                    className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
                    style={{
                        background: useTransform(
                            [mouseX, mouseY],
                            ([x, y]) => `radial-gradient(80px circle at ${x}px ${y}px, ${tech.color}20, transparent 85%)`
                        ),
                    }}
                />

                {/* Content (Icon) - COLOR BY DEFAULT */}
                <div className="relative h-full w-full flex flex-col items-center justify-center z-30">
                    <div 
                        className="text-2xl md:text-3xl transition-all duration-300 group-hover:scale-110 group-hover:brightness-125"
                        style={{ color: tech.color || '#fff', filter: `drop-shadow(0 0 10px ${tech.color}40)` }}
                    >
                        <tech.icon />
                    </div>
                </div>
            </div>

            {/* Terminal Tooltip */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center z-50 pointer-events-none translate-y-2 group-hover:translate-y-0 min-w-max">
                <div className="bg-black/95 backdrop-blur-lg border border-white/10 px-2.5 py-1 rounded-md shadow-2xl">
                    <span className="text-[9px] font-mono font-black text-white tracking-[0.1em] uppercase whitespace-nowrap">
                       {tech.name}
                    </span>
                </div>
                <div 
                   className="w-1.5 h-1.5 rounded-full mt-1 animate-pulse shadow-[0_0_8px_currentColor]" 
                   style={{ color: tech.color || '#22d3ee', backgroundColor: 'currentColor' }}
                />
            </div>
        </motion.div>
    );
}
