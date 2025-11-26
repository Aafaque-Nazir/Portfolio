"use client";
import { RiSignalTowerFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";


const projects = [
  {
    title: "Inventory Management system",
    description:
      "A Full Stack Commodity Management System: Inventory, suppliers, purchase orders, and real-time stock tracking with automated IN/OUT movement and role-based access.",
    image: "./comodities-thumbnail.jpeg",
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

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid gap-12 md:grid-cols-3"
        >
          {projects.map((project, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center gap-6 
                rounded-3xl p-6 shadow-xl 
                bg-slate-900/50 backdrop-blur-xl border border-white/10 
                hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 
                hover:-translate-y-2
                transition-all duration-500 ease-out min-h-[480px]"
              >
                {/* Image */}
                <div className="flex-1 w-full overflow-hidden rounded-xl">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 w-full text-center md:text-left space-y-4">
                  <h2 className="text-2xl md:text-3xl font-extrabold from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                    {project.title}
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-cyan-400/10 text-cyan-300 text-xs font-medium rounded-full border border-cyan-400/20 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-3">
                    {/* Live Demo */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group px-5 py-3 rounded-xl overflow-hidden 
                                 bg-gradient-to-r from-emerald-300 to-cyan-400 
                                 text-slate-900 font-bold shadow-lg shadow-emerald-500/30 
                                 hover:shadow-emerald-500/50 transform hover:scale-105 
                                 hover:brightness-110
                                 transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <RiSignalTowerFill
                          size={20}
                          className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        Live Demo
                      </span>
                      <span className="absolute inset-0 rounded-xl border-2 border-emerald-400/40 group-hover:border-emerald-300 blur-sm"></span>
                    </a>

                    {/* GitHub */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group px-5 py-3 rounded-xl overflow-hidden 
                                 bg-gradient-to-r from-purple-400 to-fuchsia-400 
                                 text-slate-900 font-bold shadow-lg shadow-purple-500/30 
                                 hover:shadow-purple-500/50 transform hover:scale-105 
                                 hover:brightness-110
                                 transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <FaGithub
                          size={20}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                        GitHub
                      </span>
                      <span className="absolute inset-0 rounded-xl border-2 border-purple-400/40 group-hover:border-fuchsia-300 blur-sm"></span>
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
