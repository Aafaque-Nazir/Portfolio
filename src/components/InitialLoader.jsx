import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = [
  "Initializing Sequence...",
  "Loading Assets...",
  "Establishing Connection...",
  "Finalizing Environment...",
  "Welcome."
];

const InitialLoader = ({ onComplete }) => {
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [percent, setPercent] = useState(0);
    const [stageIndex, setStageIndex] = useState(0);

    useEffect(() => {
        const duration = 2800; // Premium loading duration
        const intervalTime = 20;
        const totalSteps = duration / intervalTime;
        let step = 0;

        const interval = setInterval(() => {
            step++;
            const progress = Math.min((step / totalSteps) * 100, 100);
            
            // Custom easing for a more natural acceleration/deceleration
            const easeInOutQuart = progress < 50 
                ? 8 * Math.pow(progress/100, 4) * 100
                : (1 - Math.pow(-2 * (progress/100) + 2, 4) / 2) * 100;
                
            const currentPercent = Math.floor(easeInOutQuart);
            
            setPercent(currentPercent);

            if (currentPercent < 20) setStageIndex(0);
            else if (currentPercent < 45) setStageIndex(1);
            else if (currentPercent < 75) setStageIndex(2);
            else if (currentPercent < 95) setStageIndex(3);
            else setStageIndex(4);

            if (step >= totalSteps) {
                clearInterval(interval);
                setPercent(100);
                setTimeout(() => {
                    setLoadingComplete(true);
                    setTimeout(onComplete, 1200); // Allow exit animation to play smoothly
                }, 400); 
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [onComplete]);

    const circleRadius = 140;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const strokeDashoffset = circleCircumference - (percent / 100) * circleCircumference;

    return (
        <AnimatePresence>
            {!loadingComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        filter: "blur(20px)",
                        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Noise Texture Overlay */}
                    <div 
                        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                        }}
                    />

                    {/* Deep Ambient Glows */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.1, 1],
                                opacity: [0.08, 0.12, 0.08],
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-indigo-500/20 rounded-full blur-[100px]"
                        />
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.05, 0.08, 0.05],
                            }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-cyan-500/20 rounded-full blur-[80px] translate-y-1/4"
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Circular Progress Container */}
                        <div className="relative flex items-center justify-center w-[340px] h-[340px]">
                            {/* Inner rotating dash ring (very subtle) */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 border-[1px] border-dashed border-white/5 rounded-full"
                            />

                            {/* SVG Progress Ring */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(165,180,252,0.3)]">
                                {/* Track */}
                                <circle 
                                    cx="170" 
                                    cy="170" 
                                    r={circleRadius} 
                                    stroke="rgba(255,255,255,0.02)" 
                                    strokeWidth="1.5" 
                                    fill="none" 
                                />
                                {/* Progress */}
                                <motion.circle 
                                    cx="170" 
                                    cy="170" 
                                    r={circleRadius} 
                                    stroke="url(#gradient)" 
                                    strokeWidth="2" 
                                    fill="none" 
                                    strokeLinecap="round"
                                    initial={{ strokeDashoffset: circleCircumference }}
                                    animate={{ strokeDashoffset }}
                                    transition={{ duration: 0.1, ease: "linear" }}
                                    style={{ strokeDasharray: circleCircumference }}
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                                        <stop offset="50%" stopColor="#a5b4fc" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.5" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Center Content */}
                            <div className="flex flex-col items-center justify-center absolute">
                                <div className="flex items-start">
                                    <motion.span 
                                        className="text-7xl md:text-8xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50"
                                        style={{ fontVariantNumeric: "tabular-nums" }}
                                    >
                                        {percent}
                                    </motion.span>
                                    <span className="text-xl text-white/40 font-light mt-2">%</span>
                                </div>
                                <span className="text-[9px] md:text-[10px] tracking-[0.5em] text-white/30 uppercase mt-4 font-medium pl-2">
                                    System Loading
                                </span>
                            </div>
                        </div>

                        {/* Status Text Crossfade */}
                        <div className="mt-16 h-8 relative flex items-center justify-center w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={stageIndex}
                                    initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute text-xs md:text-sm tracking-[0.3em] text-white/50 font-light uppercase"
                                >
                                    {STAGES[stageIndex]}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InitialLoader;
