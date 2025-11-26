import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
        className='navbar fixed top-0 left-0 w-full text-cyan-400 md:backdrop-blur-sm md:rounded-b-3xl z-50 flex justify-center mx-auto items-center p-4 md:shadow-xl'
      >
        {/* Hamburger Button */}
        <div className="lg:hidden z-20 cursor-pointer backdrop-blur-lg bg-black" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        {/* Desktop Menu */}
        <ul className='hidden lg:flex gap-7'>
          {['Home', 'About', 'Projects', 'Contact'].map((text) => (
            <li key={text} className='font-bold text-lg tracking-wider hover:scale-90 hover:animate-pulse transition-transform duration-400'>
              <a href={`#${text.toLowerCase()}`} className="hover:text-cyan-300">
                {text}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div
            className='absolute top-16 left-0 w-full bg-black/10 backdrop-blur-sm border-b shadow-xl z-40'
          >
            <ul className='flex flex-col items-center justify-center gap-8 py-6 text-lg'>
              {['Home', 'About', 'Projects', 'Contact'].map((text) => (
                <li key={text} className='font-bold tracking-wider hover:scale-90 hover:animate-pulse'>
                  <a
                    href={`#${text.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-white hover:text-cyan-400 transition-colors"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.nav>
    </>
  );
}