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
      oldPrice: "₹12,000",
      price: "7,999",
      priceLabel: "Starts at",
      description:
        "Ideal for personal brands & portfolios. Fast, sleek, and high-impact.",
      features: [
        "Single Page Application (SPA)",
        "Domain (1 Year) & Premium Hosting",
        "Mobile-First Responsive Design",
        "Advanced SEO & GSC Indexing",
        "Contact Form & WhatsApp Chat",
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
      oldPrice: "₹22,000",
      price: "15,999",
      priceLabel: "Starts at",
      description:
        "Perfect for businesses needing a CMS and multiple pages to scale.",
      features: [
        "5-8 Premium Pages with CMS",
        "Domain (1 Year) & Premium Hosting",
        "Advanced SEO & Analytics Setup",
        "Speed Optimization (Green Score)",
        "Google Maps & Business Profile",
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
      oldPrice: "₹65,000",
      price: "45,999",
      priceLabel: "Starts at",
      description:
        "Full-stack custom solution for startups and complex requirements.",
      features: [
        "Full-Stack Custom App (SaaS/E-Com)",
        "Domain (1 Year) & Scalable Hosting",
        "Secure User Auth & Database",
        "Real-time Data & Inventory",
        "UPI & International Payments",
      ],
      recommendedFor: "Enterprise",
      icon: (
        <FaCrown className="text-3xl text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
      accentColor: "cyan",
      delay: 0.4,
    },
  ];

  return (
    <section
      id="services"
      className="relative min-h-screen py-24 md:py-0 md:h-auto md:min-h-screen px-4 text-white overflow-hidden flex flex-col justify-center items-center"
    >
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
                    <div className="flex flex-col relative overflow-hidden group/price">
                      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover/price:opacity-100 transition-opacity duration-300">
                        <span className="text-xs font-bold text-white bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                          Request Quote
                        </span>
                      </div>
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1 font-bold">
                        {pkg.priceLabel}
                      </span>
                      <div className="flex items-baseline gap-3 filter blur-[12px] select-none opacity-50 transition-all duration-300 group-hover/price:blur-[8px]">
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
                    onClick={(e) => {
                      e.preventDefault();
                      // Dispatch custom event for Contact form
                      const event = new CustomEvent("selectService", {
                        detail: pkg.title,
                      });
                      window.dispatchEvent(event);

                      // Smooth scroll to contact section
                      const contactSection = document.getElementById("contact");
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`relative w-full py-4 lg:py-2.5 rounded-xl font-bold text-center uppercase tracking-widest text-xs transition-all duration-300 overflow-hidden transform group-hover:scale-[1.02] active:scale-[0.98]
                      ${btnColor}
                    `}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Contact for Pricing <FaArrowRight />
                    </span>
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
