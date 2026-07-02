import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { PiReadCvLogoFill } from "react-icons/pi";
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
          <div
            className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-cyan-600/20 rounded-full blur-[120px] opacity-20"
          />
          {/* Secondary Highlight */}
          <div
            className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-cyan-400/10 rounded-full blur-[100px] opacity-10"
          />

          {/* Ultra-subtle scanline overlay for texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay pointer-events-none" />
        </div>

        {/* 🚀 Main Content Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full pt-28 pb-12">

          {/* Main Column: Typography & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-12 flex flex-col justify-center text-left max-w-4xl"
          >


            {/* Massive Typography */}
            <div className="relative mb-6">
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
              <p className="text-cyan-400/80 text-[10px] sm:text-xs md:text-sm font-mono tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold">
                WEB DEVELOPER & FRONTEND ENGINEER
              </p>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="max-w-2xl mb-8 md:mb-10">
              <p className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed font-light border-l-[1px] border-cyan-500/30 pl-4 md:pl-6">
                I build fast, beautiful websites that help your business grow. I focus on writing clean code and creating great user experiences.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Primary Glowing Button */}
              <Link
                to="/contact"
                aria-label="Navigate to contact page"
                className="group relative px-8 py-4 bg-white text-black font-bold text-sm md:text-base rounded-full overflow-hidden hover:scale-[1.02] transition-transform duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Contact Me
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500 -z-10" />
              </Link>

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

        </div>
      </section>
    </>
  );
};

export default Home;
