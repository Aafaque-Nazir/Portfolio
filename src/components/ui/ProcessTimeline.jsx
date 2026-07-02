import React from "react";
import { motion } from "framer-motion";
import { FaComments, FaCode, FaPaintBrush, FaRocket } from "react-icons/fa";

const steps = [
  {
    title: "Discovery & Planning",
    description: "Understanding your business goals, target audience, and technical requirements. We define the project scope and set clear milestones.",
    icon: <FaComments />,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Architecture & Design",
    description: "Creating wireframes and selecting the optimal tech stack. I design scalable databases and intuitive, premium user interfaces.",
    icon: <FaPaintBrush />,
    color: "from-cyan-400 to-emerald-400"
  },
  {
    title: "Engineering",
    description: "Writing clean, DRY, and scalable code. I build the frontend and backend with a focus on performance, security, and best practices.",
    icon: <FaCode />,
    color: "from-emerald-400 to-yellow-400"
  },
  {
    title: "Delivery & Optimization",
    description: "Rigorous testing, SEO optimization, and deploying to production. Achieving 100/100 Lighthouse scores and seamless handover.",
    icon: <FaRocket />,
    color: "from-yellow-400 to-orange-500"
  }
];

const ProcessTimeline = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-24 px-4 relative">
      <div className="text-center mb-16">

        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase">
          How I Build
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
          A structured, professional approach ensures every project is delivered on time, within budget, and to the highest engineering standards.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Background Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-white/[0.05] -translate-x-1/2 rounded-full" />
        
        {/* Animated Gradient Line */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-6 md:left-1/2 top-0 w-1 bg-gradient-to-b from-cyan-400 to-transparent -translate-x-1/2 rounded-full origin-top" 
        />

        <div className="flex flex-col gap-12 md:gap-20">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row items-start md:items-center w-full"
              >
                
                {/* Desktop Left Side */}
                <div className={`hidden md:block w-1/2 pr-12 text-right ${isEven ? "" : "opacity-0 invisible"}`}>
                  <div className="text-6xl font-black text-white/[0.03] absolute top-1/2 -translate-y-1/2 right-[55%]">0{index + 1}</div>
                  {isEven && (
                    <>
                      <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{step.description}</p>
                    </>
                  )}
                </div>

                {/* Center Icon */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black border-2 border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] overflow-hidden z-20 group hover:border-cyan-400 transition-all duration-300">
                  <span className="text-xl md:text-2xl text-slate-300 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300 relative z-10">
                    {step.icon}
                  </span>
                </div>

                {/* Mobile Content & Desktop Right Side */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-12 ${!isEven ? "md:text-left" : "md:opacity-0 md:invisible"}`}>
                  <div className="text-5xl font-black text-white/[0.03] absolute top-2 right-4 md:hidden">0{index + 1}</div>
                  <div className="hidden md:block text-6xl font-black text-white/[0.03] absolute top-1/2 -translate-y-1/2 left-[55%]">
                    {!isEven ? `0${index + 1}` : ""}
                  </div>
                  
                  <div className={!isEven ? "block md:block" : "block md:hidden"}>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 pt-2 md:pt-0">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm md:text-base">{step.description}</p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
