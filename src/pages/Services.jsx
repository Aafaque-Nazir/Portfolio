import React, { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  FaRocket,
  FaChartLine,
  FaCrown,
  FaCheck,
  FaServer,
  FaTools,
  FaMagic,
  FaSearchPlus,
  FaArrowRight,
} from "react-icons/fa";

const CountingPrice = ({ value, prefix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Clean the value to get pure number (remove commas if any)
  const numericValue = parseInt(value.replace(/,/g, ""), 10);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      // Animate from 0 to numericValue over 2 seconds
      const controls = animate(count, numericValue, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [inView, numericValue, count]);

  return (
    <span ref={ref} className="flex">
      {prefix}
      <motion.span>
        {useTransform(rounded, (latest) => latest.toLocaleString())}
      </motion.span>
    </span>
  );
};

const Services = () => {
  const packages = [
    {
      title: "The Launchpad",
      oldPrice: "₹7,000",
      price: "4,999",
      priceLabel: "Starts at",
      description:
        "Ideal for personal brands & portfolios. Fast, sleek, and high-impact.",
      features: [
        "Single Page Application (SPA)",
        "Mobile-First Responsive Design",
        "SEO-Ready Architecture",
        "Contact Form & WhatsApp Chat",
        "Free Deployment Setup",
      ],
      recommendedFor: "Starters",
      icon: (
        <FaRocket className="text-3xl text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
      accentColor: "cyan",
      delay: 0,
    },
    {
      title: "The Growth",
      oldPrice: "₹15,000",
      price: "10,999",
      priceLabel: "Starts at",
      description:
        "Perfect for businesses needing a CMS and multiple pages to scale.",
      features: [
        "5-8 Premium Pages",
        "Admin Dashboard / Basic CMS",
        "On Page SEO",
        "Google Maps & Analytics",
        "Speed Optimization (Green Score)",
      ],
      recommendedFor: "Scaling",
      icon: (
        <FaChartLine className="text-3xl text-teal-400 group-hover:text-teal-300 transition-colors" />
      ),
      accentColor: "teal",
      highlight: true,
      popularBadge: "MOST POPULAR",
      delay: 0.2,
    },
    {
      title: "The Empire",
      oldPrice: "₹50,000",
      price: "39,999",
      priceLabel: "Starts at",
      description:
        "Full-stack custom solution for startups and complex requirements.",
      features: [
        "Custom SaaS / E-commerce App",
        "Secure User Auth (Login/DB)",
        "Real-time Data & Inventory",
        "UPI & International Payments",
        "1 Month Priority Support",
      ],
      recommendedFor: "Enterprise",
      icon: (
        <FaCrown className="text-3xl text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
      accentColor: "cyan",
      delay: 0.4,
    },
  ];

  const addons = [
    {
      id: 1,
      title: "Domain & Hosting Setup",
      price: "699",
      type: "One-time",
      description:
        "Hassle-free launch: Custom Domain connection, DNS Management & Free SSL (Green Lock).",
      note: "Excludes Domain Purchase Cost",
      icon: <FaServer />,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "hover:border-blue-400/50",
    },
    {
      id: 2,
      title: "Priority Support",
      price: "999",
      type: "Per Month",
      description:
        "On-demand content updates via WhatsApp, weekly backups & security monitoring.",
      icon: <FaTools />,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "hover:border-amber-400/50",
    },
  ];

  return (
    <section
      id="services"
      className="relative min-h-screen py-24 md:py-0 md:h-auto md:min-h-screen px-4 text-white overflow-hidden flex flex-col justify-center items-center"
    >
      <SEO
        title="Services"
        description="Professional web development services: Single Page Applications, CMS, and Full-stack custom solutions."
      />
      {/* Premium Static Background (Matched to Project.jsx) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-teal-900/10 via-slate-950 to-slate-950" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 lg:mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-5xl font-extrabold mb-6 text-white tracking-tight">
            Services & Pricing
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            Elite digital solutions engineered for{" "}
            <span className="text-cyan-400 font-semibold">performance</span> and{" "}
            <span className="text-cyan-400 font-semibold">scale</span>.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 mb-32 lg:mb-12 relative z-10">
          {packages.map((pkg, index) => {
            const isHighlight = pkg.highlight;
            const baseBorder = isHighlight
              ? "border-teal-500/50"
              : "border-white/10";
            const hoverBorder = isHighlight
              ? "hover:border-teal-400"
              : "hover:border-cyan-400/50";
            const shadowColor = isHighlight
              ? "shadow-teal-500/20"
              : "shadow-cyan-500/10";
            const btnColor = isHighlight
              ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:shadow-teal-500/50"
              : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cyan-400/30";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: pkg.delay }}
                viewport={{ once: true }}
                className={`relative group flex flex-col rounded-3xl transition-all duration-500 hover:-translate-y-2
                  ${isHighlight ? "lg:-mt-6 lg:mb-4 z-20 scale-105" : "z-10"}
                `}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`}
                />

                {/* Card Content */}
                <div
                  className={`relative h-full flex flex-col p-8 lg:p-5 rounded-3xl bg-[#0a0f1c]/90 backdrop-blur-xl border ${baseBorder} ${hoverBorder} shadow-2xl ${shadowColor} transition-all duration-300 overflow-hidden`}
                >
                  {/* Decorative "Tech" Lines */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent -mr-16 -mt-16 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-500/5 to-transparent -ml-20 -mb-20 rounded-full blur-3xl pointer-events-none" />

                  {/* Header Section */}
                  <div className="flex justify-between items-start mb-6 lg:mb-3 w-full relative">
                    <div
                      className={`p-4 rounded-2xl bg-slate-800/50 border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500`}
                    >
                      {pkg.icon}
                    </div>
                    {isHighlight && (
                      <span className="absolute -top-2 -right-2 px-3 py-1 text-[10px] font-extrabold text-teal-950 bg-teal-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.6)] animate-pulse uppercase tracking-wider">
                        {pkg.popularBadge}
                      </span>
                    )}
                    {!isHighlight && (
                      <span className="px-3 py-1 text-[10px] font-bold text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 rounded-full uppercase tracking-wider">
                        {pkg.recommendedFor}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl lg:text-xl font-bold text-white mb-2 tracking-wide group-hover:text-cyan-100 transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-400 text-sm lg:text-xs leading-relaxed mb-6 lg:mb-3 h-10 line-clamp-2">
                    {pkg.description}
                  </p>

                  {/* Pricing Section - REDESIGNED */}
                  <div className="mb-8 lg:mb-4 p-4 lg:p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1 font-bold">
                        {pkg.priceLabel}
                      </span>
                      <div className="flex items-baseline gap-3">
                        {pkg.oldPrice && (
                          <span className="text-lg text-gray-500 line-through decoration-red-500/50 decoration-2 font-medium">
                            {pkg.oldPrice}
                          </span>
                        )}
                        <span
                          className={`text-4xl lg:text-3xl font-extrabold text-white tracking-tight`}
                        >
                          <CountingPrice value={pkg.price} prefix="₹" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex-grow space-y-4 lg:space-y-2 mb-8 lg:mb-4">
                    {pkg.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-sm lg:text-xs text-gray-300 group/item"
                      >
                        <div
                          className={`mt-1 p-0.5 rounded-full bg-slate-800 border border-slate-700/50 flex-shrink-0
                          ${pkg.accentColor === "cyan" ? "group-hover/item:border-cyan-500/50 group-hover/item:text-cyan-400" : ""}
                          ${pkg.accentColor === "teal" ? "group-hover/item:border-teal-500/50 group-hover/item:text-teal-400" : ""}
                          ${pkg.accentColor === "purple" ? "group-hover/item:border-cyan-500/50 group-hover/item:text-cyan-400" : ""}
                        `}
                        >
                          <FaCheck size={10} />
                        </div>
                        <span className="group-hover:text-white transition-colors duration-300 leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href="#contact"
                    className={`relative w-full py-4 lg:py-2.5 rounded-xl font-bold text-center uppercase tracking-widest text-xs transition-all duration-300 overflow-hidden transform group-hover:scale-[1.02] active:scale-[0.98]
                      ${btnColor}
                    `}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Started <FaArrowRight />
                    </span>
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* REDESIGNED ADD-ONS SECTION */}
        <div className="relative w-full">
          {/* Section Header */}
          <div className="flex flex-col items-center mb-16">
            <span className="text-cyan-400 font-mono text-sm tracking-[0.2em] mb-3 uppercase">
              Power Up Your Project
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white text-center">
              System Modules & Add-ons
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative max-w-7xl mx-auto">
            {/* Decorative Background Elements for the Grid */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full" />

            {addons.map((addon) => (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: addon.id * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col md:flex-row items-center gap-6 p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent hover:from-cyan-500/20 hover:to-teal-500/20 transition-all duration-500 overflow-hidden"
              >
                {/* Inner Container */}
                <div className="relative w-full h-full flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl bg-[#0a0f1c] z-10">
                  {/* Scanning Line Effect */}
                  <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:left-[100%] transition-all duration-[1.5s] ease-in-out z-20" />

                  {/* Left: Module Icon */}
                  <div className="shrink-0 relative">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${addon.bg} ${addon.color} ring-1 ring-white/10 group-hover:ring-cyan-500/50 transition-all duration-500`}
                    >
                      {addon.icon}
                    </div>
                    {/* Connection Line */}
                    <div className="hidden md:block absolute top-1/2 -right-6 w-6 h-[1px] bg-gradient-to-r from-white/10 to-transparent group-hover:from-cyan-500/50 transition-colors" />
                  </div>

                  {/* Center: Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                      <h4 className="text-lg md:text-xl font-bold text-white tracking-wide group-hover:text-cyan-100 transition-colors">
                        {addon.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-gray-400 uppercase tracking-wider group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-colors">
                        {addon.type === "One-time" ? "MOD-01" : "SUB-0X"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-lg mx-auto md:mx-0 mb-3 md:mb-0">
                      {addon.description}
                    </p>

                    {/* Note for Domain (if exists) */}
                    {addon.note && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] font-medium text-amber-500 md:ml-0 mx-auto">
                        <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                        {addon.note}
                      </div>
                    )}
                  </div>

                  {/* Right: Value & Status */}
                  <div className="shrink-0 flex flex-col items-center md:items-end gap-1 min-w-[100px] border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 w-full md:w-auto mt-4 md:mt-0">
                    <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-mono">
                      Module Cost
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg text-cyan-500 font-bold">₹</span>
                      <span className="text-3xl font-bold text-white tracking-tighter shadow-cyan-500/50 drop-shadow-sm">
                        {addon.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[10px] text-emerald-400/80 font-mono uppercase">
                        System Ready
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
