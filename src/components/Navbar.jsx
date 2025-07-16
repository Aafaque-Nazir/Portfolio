import React,{useState}from 'react'
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
    initial={{ opacity: 0.5, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    className='navbar text-cyan-400 bg-linear-to-r to-black via-black  from-[#0e3846] z-50 flex justify-between items-center bg-cyan-500 p-4 max-w-full relative'>
      <span className='font-bold text-2xl'><a href="#home">Portfolio</a></span>
      <div className="lg:hidden z-20 cursor-pointer" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
      </div>
        <ul className='hidden lg:flex gap-7'>
            {[ 'About', 'Skills', 'Projects', 'Contact '].map((text) => (
            <li key={text} className=' font-bold text-lg tracking-wider hover:scale-90 hover:animate-pulse transition-transform duration-400'>
              <a href={`#${text.toLowerCase()}`}>{text}</a>
            </li>
          ))}
        </ul>

        {menuOpen && (
          <div className='absolute top-16 left-0 w-full py-3 bg-gradient-to-r from-[#114759] via-black  to-black z-10 rounded-b-3xl shadow-lg'>
            <ul className='flex flex-col items-center justify-center  gap-8 text-lg'>
              {[ 'About', 'Skills', 'Projects', 'Contact '].map((text) => (
                <li key={text} className='
                  font-bold tracking-wider hover:scale-90 hover:animate-pulse'>
                  <a href={`#${text.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

    </motion.nav>
    
    </>
  )
}