import React, { useRef, useState, useEffect } from "react";
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
  FaArrowRight,
} from "react-icons/fa";

const CountingPrice = ({ value, prefix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const numericValue = parseInt(value.replace(/,/g, ""), 10);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
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

const ServiceCard = ({ pkg }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const isHighlight = pkg.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-[2rem] p-[1px] overflow-hidden transition-all duration-500 hover:scale-[1.01] isolation-isolate ${
        isHighlight ? "z-20 scale-[1.03]" : "z-10"
      }`}
    >
      {/* Dynamic Border Glow - CHANGED TO WHITE */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(350px circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 85%)`
          ),
        }}
      />

      <div className="relative h-full flex flex-col p-5 sm:p-6 lg:p-5 rounded-[1.95rem] bg-stone-900/10 backdrop-blur-3xl border border-white/[0.05] shadow-2xl overflow-hidden">
        {/* Spotlight Effect - ALREADY WHITE */}
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.95rem]"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.03), transparent 80%)`
            ),
          }}
        />

        {/* Header Area */}
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-500">
              <div className="text-white group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-500">
                {pkg.icon}
              </div>
            </div>

          <div className="flex flex-col items-end">
            {isHighlight && (
              <span className="px-2 py-0.5 text-[8px] font-black text-cyan-950 bg-cyan-400 rounded shadow-[0_0_10px_rgba(6,182,212,0.5)] uppercase tracking-wider mb-1">
                POPULAR
              </span>
            )}
            <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">
              {pkg.recommendedFor}
            </span>
          </div>
        </div>

        {/* Title & Desc */}
        <div className="mb-4 relative z-10">
          <h2 className="text-xl lg:text-lg font-black text-white tracking-tight mb-1 group-hover:text-cyan-400 transition-colors">
            {pkg.title}
          </h2>
          <p className="text-gray-500 text-[11px] lg:text-[10px] leading-relaxed font-light line-clamp-2">
            {pkg.description}
          </p>
        </div>

        {/* Pricing Area */}
        <div className="mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-all duration-500 relative z-10">
             <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-0.5 block">
                Starts From
             </span>
             <div className="flex items-baseline gap-2">
                <span className="text-2xl lg:text-xl font-black text-white tracking-tighter">
                   <CountingPrice value={pkg.price} prefix="₹" />
                </span>
                <span className="text-[10px] text-white/20 line-through font-mono">
                   {pkg.oldPrice}
                </span>
             </div>
        </div>

        {/* Features - COMPRESSED */}
        <div className="flex-grow space-y-2 lg:space-y-1.5 mb-6 relative z-10">
          {pkg.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[10px] text-gray-400 group/feat">
              <div className="w-3.5 h-3.5 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover/feat:bg-cyan-500 group-hover/feat:text-black transition-all">
                <FaCheck size={5} />
              </div>
              <span className="group-hover/feat:text-white transition-colors">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA - COMPRESSED */}
        <a
          href="#contact"
          className={`relative w-full py-2.5 rounded-lg font-black text-center uppercase tracking-[0.2em] text-[9px] transition-all duration-300 overflow-hidden ${
            isHighlight 
            ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-cyan-500/40" 
            : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
          }`}
        >
          <span className="relative z-10">Select</span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
        </a>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const packages = [
    {
      title: "Launchpad",
      oldPrice: "₹12k",
      price: "7,999",
      description: "Ideal for personal brands & high-impact portfolios. Fast and sleek.",
      features: [
        "Single Page Experience (SPA)",
        "Premium 1yr Hosting & Domain",
        "Architecture Level SEO Indexing",
        "Mobile-First Responsive Layout",
        "Priority WhatsApp Integration",
      ],
      recommendedFor: "Personal",
      icon: <FaRocket />,
      delay: 0,
    },
    {
      title: "Growth",
      oldPrice: "₹22k",
      price: "15,999",
      description: "Engineered for scaling businesses needing advanced CMS integrations.",
      features: [
        "8+ Premium Managed Pages",
        "Dynamic CMS Logic & Database",
        "Advanced Analytics Dashboard",
        "Core Web Vitals Optimization",
        "Google Business Profile Sync",
      ],
      recommendedFor: "Business",
      icon: <FaChartLine />,
      highlight: true,
      delay: 0.1,
    },
    {
      title: "Empire",
      oldPrice: "₹65k",
      price: "45,999",
      description: "Full-stack architectural solutions for complex startup requirements.",
      features: [
        "Custom SaaS / E-Comm Core",
        "Secure User Auth / JWT Systems",
        "Real-time Data Architecture",
        "Scalable Cloud Infrastructure",
        "Multi-Gateway API Payments",
      ],
      recommendedFor: "Enterprise",
      icon: <FaCrown />,
      delay: 0.2,
    },
  ];

  return (
    <section id="services" className="relative w-full h-[100svh] min-h-[600px] flex flex-col justify-center items-center px-4 overflow-hidden bg-black py-10">
      <div className="w-full max-w-6xl mx-auto relative z-10 flex flex-col h-full justify-center">
        <div className="flex flex-col items-center mb-8 lg:mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-2 flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]" />
            <span className="text-[8px] font-mono tracking-[0.4em] text-cyan-400 uppercase">Architecture</span>
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-4">
            Services <span className="text-cyan-500">.</span>
          </h2>
          <p className="text-gray-500 text-xs lg:text-sm max-w-xl font-light leading-relaxed">
             Bespoke architectural excellence engineered to <span className="text-white">scale</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 px-2">
          {packages.map((pkg, idx) => (
            <ServiceCard key={idx} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
