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
                duration: 0.5,
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
            }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border border-white/10 cursor-pointer overflow-hidden backdrop-blur-sm"
        >
            {/* Inner Glow Spotlight */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${tech.color}15, transparent 40%)`
                }}
            />

            {/* Top Highlight Border */}
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute inset-x-0 h-px w-full mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Floating Content */}
            <div className="relative h-full w-full flex flex-col items-center justify-center transform-style-3d perspective-500">
                <motion.div
                    className="text-3xl md:text-4xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-2xl"
                    style={{ color: tech.color }}
                >
                    <tech.icon />
                </motion.div>

                <span className="mt-2 text-[10px] md:text-xs font-bold opacity-60 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 text-white">
                    {tech.name}
                </span>

                {/* Reflection Glint */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none transform -skew-x-12" />
            </div>
        </motion.div>
    );
}
