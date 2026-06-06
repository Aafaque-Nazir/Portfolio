import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { PiReadCvLogoFill } from "react-icons/pi";
import BlurText from "../components/BlurText";
import DecryptedText from "../components/DecryptedText";
import GlobalBackground from "../components/GlobalBackground";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const Home = () => {
  const firstName = "AAFAQUE".split("");
  const lastName = "NAZIR".split("");

  return (
    <>
      <section
        id="home"
        aria-label="Hero — Aafaque Nazir, Frontend Engineer & Creative Developer"
        className="relative z-0 min-h-screen flex items-center justify-center text-white overflow-hidden"
      >
        <GlobalBackground />

        {/* 🌟 Deep Ambient Glows (Pure Cyan Theme) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Main Core Glow */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-cyan-600/20 rounded-full blur-[120px]"
          />
          {/* Secondary Highlight */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-cyan-400/10 rounded-full blur-[100px]"
          />

          {/* Ultra-subtle scanline overlay for texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay pointer-events-none" />
        </div>

        {/* 🚀 Main Content Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full pt-28 pb-12">

          {/* Left Column: Typography & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 flex flex-col justify-center text-left"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="mb-8 inline-flex">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/20 bg-white/[0.03] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_8px_#22d3ee]"></span>
                </span>
                <span className="text-xs md:text-sm font-mono tracking-widest text-white/70 uppercase">
                  Available for new opportunities
                </span>
              </div>
            </motion.div>

            {/* Massive Typography */}
            <div className="relative mb-6">
              {/* Parallax Ghost Outline Text */}
              <motion.div
                animate={{ x: [-10, 10, -10], y: [-5, 5, -5] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -left-6 md:-top-10 md:-left-10 text-[4.5rem] sm:text-[6.5rem] md:text-[9rem] lg:text-[11rem] font-black tracking-tighter text-transparent -z-10 pointer-events-none select-none opacity-20"
                style={{ WebkitTextStroke: "1px rgba(34,211,238,0.3)" }}
              >
                AAFAQUE
              </motion.div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black tracking-tighter text-white leading-[0.9]">
                <div className="overflow-hidden flex flex-wrap">
                  {firstName.map((char, index) => (
                    <motion.span key={index} variants={charVariants} className="inline-block">
                      {char}
                    </motion.span>
                  ))}
                </div>
                <div className="overflow-hidden flex flex-wrap mt-2">
                  {lastName.map((char, index) => (
                    <motion.span
                      key={index}
                      variants={charVariants}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-white drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </h1>
            </div>

            {/* Subheadline */}
            <motion.div variants={itemVariants} className="mb-8">
              <BlurText
                text="WEB DEVELOPER & FRONTEND ENGINEER"
                delay={200}
                animateBy="words"
                direction="bottom"
                className="text-cyan-400/80 text-[10px] sm:text-xs md:text-sm font-mono tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold"
              />
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="max-w-2xl mb-8 md:mb-10">
              <p className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed font-light border-l-[1px] border-cyan-500/30 pl-4 md:pl-6">
                <DecryptedText
                  text="I build high-performance, visually stunning websites and interactive web applications that drive business growth. Combining pixel-perfect frontend engineering with seamless user experiences to deliver digital products that stand out."
                  animateOn="view"
                  revealDirection="start"
                  className="inline"
                />
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Primary Glowing Button */}
              <a
                href="#contact"
                aria-label="Navigate to contact section"
                className="group relative px-8 py-4 bg-white text-black font-bold text-sm md:text-base rounded-full overflow-hidden hover:scale-[1.02] transition-transform duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Let's Build Impact
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500 -z-10" />
              </a>

              {/* Secondary Buttons */}
              <div className="flex gap-4 w-full sm:w-auto">
                <a
                  href="/AafaqueNazirCV.pdf"
                  download
                  aria-label="Download Aafaque Nazir's CV as PDF"
                  className="group px-6 py-4 text-white font-medium rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base flex-1 sm:flex-none whitespace-nowrap"
                >
                  <PiReadCvLogoFill className="text-xl group-hover:text-cyan-400 transition-colors" />
                  <span>Download CV</span>
                </a>

                <a
                  href="https://github.com/Aafaque-Nazir"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit GitHub"
                  className="p-4 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:text-white text-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all flex items-center justify-center"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Abstract Decor / Grid Balancing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="hidden lg:flex col-span-4 justify-end items-center relative h-full"
          >
            {/* Elegant glassmorphic decorative element to balance the layout */}
            <div className="relative w-full aspect-square max-w-[300px] xl:max-w-[360px]">
              <div className="absolute inset-0 border border-cyan-500/10 rounded-full rotate-45 border-dashed" />
              <div className="absolute inset-4 border border-cyan-500/20 rounded-full" />
              <div className="absolute inset-12 border border-cyan-400/10 rounded-full animate-pulse" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl" />

              {/* Floating tech nodes */}
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 w-16 h-16 bg-cyan-500/5 border border-cyan-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.1)]"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-10 w-20 h-20 bg-cyan-500/5 border border-cyan-500/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.1)]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Home;
