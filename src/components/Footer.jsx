import {
  RiGithubFill,
  RiLinkedinFill,
  RiInstagramLine,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="relative z-50 w-full border-t border-white/5 bg-black pt-16 pb-12 flex flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
        {/* Brand Name */}
        <div className="mb-6 flex flex-col items-center">
          <h2 className="text-3xl font-black text-white tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            AAFAQUE<span className="text-cyan-400">.</span>
          </h2>
          <p className="text-gray-500 text-xs tracking-[0.2em] mt-2 uppercase font-mono">Full Stack Architect</p>
        </div>

        {/* Social Links */}
        <div className="flex gap-8 mb-10">
          {[
            { icon: RiGithubFill, href: "https://github.com/Aafaque-Nazir", color: "hover:text-white hover:drop-shadow-[0_0_10px_#fff]" },
            { icon: RiLinkedinFill, href: "https://www.linkedin.com/in/aafaque-nazir/", color: "hover:text-cyan-400 hover:drop-shadow-[0_0_10px_#22d3ee]" },
            { icon: RiInstagramLine, href: "https://www.instagram.com/aafaque.7/", color: "hover:text-pink-500 hover:drop-shadow-[0_0_10px_#ec4899]" }
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-500 transition-all duration-300 hover:scale-110 ${item.color}`}
            >
              <item.icon className="text-2xl" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-[10px] sm:text-xs font-mono tracking-wider flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/5 bg-slate-950/50 shadow-inner">
          <span>
            &copy; {new Date().getFullYear()} AAFAQUE NAZIR
          </span>
          <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_5px_#22d3ee]" />
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
