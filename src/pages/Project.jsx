import { RiSignalTowerFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const projects = [
  {
    title: "BlogPostApp",
    description:
      "A minimalist blogging platform for creating and managing blog posts effortlessly.",
    image: "/your-featured-project-image.png",
    link: "https://blogpostapp-aafaque.netlify.app/",
    tech: ["React", "Redux", "Tailwind", "AppWrite"],
    github: "https://github.com/Aafaque-Nazir/BlogProject",
  },
  {
    title: "LandingPages Folder",
    description:
      "A website showcasing landing pages built with modern technologies.",
    image: "/your-featured-project-image.png",
    link: "https://lpfolder.netlify.app/",
    tech: ["React", "TailwindCSS"],
    github: "https://github.com/Aafaque-Nazir/LandingPagesFolder",
  },
  {
    title: "Toolymon",
    description: "All-in-one platform combining multiple useful online tools.",
    image: "/your-featured-project-image.png",
    link: "https://toolymon.netlify.app/",
    tech: ["React", "TailwindCSS"],
    github: "https://github.com/Aafaque-Nazir/Toolymon",
  },
  {
    title: "Tasky - Todo App",
    description: "A simple, efficient todo app to manage and track tasks.",
    image: "/project1.png",
    link: "https://tasky-todolist.netlify.app/",
    tech: ["React", "TailwindCSS"],
    github: "https://github.com/Aafaque-Nazir/TodoList",
  },
  {
    title: "Random Password Generator",
    description: "Generate secure random passwords quickly and easily.",
    image: "/project2.png",
    link: "https://password-randoms.netlify.app/",
    tech: ["React", "TailwindCSS"],
    github: "https://github.com/Aafaque-Nazir/pass-generator",
  },
  {
    title: "PassMan - Password Manager",
    description:
      "Securely store and manage your passwords with this manager.",
    image: "/project3.png",
    link: "https://passman-passwordmanager.netlify.app/",
    tech: ["React", "TailwindCSS"],
    github: "https://github.com/Aafaque-Nazir/PassManager",
  },
  {
    title: "Currency Converter",
    description:
      "Real-time currency conversion tool with live rates.",
    image: "/project3.png",
    link: "https://currenccyconnvverter.netlify.app/",
    tech: ["React", "TailwindCSS"],
    github: "https://github.com/Aafaque-Nazir/CurrecncyConverter",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const Project = () => {
  return (
    <section id="projects" className="py-20 px-6  text-white">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Featured Project */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center gap-10 bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-white/20"
        >
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-cyan-400">
              {projects[0].title}
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {projects[0].description}
            </p>
            <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
              {projects[0].tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-cyan-400/20 text-cyan-300 text-xs rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href={projects[0].link}
                target="_blank"
                className="p-3 rounded-full bg-cyan-400 text-black hover:bg-black hover:text-cyan-400 transition"
              >
                <RiSignalTowerFill size={20} />
              </a>
              <a
                href={projects[0].github}
                target="_blank"
                className="p-3 rounded-full bg-cyan-400 text-black hover:bg-black hover:text-cyan-400 transition"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </motion.div>


        {/* Mini Projects */}


        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-10 md:grid-cols-3"
        >
          {projects.slice(1).map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-cyan-400/30 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold mb-2 text-cyan-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-cyan-400/20 text-cyan-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center md:justify-start gap-4 mt-4">
                <a
                  href={project.link}
                  target="_blank"
                  className="p-2 rounded-full bg-cyan-400 text-black hover:bg-black hover:text-cyan-400 transition"
                >
                  <RiSignalTowerFill size={18} />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  className="p-2 rounded-full bg-cyan-400 text-black hover:bg-black hover:text-cyan-400 transition"
                >
                  <FaGithub size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Project;
