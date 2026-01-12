import React from "react";
import { motion } from "framer-motion";
import { 
  FaRocket, FaChartLine, FaCrown, FaCheck, 
  FaServer, FaTools, FaMagic, FaSearchPlus, FaArrowRight 
} from "react-icons/fa";

const Services = () => {
  const packages = [
    {
      title: "The Launchpad",
      oldPrice: "₹4,999",
      price: "₹3,999",
      description: "Ideal for personal brands & portfolios. Fast, sleek, and high-impact.",
      features: [
        "Single Page Application (SPA)",
        "Mobile-First Responsive Design",
        "SEO-Ready Architecture",
        "Contact Form & WhatsApp Chat",
        "Free Deployment Setup"
      ],
      recommendedFor: "Starters",
      icon: <FaRocket className="text-3xl text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      accentColor: "cyan",
      delay: 0
    },
    {
      title: "The Growth",
      oldPrice: "₹13,999",
      price: "₹9,999",
      description: "Perfect for businesses needing a CMS and multiple pages to scale.",
      features: [
        "5-8 Premium Pages",
        "Admin Dashboard / Basic CMS",
        "On Page SEO",
        "Google Maps & Analytics",
        "Speed Optimization (Green Score)"
      ],
      recommendedFor: "Scaling",
      icon: <FaChartLine className="text-3xl text-teal-400 group-hover:text-teal-300 transition-colors" />,
      accentColor: "teal",
      highlight: true,
      popularBadge: "MOST POPULAR",
      delay: 0.2
    },
    {
      title: "The Empire",
      oldPrice: "₹47,999",
      price: "₹39,999",
      description: "Full-stack custom solution for startups and complex requirements.",
      features: [
        "Custom SaaS / E-commerce App",
        "Secure User Auth (Login/DB)",
        "Real-time Data & Inventory",
        "UPI & International Payments",
        "1 Month Priority Support"
      ],
      recommendedFor: "Enterprise",
      icon: <FaCrown className="text-3xl text-purple-400 group-hover:text-purple-300 transition-colors" />,
      accentColor: "purple",
      delay: 0.4
    }
  ];

  const addons = [
    {
      id: 1,
      title: "Domain & Hosting Setup",
      price: "₹1,599",
      type: "One-time",
      description: "Hassle-free launch: Custom Domain connection, DNS Management & Free SSL (Green Lock).",
      icon: <FaServer />,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "hover:border-blue-400/50"
    },
    {
      id: 2,
      title: "Priority Support",
      price: "₹999",
      type: "Per Month",
      description: "On-demand content updates via WhatsApp, weekly backups & security monitoring.",
      icon: <FaTools />,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "hover:border-amber-400/50"
    },
    {
      id: 3,
      title: "UI/UX & 3D Magic",
      price: "Custom Quote",
      type: "Project Based",
      description: "GSAP/Framer Motion animations and 3D product visuals for a premium brand feel.",
      icon: <FaMagic />,
      color: "text-fuchsia-400",
      bg: "bg-fuchsia-400/10",
      border: "hover:border-fuchsia-400/50"
    },
  ];

  return (
    <section
      id="services"
      className="relative min-h-screen py-24 px-4 text-white overflow-hidden bg-slate-950 flex flex-col justify-center items-center"
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
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
            Services & Pricing
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            Elite digital solutions engineered for <span className="text-cyan-400 font-semibold">performance</span> and <span className="text-purple-400 font-semibold">scale</span>.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 mb-32 relative z-10">
          {packages.map((pkg, index) => {
             const isHighlight = pkg.highlight;
             const baseBorder = isHighlight ? "border-teal-500/50" : "border-white/10";
             const hoverBorder = isHighlight ? "hover:border-teal-400" : "hover:border-cyan-400/50";
             const shadowColor = isHighlight ? "shadow-teal-500/20" : "shadow-cyan-500/10";
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
                  ${isHighlight ? "lg:-mt-12 lg:mb-4 z-20 scale-105" : "z-10"}
                `}
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`} />
                
                {/* Card Content */}
                <div className={`relative h-full flex flex-col p-8 rounded-3xl bg-[#0a0f1c]/90 backdrop-blur-xl border ${baseBorder} ${hoverBorder} shadow-2xl ${shadowColor} transition-all duration-300 overflow-hidden`}>
                  
                  {/* Decorative "Tech" Lines */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent -mr-16 -mt-16 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-500/5 to-transparent -ml-20 -mb-20 rounded-full blur-3xl pointer-events-none" />
                  
                  {/* Header Section */}
                  <div className="flex justify-between items-start mb-6 w-full relative">
                    <div className={`p-4 rounded-2xl bg-slate-800/50 border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
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
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-wide group-hover:text-cyan-100 transition-colors">{pkg.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 h-10 line-clamp-2">
                    {pkg.description}
                  </p>

                  {/* Pricing Section - REDESIGNED */}
                  <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                    <div className="flex flex-col">
                        <span className="text-xs font-mono text-gray-500 uppercase mb-1">Limited Offer</span>
                        <div className="flex items-baseline gap-3">
                            <span className="text-lg text-gray-500 line-through decoration-red-500/50 decoration-2 font-medium">
                                {pkg.oldPrice}
                            </span>
                            <span className={`text-4xl font-extrabold text-white tracking-tight`}>
                                {pkg.price}
                            </span>
                        </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex-grow space-y-4 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-gray-300 group/item">
                        <div className={`mt-1 p-0.5 rounded-full bg-slate-800 border border-slate-700/50 flex-shrink-0
                          ${pkg.accentColor === 'cyan' ? 'group-hover/item:border-cyan-500/50 group-hover/item:text-cyan-400' : ''}
                          ${pkg.accentColor === 'teal' ? 'group-hover/item:border-teal-500/50 group-hover/item:text-teal-400' : ''}
                          ${pkg.accentColor === 'purple' ? 'group-hover/item:border-purple-500/50 group-hover/item:text-purple-400' : ''}
                        `}>
                            <FaCheck size={10} />
                        </div>
                        <span className="group-hover:text-white transition-colors duration-300 leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href="#contact"
                    className={`relative w-full py-4 rounded-xl font-bold text-center uppercase tracking-widest text-xs transition-all duration-300 overflow-hidden transform group-hover:scale-[1.02] active:scale-[0.98]
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
              <span className="text-cyan-400 font-mono text-sm tracking-[0.2em] mb-3 uppercase">Power Up Your Project</span>
              <h3 className="text-3xl md:text-4xl font-bold text-white text-center">System Modules & Add-ons</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-6 rounded-full" />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative max-w-7xl mx-auto">
             {/* Decorative Background Elements for the Grid */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full" />

              {addons.map((addon) => (
                <motion.div
                  key={addon.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: addon.id * 0.1 }}
                  viewport={{ once: true }}
                  className={`group relative overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/5 ${addon.border} transition-all duration-500 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1`}
                >
                  <div className="p-8 flex items-start gap-6 relative z-10">
                    {/* Icon Box */}
                    <div className={`p-4 rounded-2xl ${addon.bg} ${addon.color} text-2xl shadow-lg ring-1 ring-white/5`}>
                      {addon.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                        <h4 className="text-xl font-bold text-white group-hover:text-cyan-100 transition-colors">
                          {addon.title}
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border border-white/10 ${addon.color} ${addon.bg} uppercase tracking-wider`}>
                          {addon.price}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                        {addon.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest group-hover:text-cyan-400/80 transition-colors">
                         <span className="w-1.5 h-1.5 rounded-full bg-current" />
                         {addon.type}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effects */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${addon.bg.replace('/10', '/5')} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent group-hover:w-full transition-all duration-700 ease-out opacity-50" />
                </motion.div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
