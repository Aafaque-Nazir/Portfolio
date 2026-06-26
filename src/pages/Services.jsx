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
  FaCheck,
  FaRobot,
  FaCube,
  FaShoppingCart,
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
      <div className="relative h-full flex flex-col p-3 rounded-[1.45rem] lg:rounded-[1.95rem] bg-stone-950/40 backdrop-blur-3xl border border-white/[0.05] shadow-2xl overflow-hidden justify-between">

        <div className="relative z-10 flex-1">
          {/* Category Label */}
          <div className="text-[9px] font-mono text-cyan-500/80 tracking-widest uppercase mb-1.5">
            {pkg.recommendedFor}
          </div>

          {/* Title & Desc */}
          <div className="mb-2">
            <h2 className="text-xl lg:text-2xl font-black text-white tracking-tight mb-2">
              {pkg.title}
            </h2>
            <p className="text-gray-400 text-[11px] md:text-xs leading-snug font-light line-clamp-2">
              {pkg.description}
            </p>
          </div>

          {/* Pricing Area */}
          <div className="mb-2 p-2 lg:p-3 rounded-xl lg:rounded-2xl bg-white/[0.02] border border-white/[0.05] group-hover:border-cyan-500/20 transition-all duration-500 relative overflow-hidden">
            <span className="text-[8px] md:text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1 block font-mono">
              {pkg.priceText || "STARTS FROM"}
            </span>
            <div className="flex items-baseline gap-2 select-none">
              {pkg.isCustomPrice ? (
                <span className="text-xl lg:text-2xl font-black text-white tracking-tighter uppercase">
                  Let's Talk
                </span>
              ) : (
                <>
                  <span className="text-2xl lg:text-3xl font-black text-white tracking-tighter">
                    <CountingPrice value={pkg.price} prefix="₹" />
                  </span>
                  <span className="text-[10px] md:text-[11px] text-white/20 line-through font-mono">
                    {pkg.oldPrice}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-1.5 mb-2">
            {pkg.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px] md:text-xs text-gray-400">
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
          className={`relative z-10 w-full py-1.5 rounded-lg font-black text-center uppercase tracking-[0.4em] text-[11px] md:text-xs transition-all duration-300 ${isHighlight
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
      title: "Conversion Websites",
      oldPrice: "₹15k",
      price: "8,999",
      description: "Conversion-focused, highly animated landing pages designed to turn visitors into leads.",
      features: [
        "Premium Custom UI & Branding",
        "Engaging Scroll Animations",
        "Lightning-Fast Page Speeds",
        "1 Year Hosting & Domain FREE",
        "Chargeable after 1 year",
      ],
      recommendedFor: "Brands & Businesses",
      icon: <FaCheck />,
      highlight: true,
    },
    {
      title: "Digital Stores (E-Comm)",
      oldPrice: "₹45k",
      price: "24,999",
      description: "Custom e-commerce platforms and WhatsApp-based ordering systems with seamless user flows.",
      features: [
        "Custom E-Commerce Storefront",
        "Secure Payment & WhatsApp Integration",
        "Mobile-First & SEO Optimized",
        "Admin Dashboard for Orders",
        "Free 20 Products Setup (Bulk Extra)",
      ],
      recommendedFor: "Retail & Brands",
      icon: <FaShoppingCart />,
    },
    {
      title: "Business Software (SaaS)",
      isCustomPrice: true,
      priceText: "CUSTOM QUOTE",
      oldPrice: "₹45k",
      price: "24,999",
      description: "Scalable SaaS platforms, admin dashboards, and custom portals built to automate and manage your entire business.",
      features: [
        "Custom Admin & Staff Dashboards",
        "Secure Cloud Database Storage",
        "Role-Based User Logins & Access",
        "Real-Time Analytics & Tracking",
        "Enterprise-Grade Scalability",
      ],
      recommendedFor: "SaaS & Startups",
      icon: <FaRocket />,
    },
  ];

  return (
    <section id="services" aria-label="Web Development Services by Aafaque Nazir — Full-Stack Apps, Lead Generation Websites, 3D Websites" className="relative w-full md:h-screen min-h-screen flex flex-col items-center justify-center bg-black text-white pt-6 pb-4 overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/[0.01] blur-[150px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto px-6 z-10 flex flex-col items-center">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-2 shrink-0 pt-1">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase mb-2"
          >
            Services<span className="text-cyan-500">.</span>
          </motion.h2>


        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6 w-full max-w-6xl">
          {packages.map((pkg, idx) => (
            <ServiceCard key={idx} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
