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

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Project = () => {
  return (
    <section id="projects" className="py-20 px-6 text-white">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Featured Project */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <ElectricBorder
            color="#00ffff"
            speed={0.7}
            chaos={1}
            thickness={1.5}
            style={{ borderRadius: "1.5rem" }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-cyan-400/20 transition-shadow duration-500">
              {/* Image */}
              <div className="flex-1 w-full">
                <img
                  src={projects[0].image}
                  alt={projects[0].title}
                  className="rounded-2xl w-full object-cover h-72 md:h-96 shadow-lg hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex-1 w-full text-center md:text-left space-y-6">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent leading-tight">
                  {projects[0].title}
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg md:text-xl max-w-2xl mx-auto md:mx-0">
                  {projects[0].description}
                </p>
                <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
                  {projects[0].tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-cyan-400/10 text-cyan-300 text-sm font-medium rounded-full border border-cyan-400/20 backdrop-blur-sm hover:bg-cyan-400/20 hover:scale-105 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a
                    href={projects[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live Demo"
                    className="group p-4 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-semibold hover:from-black hover:to-gray-900 hover:text-cyan-400 shadow-lg hover:shadow-cyan-400/30 transform hover:scale-110 transition-all duration-300"
                  >
                    <RiSignalTowerFill
                      size={22}
                      className="group-hover:rotate-12 transition-transform duration-300"
                    />
                  </a>
                  <a
                    href={projects[0].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repository"
                    className="group p-4 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-semibold hover:from-black hover:to-gray-900 hover:text-cyan-400 shadow-lg hover:shadow-cyan-400/30 transform hover:scale-110 transition-all duration-300"
                  >
                    <FaGithub
                      size={22}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </a>
                </div>
              </div>
            </div>
          </ElectricBorder>
        </motion.div>

        {/* Mini Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.slice(1).map((project, index) => (
            <motion.div key={index} variants={cardVariants}>
              <ElectricBorder
                color="#00ffff"
                speed={0.8}
                chaos={0.4}
                thickness={1.5}
                style={{ borderRadius: "1.25rem" }}
              >
                <div className="rounded-xl bg-white/5 backdrop-blur-lg p-6 flex flex-col h-full shadow-lg hover:shadow-cyan-400/30 transition duration-500">
                  {/* Image */}
                  <div className="overflow-hidden rounded-lg mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-40 object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-cyan-300 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-start gap-3 mt-4">
                      <a
                        href={project.link}
                        target="_blank"
                        className="p-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-black hover:from-black hover:to-gray-900 hover:text-cyan-400 transition-all duration-300 shadow-md"
                      >
                        <RiSignalTowerFill size={18} />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        className="p-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-black hover:from-black hover:to-gray-900 hover:text-cyan-400 transition-all duration-300 shadow-md"
                      >
                        <FaGithub size={18} />
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
