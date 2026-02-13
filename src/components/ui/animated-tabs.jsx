"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const tabs = [
    { id: "All", label: "All Works" },
    { id: "EdTech & AI", label: "AI & EdTech" },
    { id: "SaaS Systems", label: "SaaS Platforms" },
    { id: "Commerce & Services", label: "Commerce & Scale" },
];

export function ProjectFilter({ activeTab, setActiveTab }) {
    return (
        <div className="flex flex-row items-center justify-center [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 outline-none tap-highlight-transparent"
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="active-pill"
                            className="absolute inset-0 bg-white dark:bg-white rounded-full mix-blend-difference"
                            transition={{
                                type: "spring",
                                bounce: 0.2,
                                duration: 0.6,
                            }}
                        />
                    )}
                    <span
                        className={`relative z-10 transition-colors duration-200 ${activeTab === tab.id
                                ? "text-black dark:text-black"
                                : "text-slate-400 dark:text-slate-400 hover:text-white"
                            }`}
                    >
                        {tab.label}
                    </span>
                </button>
            ))}
        </div>
    );
}
