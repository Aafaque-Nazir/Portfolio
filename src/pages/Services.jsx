"use client";
import React from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { FaLaptopCode, FaServer, FaCheck, FaShoppingCart, FaArrowRight, FaFireAlt, FaCrown } from "react-icons/fa";

import GlobalCTA from "../components/ui/GlobalCTA";
import ProcessTimeline from "../components/ui/ProcessTimeline";

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
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-[2rem] p-[1px] overflow-hidden transition-all duration-700 isolation-isolate w-full h-full flex flex-col ${isHighlight ? "z-20 md:scale-105 shadow-[0_0_50px_rgba(6,182,212,0.15)]" : "z-10"
        }`}
    >
      {/* Dynamic Cursor Glow */}
      <motion.div
        className="absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.15), transparent 80%)`,
        }}
      />
      
      {/* Highlighted Card Specific Animated Border */}
      {isHighlight && (
        <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(6,182,212,1)_360deg)] animate-[spin_4s_linear_infinite]" />
      )}
      
      {/* Base Border Glow */}
      <motion.div
        className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.4), transparent 80%)`,
        }}
      />

      {/* Inner Mask (The actual card background) */}
      <div className={`absolute inset-[1px] rounded-[1.95rem] backdrop-blur-3xl z-0 transition-colors duration-500 ${isHighlight ? "bg-stone-950/95" : "bg-stone-950/80"}`} />

      {/* Content Container */}
      <div className={`relative z-10 h-full flex flex-col p-8 rounded-[1.95rem] bg-gradient-to-b border transition-colors duration-700 overflow-hidden justify-between ${isHighlight ? "from-cyan-950/20 to-black/80 border-cyan-500/20 group-hover:border-cyan-500/40" : "from-transparent to-black/50 border-white/[0.05] group-hover:border-white/[0.1]"}`}>
        
        {/* Subtle grid background for texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />

        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header Row: Icon & Psychological Tag */}
          <div className="flex items-start justify-between mb-8">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md border ${isHighlight ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-cyan-500/20" : "bg-white/[0.03] text-gray-400 border-white/[0.05]"}`}>
              {pkg.icon}
            </div>
            {pkg.benefitTag && (
              <div className={`flex items-center gap-1.5 text-[10px] font-bold font-mono tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border shadow-lg ${isHighlight ? "text-cyan-300 bg-cyan-950/50 border-cyan-500/30" : "text-gray-400 bg-white/[0.02] border-white/10"}`}>
                {isHighlight ? <FaFireAlt className="text-orange-500" size={12} /> : <FaCrown size={12} />}
                {pkg.benefitTag}
              </div>
            )}
          </div>

          {/* Title & Psychological Hook */}
          <div className="mb-8">
            <div className="text-[10px] font-bold font-mono text-cyan-500/80 tracking-widest uppercase mb-2">
              For {pkg.recommendedFor}
            </div>
            <h2 className={`text-3xl font-black tracking-tight mb-4 transition-colors duration-300 ${isHighlight ? "text-white group-hover:text-cyan-300" : "text-white group-hover:text-gray-200"}`}>
              {pkg.title}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              {pkg.description}
            </p>
          </div>

          {/* Outcome-Oriented Features */}
          <div className="space-y-4 mb-8 flex-1">
            {pkg.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 text-[15px] group/feature">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${feature.highlight ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-white/5 text-gray-500 group-hover/feature:text-cyan-500/50"}`}>
                  <FaCheck size={8} />
                </div>
                <span className={`leading-snug transition-colors ${feature.highlight ? "text-gray-200 font-medium" : "text-gray-400"}`}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Area */}
        <div className="relative z-10 pt-6 border-t border-white/[0.05] mt-auto">
          {pkg.urgency && (
            <p className="text-center text-[11px] font-mono text-orange-400/80 mb-3 tracking-wide animate-pulse">
              ⚡ {pkg.urgency}
            </p>
          )}
          <Link
            to="/contact"
            state={{ plan: pkg.title }}
            className={`relative w-full flex items-center justify-center gap-3 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 overflow-hidden group/btn ${isHighlight
              ? "bg-cyan-400 text-black shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:bg-cyan-300 scale-100 hover:scale-[1.02]"
              : "bg-white/[0.03] text-white border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-100"
              }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {pkg.ctaText} <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
            </span>
            {/* Shimmer effect on button */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full duration-1000 transition-transform ease-in-out" />
          </Link>
          <p className="text-center text-[10px] text-gray-500 mt-3 font-medium">
            Secure payments & NDA guaranteed.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const packages = [
    {
      title: "High-Converting Websites",
      benefitTag: "No-Brainer ROI",
      description: "Not just a website. A 24/7 digital salesperson that works effortlessly to turn your visitors into paying clients.",
      features: [
        { text: "Beautiful, Custom Design", highlight: true },
        { text: "Smooth & Engaging Animations", highlight: false },
        { text: "Lightning-Fast Loading Speed", highlight: false },
        { text: "Built to Get You Found on Google", highlight: true },
      ],
      recommendedFor: "Brands & Agencies",
      icon: <FaLaptopCode size={24} />,
      highlight: true,
      urgency: "Only 2 spots left this month",
      ctaText: "Claim Your Spot"
    },
    {
      title: "Custom Online Stores",
      benefitTag: "Scale Revenue",
      description: "Easy-to-use shopping experiences designed to help you sell more and keep customers coming back.",
      features: [
        { text: "Custom E-Commerce Storefront", highlight: true },
        { text: "Cart & Secure Payment Gateways", highlight: false },
        { text: "Easy Inventory & Order Tracking", highlight: false },
        { text: "Optional WhatsApp Ordering", highlight: false },
      ],
      recommendedFor: "DTC & Retailers",
      icon: <FaShoppingCart size={24} />,
      highlight: false,
      ctaText: "Build Your Store"
    },
    {
      title: "Custom Web Apps",
      benefitTag: "Ultimate Scale",
      description: "Custom software and internal tools to automate your daily work and help your business grow without limits.",
      features: [
        { text: "Fully Custom Dashboard & Features", highlight: true },
        { text: "Top-Level Security for Your Data", highlight: false },
        { text: "Live Tracking & Analytics", highlight: false },
        { text: "Connects with Tools You Already Use", highlight: false },
      ],
      recommendedFor: "SaaS & Startups",
      icon: <FaServer size={24} />,
      highlight: false,
      ctaText: "Let's Build It"
    },
  ];

  return (
    <section id="services" aria-label="Web Development Services by Aafaque Nazir — Full-Stack Apps, Lead Generation Websites, 3D Websites" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black text-white pt-24 pb-4">

      {/* Global Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-500/[0.03] blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 z-10 flex flex-col items-center">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-4 shrink-0 pt-1 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase mb-4"
          >
            Stand Out <span className="text-cyan-500">Online</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light"
          >
            Stop losing clients to competitors with outdated websites. Invest in a premium design that builds trust and gets people to take action.
          </motion.p>
        </div>

        {/* Process Timeline */}
        <div className="mt-8 mb-16 w-full max-w-4xl">
          <ProcessTimeline />
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {packages.map((pkg, idx) => (
            <ServiceCard key={idx} pkg={pkg} />
          ))}
        </div>
      </div>

      {/* Global Call to Action */}
      <div className="mt-20 w-full">
        <GlobalCTA />
      </div>
    </section>
  );
};

export default Services;

