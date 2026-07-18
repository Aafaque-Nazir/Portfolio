import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  RiGithubFill,
  RiLinkedinFill,
  RiInstagramLine,
  RiArrowRightLine
} from "react-icons/ri";
import { PiReadCvLogoFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

// Framer Motion Animation Variants for the liquid dynamic island expansion
const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
      height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
    }
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
      height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 350, damping: 26 }
  }
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const activeItemName = navItems.find(
    (item) => item.path === location.pathname
  )?.name || "Menu";

  return (
    <>
      {/* Background overlay when menu is open on mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        {/* Dynamic Island Pill Container - Upgraded Glassmorphism, Glows & Inner Shadow */}
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 28,
            mass: 0.75
          }}
          style={{ borderRadius: menuOpen ? "28px" : "9999px" }}
          className={`flex flex-col bg-gradient-to-b from-zinc-900/95 to-black/98 backdrop-blur-3xl border border-white/15 shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_12px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(34,211,238,0.06)] pointer-events-auto overflow-hidden transition-shadow duration-500 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_12px_45px_rgba(0,0,0,0.7),0_0_30px_rgba(34,211,238,0.12)] ${menuOpen ? "w-[calc(100vw-32px)] max-w-[360px] p-5" : "px-2 py-1.5"
            }`}
        >
          {/* Top Row / Resting State (Always visible) */}
          <div className="flex items-center justify-between w-full">

            {/* Desktop Navbar Menu (Hidden on Mobile) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 block group uppercase ${isActive ? "text-white" : "text-white/50 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavTabPC"
                          className="absolute inset-0 bg-white/10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        >
                          <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />
                        </motion.div>
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </>
                  )}
                </NavLink>
              ))}
              <div className="w-[1px] h-4 bg-white/10 mx-2" />
              <a
                href="/AafaqueNazirCV.pdf"
                download
                aria-label="Download CV"
                title="Download CV"
                className="relative px-3 py-2 rounded-full text-white/50 hover:text-cyan-400 transition-all duration-300 block group"
              >
                <PiReadCvLogoFill size={18} className="relative z-10" />
                <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </nav>

            {/* Mobile Bar View (Hidden on PC/Tablet when Expanded) */}
            {!menuOpen && (
              <div className="lg:hidden flex items-center justify-between w-full gap-8 px-3 py-1">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={location.pathname}
                      initial={{ y: 5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -5, opacity: 0 }}
                      className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase font-mono"
                    >
                      {activeItemName}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-1 pl-1 border-l border-white/20">
                  <a
                    href="/AafaqueNazirCV.pdf"
                    download
                    aria-label="Download CV"
                    className="flex items-center justify-center p-1.5 text-white/80 hover:text-cyan-400 transition-colors"
                  >
                    <PiReadCvLogoFill size={16} />
                  </a>
                  <button
                    onClick={toggleMenu}
                    className="flex items-center justify-center p-1.5 text-white/80 hover:text-cyan-400 transition-colors"
                    aria-label="Open Menu"
                  >
                    <FaBars size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Expanded Header View (Only visible when Expanded) */}
            {menuOpen && (
              <div className="flex justify-between items-center w-full pb-3 border-b border-white/10">
                <span className="text-white/60 font-black tracking-[0.3em] uppercase text-[9px] font-mono">Navigation</span>
                <button
                  onClick={toggleMenu}
                  className="text-white/85 bg-white/5 p-2 rounded-full border border-white/10 hover:text-cyan-400 hover:border-cyan-500/30 transition-all active:scale-95"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Expanded State Content (Stagger-Animates in-place on Mobile) */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="lg:hidden flex flex-col gap-4 mt-4 relative z-10 w-full"
              >
                {/* Navigation Links */}
                <ul className="flex flex-col gap-1.5">
                  {navItems.map((item) => (
                    <motion.li key={item.name} variants={itemVariants}>
                      <NavLink
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `group relative flex items-center justify-between w-full py-2.5 px-4 text-base font-bold transition-all duration-300 rounded-xl ${isActive
                            ? "text-white bg-white/5 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                            : "text-white/40 hover:text-white hover:bg-white/[0.02] border border-transparent"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className="relative z-10 tracking-widest uppercase text-xs font-semibold">
                              {item.name}
                            </span>
                            {isActive ? (
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                            ) : (
                              <RiArrowRightLine className="text-[10px] text-white/20 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                            )}
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>

                {/* Footer block */}
                <motion.div variants={itemVariants} className="pt-4 border-t border-white/10 flex flex-col gap-4">
                  {/* Download CV */}
                  <a
                    href="/AafaqueNazirCV.pdf"
                    download
                    className="flex items-center justify-center gap-2 w-full text-white/70 hover:text-cyan-400 transition-all duration-300 border border-white/10 hover:border-cyan-500/30 rounded-xl py-2.5 text-[10px] font-bold tracking-widest uppercase bg-gradient-to-b from-white/5 to-white/[0.01] hover:shadow-[0_4px_12px_rgba(34,211,238,0.05)]"
                  >
                    <PiReadCvLogoFill size={14} />
                    <span>Download CV</span>
                  </a>

                  {/* Social links */}
                  <div className="flex justify-center gap-3">
                    {[
                      { icon: RiGithubFill, href: "https://github.com/Aafaque-Nazir", color: "hover:text-white hover:border-white/20 hover:bg-white/5" },
                      { icon: RiLinkedinFill, href: "https://www.linkedin.com/in/aafaque-nazir/", color: "hover:text-cyan-400 hover:border-cyan-500/20 hover:bg-cyan-500/5" },
                      { icon: RiInstagramLine, href: "https://www.instagram.com/aafaque.75/", color: "hover:text-pink-500 hover:border-pink-500/20 hover:bg-pink-500/5" }
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-white/40 transition-all duration-300 hover:scale-105 p-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center ${item.color}`}
                      >
                        <item.icon size={18} />
                      </a>
                    ))}
                  </div>

                  <div className="text-[9px] text-white/30 font-mono tracking-widest text-center mt-1 uppercase">
                    &copy; {new Date().getFullYear()} AAFAQUE NAZIR
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </motion.header>
    </>
  );
}
