import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const testimonials = [
  {
    name: "Rahul M.",
    role: "Project Lead",
    text: "The way Aafaque handled the conversion project section was brilliant. The code was clean, the animations were smooth, and it was exactly what we needed to boost engagement.",
  },
  {
    name: "Sneha K.",
    role: "UI/UX Designer",
    text: "Honestly, one of the best portfolios I've seen in a while. The attention to detail, the 60fps animations, and the overall aesthetic are just next level. Highly recommended!",
  },
  {
    name: "Vikram S.",
    role: "Startup Founder",
    text: "Aafaque doesn't just write code; he builds experiences. We needed something fast and modern, and he delivered beyond our expectations. Great communication too.",
  },
];

const TestimonialCard = ({ testimonial, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-[2rem] p-[1px] overflow-hidden bg-white/5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
    >
      {/* Hover Border Glow */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(350px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.15), transparent 85%)`
          ),
        }}
      />
      <div className="relative bg-[#09090b] rounded-[1.95rem] border border-white/5 p-8 flex flex-col justify-between h-full overflow-hidden min-h-[300px]">
        {/* Spotlight */}
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.95rem]"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.02), transparent 80%)`
            ),
          }}
        />
        
        <div className="relative z-10 flex flex-col justify-between h-full flex-grow">
          {/* Top Row: Stars and Quote Mark */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.858 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
                </svg>
              ))}
            </div>
            <svg className="w-8 h-8 text-cyan-500/20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          
          {/* Review Text */}
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light mb-8 italic flex-grow text-left">
            "{testimonial.text}"
          </p>

          {/* User Details */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-sm font-black text-cyan-400">
              {testimonial.name[0]}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-black text-white leading-none block">{testimonial.name}</span>
              <span className="text-[10px] font-mono text-cyan-500/70 tracking-wider uppercase mt-1.5 block">{testimonial.role}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 relative z-10">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase mb-4"
        >
          What People Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 font-mono text-xs md:text-sm tracking-widest uppercase"
        >
          Real feedback from professionals
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, idx) => (
          <TestimonialCard key={idx} testimonial={testimonial} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
