import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  RiGithubFill,
  RiLinkedinFill,
  RiInstagramLine,
  RiTwitterFill
} from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = [
    "home",
    "about",
    "skills",
    "projects",
    "services",
    "contact",
  ];
  const activeSection = useActiveSection(sectionIds);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -100, duration: 1.5 });
      } else {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    if (menuOpen) setMenuOpen(false);
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Services", id: "services" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90%] md:max-w-none"
      >
        <div className="flex items-center justify-between gap-6 px-6 py-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-white/20 transition-colors duration-300">

          {/* Mobile Dynamic Indicator (Restored) */}
          <div className="lg:hidden flex items-center gap-2 mr-2">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeSection}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="text-[10px] font-black tracking-[0.3em] text-white uppercase ml-1"
              >
                {activeSection || "Menu"}
              </motion.span>
            </AnimatePresence>
          </div>

          <button
            onClick={toggleMenu}
            className="lg:hidden text-cyan-400 hover:text-cyan-300 transition-colors p-1"
            aria-label="Open Menu"
          >
            <FaBars size={20} />
          </button>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.name}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 block group ${isActive
                      ? "text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                      : "text-gray-400 hover:text-white"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-cyan-600/20 border border-cyan-400/50 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4),inset_0_0_10px_rgba(6,182,212,0.2)] overflow-hidden"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      >
                        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-200 to-transparent opacity-90" />
                      </motion.div>
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-[60] lg:hidden"
              onClick={toggleMenu}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[300px] sm:w-[400px] bg-black/40 backdrop-blur-3xl border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[70] lg:hidden flex flex-col"
            >
              <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                <div className="absolute top-1/4 -right-10 w-40 h-[1px] bg-cyan-500/50 rotate-45" />
                <div className="absolute bottom-1/4 -left-10 w-40 h-[1px] bg-cyan-500/50 rotate-45" />
              </div>

              <div className="flex justify-between items-center p-10 relative z-10">
                <span className="text-white font-black tracking-[0.4em] uppercase text-xs opacity-60">NAVIGATION</span>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={toggleMenu}
                  className="text-white bg-white/5 p-3 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-colors"
                >
                  <FaTimes size={20} />
                </motion.button>
              </div>

              <ul className="flex flex-col gap-6 p-10 relative z-10 overflow-y-auto">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`group relative flex items-center justify-between w-full py-4 text-2xl font-black transition-all duration-300 ${isActive ? "text-white" : "text-white/20 hover:text-white"
                          }`}
                      >
                        <span className="relative z-10 tracking-[0.1em] uppercase">
                          {item.name}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="mobileActivePin"
                            className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_15px_#22d3ee]"
                          />
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-auto p-10 bg-white/[0.02] border-t border-white/5 relative z-10">
                <div className="flex gap-6 mb-8">
                  {[
                    { icon: RiGithubFill, href: "https://github.com/Aafaque-Nazir", color: "hover:text-white" },
                    { icon: RiLinkedinFill, href: "https://www.linkedin.com/in/aafaque-nazir/", color: "hover:text-cyan-400" },
                    { icon: RiInstagramLine, href: "https://www.instagram.com/aafaque.75/", color: "hover:text-pink-500" }
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + (i * 0.1) }}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-white/30 transition-all duration-300 hover:scale-125 ${item.color}`}
                    >
                      <item.icon size={26} />
                    </motion.a>
                  ))}
                </div>
                <div className="text-[10px] text-white/20 font-mono tracking-widest uppercase flex flex-col gap-1">
                  <span>&copy; {new Date().getFullYear()} AAFAQUE NAZIR</span>
                  <span className="opacity-50">Authorized System Access</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
