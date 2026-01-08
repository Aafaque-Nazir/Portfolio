"use client";
import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { RiSignalTowerFill, RiArrowRightUpLine } from "react-icons/ri";

const projects = [
  {
    title: "Inventory System",
    description: "Full-stack dashboard with RBAC, realtime stock tracking & automated orders.",
    image: "./inventory-thumbnail.jpeg",
    link: "https://nvntory-mgm.vercel.app/",
    tech: ["Next.js", "Supabase", "ShadCN"],
    id: 1,
  },
  {
    title: "Ecommerce Store",
    description: "Modern shopping platform with cart logic, secure auth & checkout flow.",
    image: "./ecommerce-thumbnail.jpeg",
    link: "https://shopease-aafaque.netlify.app/",
    tech: ["Next.js", "Redux", "Stripe"],
    id: 2,
  },
  {
    title: "Restaurant App",
    description: "Speed-focused food ordering app optimized for WhatsApp conversions.",
    image: "./resturant-thumbnail.jpeg",
    link: "https://bread-and-bite.netlify.app/",
    tech: ["React", "WhatsApp API", "Tailwind"],
    id: 3,
  },
  {
    title: "Car Booking",
    description: "Premium vehicle reservation system with instant quotes and booking management.",
    image: "./car-thumbnail.jpeg",
    link: "https://royalcarz.netlify.app/",
    tech: ["Next.js", "Booking Logic", "Framer"],
    id: 4,
  },
];

const ProjectCard = ({ project }) => {
  return (
    <div className="relative h-[500px] w-[350px] md:w-[450px] shrink-0 rounded-3xl overflow-hidden group border border-white/10 bg-slate-900/50 backdrop-blur-sm transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_50px_rgba(6,182,212,0.15)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-3xl font-bold text-white mb-3 uppercase tracking-wide drop-shadow-lg">
            {project.title}
          </h3>
          <p className="text-gray-200 text-sm mb-6 leading-relaxed line-clamp-2 drop-shadow-md font-medium">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t, i) => (
              <span key={i} className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold border border-white/20 rounded-full text-cyan-300 bg-black/40 backdrop-blur-md shadow-sm">
                {t}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative w-full py-3.5 rounded-xl font-bold text-center flex items-center justify-center gap-3 overflow-hidden bg-white/10 border border-white/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-cyan-500 hover:border-cyan-500 hover:text-slate-950 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            <span className="relative z-10 tracking-wider text-sm uppercase">Live Demo</span>
            <RiArrowRightUpLine className="relative z-10 text-lg group-hover/btn:rotate-45 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Project = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Adjusted transformation range to start more centrally and end with the last card visible
  // Starts at 5% to give padding on the left
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"]);

  return (
    <section ref={targetRef} id="projects" className="relative h-[300vh] bg-slate-950">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Title */}
        <div className="absolute top-8 md:top-16 text-center z-10 px-4 w-full">
          <h2 className="text-[12vw] md:text-[8rem] font-black text-white/5 uppercase tracking-tighter leading-none select-none pointer-events-none">
            Selected Works
          </h2>
        </div>
        
        <div className="absolute top-16 md:top-32 left-0 w-full text-center z-20 pointer-events-none">
             <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 inline-block drop-shadow-2xl"
          >
            Featured Projects
          </motion.h2>
        </div>

        {/* Horizontal Scroll Container */}
        {/* Centered flex container roughly */}
        <div className="w-full flex items-center mt-20 md:mt-0">
            <motion.div style={{ x }} className="flex gap-8 md:gap-12 pl-4 md:pl-20">
            {projects.map((project) => (
                <ProjectCard project={project} key={project.id} />
            ))}
            </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 text-gray-500 animate-pulse">
           <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
           <div className="w-[1px] h-8 bg-gradient-to-b from-cyan-500 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Project;
