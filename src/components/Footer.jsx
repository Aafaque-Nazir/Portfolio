import {
  RiGithubFill,
  RiLinkedinFill,
  RiInstagramLine,
  RiArrowRightLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer
      role="contentinfo"
      aria-label="Aafaque Nazir — Footer and navigation"
      className="relative z-40 w-full overflow-hidden mt-16 sm:mt-24"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. FLUID ORGANIC WAVE SECTION BOUNDARY (Behance-Style Curvature)
      ────────────────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden leading-none select-none pointer-events-none -mb-[1px]">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-14 sm:h-20 md:h-28 block"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="footerWaveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#121217" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
          </defs>
          {/* Fluid Organic Wave Section Fill */}
          <path
            d="M 0,60 C 240,85 480,85 720,52 C 960,20 1200,20 1440,55 L 1440,120 L 0,120 Z"
            fill="url(#footerWaveGrad)"
          />
          {/* 1px Hairline Stroke along the Wave */}
          <path
            d="M 0,60 C 240,85 480,85 720,52 C 960,20 1200,20 1440,55"
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FOOTER BODY (Deep Obsidian #09090b Seamless with Wave)
      ────────────────────────────────────────────────────────────── */}
      <div className="relative w-full bg-[#09090b] border-b border-white/5 pt-4 pb-12">
        {/* Subtle Background Radial Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent -z-0 pointer-events-none" />

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Pre-Footer Callout */}
          <div className="pb-8 mb-10 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Have a project in mind?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-light max-w-xl leading-relaxed">
                Whether you need a custom business website, modern e-commerce storefront, or full-stack web application — let's build something clean, fast, and reliable.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                to="/contact"
                className="group/cta w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95 select-none"
              >
                <span>Get in Touch</span>
                <RiArrowRightLine className="text-sm group-hover/cta:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8">
            {/* Column 1: Brand & Business Details */}
            <div className="md:col-span-5 flex flex-col items-start gap-3">
              <div>
                <span className="text-xl md:text-2xl font-black text-white tracking-wider uppercase block">
                  Aafaque Nazir
                </span>
                <p className="text-zinc-400 text-xs tracking-wider mt-1 uppercase font-mono">
                  Web Developer in Navi Mumbai &amp; Mumbai, India
                </p>
              </div>

              <div className="text-zinc-400 text-xs font-mono max-w-sm mt-1 leading-relaxed space-y-1.5">
                <p>
                  <strong className="text-zinc-200">Business Name:</strong> Aafaque Nazir<br />
                  <strong className="text-zinc-200">Location:</strong> Navi Mumbai, Maharashtra, India<br />
                  <strong className="text-zinc-200">Main Activity:</strong> Freelance Web Development, UI/UX Design &amp; Web Applications.
                </p>
                <p>
                  <strong className="text-zinc-200">Services Provided:</strong> Custom Websites, E-Commerce Stores, and Web Applications.
                </p>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 flex flex-col gap-2.5">
              <p className="text-xs font-semibold font-mono uppercase tracking-[0.15em] text-zinc-500">
                Quick Links
              </p>
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="group inline-flex items-center gap-1.5 py-1 text-xs text-zinc-400 hover:text-white transition-colors font-mono"
                    >
                      <RiArrowRightLine className="text-[10px] opacity-0 -ml-2.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-white" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Connect */}
            <div className="md:col-span-4 flex flex-col gap-2.5">
              <p className="text-xs font-semibold font-mono uppercase tracking-[0.15em] text-zinc-500">
                Connect
              </p>
              <p className="text-zinc-400 text-xs font-mono">
                Have an idea? Let's discuss.
              </p>
              <div className="flex gap-2.5 mt-1">
                {[
                  { icon: RiGithubFill, href: "https://github.com/Aafaque-Nazir", label: "Visit Aafaque Nazir's GitHub" },
                  { icon: RiLinkedinFill, href: "https://www.linkedin.com/in/aafaque-nazir/", label: "Visit Aafaque Nazir's LinkedIn" },
                  { icon: RiInstagramLine, href: "https://www.instagram.com/aafaque.75/", label: "Visit Aafaque Nazir's Instagram" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200 active:scale-95"
                  >
                    <item.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/5" />

          {/* Bottom Row */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            {/* Copyright */}
            <div className="text-zinc-500 text-[10px] sm:text-xs font-mono tracking-wider flex items-center gap-2.5">
              <span>&copy; {new Date().getFullYear()} AAFAQUE NAZIR</span>
              <span className="text-zinc-600">&bull;</span>
              <span>ALL RIGHTS RESERVED</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
