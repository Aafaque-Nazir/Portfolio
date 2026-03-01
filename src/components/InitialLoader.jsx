import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InitialLoader = ({ onComplete }) => {
    const [loadingText, setLoadingText] = useState(0);

    useEffect(() => {
        // Fast counting effect from 0 to 100
        const interval = setInterval(() => {
            setLoadingText((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onComplete(), 800); // Wait a bit after 100% before firing complete
                    return 100;
                }
                // Randomize the jump for a more "hacked/loading" feel
                return prev + Math.floor(Math.random() * 15) + 5;
            });
        }, 120);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{
                    opacity: 0,
                    y: "-100%", // Slide up to reveal site
                    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
                }}
                className="fixed inset-0 z-[9999] bg-[#05070e] flex flex-col items-center justify-center overflow-hidden"
            >
                {/* Background ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />

                {/* Central glitching circle */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="relative w-48 h-48 rounded-full border border-dashed border-cyan-500/30 flex items-center justify-center mb-8"
                >
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 rounded-full border-t-2 border-l-2 border-cyan-400"
                    />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-6 rounded-full border-b-2 border-r-2 border-purple-500 opacity-60"
                    />

                    {/* Percentage Text inside */}
                    <div className="absolute font-black text-4xl text-white tracking-tighter" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <motion.span
                            animate={{ opacity: [1, 0.8, 1], textShadow: ["0 0 10px #22d3ee", "0 0 20px #e879f9", "0 0 10px #22d3ee"] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            {loadingText}
                        </motion.span>
                        <span className="text-xl text-cyan-400 opacity-70">%</span>
                    </div>
                </motion.div>

                {/* Loading messages that change */}
                <div className="h-6 overflow-hidden relative w-full text-center">
                    <AnimatePresence mode="popLayout">
                        <motion.p
                            key={
                                loadingText < 30 ? "Initializing systems..." :
                                    loadingText < 60 ? "Establishing secure connection..." :
                                        loadingText < 90 ? "Rendering Antigravity UI..." :
                                            "Ready."
                            }
                            initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500 block absolute left-0 right-0"
                        >
                            {
                                loadingText < 30 ? "Initializing systems..." :
                                    loadingText < 60 ? "Establishing secure connection..." :
                                        loadingText < 90 ? "Rendering Antigravity UI..." :
                                            "Ready."
                            }
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Progress Bar At Bottom */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-white shadow-[0_0_15px_rgba(34,211,238,1)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${loadingText}%` }}
                        transition={{ ease: "easeOut", duration: 0.2 }}
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default InitialLoader;
