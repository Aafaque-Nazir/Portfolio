"use client";
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
} from "react-icons/fa";

const CountingPrice = ({ value, prefix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-[1.5rem] lg:rounded-[2rem] p-[1px] overflow-hidden transition-all duration-500 isolation-isolate w-full h-full ${isHighlight ? "z-20 md:scale-[1.02]" : "z-10"
        }`}
    >
      <div className="relative h-full flex flex-col p-3 lg:p-4 rounded-[1.45rem] lg:rounded-[1.95rem] bg-stone-950/40 backdrop-blur-3xl border border-white/[0.05] shadow-2xl overflow-hidden justify-between">
        
        <div className="relative z-10 flex-1">
          {/* Header Area */}
          <div className="flex justify-between items-start mb-2">
            <div className="text-white text-xl lg:text-2xl opacity-80">
              {pkg.icon}
            </div>
            <div className="text-[7px] font-mono text-white/20 tracking-widest uppercase">
              {pkg.recommendedFor}
            </div>
          </div>

          {/* Title & Desc */}
          <div className="mb-2">
            <h2 className="text-base lg:text-lg font-black text-white tracking-tight mb-0.5">
              {pkg.title}
            </h2>
            <p className="text-gray-500 text-[9px] leading-tight font-light line-clamp-2">
              {pkg.description}
            </p>
          </div>

          {/* Pricing Area */}
          <div className="mb-2 p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-white/[0.02] border border-white/[0.05] group-hover:border-cyan-500/20 transition-all duration-500 relative overflow-hidden">
            <span className="text-[7px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1 block font-mono">
              STARTS FROM
            </span>
            <div className="flex items-baseline gap-2 blur-md select-none">
              <span className="text-xl lg:text-2xl font-black text-white tracking-tighter">
                <CountingPrice value={pkg.price} prefix="₹" />
              </span>
              <span className="text-[9px] text-white/20 line-through font-mono">
                {pkg.oldPrice}
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-1.5 mb-4">
            {pkg.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[9px] text-gray-400">
                <div className="w-3 h-3 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0">
                  <FaCheck size={4} />
                </div>
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className={`relative z-10 w-full py-2.5 rounded-lg font-black text-center uppercase tracking-[0.4em] text-[9px] transition-all duration-300 ${isHighlight
              ? "bg-cyan-500 text-black shadow-[0_5px_15px_rgba(0,209,255,0.2)] hover:scale-[1.02]"
              : "bg-white/[0.03] text-white border border-white/10 hover:bg-white/10"
            }`}
        >
          SELECT
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
    },
  ];

  return (
    <section id="services" className="relative w-full md:h-screen min-h-screen flex flex-col items-center justify-center bg-black text-white pt-10 pb-6 overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/[0.01] blur-[150px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto px-6 z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6 shrink-0 pt-4">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-3xl lg:text-4xl font-black text-white tracking-tighter uppercase mb-2"
          >
            Services <span className="text-cyan-500">.</span>
          </motion.h2>
          
          <p className="text-gray-500 text-[8px] lg:text-[10px] max-w-xl mx-auto font-light leading-relaxed tracking-[0.2em] uppercase text-center opacity-60">
            Bespoke architectural excellence engineered to <span className="text-white">scale</span>.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {packages.map((pkg, idx) => (
            <ServiceCard key={idx} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
