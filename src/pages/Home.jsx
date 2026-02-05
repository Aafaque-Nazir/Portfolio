import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import { FaGithub } from "react-icons/fa";
import { PiReadCvLogoFill } from "react-icons/pi";
import BlurText from "../components/BlurText";
import DecryptedText from "../components/DecryptedText";
import LightRays from "../components/LightRays";

import GlobalBackground from "../components/GlobalBackground";

const Home = () => {
  return (
    <>
      <Navbar />
      <section
        id="home"
        className="relative z-0 min-h-screen flex flex-col justify-center items-center text-white mx-auto overflow-hidden"
      >
        <GlobalBackground />
        {/* 🌟 Dynamic Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Animated Gradient Orbs */}
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-500/10 blur-[100px] animate-pulse delay-1000" />

          {/* Tech Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          {/* Existing LightRays - Tuned for subtlety */}
          <div className="absolute inset-0 opacity-50">
            <LightRays
              raysOrigin="top-center"
              raysColor="#22d3ee" // Cyan-400
              raysSpeed={2}
              lightSpread={2}
              rayLength={1.5}
              followMouse={true}
              mouseInfluence={0.3}
              noiseAmount={0.05}
              distortion={0.1}
            />
          </div>
        </div>

        {/* 🚀 Main Content Container */}
        <div className="relative z-10 w-full max-w-7xl px-4 md:px-6 flex flex-col items-center justify-center text-center h-screen pt-16">
          {/* Floating 'Status' Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.1)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-300 text-[10px] md:text-xs font-mono tracking-widest uppercase">
              System Online // Ready to Build
            </span>
          </motion.div>

          {/* Hero Typography */}
          <div className="relative mb-2 w-full">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white drop-shadow-2xl leading-tight"
            >
              AAFAQUE
              <br className="lg:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-white lg:ml-4">
                NAZIR
              </span>
            </motion.h1>

            {/* Decorative 'Ghost' Text behind */}
            <h1 className="absolute top-1 left-1/2 -translate-x-1/2 w-full text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-cyan-500/10 -z-10 select-none blur-sm animate-pulse leading-tight">
              AAFAQUE
              <br className="lg:hidden" />
              <span className="lg:ml-4">NAZIR</span>
            </h1>
          </div>

          {/* Subheadline */}
          <div className="h-auto min-h-[30px] md:h-10 mb-4 flex items-center justify-center px-2">
            <BlurText
              text="FULL STACK ARCHITECT & SOFTWARE DEVELOPER"
              delay={100}
              animateBy="letters"
              direction="bottom"
              className="text-cyan-400/80 text-xs sm:text-sm md:text-lg font-mono tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold text-wrap"
            />
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-xl md:max-w-2xl mx-auto mb-8 px-2"
          >
            <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-light line-clamp-3 md:line-clamp-none">
              <DecryptedText
                text="I build intelligent software solutions. Leveraging AI-driven development to architect scalable full-stack applications that merge cutting-edge performance with next-gen user experiences."
                animateOn="view"
                revealDirection="center"
                className="inline"
              />
            </p>
          </motion.div>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-6 items-center w-full sm:w-auto"
          >
            <a
              href="#contact"
              className="group relative w-full sm:w-auto px-8 md:px-10 py-3 bg-white text-slate-950 font-bold text-sm md:text-lg rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] flex justify-center items-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Let's Build Impact
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
            </a>

            <div className="flex gap-4 w-full sm:w-auto justify-center">
              <a
                href="/AafaqueNazirResume.pdf"
                download
                className="group flex-1 sm:flex-none px-6 py-3 text-white font-medium rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base whitespace-nowrap"
              >
                <PiReadCvLogoFill className="text-lg md:text-xl group-hover:text-cyan-400 transition-colors" />
                <span>Download CV</span>
              </a>

              <a
                href="https://github.com/Aafaque-Nazir"
                target="_blank"
                className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 hover:text-white text-gray-400 transition-all flex items-center justify-center aspect-square"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
