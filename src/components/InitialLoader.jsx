import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- THE SCRAMBLE ENGINE ---
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=-_";
const ScrambleText = ({ text, delay = 0, duration = 0.8 }) => {
    const [display, setDisplay] = useState("");
    
    useEffect(() => {
        let frame = 0;
        const totalFrames = duration * 60;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (frame >= totalFrames) {
                    setDisplay(text);
                    clearInterval(interval);
                    return;
                }
                
                const progress = frame / totalFrames;
                const scrambled = text.split("").map((char, i) => {
                    if (i < text.length * progress) return text[i];
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join("");
                
                setDisplay(scrambled);
                frame++;
            }, 1000 / 60);
            return () => clearInterval(interval);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [text, delay, duration]);

    return <span>{display}</span>;
};

const InitialLoader = ({ onComplete }) => {
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [percent, setPercent] = useState(0);
    const [logs, setLogs] = useState([]);

    const bootSequence = useMemo(() => [
        "INITIALIZING CORE...",
        "DECRYPTING ASSETS...",
        "MOUNTING QUANTUM MODULES...",
        "STABILIZING INTERFACE...",
        "OVERRIDE COMPLETE.",
        "SYSTEMS OPERATIONAL."
    ], []);

    useEffect(() => {
        let logIndex = 0;
        const bootInterval = setInterval(() => {
            if (logIndex < bootSequence.length) {
                setLogs(prev => [...prev, bootSequence[logIndex]]);
                logIndex++;
            } else {
                clearInterval(bootInterval);
            }
        }, 300);

        const percentInterval = setInterval(() => {
            setPercent(prev => {
                const next = prev + Math.floor(Math.random() * 8) + 1;
                if (next >= 100) {
                    clearInterval(percentInterval);
                    setTimeout(() => {
                        setLoadingComplete(true);
                        setTimeout(onComplete, 1500);
                    }, 400);
                    return 100;
                }
                return next;
            });
        }, 80).unref; // just to be safe but standard browser env doesn't have .unref

        return () => {
            clearInterval(bootInterval);
            clearInterval(percentInterval);
        };
    }, [onComplete, bootSequence]);

    return (
        <AnimatePresence>
            {!loadingComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        filter: "blur(20px) contrast(200%)", 
                        transition: { duration: 0.8, ease: "circIn" }
                    }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden font-mono text-cyan-500 selection:bg-cyan-500 selection:text-black"
                >
                    {/* --- HUD DECORATION (TOP CORNERS) --- */}
                    <div className="absolute top-10 left-10 flex flex-col gap-1 opacity-40 mix-blend-screen">
                        <div className="text-[10px] tracking-[0.3em] font-black uppercase">Region: Global/Edge</div>
                        <div className="text-[10px] tracking-[0.3em] font-light">Status: <span className="text-white animate-pulse">Running</span></div>
                        <div className="w-32 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent mt-2" />
                    </div>

                    <div className="absolute top-10 right-10 text-right opacity-40 mix-blend-screen">
                        <div className="text-[10px] tracking-[0.3em] font-black uppercase">Build: v4.2.0-Alpha</div>
                        <div className="text-[10px] tracking-[0.3em] font-light font-mono">
                            {Math.random().toString(16).substring(2, 10).toUpperCase()}
                        </div>
                    </div>

                    {/* --- CENTRAL CORE ELEMENT --- */}
                    <div className="relative flex flex-col items-center">
                        {/* THE GEOMETRIC INDICATOR */}
                        <div className="relative w-48 h-48 flex items-center justify-center mb-12">
                            {/* Rotating Ring */}
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-[0.5px] border-dashed border-cyan-500/30 rounded-full"
                            />
                            
                            {/* Scanning Pulse */}
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl"
                            />

                            {/* THE PERCENTAGE BOX */}
                            <div className="relative z-10 flex flex-col items-center">
                                <motion.span 
                                    className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                                >
                                    {percent}
                                </motion.span>
                                <span className="text-[10px] tracking-[0.5em] font-bold text-cyan-400 mt-[-5px] opacity-80 uppercase">Loading</span>
                            </div>

                            {/* FOUR CORNER BRACKETS */}
                            {[0, 90, 180, 270].map(rot => (
                                <div key={rot} className="absolute inset-0" style={{ transform: `rotate(${rot}deg)` }}>
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/40" />
                                </div>
                            ))}
                        </div>

                        {/* --- PROGRESS BAR --- */}
                        <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden group">
                           <motion.div 
                             className="absolute inset-0 bg-cyan-500 shadow-[0_0_15px_#22d3ee]"
                             initial={{ x: "-100%" }}
                             animate={{ x: `${percent - 100}%` }}
                             transition={{ type: "spring", damping: 30, stiffness: 100 }}
                           />
                        </div>
                    </div>

                    {/* --- LOG TERMINAL (BOTTOM) --- */}
                    <div className="absolute bottom-20 left-10 md:left-20 w-full max-w-sm px-4">
                        <div className="flex flex-col gap-1.5 h-32 justify-end">
                            <AnimatePresence mode="popLayout">
                                {logs.map((log, i) => (
                                    <motion.div
                                        key={log}
                                        initial={{ opacity: 0, x: -10, filter: "blur(5px)" }}
                                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="text-[10px] md:text-xs tracking-[0.2em] font-mono flex items-center gap-3"
                                    >
                                        <span className="w-1 h-3 bg-cyan-500/50" />
                                        <ScrambleText text={log} duration={0.3} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* --- THE SCAN LINE --- */}
                    <motion.div 
                        animate={{ top: ["-10%", "110%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-full h-[1px] bg-cyan-400/20 shadow-[0_0_20px_#22d3ee] pointer-events-none opacity-30 z-50"
                    />

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InitialLoader;
