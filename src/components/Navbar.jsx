import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0.4, y: -70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='navbar fixed top-0 left-0 w-full text-cyan-400 backdrop-blur-sm bg-transparent md:rounded-b-3xl z-50 flex justify-between md:justify-center mx-auto items-center p-4 md:shadow-xl'
      >
        {/* Logo or Brand (optional placeholder) */}
        <div className="lg:hidden"></div>

        {/* Hamburger Button - only when menu is closed */}
        {!menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:hidden cursor-pointer text-cyan-400 backdrop-blur-lg bg-black/30 p-3 rounded-full hover:bg-black/50 transition-all" 
            onClick={toggleMenu}
          >
            <FaBars size={24} />
          </motion.div>
        )}

        {/* Desktop Menu */}
        <ul className='hidden lg:flex gap-7'>
          {['Home', 'About', 'Projects', 'Services', 'Contact'].map((text) => (
            <li key={text} className='font-bold text-lg tracking-wider hover:scale-90 hover:animate-pulse transition-transform duration-400'>
              <a href={`#${text.toLowerCase()}`} className="hover:text-cyan-300">
                {text}
              </a>
            </li>
          ))}
        </ul>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
              onClick={toggleMenu}
            />
            
            {/* Slide-in menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-black/40 backdrop-blur-xl border-l border-cyan-400/20 shadow-2xl z-[70] lg:hidden"
            >
              {/* Close button at the top */}
              <div className="flex justify-end p-6">
                <button
                  onClick={toggleMenu}
                  className="text-cyan-400 hover:text-cyan-300 hover:rotate-90 transition-all duration-300 p-2 rounded-full hover:bg-cyan-400/10"
                >
                  <FaTimes size={28} />
                </button>
              </div>

              {/* Navigation links */}
              <ul className='flex flex-col items-center justify-center gap-8 px-6 mt-12'>
                {['Home', 'About', 'Projects', 'Services', 'Contact'].map((text, index) => (
                  <motion.li
                    key={text}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='font-bold text-xl tracking-wider w-full text-center'
                  >
                    <a
                      href={`#${text.toLowerCase()}`}
                      onClick={toggleMenu}
                      className="block text-white hover:text-cyan-400 transition-colors py-3 px-6 rounded-lg hover:bg-cyan-400/10"
                    >
                      {text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}