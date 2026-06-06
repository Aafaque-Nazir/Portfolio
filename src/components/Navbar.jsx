import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  RiGithubFill,
  RiLinkedinFill,
  RiInstagramLine,
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
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        {/* Single Minimalist Center Pill */}
        <div className="flex items-center bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-full px-2 py-1.5 pointer-events-auto relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Center Floating Pill Menu (PC) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 block group uppercase ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTabPC"
                      className="absolute inset-0 bg-white/10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    >
                      {/* Subtle glowing bottom border */}
                      <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />
                    </motion.div>
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle (Dynamic Island Style) */}
          <div className="lg:hidden flex items-center gap-4 px-3 py-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeSection}
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -5, opacity: 0 }}
                  className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase"
                >
                  {activeSection || "Menu"}
                </motion.span>
              </AnimatePresence>
            </div>
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center p-1.5 text-white/80 hover:text-cyan-400 transition-colors"
              aria-label="Open Menu"
            >
              <FaBars size={16} />
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
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

              <div className="flex justify-between items-center p-8 relative z-10">
                <span className="text-white font-black tracking-[0.4em] uppercase text-[12px] opacity-60">NAVIGATION</span>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={toggleMenu}
                  className="text-white bg-white/5 p-3 rounded-full border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                >
                  <FaTimes size={16} />
                </motion.button>
              </div>

              <ul className="flex flex-col gap-4 p-8 relative z-10 overflow-y-auto">
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
                        className={`group relative flex items-center justify-between w-full py-4 text-[22px] sm:text-3xl font-black transition-all duration-300 ${isActive ? "text-white pl-4" : "text-white/30 hover:text-white hover:pl-4"
                          }`}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                        )}
                        <span className="relative z-10 tracking-[0.1em] uppercase">
                          {item.name}
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-auto p-8 bg-white/[0.02] border-t border-white/5 relative z-10">
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
                      <item.icon size={24} />
                    </motion.a>
                  ))}
                </div>
                <div className="text-xs text-white/30 font-mono tracking-widest flex flex-col gap-1">
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
