import {
  RiGithubFill,
  RiLinkedinFill,
  RiInstagramLine,
  RiArrowRightLine,
} from "react-icons/ri";

const Footer = () => {
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -100, duration: 1.5 });
      } else {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
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
    <footer role="contentinfo" aria-label="Aafaque Nazir — Footer and navigation" className="relative z-50 w-full border-t border-white/5 bg-black pt-16 pb-8 overflow-hidden">
      {/* Premium Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-950/15 via-black to-black -z-0" />
      
      {/* Ambient Top Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Column 1: Brand & Business Details */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-wider uppercase">
                Aafaque Nazir
              </h2>
              <p className="text-gray-400 text-[10px] sm:text-xs tracking-[0.15em] mt-1.5 uppercase font-mono">
                Independent Freelancer & Full-Stack Developer
              </p>
            </div>

            <div className="text-gray-500 text-[11px] sm:text-xs font-mono max-w-sm mt-1 leading-relaxed space-y-2">
              <p>
                <strong className="text-gray-300">Business Name:</strong> Aafaque Nazir<br/>
                <strong className="text-gray-300">Main Activity:</strong> Freelance Full-Stack Web Development, UI/UX Design & Digital Solutions.
              </p>
              <p>
                <strong className="text-gray-300">Services Provided:</strong> Custom High-Converting Websites, E-Commerce Stores, and Full-Stack Web Applications.
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="text-white text-xs font-bold font-mono uppercase tracking-[0.2em] text-white/40">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="group inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-all font-mono"
                  >
                    <RiArrowRightLine className="text-[10px] opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-cyan-400" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h3 className="text-white text-xs font-bold font-mono uppercase tracking-[0.2em] text-white/40">
              Connect
            </h3>
            <p className="text-gray-400 text-xs font-mono">
              Have an idea? Let's discuss.
            </p>
            <div className="flex gap-4 mb-2">
              {[
                { icon: RiGithubFill, href: "https://github.com/Aafaque-Nazir", color: "hover:text-white hover:border-white hover:bg-white/5", label: "Visit Aafaque Nazir's GitHub" },
                { icon: RiLinkedinFill, href: "https://www.linkedin.com/in/aafaque-nazir/", color: "hover:text-cyan-400 hover:border-cyan-500/20 hover:bg-cyan-500/5", label: "Visit Aafaque Nazir's LinkedIn" },
                { icon: RiInstagramLine, href: "https://www.instagram.com/aafaque.75/", color: "hover:text-pink-500 hover:border-pink-500/20 hover:bg-pink-500/5", label: "Visit Aafaque Nazir's Instagram" }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`w-10 h-10 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-gray-400 transition-all duration-300 hover:scale-105 ${item.color}`}
                >
                  <item.icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/5" />

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          {/* Copyright */}
          <div className="text-gray-500 text-[10px] sm:text-xs font-mono tracking-wider flex items-center gap-2.5">
            <span>&copy; {new Date().getFullYear()} AAFAQUE NAZIR</span>
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_5px_#22d3ee]" />
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>

      {/* Modern Oversized Giant Background Typography */}
      <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 overflow-hidden pointer-events-none select-none h-16 md:h-24 flex items-end justify-center z-0 opacity-[0.01]">
        <span className="text-[12vw] font-black tracking-[0.15em] text-white uppercase leading-none select-none">
          AAFAQUE
        </span>
      </div>
    </footer>
  );
};

export default Footer;
