import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Layout,
  Code2,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    title: "Discovery & Scope",
    description: "Understanding your project goals, user requirements, and timeline to define clean deliverables and milestones.",
    icon: <MessageSquare size={18} />,
  },
  {
    title: "Architecture & UI",
    description: "Planning the data structure, component hierarchy, and building an accessible, responsive interface.",
    icon: <Layout size={18} />,
  },
  {
    title: "Development & Testing",
    description: "Writing clean, modular code with React/Next.js and backend integrations, focusing on performance and reliability.",
    icon: <Code2 size={18} />,
  },
  {
    title: "Deployment & Delivery",
    description: "Configuring production builds, SEO metadata, automated deployments, and post-launch verification.",
    icon: <CheckCircle2 size={18} />,
  },
];

const ProcessTimeline = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 relative">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2 uppercase font-sans">
          How I Build
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed font-sans">
          A clear, straightforward approach to build and deliver your website or application smoothly.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Background Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />

        <div className="flex flex-col gap-10 md:gap-14">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative flex flex-col md:flex-row items-start md:items-center w-full"
              >
                {/* Desktop Left Side */}
                <div className={`hidden md:block w-1/2 pr-10 text-right ${isEven ? "" : "opacity-0 invisible"}`}>
                  <div className="text-5xl font-mono font-black text-white/[0.04] absolute top-1/2 -translate-y-1/2 right-[54%]">
                    0{index + 1}
                  </div>
                  {isEven && (
                    <>
                      <h3 className="text-lg font-bold text-white mb-1.5 font-sans">{step.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed font-normal font-sans">{step.description}</p>
                    </>
                  )}
                </div>

                {/* Center Node Icon */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-zinc-950 border border-white/15 flex items-center justify-center text-zinc-300 shadow-[0_4px_16px_rgba(0,0,0,0.8)] z-20">
                  {step.icon}
                </div>

                {/* Mobile Content & Desktop Right Side */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-10 ${!isEven ? "md:text-left" : "md:opacity-0 md:invisible"}`}>
                  <div className="text-4xl font-mono font-black text-white/[0.04] absolute top-1 right-2 md:hidden">
                    0{index + 1}
                  </div>
                  <div className="hidden md:block text-5xl font-mono font-black text-white/[0.04] absolute top-1/2 -translate-y-1/2 left-[54%]">
                    {!isEven ? `0${index + 1}` : ""}
                  </div>

                  <div className={!isEven ? "block md:block" : "block md:hidden"}>
                    <h3 className="text-lg font-bold text-white mb-1.5 font-sans">{step.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-normal font-sans">{step.description}</p>
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
