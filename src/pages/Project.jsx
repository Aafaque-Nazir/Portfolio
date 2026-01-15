"use client";
import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { RiSignalTowerFill, RiArrowRightUpLine } from "react-icons/ri";

const projects = [
  {
    title: "Inventory System",
    description:
      "Eliminates operational chaos with real-time stock tracking and automated reordering.",
    image: "./inventory-thumbnail.png",
    link: "https://nvntory-mgm.vercel.app/",
    tech: ["Next.js", "Supabase", "ShadCN"],
    id: 1,
  },
  {
    title: "Ecommerce Store",
    description:
      "Converts visitors into loyal customers with a seamless, secure shopping experience.",
    image: "./ecommerce-thumbnail.png",
    link: "https://shopease-aafaque.netlify.app/",
    tech: ["Next.js", "Redux", "Stripe"],
    id: 2,
  },
  {
    title: "Restaurant App",
    description:
      "Streamlines food ordering to reduce wait times and maximize table turnover.",
    image: "./resturant-thumbnail.png",
    link: "https://bread-and-bite.netlify.app/",
    tech: ["React", "WhatsApp API", "Tailwind"],
    id: 3,
  },
  {
    title: "Smart Dining OS",
    description:
      "An end-to-end Restaurant OS that streamlines operations with direct table-to-kitchen ordering, eliminating service bottlenecks and errors in real-time.",
    image: "./smart-dining-thumbnail.png",
    link: "https://korner-kafe.netlify.app/",
    tech: ["Next.js", "Tailwind", "PostgreSQL"],
    id: 4,
  },
  {
    title: "Luxury Chauffeur",
    description:
      "Premium booking engine that simplifies reservation management for high-end fleets.",
    image: "./car-thumbnail.png",
    link: "https://royalcarz.netlify.app/",
    tech: ["Next.js", "Booking Logic", "Framer"],
    id: 5,
  },
  {
    title: "Bus Booked",
    description:
      "A comprehensive bus operator dashboard featuring real-time seat management, automated manifest generation, and seamless WhatsApp integration.",
    image: "./bus-booked-thumbnail.png",
    link: "https://bus-booked.netlify.app/",
    tech: ["Next.js", "Booking Logic", "Supabase"],
    id: 6,
  },
];

const ProjectCard = ({ project }) => {
  return (
    <div className="relative h-[480px] w-[320px] md:w-[400px] shrink-0 rounded-[2rem] overflow-hidden group border border-white/10 bg-slate-900/80 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:shadow-2xl">
      {/* Background Image Area */}
      <div className="absolute inset-0 h-[60%] overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/20 z-10 transition-colors duration-500 group-hover:bg-transparent" />
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
      </div>

      {/* Content Area */}
      <div className="absolute bottom-0 w-full h-[55%] flex flex-col justify-end p-6 z-20 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          {/* Title - Clean & Sharp */}
          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-xs mb-4 leading-relaxed line-clamp-2 font-medium">
            {project.description}
          </p>

          {/* Tech Stack - Minimalist Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold border border-white/10 rounded-full text-gray-300 bg-white/5 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Premium Button - Minimalist White */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative w-full py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 overflow-hidden bg-white text-black transition-all duration-300 hover:bg-gray-200"
          >
            {/* Button Text */}
            <span className="relative z-10 tracking-widest text-[10px] uppercase">
              View Project
            </span>

            {/* Icon */}
            <RiArrowRightUpLine className="relative z-10 text-base group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
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
    offset: ["start start", "end end"],
  });

  // Adjusted transformation range to start more centrally and end with the last card visible
  // Starts at 5% to give padding on the left
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"]);

  return (
    <section
      ref={targetRef}
      id="projects"
      className="relative h-[300vh] bg-slate-950"
      style={{ position: "relative" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Title */}
        <div className="absolute top-8 md:top-16 text-center z-10 px-4 w-full">
          <h2 className="text-[12vw] md:text-[8rem] font-black text-white/5 uppercase tracking-tighter leading-none select-none pointer-events-none">
            Selected Works
          </h2>
        </div>

        <div className="absolute top-20 md:top-24 left-0 w-full flex justify-center z-20 pointer-events-none mix-blend-overlay">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[12vw] md:text-8xl font-black uppercase tracking-tighter text-transparent leading-none text-center px-4"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
          >
            Featured Projects
          </motion.h2>
        </div>

        {/* Horizontal Scroll Container */}
        {/* Centered flex container roughly */}
        <div className="w-full flex items-center mt-20 md:mt-0">
          <motion.div
            style={{ x }}
            className="flex gap-8 md:gap-12 pl-4 md:pl-20 pr-8 md:pr-20"
          >
            {projects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 text-gray-500 animate-pulse z-50">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-cyan-500 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Project;
