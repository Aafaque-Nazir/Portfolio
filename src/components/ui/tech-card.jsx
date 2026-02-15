"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function TechCard({ tech, index }) {
    const ref = useRef(null);

    // Mouse position logic for 3D tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                duration: 0.2,
                delay: index * 0.05,
                type: "spring",
                stiffness: 400, // Super snappy
                damping: 25
            }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative w-20 h-20 md:w-24 md:h-24 cursor-pointer z-0 hover:z-50 transition-all duration-200 ease-out"
        >
            {/* INNER CONTAINER: Functionally mask the rotating border */}
            <div className="absolute inset-0 rounded-full bg-slate-950 border border-white/5 overflow-hidden backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] group-hover:border-cyan-500/50">

                {/* Animated Rotating Border (Permanent) */}
                <div
                    className="absolute inset-[-50%] w-[200%] h-[200%] opacity-70 group-hover:opacity-100 transition-opacity duration-200 animate-[spin_3s_linear_infinite] z-0 will-change-transform"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, ${tech.color} 60deg, transparent 120deg)`
                    }}
                />

                {/* Inner Background to mask the center */}
                <div className="absolute inset-[2px] rounded-full bg-slate-950/90 z-10" />

                {/* Inner Glow Spotlight */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-full z-20 mix-blend-screen"
                    style={{
                        background: `radial-gradient(circle at center, ${tech.color}30, transparent 70%)`
                    }}
                />

                {/* Top Highlight Border */}
                <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" />

                {/* Floating Content (Icon) */}
                <div className="relative h-full w-full flex flex-col items-center justify-center transform-style-3d z-30">
                    <motion.div
                        className="text-3xl md:text-4xl transition-all duration-200 group-hover:scale-110 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
                        style={{ color: tech.color }}
                    >
                        <tech.icon />
                    </motion.div>
                </div>
            </div>

            {/* NAME TOOLTIP: Enhanced Visibility + Info */}
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center gap-1 z-50 pointer-events-none translate-y-2 group-hover:translate-y-0 min-w-max">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-cyan-200 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-cyan-500/30 whitespace-nowrap shadow-xl backdrop-blur-md">
                    {tech.name}
                </span>
                {tech.category && (
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 bg-black/50 px-2 py-0.5 rounded-full border border-white/10">
                        {tech.category}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
