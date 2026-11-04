import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  RiGithubFill,
  RiLinkedinFill,
  RiInstagramLine,
  RiArrowRightLine
} from "react-icons/ri";
import { PiReadCvLogoFill } from "react-icons/pi";
import { Search } from "lucide-react";
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

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("openCommandMenu"));
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about/" },
    { name: "Projects", path: "/projects/" },
    { name: "Services", path: "/services/" },
    { name: "Blog", path: "/blog/" },
    { name: "Contact", path: "/contact/" },
  ];

  const currentPath = location.pathname.endsWith("/") ? location.pathname : `${location.pathname}/`;
  const activeItemName = navItems.find(
    (item) => item.path === currentPath || item.path === location.pathname
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none select-none"
      >
        {/* Dynamic Island Pill Container — Hairline 1px Obsidian Border & Clean Depth */}
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 30,
            mass: 0.75
          }}
          style={{ borderRadius: menuOpen ? "24px" : "9999px" }}
          className={`flex flex-col bg-zinc-950/90 backdrop-blur-2xl border border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] pointer-events-auto overflow-hidden transition-all duration-300 select-none ${
            menuOpen ? "w-[calc(100vw-32px)] max-w-[360px] p-5" : "px-2.5 py-1.5"
          }`}
        >
          {/* Top Row / Resting State */}
          <div className="flex items-center justify-between w-full gap-2">

            {/* Desktop Navbar Menu (Hidden on Mobile) */}
            <nav className="hidden lg:flex items-center gap-1 select-none">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors block uppercase select-none ${
                      isActive ? "text-white" : "text-zinc-400 hover:text-zinc-100"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavTabPC"
                          className="absolute inset-0 bg-white/[0.1] rounded-full border border-white/[0.08]"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        >
                          <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-white/90" />
                        </motion.div>
                      )}
                      <span className="relative z-10 select-none pointer-events-none">{item.name}</span>
                    </>
                  )}
                </NavLink>
              ))}

              <div className="w-[1px] h-3.5 bg-white/10 mx-1.5" />

              {/* Command Palette Trigger Badge */}
              <button
                type="button"
                onClick={openCommandPalette}
                className="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all cursor-pointer active:scale-95 select-none"
                title="Search & Commands (Ctrl+K)"
                aria-label="Search and commands"
              >
                <Search size={12} className="text-zinc-400" />
                <kbd className="text-[10px] font-mono text-zinc-400 bg-white/5 px-1 py-0.2 rounded border border-white/10">
                  ⌘K
                </kbd>
              </button>

              {/* Resume download */}
              <a
                href="/Aafaque_Nazir_Resume.pdf"
                download
                aria-label="Download Resume"
                title="Download Resume PDF"
                className="relative p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all select-none"
              >
                <PiReadCvLogoFill size={16} />
              </a>
            </nav>

            {/* Mobile Bar View (Hidden on PC/Tablet when Expanded) */}
            {!menuOpen && (
              <div className="lg:hidden flex items-center justify-between w-full gap-4 px-2 py-0.5 select-none">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5 flex-shrink-0 items-center justify-center">
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={location.pathname}
                      initial={{ y: 4, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -4, opacity: 0 }}
                      className="text-[10px] font-semibold tracking-wider text-zinc-200 uppercase font-mono select-none"
                    >
                      {activeItemName}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-1 pl-2 border-l border-white/10">
                  <button
                    onClick={openCommandPalette}
                    className="p-1.5 text-zinc-300 hover:text-white transition-colors"
                    aria-label="Search"
                    title="Search"
                  >
                    <Search size={14} />
                  </button>
                  <a
                    href="/Aafaque_Nazir_Resume.pdf"
                    download
                    aria-label="Download Resume"
                    className="p-1.5 text-zinc-300 hover:text-white transition-colors"
                  >
                    <PiReadCvLogoFill size={14} />
                  </a>
                  <button
                    onClick={toggleMenu}
                    className="p-1.5 text-zinc-300 hover:text-white transition-colors"
                    aria-label="Open Menu"
                  >
                    <FaBars size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Expanded Header View (Only visible when Expanded) */}
            {menuOpen && (
              <div className="flex justify-between items-center w-full pb-3 border-b border-white/10 select-none">
                <span className="text-zinc-400 font-semibold tracking-wider uppercase text-[10px] font-mono">Navigation</span>
                <button
                  onClick={toggleMenu}
                  aria-label="Close navigation menu"
                  className="text-zinc-300 bg-white/5 p-1.5 rounded-full border border-white/10 hover:text-white transition-all active:scale-95"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Expanded State Content (Mobile) */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="lg:hidden flex flex-col gap-3 mt-3 relative z-10 w-full select-none"
              >
                {/* Search trigger button in mobile menu */}
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openCommandPalette();
                  }}
                  className="flex items-center justify-between w-full py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Search size={14} className="text-zinc-400" />
                    <span>Search or jump to...</span>
                  </span>
                  <kbd className="text-[10px] font-mono text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">⌘K</kbd>
                </button>

                {/* Navigation Links */}
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <motion.li key={item.name} variants={itemVariants}>
                      <NavLink
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `group relative flex items-center justify-between w-full py-2 px-3 text-sm font-medium transition-all rounded-lg select-none ${isActive
                            ? "text-white bg-white/[0.08] border border-white/10"
                            : "text-zinc-400 hover:text-white hover:bg-white/[0.03] border border-transparent"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className="relative z-10 tracking-wide uppercase text-xs">
                              {item.name}
                            </span>
                            {isActive ? (
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            ) : (
                              <RiArrowRightLine className="text-[11px] text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
                            )}
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>

                {/* Footer block */}
                <motion.div variants={itemVariants} className="pt-3 border-t border-white/10 flex flex-col gap-3">
                  {/* Download CV */}
                  <a
                    href="/Aafaque_Nazir_Resume.pdf"
                    download
                    aria-label="Download Aafaque Nazir Resume"
                    className="flex items-center justify-center gap-2 w-full text-zinc-300 hover:text-white transition-all border border-white/10 hover:border-white/20 rounded-lg py-2 text-[11px] font-medium tracking-wide uppercase bg-white/[0.03]"
                  >
                    <PiReadCvLogoFill size={14} />
                    <span>Download Resume PDF</span>
                  </a>

                  {/* Social links */}
                  <div className="flex justify-center gap-2">
                    {[
                      { icon: RiGithubFill, href: "https://github.com/Aafaque-Nazir", label: "Visit GitHub Profile" },
                      { icon: RiLinkedinFill, href: "https://www.linkedin.com/in/aafaque-nazir/", label: "Visit LinkedIn Profile" },
                      { icon: RiInstagramLine, href: "https://www.instagram.com/aafaque.75/", label: "Visit Instagram Profile" }
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="text-zinc-400 hover:text-white transition-all p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center hover:bg-white/[0.06]"
                      >
                        <item.icon size={16} />
                      </a>
                    ))}
                  </div>

                  <div className="text-[9px] text-zinc-500 font-mono tracking-wider text-center uppercase">
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
