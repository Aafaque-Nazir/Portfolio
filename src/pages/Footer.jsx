import React from 'react';

const Footer = () => {
  return (
    <footer className="  text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-lg">&copy; {new Date().getFullYear()} Aafaque Nazir. All rights reserved.</p>
        <div className="mt-4">
          <a href="https://github.com/Aafaque-Nazir" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-600 mx-2">GitHub</a>
          <a href="https://www.linkedin.com/in/aafaque-nazir/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-600 mx-2">LinkedIn</a>
          <a href="mailto:aafaquebuisness@gmail.com" className="text-cyan-400 hover:text-cyan-600 mx-2">Email</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
