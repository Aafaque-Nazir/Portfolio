"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const categories = [
    { id: "All", label: "Overview", icon: "🌐" },
    { id: "Frontend", label: "Frontend", icon: "🎨" },
    { id: "Backend", label: "Backend", icon: "⚙️" },
    { id: "Database", label: "Database", icon: "🗄️" },
    { id: "DevOps", label: "DevOps", icon: "🚀" },
    { id: "AI", label: "AI/ML", icon: "🧠" },
    { id: "Tools", label: "Tools", icon: "🛠️" },
];

export function SkillDock({ activeCategory, setCategory }) {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="mx-auto flex h-24 items-end gap-2 md:gap-4 rounded-2xl bg-neutral-900/50 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-700/50 px-2 md:px-4 pb-3 max-w-[95vw] overflow-x-visible md:overflow-visible"
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

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
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
            className={`aspect-square rounded-full flex items-center justify-center relative cursor-pointer group transition-colors duration-200 ${isActive
                ? "bg-cyan-500/20 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                : "bg-neutral-800 border-neutral-700 hover:bg-neutral-700"
                } border`}
        >
            <span className="text-xl md:text-2xl filter drop-shadow-lg select-none">
                {cat.icon}
            </span>

            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                {cat.label}
            </span>

            {/* Active Indicator */}
            {isActive && (
                <motion.div
                    layoutId="active-dot"
                    className="absolute -bottom-2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_currentColor]"
                />
            )}
        </motion.div>
    );
}
