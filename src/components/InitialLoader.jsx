import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper function to generate random alphanumeric scramble
const scramble = (len) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let result = "";
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

const InitialLoader = ({ onComplete }) => {
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [percent, setPercent] = useState(0);
    const [scrambledPhase, setScrambledPhase] = useState("INITIALIZING");

    // Terminal Logs state
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const bootSequence = [
            "ACCESSING KERNEL...",
            "BYPASSING SECURITY PROTOCOLS...",
            "LOADING UI MODULES...",
            "MOUNTING 3D ASSETS...",
            "ESTABLISHING SYNC...",
            "SYSTEM READY."
        ];
        let logIndex = 0;

        const bootInterval = setInterval(() => {
            if (logIndex < bootSequence.length) {
                const currentLog = bootSequence[logIndex];
                if (currentLog) {
                    setLogs(prev => [...prev, `> ${currentLog}`]);
                }
                logIndex++;
            } else {
                clearInterval(bootInterval);
            }
        }, 400);

        const percentInterval = setInterval(() => {
            setPercent(prev => {
                if (prev >= 100) {
                    clearInterval(percentInterval);
                    setTimeout(() => {
                        setLoadingComplete(true);
                        setTimeout(onComplete, 1200); // Trigger exit animation
                    }, 500);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 12) + 2;
            });
        }, 100);

        const scrambleInterval = setInterval(() => {
            setScrambledPhase(scramble(12));
        }, 50);

        return () => {
            clearInterval(bootInterval);
            clearInterval(percentInterval);
            clearInterval(scrambleInterval);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{
                    opacity: 0,
                    clipPath: "inset(0 0 100% 0)", // Wipe up exit
                    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
                }}
                className="fixed inset-0 z-[9999] justify-center bg-black flex flex-col items-center overflow-hidden font-mono"
            >
                {/* Background Grid that slowly scales */}
                <motion.div
                    animate={{ scale: [1, 1.1], opacity: [0, 0.15] }}
                    transition={{ duration: 4, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px"
                    }}
                />

                {/* Ambient Cyan Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

                {/* Main Content */}
                <div className="relative z-10 w-full max-w-2xl px-8 flex flex-col">

                    {/* Top Scrambled Decryptor */}
                    <div className="flex justify-between items-end border-b border-cyan-500/30 pb-4 mb-8">
                        <div className="text-cyan-500 text-xs tracking-[0.4em] opacity-80">
                            {loadingComplete ? "SYS_AWAKE" : scrambledPhase}
                        </div>
                        <div className="text-cyan-400 text-sm font-black tracking-widest">
                            v2.0.26
                        </div>
                    </div>

                    {/* Huge Central Number Display */}
                    <div className="flex flex-col items-center justify-center py-12">
                        <motion.div
                            className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-500 tracking-tighter"
                            animate={{ opacity: [0.8, 1, 0.9], filter: ["blur(2px)", "blur(0px)", "blur(1px)"] }}
                            transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
                        >
                            <span className="text-cyan-500/50 font-light mr-4">[</span>
                            {percent.toString().padStart(3, '0')}
                            <span className="text-cyan-500/50 font-light ml-4">]</span>
                        </motion.div>
                        <div className="h-1 w-24 bg-cyan-500/50 mt-8 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${percent}%` }}
                            />
                        </div>
                    </div>

                    {/* Terminal Boot Logs */}
                    <div className="mt-8 h-32 flex flex-col justify-end overflow-hidden">
                        <AnimatePresence>
                            {logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-cyan-300 text-xs md:text-sm tracking-widest mb-2"
                                >
                                    {log}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                </div>

                {/* Scanline Overlay */}
                <motion.div
                    animate={{ top: ["-10%", "110%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-8 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none z-50"
                />

            </motion.div>
        </AnimatePresence>
    );
};

export default InitialLoader;
