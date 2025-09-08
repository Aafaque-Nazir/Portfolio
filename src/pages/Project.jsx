import { RiSignalTowerFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const projects = [
  {
    title: "Ecommerce Platform",
    description:
      "A full-featured ecommerce platform with product listings, shopping cart, and secure checkout.",
    image: "https://i.ibb.co/jZyV94dw/CAF70-BF2-EABA-40-C2-BCC1-8-E0-AF74746-FD.png",
    link: "https://shopease-aafaque.netlify.app/",
    tech: ["Next.js", "Redux", "Tailwind", "Google Authentication "],
    github: "https://github.com/Aafaque-Nazir/ecomstore",
  },
  {
    title: "Frontend Journey",
    description:
      " A collection of Projects that i made in my Frontend Journey.",
    image: "https://i.ibb.co/B23xBMpj/74696-DD6-3-EA1-4843-BCA8-095-FF0-A5-FBF0.png",
    link: "https://projects-aafaque.netlify.app/",
    tech: ["React", "Tailwind",],
    github: "https://github.com/Aafaque-Nazir/LandingPagesFolder",
  },
];

const Project = () => {
  return (
    <section id="projects" className="py-20 px-6 text-white">
      <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">
        My Projects
      </h2>
      <div className="max-w-6xl mx-auto">
        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-12 md:grid-cols-2"
        >
          {projects.map((project, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              glareEnable={true}
              glareColor="cyan"
              glarePosition="all"
              glareBorderRadius="1rem"
              scale={1.05}
              transitionSpeed={2500}
              className="rounded-2xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 
                rounded-2xl p-6 md:p-8 shadow-xl 
                bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 
                hover:shadow-cyan-400/20 transition-shadow duration-500 
                min-h-[480px]">


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
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-3">
                    {/* Live Demo Button */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live Demo"
                      className="relative group px-5 py-3 rounded-xl overflow-hidden 
                                 bg-gradient-to-r from-emerald-400 to-cyan-500 
                                 text-black font-semibold shadow-lg shadow-emerald-500/30 
                                 hover:shadow-emerald-500/60 transform hover:scale-105 
                                 transition-all duration-500"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <RiSignalTowerFill
                          size={20}
                          className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        Live Demo
                      </span>
                      <span className="absolute inset-0 rounded-xl border-2 border-emerald-400/40 group-hover:border-emerald-300 blur-sm"></span>
                      <span className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 rounded-xl blur-xl transition duration-500"></span>
                    </a>

                    {/* GitHub Button */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Repository"
                      className="relative group px-5 py-3 rounded-xl overflow-hidden 
                                 bg-gradient-to-r from-purple-400 to-fuchsia-500 
                                 text-black font-semibold shadow-lg shadow-purple-500/30 
                                 hover:shadow-purple-500/60 transform hover:scale-105 
                                 transition-all duration-500"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <FaGithub
                          size={20}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                        GitHub
                      </span>
                      <span className="absolute inset-0 rounded-xl border-2 border-purple-400/40 group-hover:border-fuchsia-300 blur-sm"></span>
                      <span className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 rounded-xl blur-xl transition duration-500"></span>
                    </a>
                  </div>
                </div>
              </div>
            </Tilt>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Project;
