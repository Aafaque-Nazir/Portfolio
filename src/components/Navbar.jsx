import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = [
    "home",
    "about",
    "techstack",
    "projects",
    "services",
    "contact",
  ];
  const activeSection = useActiveSection(sectionIds);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "techstack" },
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
          {/* Mobile Hamburger (Only visible on small screens) */}
          <div className="lg:hidden">
            <span className="text-white font-bold tracking-wider mr-4 text-sm uppercase">
              {activeSection === "techstack"
                ? "Skills"
                : activeSection || "Menu"}
            </span>
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
                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 block group ${
                      isActive
                        ? "text-slate-950 font-bold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {/* Active Background Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-cyan-400 rounded-full"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}

                    {/* Hover Background Pill (if not active) */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}

                    <span className="relative z-10">{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Menu Sidebar - slides in from right */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
              onClick={toggleMenu}
            />

            {/* Slide-in menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#0a0f1c] border-l border-white/10 shadow-2xl z-[70] lg:hidden flex flex-col"
            >
              {/* Close button at the top */}
              <div className="flex justify-between items-center p-6 border-b border-white/5">
                <span className="text-white font-bold tracking-widest uppercase text-sm">
                  Navigation
                </span>
                <button
                  onClick={toggleMenu}
                  className="text-gray-400 hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-white/5"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Navigation links */}
              <ul className="flex flex-col gap-2 p-6 overflow-y-auto">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={toggleMenu}
                        className={`block w-full py-4 px-6 rounded-xl text-lg font-medium transition-all ${
                          isActive
                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-auto p-6 border-t border-white/5">
                <p className="text-center text-xs text-gray-600 font-mono">
                  &copy; {new Date().getFullYear()} Aafaque Nazir
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
