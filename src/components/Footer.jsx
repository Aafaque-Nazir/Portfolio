import {
  RiGithubFill,
  RiLinkedinFill,
  RiTwitterXFill,
  RiInstagramLine,
  RiHeartFill,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Brand Name */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Aafaque<span className="text-cyan-400">.</span>
          </h2>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 mb-8">
          <a
            href="https://github.com/Aafaque-Nazir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110"
          >
            <RiGithubFill className="text-2xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/aafaque-nazir/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110"
          >
            <RiLinkedinFill className="text-2xl" />
          </a>
          <a
            href="https://www.instagram.com/aafaque.7/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors duration-300 hover:scale-110"
          >
            <RiInstagramLine className="text-2xl" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-sm font-medium flex items-center gap-1.5 opacity-80">
          <span>
            &copy; {new Date().getFullYear()} Designed & Built by Aafaque
          </span>
          <RiHeartFill className="text-red-500 animate-pulse text-xs" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
