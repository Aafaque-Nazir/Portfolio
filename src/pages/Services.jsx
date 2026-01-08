import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaChartLine, FaCrown, FaCheckCircle } from "react-icons/fa";

const Services = () => {
  const packages = [
    {
      title: "The Launchpad",
      price: "Starts at ₹8,000",
      description: "A lightning-fast, high-impact digital entry point. We engineer sleek Single Page Applications designed for speed and conversion, perfect for establishing an undeniable digital footprint.",
      features: [
        "High-Performance Single Page Application (SPA)",
        "Mobile-First Responsive Architecture",
        "Foundation structure for SEO dominance",
        "Seamless Contact Form & Email Integration",
        "Complimentary Deployment (Vercel/Netlify)"
      ],
      recommendedFor: "Personal Brands, Consultants, Portfolio Sites",
      icon: <FaRocket className="text-4xl text-cyan-400 mb-4" />,
      highlight: false
    },
    {
      title: "The Growth",
      price: "Starts at ₹20,000",
      description: "Scale your operations with a robust, multi-page platform. This solution blends stunning aesthetics with a powerful CMS, giving you full control over your content to drive user engagement and business growth.",
      features: [
        "5-8 Premium Pages (Home, Services, etc.)",
        "Intuitive Admin Dashboard & CMS",
        "Dynamic Blog/News Engine for Organic Traffic",
        "Google Analytics & Map Integration",
        "Performance Optimization (Green Lighthouse Score)"
      ],
      recommendedFor: "Agencies, SMEs, Service Providers",
      icon: <FaChartLine className="text-4xl text-teal-400 mb-4" />,
      highlight: true
    },
    {
      title: "The Empire",
      price: "Starts at ₹45,000",
      description: "The ultimate digital command center. A bespoke full-stack infrastructure architected for complex logic, secure transactions, and real-time data—engineered to declutter your workflow and maximize revenue.",
      features: [
        "End-to-End Custom SaaS / Web Application",
        "Secure Authentication (Login/Signup/Profile)",
        "Real-time Database & Inventory Management",
        "Seamless Payment Gateway (Razorpay/Stripe)",
        "1 Month Dedicated Priority Support"
      ],
      recommendedFor: "E-commerce, Tech Startups, Enterprise Solutions",
      icon: <FaCrown className="text-4xl text-purple-400 mb-4" />,
      highlight: false
    }
  ];

  return (
    <section
      id="services"
      className="relative min-h-screen py-24 px-6 text-white overflow-hidden bg-slate-950"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-teal-900/10 via-slate-950 to-slate-950" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent"
        >
          Services & Pricing
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-gray-300 mb-16 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Choose the perfect package to elevate your digital presence. High-performance, tailored solutions for every stage of growth.
        </motion.p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 
                ${pkg.highlight 
                  ? "bg-slate-900/60 border-cyan-500 shadow-2xl shadow-cyan-500/10 scale-105 z-10" 
                  : "bg-slate-900/40 border-white/5 hover:border-cyan-500/30 hover:shadow-xl"
                }`}
            >
              {/* Card Header */}
              <div className="flex flex-col items-center text-center mb-6">
                {pkg.icon}
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.title}</h3>
                <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">{pkg.recommendedFor}</p>
                <div className="mt-4 text-3xl font-extrabold text-cyan-300">{pkg.price}</div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-center mb-8 leading-relaxed text-sm">
                {pkg.description}
              </p>

              {/* Features List */}
              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-300">
                    <FaCheckCircle className="text-cyan-400 mt-1 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="#contact"
                className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 
                  ${pkg.highlight 
                    ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]" 
                    : "bg-slate-800 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/20"
                  }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
