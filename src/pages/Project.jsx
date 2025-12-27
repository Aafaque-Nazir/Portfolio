"use client";
import { RiSignalTowerFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";


const projects = [
  {
    title: "Inventory Management system",
    description:
      "A Full Stack Inventory Management System: Inventory, suppliers, purchase orders, and real-time stock tracking with automated IN/OUT movement and role-based access.",
    image: "./inventory-thumbnail.jpeg",
    link: "https://nvntory-mgm.vercel.app/",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "ShadCN UI", "RBAC Auth", "Redux"],
    github: "https://github.com/Aafaque-Nazir/",
  },
  {
    title: "Ecommerce Platform",
    description:
      "A full-featured ecommerce platform with product listings, shopping cart, and secure checkout.",
    image: "./ecommerce-thumbnail.jpeg",
    link: "https://shopease-aafaque.netlify.app/",
    tech: ["Next.js", "Redux", "Tailwind", "Google Authentication"],
    github: "https://github.com/Aafaque-Nazir/ecomstore",
  },
  {
    title: "Restaurant App",
    description:
      "A high-conversion, mobile-first landing page for a local Fast Food brand in Navi Mumbai — optimized for direct WhatsApp orders and speed.",
    image: "./resturant-thumbnail.jpeg",
    link: "https://bread-and-bite.netlify.app/",
    tech: ["React", "Tailwind","Cart Integration", "WhatsApp API", "Responsive Design",],
    github: "https://github.com/Aafaque-Nazir/Foodiezz-main",
  },
  {
    title: "Car Booking App",
    description:
      "Car Booking App Book your car with ease and comfort. Request Car and we Arrive at your doorstep. ",
    image: "./car-thumbnail.jpeg",
    link: "https://royalcarz.netlify.app/",
    tech: ["Next.js", "Tailwind", "Booking System",  "Responsive Design",],
    github: "https://github.com/Aafaque-Nazir/my-app",
  },
];

const Project = () => {
  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-6 text-white overflow-hidden bg-slate-950"
    >
      {/* Premium Static Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-teal-900/10 via-slate-950 to-slate-950" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}

          className="text-5xl md:text-6xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent"
        >
          My Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-gray-300 mb-16 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Some of the projects I've built with love, precision, and the latest
          technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center gap-3 
                rounded-2xl p-3 shadow-lg 
                bg-slate-900/40 backdrop-blur-md border border-white/5 
                hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 
                hover:-translate-y-2
                transition-all duration-500 ease-out"
              >
                {/* Image Wrapper */}
                <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover rounded-xl shadow-md"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="w-full px-2 py-1 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed h-10">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-800/50 text-cyan-300/90 text-[10px] font-medium rounded-md border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors"
                    >
                      <RiSignalTowerFill size={16} />
                      Live Demo
                    </a>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-800/50 rounded-lg text-white hover:bg-slate-700 transition-all border border-white/5"
                      aria-label="View Code"
                    >
                      <FaGithub size={18} />
                    </a>
                  </div>
                </div>
              </div>

          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Project;
