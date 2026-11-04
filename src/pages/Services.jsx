import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Globe,
  ShoppingCart,
  Layers,
  ArrowRight,
  Check,
} from "lucide-react";
import ProcessTimeline from "../components/ui/ProcessTimeline";

const ServiceCard = ({ pkg }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/contact", { state: { plan: pkg.title } });
  };

  const isHighlight = pkg.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={handleCardClick}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 w-full h-full flex flex-col cursor-pointer hover:-translate-y-1 ${
        isHighlight
          ? "border border-white/25 bg-zinc-950/90 shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
          : "border border-white/10 hover:border-white/20 bg-zinc-950/70 shadow-[0_16px_36px_rgba(0,0,0,0.6)]"
      }`}
    >
      <div className="relative z-10 h-full flex flex-col p-6 sm:p-7 justify-between">
        <div className="flex-1 flex flex-col">
          {/* Header Row: Icon & Tag */}
          <div className="flex items-center justify-between mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.04] text-zinc-300 group-hover:text-white transition-colors">
              {pkg.icon}
            </div>

            {pkg.benefitTag && (
              <span className={`inline-flex items-center text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                isHighlight
                  ? "text-zinc-200 bg-white/[0.08] border-white/20 font-semibold"
                  : "text-zinc-400 bg-white/[0.03] border-white/10"
              }`}>
                {pkg.benefitTag}
              </span>
            )}
          </div>

          {/* Title & Description */}
          <div className="mb-4">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
              For {pkg.recommendedFor}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-zinc-100 transition-colors">
              {pkg.title}
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed font-light font-sans">
              {pkg.description}
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-2.5 mb-6 flex-1 pt-4 border-t border-white/5">
            {pkg.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-white/[0.06] border border-white/10 text-zinc-300">
                  <Check size={10} />
                </span>
                <span className="text-zinc-300 font-normal font-sans">
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
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-xs tracking-wide transition-all active:scale-[0.98] ${
              isHighlight
                ? "bg-white hover:bg-zinc-200 text-zinc-950 font-semibold shadow-sm"
                : "bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 hover:text-white border border-white/10 hover:border-white/20"
            }`}
          >
            <span>{pkg.ctaText}</span>
            <ArrowRight size={13} className="text-current" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const packages = [
    {
      title: "Websites",
      benefitTag: "Primary Focus",
      description: "Custom websites and landing pages built to look sharp, load fast, and be fully responsive on mobile.",
      features: [
        "Custom Next.js & React architecture",
        "Responsive, accessible design",
        "Fast loading speeds (sub-second)",
        "Technical SEO & Schema metadata",
      ],
      recommendedFor: "Businesses & Portfolios",
      icon: <Globe size={18} />,
      highlight: true,
      ctaText: "Start a Website"
    },
    {
      title: "Custom Online Stores",
      benefitTag: "E-Commerce",
      description: "Fast shopping experiences designed to make browsing, cart management, and purchasing smooth.",
      features: [
        "Custom storefront & catalog search",
        "Cart & checkout flow architecture",
        "Product filtering and inventory UI",
        "WhatsApp direct order integration",
      ],
      recommendedFor: "Brands & Merchants",
      icon: <ShoppingCart size={18} />,
      highlight: false,
      ctaText: "Build Your Store"
    },
    {
      title: "Custom Web Applications",
      benefitTag: "Full-Stack",
      description: "Custom software, client dashboards, and interactive platforms with database and auth integration.",
      features: [
        "Custom dashboard & client portals",
        "Secure auth & role-based access",
        "PostgreSQL & Supabase databases",
        "REST APIs & WebSockets integration",
      ],
      recommendedFor: "Startups & Software",
      icon: <Layers size={18} />,
      highlight: false,
      ctaText: "Build Web App"
    },
  ];

  return (
    <section
      id="services"
      aria-label="Web Development Services by Aafaque Nazir"
      className="relative w-full min-h-screen flex flex-col items-center justify-start bg-black text-white pt-36 sm:pt-40 pb-20"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center">
        {/* Header Section: Proper clearance from floating navbar */}
        <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-3 font-sans">
            Services &amp; Solutions
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed font-sans">
            Clean, modern web development services tailored to help your brand or business build a fast, reliable online presence.
          </p>
        </div>

        {/* 3-Column Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch mb-16">
          {packages.map((pkg, idx) => (
            <ServiceCard key={idx} pkg={pkg} />
          ))}
        </div>

        {/* Process Timeline */}
        <div className="w-full max-w-4xl border-t border-white/5 pt-12">
          <ProcessTimeline />
        </div>
      </div>
    </section>
  );
};

export default Services;
