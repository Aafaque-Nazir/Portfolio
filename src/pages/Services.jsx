"use client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { FaLaptopCode, FaServer, FaCheck, FaShoppingCart, FaArrowRight, FaStar } from "react-icons/fa";
import ProcessTimeline from "../components/ui/ProcessTimeline";

const ServiceCard = ({ pkg }) => {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleCardClick = () => {
    navigate("/contact", { state: { plan: pkg.title } });
  };

  const isHighlight = pkg.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onClick={handleCardClick}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 w-full h-full flex flex-col cursor-pointer hover:-translate-y-1 ${
        isHighlight
          ? "border-2 border-cyan-400/60 shadow-[0_0_35px_rgba(34,211,238,0.18)]"
          : "border border-white/10 hover:border-cyan-500/30"
      }`}
    >
      {/* Dynamic Cursor Glow on Hover */}
      <motion.div
        className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.12), transparent 80%)`,
        }}
      />

      {/* Card Content Container */}
      <div className={`relative z-10 h-full flex flex-col p-6 sm:p-7 bg-[#09090b] justify-between ${
        isHighlight ? "bg-gradient-to-b from-cyan-950/30 via-[#09090b] to-[#09090b]" : ""
      }`}>
        <div className="flex-1 flex flex-col">
          {/* Header Row: Compact Icon & Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              isHighlight
                ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                : "bg-white/[0.03] text-gray-400 border-white/5"
            }`}>
              {pkg.icon}
            </div>

            {pkg.benefitTag && (
              <span className={`inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                isHighlight
                  ? "text-cyan-300 bg-cyan-950/70 border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
                  : "text-zinc-400 bg-white/[0.03] border-white/10"
              }`}>
                {isHighlight && <FaStar size={9} className="text-cyan-400" />}
                {pkg.benefitTag}
              </span>
            )}
          </div>

          {/* Title & Description */}
          <div className="mb-4">
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider block mb-1">
              For {pkg.recommendedFor}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
              {pkg.title}
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              {pkg.description}
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-3 mb-6 flex-1 pt-4 border-t border-white/5">
            {pkg.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-sm">
                <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-cyan-500/20 text-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                  <FaCheck size={7} />
                </span>
                <span className="text-zinc-200 font-medium">
                  {typeof feature === "string" ? feature : feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-white/5 mt-auto">
          <Link
            to="/contact"
            state={{ plan: pkg.title }}
            onClick={(e) => e.stopPropagation()}
            className={`group/btn relative w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
              isHighlight
                ? "bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-zinc-950 shadow-[0_0_22px_rgba(34,211,238,0.45)] hover:shadow-[0_0_30px_rgba(34,211,238,0.65)]"
                : "bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            }`}
          >
            <span>{pkg.ctaText}</span>
            <span className={`inline-flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-1 ${
              isHighlight
                ? "text-zinc-950 drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]"
                : "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.95)]"
            }`}>
              <FaArrowRight className="text-xs" />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const packages = [
    {
      title: "Websites & Landing Pages",
      benefitTag: "Most Popular",
      description: "Custom websites and landing pages built to look modern, load fast, and be fully responsive on all devices.",
      features: [
        "Custom Responsive Design",
        "Smooth Animations & Micro-interactions",
        "Fast Loading Speeds",
        "SEO Best Practices & Meta Tags",
      ],
      recommendedFor: "Businesses & Portfolios",
      icon: <FaLaptopCode size={20} />,
      highlight: true,
      ctaText: "Start a Website"
    },
    {
      title: "Custom Online Stores",
      benefitTag: "E-Commerce",
      description: "Fast shopping experiences designed to make browsing, cart management, and purchasing smooth.",
      features: [
        "Custom E-Commerce Storefront",
        "Cart & Secure Checkout Flow",
        "Easy Product & Inventory Filtering",
        "Optional WhatsApp Direct Ordering",
      ],
      recommendedFor: "Brands & Merchants",
      icon: <FaShoppingCart size={20} />,
      highlight: false,
      ctaText: "Build Your Store"
    },
    {
      title: "Custom Web Applications",
      benefitTag: "Full-Stack",
      description: "Custom software, client dashboards, and interactive platforms with database and auth integration.",
      features: [
        "Custom Dashboard & Client Portals",
        "Secure Authentication & Roles",
        "Real-Time Databases (Supabase/PostgreSQL)",
        "API Integrations & Fast UI",
      ],
      recommendedFor: "Startups & Software",
      icon: <FaServer size={20} />,
      highlight: false,
      ctaText: "Build Web App"
    },
  ];

  return (
    <section id="services" aria-label="Web Development Services by Aafaque Nazir" className="relative w-full min-h-screen flex flex-col items-center justify-start bg-black text-white pt-28 sm:pt-32 pb-16">

      {/* Global Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-cyan-500/[0.03] blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center">

        {/* Header Section: Unified Page H1 */}
        <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-3">
            Services & Solutions
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Clean, modern web development services tailored to help your brand or business build a fast, reliable online presence.
          </p>
        </div>

        {/* 3-Column Service Cards (Compact, Perfectly Aligned) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch mb-16">
          {packages.map((pkg, idx) => (
            <ServiceCard key={idx} pkg={pkg} />
          ))}
        </div>

        {/* Process Timeline (Secondary Focus, cleanly placed beneath packages) */}
        <div className="w-full max-w-4xl border-t border-white/5 pt-12">
          <ProcessTimeline />
        </div>

      </div>
    </section>
  );
};

export default Services;
