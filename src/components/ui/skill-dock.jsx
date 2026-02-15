"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import {
    RiGlobalLine,
    RiCodeSSlashLine,
    RiServerLine,
    RiDatabase2Line,
    RiTerminalBoxLine,
    RiBrainLine,
    RiToolsFill
} from "react-icons/ri";

const categories = [
    { id: "All", label: "Overview", icon: <RiGlobalLine /> },
    { id: "Frontend", label: "Frontend", icon: <RiCodeSSlashLine /> },
    { id: "Backend", label: "Backend", icon: <RiServerLine /> },
    { id: "Database", label: "Database", icon: <RiDatabase2Line /> },
    { id: "DevOps", label: "DevOps", icon: <RiTerminalBoxLine /> },
    { id: "AI", label: "AI/ML", icon: <RiBrainLine /> },
    { id: "Tools", label: "Tools", icon: <RiToolsFill /> },
];

export function SkillDock({ activeCategory, setCategory }) {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="mx-auto flex h-20 md:h-24 items-end gap-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 px-4 pb-4 max-w-fit shadow-[0_0_20px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
        >
            {categories.map((cat) => (
                <DockIcon
                    key={cat.id}
                    mouseX={mouseX}
                    cat={cat}
                    isActive={activeCategory === cat.id}
                    onClick={() => setCategory(cat.id)}
                />
            ))}
        </motion.div>
    );
}

function DockIcon({ mouseX, cat, isActive, onClick }) {
    const ref = useRef(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [45, 85, 45]);
    const width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            onClick={onClick}
            className="aspect-square rounded-full flex items-center justify-center relative cursor-pointer group z-0 hover:z-50"
        >
            {/* Visual Container (Masked) */}
            <div className={`absolute inset-0 rounded-full flex items-center justify-center overflow-hidden border backdrop-blur-sm transition-all duration-300 ${isActive
                ? "bg-cyan-500/20 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                }`}>

                <span className={`text-xl md:text-3xl transition-all duration-300 relative z-10 ${isActive ? "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" : "text-neutral-400 group-hover:text-white"}`}>
                    {cat.icon}
                </span>

                {/* Active Indicator (Spotlight) */}
                {isActive && (
                    <motion.div
                        layoutId="active-spotlight"
                        className="absolute inset-0 bg-radial-gradient from-cyan-400/20 to-transparent rounded-full z-0"
                    />
                )}
            </div>

            {/* Tooltip (Unmasked) */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-cyan-400 text-[10px] font-bold uppercase tracking-wider rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none border border-cyan-500/30 shadow-lg translate-y-2 group-hover:translate-y-0 z-50">
                {cat.label}
            </span>
        </motion.div>
    );
}
