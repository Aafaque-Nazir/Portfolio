import { RiSignalTowerFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import ElectricBorder from "../components/ElectricBorder";

const projects = [
  {
    title: "BlogPostApp",
    description:
      "A Complex blogging platform for creating and managing blog posts effortlessly with Authentication.",
    image: "/your-featured-project-image.png",
    link: "https://blogpostapp-aafaque.netlify.app/",
    tech: ["React", "Redux", "Tailwind", "AppWrite"],
    github: "https://github.com/Aafaque-Nazir/BlogProject",
  },
  {
    title: "Ecommerce Platform",
    description:
      "A full-featured ecommerce platform with product listings, shopping cart, and secure checkout.",
    image: "/your-featured-project-image.png",
    link: "https://shopease-aafaque.netlify.app/",
    tech: ["Next.js", "Redux", "Tailwind", "Authentication"],
    github: "https://github.com/Aafaque-Nazir/ecomstore",
  },
];

const Project = () => {
  return (
    <section id="projects" className="py-20 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-12 md:grid-cols-2"
        >
          {projects.map((project, index) => (
            <motion.div key={index}>
              <ElectricBorder
                color="#00ffff"
                speed={0.7}
                chaos={0.7}
                thickness={1.3}
                style={{ borderRadius: "1.5rem" }}
              >
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-cyan-400/20 transition-shadow duration-500">
                  {/* Image */}
                  <div className="flex-1 w-full overflow-hidden rounded-xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 w-full text-center md:text-left space-y-4">
                    <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
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
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                        className="group p-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-black hover:from-black hover:to-gray-900 hover:text-cyan-400 shadow-lg hover:shadow-cyan-400/30 transform hover:scale-110 transition-all duration-300"
                      >
                        <RiSignalTowerFill
                          size={20}
                          className="group-hover:rotate-12 transition-transform duration-300"
                        />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                        className="group p-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-black hover:from-black hover:to-gray-900 hover:text-cyan-400 shadow-lg hover:shadow-cyan-400/30 transform hover:scale-110 transition-all duration-300"
                      >
                        <FaGithub
                          size={20}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </ElectricBorder>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Project;
